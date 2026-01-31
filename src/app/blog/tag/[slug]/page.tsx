import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { posts, tags, postTags, users, categories } from "../../../../../drizzle/schema";
import { eq, desc, and, inArray } from "drizzle-orm";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { ArrowLeft, Eye, Clock } from "lucide-react";

interface Props {
  params: { slug: string };
}

async function getTagWithPosts(slug: string) {
  try {
    // 獲取標籤
    const [tag] = await db
      .select()
      .from(tags)
      .where(eq(tags.slug, slug))
      .limit(1);

    if (!tag) return null;

    // 獲取該標籤關聯的文章 ID
    const postTagsList = await db
      .select({ postId: postTags.postId })
      .from(postTags)
      .where(eq(postTags.tagId, tag.id));

    const postIds = postTagsList.map((pt) => pt.postId);

    if (postIds.length === 0) {
      return { tag, posts: [] };
    }

    // 獲取文章
    const tagPosts = await db
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
      .where(and(inArray(posts.id, postIds), eq(posts.status, "published")))
      .orderBy(desc(posts.publishedAt));

    return {
      tag,
      posts: tagPosts,
    };
  } catch (error) {
    console.error("Error fetching tag:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getTagWithPosts(params.slug);

  if (!data) {
    return { title: "標籤不存在" };
  }

  return {
    title: `#${data.tag.name} - AI峰哥部落格`,
    description: `瀏覽所有標記為 #${data.tag.name} 的文章`,
  };
}

export default async function TagPage({ params }: Props) {
  const data = await getTagWithPosts(params.slug);

  if (!data) {
    notFound();
  }

  const { tag, posts: tagPosts } = data;

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

          <h1 className="text-3xl md:text-4xl font-bold mb-4">#{tag.name}</h1>

          <p className="text-muted-foreground">共 {tagPosts.length} 篇文章</p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="container">
          {tagPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">此標籤目前沒有文章</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tagPosts.map((post) => (
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
                      {post.categoryName && (
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-muted rounded">
                          {post.categoryName}
                        </span>
                      )}

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
