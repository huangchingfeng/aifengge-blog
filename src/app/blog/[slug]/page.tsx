import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { posts, categories, users, tags, postTags } from "../../../../drizzle/schema";
import { eq, and, sql } from "drizzle-orm";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { ArrowLeft, Eye, Clock, Calendar } from "lucide-react";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { AuthorBio } from "@/components/AuthorBio";
import { SubstackCTA } from "@/components/SubstackCTA";
import { ShareButtons } from "@/components/ShareButtons";
import { ArticleJsonLd } from "@/components/JsonLd";
import { marked } from "marked";
import { sanitizeHtml } from "@/lib/sanitize";

interface Props {
  params: Promise<{ slug: string }>;
}

// 取得文章資料（不更新瀏覽次數，用於 metadata 和頁面）
async function getPostData(slug: string) {
  try {
    const [post] = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        excerpt: posts.excerpt,
        content: posts.content,
        coverImage: posts.coverImage,
        publishedAt: posts.publishedAt,
        viewCount: posts.viewCount,
        authorId: posts.authorId,
        categoryId: posts.categoryId,
        authorName: users.name,
        categoryName: categories.name,
        categorySlug: categories.slug,
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
      .limit(1);

    if (!post) return null;

    // 獲取文章標籤
    const postTagsList = await db
      .select({
        tagId: postTags.tagId,
        tagName: tags.name,
        tagSlug: tags.slug,
      })
      .from(postTags)
      .leftJoin(tags, eq(postTags.tagId, tags.id))
      .where(eq(postTags.postId, post.id));

    return {
      ...post,
      tags: postTagsList,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// 增加瀏覽次數（使用 SQL 原子操作避免競爭條件）
async function incrementViewCount(postId: number) {
  try {
    await db
      .update(posts)
      .set({ viewCount: sql`${posts.viewCount} + 1` })
      .where(eq(posts.id, postId));
  } catch (error) {
    console.error("Error incrementing view count:", error);
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return {
      title: "文章不存在",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aifengge.com";

  return {
    title: post.title,
    description: post.excerpt || `閱讀 ${post.title} - AI峰哥部落格`,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      url: `${siteUrl}/blog/${post.slug}`,
      images: post.coverImage ? [post.coverImage] : [],
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.authorName || "阿峰老師"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  // 只在頁面實際渲染時增加瀏覽次數（不影響 metadata 生成）
  await incrementViewCount(post.id);

  const readingTime = calculateReadingTime(post.content || "");
  const rawHtml = await marked(post.content || "");
  const htmlContent = sanitizeHtml(rawHtml);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aifengge.com";
  const articleUrl = `${siteUrl}/blog/${post.slug}`;

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt || ""}
        url={articleUrl}
        imageUrl={post.coverImage || ""}
        datePublished={post.publishedAt?.toISOString() || ""}
        authorName={post.authorName || "阿峰老師"}
      />
      <ReadingProgressBar />

      <article className="min-h-screen">
        {/* Hero Section */}
        <section className="py-12 bg-muted/30">
          <div className="container max-w-4xl">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回文章列表
            </Link>

            {/* Category */}
            {post.categoryName && (
              <Link
                href={`/blog/category/${post.categorySlug}`}
                className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4"
              >
                {post.categoryName}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <span className="flex items-center gap-2">
                {post.authorName || "阿峰老師"}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.publishedAt ? formatDate(post.publishedAt) : ""}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {post.viewCount + 1} 次瀏覽
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                約 {readingTime} 分鐘閱讀
              </span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.tagId}
                    href={`/blog/tag/${tag.tagSlug}`}
                    className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-full"
                  >
                    #{tag.tagName}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Cover Image */}
        {post.coverImage && (
          <section className="container max-w-4xl py-8">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </section>
        )}

        {/* Content */}
        <section className="container max-w-4xl py-8">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Share Buttons */}
          <ShareButtons url={articleUrl} title={post.title} />

          {/* Author Bio */}
          <AuthorBio />

          {/* CTA */}
          <SubstackCTA />
        </section>
      </article>
    </>
  );
}
