import type { APIRoute } from "astro";

// Move constant arrays outside the function to avoid recreation on each request
const NO_INDEX_PATHS = [
  "/blog/tag/*",
  "*.netlify.app/*",  // Blocks all Netlify subdomain URLs
  "*.netlify/*",      // Blocks Netlify-related paths
  "/.netlify/*",      // Blocks Netlify system folders
  "/blog/example-post",
  "/category/*",
  "/api/*",
  "/tag/*",
  "/goto/*",
  "/search/*",
  "/?",
  "/confirm/*",
  "verify-email/*",
  "/404/*",
] as const;

export const GET: APIRoute = ({ site }) => {
  const siteUrl = import.meta.env.SITE_URL ?? "https://bestofvacuum.com";

  // Use a template literal with pre-joined paths to avoid runtime string concatenation
  const robotsTxtContent = `User-agent: *
Disallow: ${NO_INDEX_PATHS.join("\nDisallow: ")}
Allow: /
Sitemap: ${siteUrl}/sitemap-index.xml`.trim();

  return new Response(robotsTxtContent, {
    headers: {
      "Content-Type": "text/plain",
      // Add caching headers to reduce server load
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  });
};
