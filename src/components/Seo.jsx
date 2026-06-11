import { useEffect } from "react";

const DEFAULT_DESCRIPTION =
  "Portfolio of Samuel Bagin, a Slovakia-based AI and data engineer and web developer.";
const DEFAULT_IMAGE = "/logo512.png";

export function getSiteUrl() {
  const configuredUrl = process.env.REACT_APP_SITE_URL?.trim();
  const fallbackUrl = typeof window !== "undefined" ? window.location.origin : "";

  return (configuredUrl || fallbackUrl).replace(/\/+$/, "");
}

export function getAbsoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;

  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

export function createWebPageSchema({ path, name, description, type = "WebPage", image }) {
  const url = getAbsoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${getAbsoluteUrl("/")}#website`,
      name: "Samuel Bagin",
      url: getAbsoluteUrl("/"),
    },
    ...(image ? { primaryImageOfPage: getAbsoluteUrl(image) } : {}),
  };
}

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function upsertStructuredData(schema) {
  const existing = document.getElementById("route-structured-data");

  if (!schema) {
    existing?.remove();
    return;
  }

  const element = existing || document.createElement("script");
  element.id = "route-structured-data";
  element.type = "application/ld+json";
  element.textContent = JSON.stringify(schema);

  if (!existing) document.head.appendChild(element);
}

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  robots = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  schema,
  canonical = true,
}) {
  useEffect(() => {
    const absoluteUrl = getAbsoluteUrl(path);
    const absoluteImage = getAbsoluteUrl(image);

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "author", "Samuel Bagin");
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "googlebot", robots);
    upsertMeta("property", "og:site_name", "Samuel Bagin");
    upsertMeta("property", "og:locale", "en_US");
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", absoluteUrl);
    upsertMeta("property", "og:image", absoluteImage);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", absoluteImage);

    if (canonical) {
      upsertCanonical(absoluteUrl);
    } else {
      document.head.querySelector('link[rel="canonical"]')?.remove();
    }

    upsertStructuredData(schema);
  }, [canonical, description, image, path, robots, schema, title, type]);

  return null;
}
