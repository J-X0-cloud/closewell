import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site";

const routes = ["", "/platform", "/controllers", "/get-started"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
