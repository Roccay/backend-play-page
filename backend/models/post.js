const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uuidv4 = require("uuid4");
const postSchema = new Schema(
  {
    Author: { type: Schema.Types.ObjectId, ref: "User" },
    // Author: String,
    id: { type: String, default: uuidv4 },
    GameName: { type: String, required: true },
    AuthorName: String,
    GameLink: { type: String, default: "" },
    Tags: String,
    Fee: Number,
    Description: String,
    img: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
