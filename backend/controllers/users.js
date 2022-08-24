const User = require("../models/user");
const Post = require("../models/post");
const Bookmark = require("../models/bookmark");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;

module.exports = {
  create,
  login,
  profile,
};

async function create(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!(await bcrypt.compare(req.body.password, user.password)))
      throw new Error();
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    res.status(200).json(token);
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

async function profile(req, res) {
  const user = await User.findOne({ _id: req.params.id });
  const posts = await Post.find({ Author: req.params.id });
  const bookmarks = await Bookmark.find({ Author: req.params.id });
  try {
    res.status(200).json({ response: user, posts, bookmarks, success: true });
  } catch {
    res.status(400).json("Bad Credentials");
  }
}
