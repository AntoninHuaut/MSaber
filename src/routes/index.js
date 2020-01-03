const express = require("express");
const router = express.Router();

router.use(express.static(__basedir + "/static"));

router.use("/", require("./base"));
router.use("/api", require("./api"));

module.exports = router;