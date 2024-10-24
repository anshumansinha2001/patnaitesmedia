import connectDB from "@/lib/config/db";
import ArticleModel from "@/lib/models/articleModel";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

export async function GET(req) {
  await connectDB();

  const hostname = `${process.env.NEXT_PUBLIC_DOMAIN}/`;

  // Fetch articles from the database
  const articles = await ArticleModel.find(
    {},
    "slug category updatedAt"
  ).exec();

  const sitemap = new SitemapStream({ hostname });

  // Add static pages (home, about, contact, etc.)
  sitemap.write({ url: "/", changefreq: "daily", priority: 1.0 });
  sitemap.write({ url: "/about", changefreq: "monthly", priority: 0.7 });
  sitemap.write({ url: "/contact", changefreq: "monthly", priority: 0.7 });

  // Add dynamic pages (articles based on category and slug)
  articles.forEach((article) => {
    sitemap.write({
      url: `/${article.category.toLowerCase()}/${article.slug}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date(article.updatedAt).toISOString(),
    });
  });

  sitemap.end();

  // Convert the stream into XML format
  const sitemapXML = await streamToPromise(Readable.from(sitemap));

  return new Response(sitemapXML.toString(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
