import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gariyuuu.com";

const STATIC_ROUTES = ["", "/about", "/chat", "/projects"];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
