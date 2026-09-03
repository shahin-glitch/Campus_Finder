import { MetadataRoute } from "next";
import { INITIAL_COLLEGES, INITIAL_ACCOMMODATIONS } from "@/db/seed-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://campusfinder.in";

  const staticRoutes = [
    "",
    "/colleges",
    "/courses",
    "/compare",
    "/stay",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const collegeRoutes = INITIAL_COLLEGES.map((college) => ({
    url: `${baseUrl}/colleges/${college.slug}`,
    lastModified: new Date(college.lastVerifiedAt || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const stayRoutes = INITIAL_ACCOMMODATIONS.map((stay) => ({
    url: `${baseUrl}/stay/${stay.slug}`,
    lastModified: new Date(stay.lastVerifiedAt || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...collegeRoutes, ...stayRoutes];
}
