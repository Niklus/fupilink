const link = document.querySelector("#shortLink");
const longUrl = link.dataset.link;
const shortUrl = link.href;
const urls = { longUrl, shortUrl };

const links = JSON.parse(localStorage.getItem("links")) || [];
const found = links.find((obj) => obj.shortUrl === urls.shortUrl);

if (!found && shortUrl && longUrl) {
  links.push(urls);
  localStorage.setItem("links", JSON.stringify(links));
}
