import { useEffect } from "react";

type SeoData = {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  jsonLd?: object | object[];
};

const PAGE_JSONLD_ID = "page-jsonld";

export function useSeoHead({ title, description, canonical, ogImage, jsonLd }: SeoData) {
  useEffect(() => {
    document.title = title;
    document.documentElement.setAttribute("lang", "en-IN");

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "yCohort");
    upsertMeta("property", "og:locale", "en_IN");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    const image = ogImage || "https://ycohort.app/og-image.png";
    upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:image", image);

    upsertCanonical(canonical);

    if (jsonLd) {
      removeJsonLd(PAGE_JSONLD_ID);
      const payload = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      payload.forEach((obj, i) => injectJsonLd(`${PAGE_JSONLD_ID}-${i}`, obj));
    }

    return () => {
      document.querySelectorAll(`script[data-seo-id^="${PAGE_JSONLD_ID}"]`).forEach((n) => n.remove());
    };
  }, [title, description, canonical, ogImage, JSON.stringify(jsonLd)]);
}

function upsertMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function injectJsonLd(id: string, data: object) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo-id", id);
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function removeJsonLd(idPrefix: string) {
  document.querySelectorAll(`script[data-seo-id^="${idPrefix}"]`).forEach((n) => n.remove());
}
