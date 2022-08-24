const express = require("express");
const logger = require("morgan");
const path = require("path");
require("dotenv").config();
require("./backend/config/database.js");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use("/api/posts", require("./backend/routes/posts"));
app.use("/api/bookmarks", require("./backend/routes/bookmarks"));
app.use("/users", require("./backend/routes/users.js"));

app.use(require("./backend/config/auth"));

app.use(express.static(path.join(__dirname, "build")));
app.use("/api/posts/images", express.static(__dirname + "/public/images/"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
