import { MetadataRoute } from "next";

import { db } from "@/lib/db";

export const getPosts = async () => {
  try {
    const posts = await db.post.findMany();
    return posts;
  } catch (error) {
    console.error("SITEMAP POST FETCHING ERROR", error);
    return [];
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();
  const posts = await getPosts();

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://archiveouryouth.ca/post/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://archiveouryouth.ca/",
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://archiveouryouth.ca/home",
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://archiveouryouth.ca/submit",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://archiveouryouth.ca/contact",
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://archiveouryouth.ca/about",
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    // User-related pages
    {
      url: "https://archiveouryouth.ca/dashboard",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Add dynamic post URLs
    ...postUrls,
    // Admin portal pages
    {
      url: "https://archiveouryouth.ca/dashboard/admin-portal",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: "https://archiveouryouth.ca/dashboard/admin-portal/stats",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: "https://archiveouryouth.ca/dashboard/admin-portal/users",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: "https://archiveouryouth.ca/dashboard/admin-portal/users/[userId]",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://archiveouryouth.ca/dashboard/admin-portal/posts",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: "https://archiveouryouth.ca/dashboard/admin-portal/comments",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: "https://archiveouryouth.ca/dashboard/admin-portal/logs",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
