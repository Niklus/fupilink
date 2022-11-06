const express = require("express");
const router = express.Router();
const nanoid = require("nanoid");
const isURL = require("validator/lib/isURL");
const { links } = require("../config/db");

const base =
  process.env.environment === "development"
    ? "http://localhost:3000"
    : "https://fupilink.com";

router.post("/short", async (req, res) => {
  const { link } = req.body;

  if (isURL(link)) {
    const urlId = nanoid(5);
    try {
      let url = await links.fetch([{ link }]);

      if (url.items.length) {
        res.redirect(`/?link=${url.items[0].shortLink}`);
        return;
      }

      const shortLink = `${base}/${urlId}`;

      url = await links.put({
        link,
        shortLink,
        urlId,
        date: new Date(),
        clicks: 0,
      });
      res.redirect(`/?link=${url.shortLink}`);
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }

    return;
  }

  // TODO: Handle better. Redirection to homepage with message
  res.status(400).json("Invalid Original Url");
});

module.exports = router;
