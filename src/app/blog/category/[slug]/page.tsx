import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { posts, categories, users } from "../../../../../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { ArrowLeft, Eye, Clock } from "lucide-react";

interface Props {
  params: { slug: string };
}

async function getCategoryWithPosts(slug: string) {
  try {
    // 獲取分類
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1);

    if (!category) return null;

    // 獲取該分類的文章
    const categoryPosts = await db
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
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .where(
        and(eq(posts.categoryId, category.id), eq(posts.status, "published"))
      )
      .orderBy(desc(posts.publishedAt));

    return {
      category,
      posts: categoryPosts,
    };
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getCategoryWithPosts(params.slug);

  if (!data) {
    return { title: "分類不存在" };
  }

  return {
    title: `${data.category.name} - AI峰哥部落格`,
    description:
      data.category.description || `瀏覽 ${data.category.name} 分類的所有文章`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const data = await getCategoryWithPosts(params.slug);

  if (!data) {
    notFound();
  }

  const { category, posts: categoryPosts } = data;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回文章列表
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {category.name}
          </h1>

          {category.description && (
            <p className="text-xl text-muted-foreground max-w-2xl">
              {category.description}
            </p>
          )}

          <p className="mt-4 text-muted-foreground">
            共 {categoryPosts.length} 篇文章
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="container">
          {categoryPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">此分類目前沒有文章</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPosts.map((post) => (
                <article
                  key={post.id}
                  className="group border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow"
                >
                  <Link href={`/blog/${post.slug}`}>
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

                    <div className="p-6 space-y-3">
                      <h2 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

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
