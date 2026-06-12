import fs from 'node:fs';
import path from 'node:path';

// Define generic, unbranded defaults for the master branch
export const defaultSeoConfig = {
  googleAnalyticsId: "",
  defaultTitle: "QR Guy — Free QR Maker & Barcode Maker Online",
  defaultDescription: "Create and scan QR codes & barcodes online. QR Guy is a free, fast, client-side utility.",
  defaultKeywords: "qr maker, barcode maker, client-side, scan",
  canonicalUrl: "",
  ogImage: "",
  robots: "noindex, nofollow",
  schema: null,
  seoContent: null
};

let loadedConfig = { ...defaultSeoConfig };

try {
  const configPath = path.resolve(process.cwd(), 'src/seo-config.json');
  if (fs.existsSync(configPath)) {
    const fileContent = fs.readFileSync(configPath, 'utf8');
    const parsed = JSON.parse(fileContent);
    loadedConfig = {
      ...defaultSeoConfig,
      ...parsed,
      schema: parsed.schema ? { ...parsed.schema } : null,
      seoContent: parsed.seoContent ? { ...parsed.seoContent } : null
    };
  }
} catch (e) {
  // Fail silently or print a warning at build time to prevent build failures
  console.warn("Notice: src/seo-config.json not found or failed to parse. Using default generic SEO settings.");
}

export const seo = loadedConfig;

/**
 * Returns the full canonical URL for a given path using the configured canonicalUrl.
 * @param {string} pagePath
 * @returns {string}
 */
export function getCanonical(pagePath = '') {
  if (!seo.canonicalUrl) return '';
  const cleanBase = seo.canonicalUrl.replace(/\/+$/, '');
  const cleanPath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;
  return `${cleanBase}${cleanPath}`;
}
