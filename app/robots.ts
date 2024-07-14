import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/home", "/submit", "/contact", "/about", "/post/*"],
        disallow: [
          "/login",
          "/register",
          "/dashboard",
          "/dashboard/admin-portal",
          "/dashboard/admin-portal/stats",
          "/dashboard/admin-portal/users",
          "/dashboard/admin-portal/users/*",
          "/dashboard/admin-portal/posts",
          "/dashboard/admin-portal/comments",
          "/dashboard/admin-portal/logs",
          "/post/*/edit",
        ],
      },
    ],
    sitemap: "https://archiveouryouth.ca/sitemap.xml",
  };
}
