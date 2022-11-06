var express = require("express");
var router = express.Router();
const { links } = require("../config/db");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "fupilink", link: req.query.link });
});

router.get("/:urlId", async (req, res) => {
  try {
    const url = await links.fetch([{ urlId: req.params.urlId }]);

    if (url.items.length) {
      await links.put({
        ...url.items[0],
        clicks: url.items[0].clicks + 1,
      });
      return res.redirect(url.items[0].link);
    }
    res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
