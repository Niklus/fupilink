const { links } = require("../config/db");

exports.getIndex = (req, res) => {
  res.render("index", {
    title: "fupilink",
    shortLink: req.query.shortLink,
    link: req.query.link,
    msg: req.query.msg,
  });
};

exports.getLink = async (req, res) => {
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
};
