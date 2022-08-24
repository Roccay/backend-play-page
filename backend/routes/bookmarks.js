const router = require("express").Router();
const bookmarkCtrl = require("../controllers/bookmarks");

router.get("/", bookmarkCtrl.index);
router.post("/", bookmarkCtrl.create);

router.delete("/", bookmarkCtrl.delete);

router.put("/update/:id", bookmarkCtrl.update);

module.exports = router;
