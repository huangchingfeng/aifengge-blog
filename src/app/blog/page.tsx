import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { posts, categories, users } from "../../../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { Eye, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "部落格 - AI 實戰教學、ChatGPT 與 Gemini 應用技巧",
  description:
    "探索 AI 應用的最新趨勢與實戰技巧，由台灣企業 AI 培訓專家阿峰老師分享。",
};

async function getPosts() {
  try {
    const allPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        excerpt: posts.excerpt,
        coverImage: posts.coverImage,
        publishedAt: posts.publishedAt,
        viewCount: posts.viewCount,
        content: posts.content,
        authorName: users.name,
        categoryName: categories.name,
        categorySlug: categories.slug,
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt))
      .limit(20);

    return allPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function getCategories() {
  try {
    return await db.select().from(categories).orderBy(categories.name);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function BlogPage() {
  const [allPosts, allCategories] = await Promise.all([
    getPosts(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Substack Banner */}
      <div className="bg-primary text-primary-foreground py-3">
        <div className="container text-center">
          <p className="text-sm">
            📬 訂閱電子報，第一時間收到最新 AI 實戰技巧 →{" "}
            <Link
              href="https://aifengge.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium hover:no-underline"
            >
              立即訂閱
            </Link>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">阿峰老師的部落格</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            探索 AI 職場應用的最新知識與實戰技巧
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto mt-8">
            <input
              type="search"
              placeholder="搜尋文章..."
              className="w-full px-4 py-3 border rounded-lg bg-background"
            />
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-6 border-b">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium"
            >
              全部
            </Link>
            {allCategories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className="px-4 py-2 rounded-full border hover:bg-muted text-sm font-medium"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="container">
          {allPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">目前還沒有文章</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map((post) => (
                <article
                  key={post.id}
                  className="group border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow"
                >
                  <Link href={`/blog/${post.slug}`}>
                    {/* Cover Image */}
                    <div className="relative aspect-video overflow-hidden">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      {/* Category */}
                      {post.categoryName && (
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-muted rounded">
                          {post.categoryName}
                        </span>
                      )}

                      {/* Title */}
                      <h2 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                        <span>{post.authorName || "阿峰老師"}</span>
                        <span>
                          {post.publishedAt
                            ? formatDate(post.publishedAt)
                            : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.viewCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {calculateReadingTime(post.content || "")} 分鐘
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
