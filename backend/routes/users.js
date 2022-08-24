const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");

router.get("/profile/:id", usersCtrl.profile);

router.post("/signup", usersCtrl.create);

router.post("/login", usersCtrl.login);

module.exports = router;
