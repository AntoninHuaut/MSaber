const router = require("express").Router();
const controller = require("../controllers/api_c");

router.get("/ranked", controller.ranked);
router.get("/:key?/:type?", controller.get);

module.exports = router;