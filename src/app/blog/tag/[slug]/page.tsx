import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { posts, tags, postTags, users, categories } from "../../../../../drizzle/schema";
import { eq, desc, and, inArray } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { PostsGrid } from "@/components/PostCard";
import type { Post } from "@/types/post";

interface Props {
  params: Promise<{ slug: string }>;
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
      return { tag, posts: [] as Post[] };
    }

    // 獲取文章
    const tagPosts: Post[] = await db
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
  const { slug } = await params;
  const data = await getTagWithPosts(slug);

  if (!data) {
    return { title: "標籤不存在" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aifengge.com";

  return {
    title: `#${data.tag.name} - AI峰哥部落格`,
    description: `瀏覽所有標記為 #${data.tag.name} 的文章`,
    alternates: {
      canonical: `${siteUrl}/blog/tag/${slug}`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const data = await getTagWithPosts(slug);

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
          <PostsGrid posts={tagPosts} emptyMessage="此標籤目前沒有文章" />
        </div>
      </section>
    </div>
  );
}
