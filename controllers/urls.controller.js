const nanoid = require("nanoid");
const isURL = require("validator/lib/isURL");
const { links } = require("../config/db");

const base = "https://fupilink.com";

exports.postLink = async (req, res) => {
  const { link } = req.body;

  if (isURL(link)) {
    try {
      let url = await links.fetch([{ link }]);

      if (url.items.length) {
        res.redirect(
          `/?shortLink=${url.items[0].shortLink}&link=${url.items[0].link}`
        );
        return;
      }

      let idExists = true;
      let urlId;

      while (idExists) {
        urlId = nanoid(5);
        url = await links.fetch([{ urlId }]);
        if (!url.items.length) {
          idExists = false;
        }
      }

      const shortLink = `${base}/${urlId}`;

      url = await links.put({
        link,
        shortLink,
        urlId,
        date: new Date(),
        clicks: 0,
      });
      res.redirect(`/?shortLink=${url.shortLink}&link=${url.link}`);
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }

    return;
  }

  res.redirect(`/?msg=Invalid URL`);
};
