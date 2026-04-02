import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { fileURLToPath } from "url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

function normalizeSiteUrl(rawUrl) {
  if (!rawUrl) return ""
  let url = String(rawUrl).trim()
  if (!url) return ""

  // Vercel provides VERCEL_URL without protocol.
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`
  return url.replace(/\/+$/, "")
}

function getSiteUrl() {
  const env = globalThis.process?.env ?? {}

  const fromEnv =
    env.SITE_URL ||
    env.VITE_SITE_URL ||
    (env.VERCEL_URL ? `https://${env.VERCEL_URL}` : "")

  return normalizeSiteUrl(fromEnv) || "http://localhost:5173"
}

function buildRobotsTxt(siteUrl) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
}

function buildSitemapXml(siteUrl) {
  const loc = `${siteUrl}/`
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <url>\n` +
    `    <loc>${loc}</loc>\n` +
    `  </url>\n` +
    `</urlset>\n`
  )
}

function buildJsonLd(siteUrl) {
  const websiteId = `${siteUrl}/#website`
  const personId = `${siteUrl}/#person`
  const webpageId = `${siteUrl}/#webpage`
  const homepageUrl = `${siteUrl}/`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: homepageUrl,
        name: "Abhinav Shrestha",
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: homepageUrl,
        name: "Abhinav Shrestha",
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Abhinav Shrestha",
        url: homepageUrl,
        email: "mailto:abhinavshr002@gmail.com",
        sameAs: [
          "https://github.com/abhinavshr",
          "https://www.linkedin.com/in/abhinav-shrestha-9a8786255/",
        ],
        knowsAbout: ["React", "Three.js", "Node.js", "Backend Development"],
      },
    ],
  }
}

function seoAssetsPlugin() {
  const siteUrl = getSiteUrl()
  const robotsTxt = buildRobotsTxt(siteUrl)
  const sitemapXml = buildSitemapXml(siteUrl)
  const jsonLd = buildJsonLd(siteUrl)

  return {
    name: "seo-assets",
    enforce: "pre",

    transformIndexHtml() {
      return [
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: JSON.stringify(jsonLd),
          injectTo: "head",
        },
      ]
    },

    configureServer(server) {
      server.middlewares.use("/robots.txt", (req, res) => {
        res.statusCode = 200
        res.setHeader("Content-Type", "text/plain; charset=utf-8")
        res.end(robotsTxt)
      })

      server.middlewares.use("/sitemap.xml", (req, res) => {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/xml; charset=utf-8")
        res.end(sitemapXml)
      })
    },

    generateBundle() {
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robotsTxt })
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemapXml })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoAssetsPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})