const Bookmark = require("../models/post");
var uuidv4 = require("uuid4");
const User = require("../models/user");

async function index(req, res) {
  try {
    const bookmarks = await Bookmark.find();

    res.status(200).json({ success: true, response: bookmarks });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, response: err });
  }
}

async function create(req, res) {
  const user = await User.findById(req.body.author);
  try {
    const bookmark = await Bookmark.create({
      Creator: user,
      id: uuidv4(),
      Title: req.body.Title,
      AuthorName: req.body.AuthorName,
      Tags: req.body.tags,
      Link: req.body.Link,
      Language: req.body.Language,
    });

    res.status(200).json({ success: true, response: bookmark });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, response: err });
  }
}

async function deleteBookmark(req, res) {
  try {
    deletePost = await Bookmark.findByIdAndDelete(req.body.p_id).exec();

    let bookmarks = await Bookmark.find({}).exec();
    res.status(200).json(bookmarks);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function updateBookmark(req, res) {
  const user = await User.findById(req.body.author);
  try {
    const post = await Post.updateOne(
      { _id: req.params.id },
      {
        Creator: user,
        Title: req.body.Title,
        AuthorName: req.body.AuthorName,
        Tags: req.body.tags,
        Link: req.body.Link,
        Language: req.body.Language,
      }
    );

    res.status(200).json({ success: true, response: post });
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  index,
  create,
  delete: deleteBookmark,
  update: updateBookmark,
};
