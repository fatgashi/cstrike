// generate-sitemap.js
const fs = require("fs");
const path = require("path");
const { SitemapStream, streamToPromise } = require("sitemap");

// Base site URL
const SITE_URL = "https://zm-westcstrike.com";

// Function to extract routes from routes.js
function extractRoutes() {
  const routesFile = path.join(__dirname, "src", "router", "routes.js");
  const routesContent = fs.readFileSync(routesFile, "utf8");
  
  const routes = [];
  
  // Extract routes from the routes array
  // Match path patterns like: path: "home", path: "/server", path: "/forum/rules"
  const pathMatches = routesContent.matchAll(/path:\s*["']([^"']+)["']/g);
  
  for (const match of pathMatches) {
    let route = match[1];
    
    // Skip routes that shouldn't be in sitemap
    if (
      route.includes(":") || // Dynamic routes with params
      route.includes("*") || // Catch-all routes
      route === "/" || // Root redirect
      route.startsWith("/dashboard") || // Dashboard routes (admin only)
      route.includes("email-verification") || // Auth pages
      route.includes("verify-email") ||
      route.includes("forgot-password") ||
      route.includes("reset-password") ||
      route.includes("profile") || // User-specific pages
      route.includes("/admin-applications/") || // Dynamic admin application details
      route.includes("/admin-promotions/") // Dynamic promotion details
    ) {
      continue;
    }
    
    // Normalize route (ensure it starts with /)
    if (!route.startsWith("/")) {
      route = "/" + route;
    }
    
    // Determine priority based on route
    let priority = 0.8;
    let changefreq = "weekly";
    
    if (route === "/home") {
      priority = 1.0;
      changefreq = "daily";
    } else if (route === "/server" || route === "/forum") {
      priority = 0.9;
      changefreq = "daily";
    } else if (route.includes("/forum/")) {
      priority = 0.7;
    }
    
    routes.push({
      url: route,
      changefreq,
      priority,
      lastmod: new Date().toISOString().split("T")[0]
    });
  }
  
  // Add root path (redirects to /home)
  routes.push({
    url: "/",
    changefreq: "daily",
    priority: 1.0,
    lastmod: new Date().toISOString().split("T")[0]
  });
  
  // Remove duplicates
  const uniqueRoutes = Array.from(
    new Map(routes.map(route => [route.url, route])).values()
  );
  
  return uniqueRoutes.sort((a, b) => {
    // Sort with root first, then alphabetically
    if (a.url === "/") return -1;
    if (b.url === "/") return 1;
    return a.url.localeCompare(b.url);
  });
}

(async () => {
  try {
    console.log("Generating sitemap...");
    
    const routes = extractRoutes();
    console.log(`Found ${routes.length} routes to include in sitemap`);
    
    const sitemapStream = new SitemapStream({ 
      hostname: SITE_URL,
      xmlns: {
        news: false,
        xhtml: false,
        image: false,
        video: false
      }
    });

    routes.forEach(route => {
      sitemapStream.write(route);
    });

    sitemapStream.end();

    const data = await streamToPromise(sitemapStream);
    
    // Write plain XML file (not gzipped)
    const outputPath = path.join(__dirname, "public", "sitemap.xml");
    fs.writeFileSync(outputPath, data.toString());
    
    console.log(`✓ Sitemap generated successfully: ${outputPath}`);
    console.log(`  Total URLs: ${routes.length}`);
    
    // Remove old gzipped sitemap if it exists
    const gzPath = path.join(__dirname, "public", "sitemap.xml.gz");
    if (fs.existsSync(gzPath)) {
      fs.unlinkSync(gzPath);
      console.log("✓ Removed old sitemap.xml.gz file");
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
    process.exit(1);
  }
})();
