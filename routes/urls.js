const express = require("express");
const router = express.Router();
const urlsCtrl = require("../controllers/urlsController");

router.post("/short", urlsCtrl.postLink);

module.exports = router;
