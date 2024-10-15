const router = require("express").Router();
router.use(require("./bookRoute"));
router.use(require("./userRoute"));

module.exports = router;
