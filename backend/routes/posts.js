const router = require("express").Router();
const postCtrl = require("../controllers/posts");

router.get("/games/:tags", postCtrl.index);
router.get("/", postCtrl.index);

router.post("/", postCtrl.create);

router.delete("/", postCtrl.deletePost);

router.put("/update/:id", postCtrl.update);

module.exports = router;
