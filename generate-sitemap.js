// generate-sitemap.js
const fs = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");

// Base site URL
const SITE_URL = "https://zm-westcstrike.com";

// Your route paths (add more if needed)
const routes = [
  "/home",
  "/server",
  "/vip-info",
  "/events-updates",
  "/offers",
  "/maps",
  "/maps/medium-maps",
  "/maps/large-maps",
  "/about",
  "/forum/rules",
  "/forum/apply-for-admin",
];

(async () => {
  const sitemapStream = new SitemapStream({ hostname: SITE_URL });
  const pipeline = sitemapStream.pipe(createGzip());

  routes.forEach(route => {
    sitemapStream.write({ url: route, changefreq: "weekly", priority: 0.8 });
  });

  sitemapStream.end();

  const data = await streamToPromise(pipeline);
  fs.writeFileSync("./public/sitemap.xml.gz", data);
})();
