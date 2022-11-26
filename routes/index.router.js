const express = require("express");
const router = express.Router();
const indexCtrl = require("../controllers/index.controller");

router.get("/", indexCtrl.getIndex);
router.get("/:urlId", indexCtrl.getLink);

module.exports = router;
