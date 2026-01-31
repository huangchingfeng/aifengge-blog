import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { posts, categories, users } from "../../../../../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { PostsGrid } from "@/components/PostCard";
import type { Post } from "@/types/post";

interface Props {
  params: Promise<{ slug: string }>;
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
    const categoryPosts: Post[] = await db
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
  const { slug } = await params;
  const data = await getCategoryWithPosts(slug);

  if (!data) {
    return { title: "分類不存在" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aifengge.com";

  return {
    title: `${data.category.name} - AI峰哥部落格`,
    description:
      data.category.description || `瀏覽 ${data.category.name} 分類的所有文章`,
    alternates: {
      canonical: `${siteUrl}/blog/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const data = await getCategoryWithPosts(slug);

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
          <PostsGrid
            posts={categoryPosts}
            showCategory={false}
            emptyMessage="此分類目前沒有文章"
          />
        </div>
      </section>
    </div>
  );
}
