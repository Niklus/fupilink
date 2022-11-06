const { Deta } = require("deta");
const config = require("./config.json");
const deta = Deta(config.key);

exports.links = deta.Base("links");
