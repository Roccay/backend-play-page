const Bookmark = require("../models/bookmark");
var uuidv4 = require("uuid4");
const User = require("../models/user");

async function index(req, res) {
  try {
    const bookmarks = await Bookmark.find();
    const designBM = await Bookmark.find({ Type: "design" });
    const tutorialBM = await Bookmark.find({ Type: "tutorial" });
    const referenceBM = await Bookmark.find({ Type: "reference" });
    const othersBM = await Bookmark.find({ Type: "others" });
    res.status(200).json({
      success: true,
      designBM,
      tutorialBM,
      referenceBM,
      othersBM,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, response: err });
  }
}

async function create(req, res) {
  const user = await User.findById(req.body.Creator);
  try {
    const bookmark = await Bookmark.create({
      Creator: user,
      id: uuidv4(),
      Title: req.body.Title,
      AuthorName: req.body.AuthorName,
      Tags: req.body.tags,
      Link: req.body.Link,
      Language: req.body.Language,
      Type: req.body.Type,
    });
    console.log(bookmark);
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
    const bookmark = await Bookmark.updateOne(
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

    res.status(200).json({ success: true, response: bookmark });
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
