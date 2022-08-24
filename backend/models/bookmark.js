const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uuidv4 = require("uuid4");
const bookmarkSchema = new Schema(
  {
    Creator: { type: Schema.Types.ObjectId, ref: "User" },
    id: { type: String, default: uuidv4 },
    Title: { type: String, required: true },
    AuthorName: { type: String, required: true },
    Link: { type: String, default: "" },
    Tags: String,
    Language: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);
