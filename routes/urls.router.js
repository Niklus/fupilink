const express = require("express");
const router = express.Router();
const urlsCtrl = require("../controllers/urls.controller");

router.post("/short", urlsCtrl.postLink);

module.exports = router;
