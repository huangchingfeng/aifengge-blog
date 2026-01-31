import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { posts, categories, users, tags, postTags } from "../../../../drizzle/schema";
import { eq, and, inArray } from "drizzle-orm";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { ArrowLeft, Eye, Clock, Calendar } from "lucide-react";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { AuthorBio } from "@/components/AuthorBio";
import { SubstackCTA } from "@/components/SubstackCTA";
import { marked } from "marked";

interface Props {
  params: { slug: string };
}

async function getPost(slug: string) {
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

    // 增加瀏覽次數
    await db
      .update(posts)
      .set({ viewCount: post.viewCount + 1 })
      .where(eq(posts.id, post.id));

    return {
      ...post,
      tags: postTagsList,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "文章不存在",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `閱讀 ${post.title} - AI峰哥部落格`,
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
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
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content || "");
  const htmlContent = marked(post.content || "");

  return (
    <>
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
                {post.viewCount} 次瀏覽
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

          {/* Author Bio */}
          <AuthorBio />

          {/* CTA */}
          <SubstackCTA />
        </section>
      </article>
    </>
  );
}
