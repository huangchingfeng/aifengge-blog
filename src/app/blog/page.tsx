import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { posts, categories, users } from "../../../drizzle/schema";
import { eq, desc, like, or, sql } from "drizzle-orm";
import { PostsGrid } from "@/components/PostCard";
import { SearchBox } from "@/components/SearchBox";
import { Pagination } from "@/components/Pagination";
import type { Post } from "@/types/post";

const POSTS_PER_PAGE = 9;

export const metadata: Metadata = {
  title: "部落格 - AI 實戰教學、ChatGPT 與 Gemini 應用技巧",
  description:
    "探索 AI 應用的最新趨勢與實戰技巧，由台灣企業 AI 培訓專家阿峰老師分享。",
};

interface SearchParams {
  q?: string;
  page?: string;
}

async function getPosts(
  searchQuery?: string,
  page: number = 1
): Promise<{ posts: Post[]; totalCount: number }> {
  try {
    // 建立基礎查詢條件
    const baseCondition = eq(posts.status, "published");

    // 如果有搜尋關鍵字，加入搜尋條件
    const searchCondition = searchQuery
      ? or(
          like(posts.title, `%${searchQuery}%`),
          like(posts.excerpt, `%${searchQuery}%`),
          like(posts.content, `%${searchQuery}%`)
        )
      : undefined;

    // 計算總數
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(posts)
      .where(
        searchCondition
          ? sql`${baseCondition} AND ${searchCondition}`
          : baseCondition
      );

    const totalCount = Number(countResult[0]?.count || 0);

    // 取得分頁資料
    const offset = (page - 1) * POSTS_PER_PAGE;

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
      .where(
        searchCondition
          ? sql`${baseCondition} AND ${searchCondition}`
          : baseCondition
      )
      .orderBy(desc(posts.publishedAt))
      .limit(POSTS_PER_PAGE)
      .offset(offset);

    return { posts: allPosts, totalCount };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], totalCount: 0 };
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

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const searchQuery = params.q || "";
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));

  const [{ posts: allPosts, totalCount }, allCategories] = await Promise.all([
    getPosts(searchQuery, currentPage),
    getCategories(),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

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
        <div className="container text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">阿峰老師的部落格</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            探索 AI 職場應用的最新知識與實戰技巧
          </p>

          {/* Search Box */}
          <div className="flex justify-center pt-4">
            <Suspense fallback={<div className="h-10 w-full max-w-md bg-muted rounded-full animate-pulse" />}>
              <SearchBox />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-6 border-b">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !searchQuery
                  ? "bg-primary text-primary-foreground"
                  : "border hover:bg-muted"
              }`}
            >
              全部
            </Link>
            {allCategories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className="px-4 py-2 rounded-full border hover:bg-muted text-sm font-medium transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search Results Info */}
      {searchQuery && (
        <section className="py-4 border-b bg-muted/30">
          <div className="container text-center">
            <p className="text-sm text-muted-foreground">
              搜尋「<span className="font-medium text-foreground">{searchQuery}</span>」
              找到 {totalCount} 篇文章
            </p>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-12">
        <div className="container">
          <PostsGrid
            posts={allPosts}
            emptyMessage={
              searchQuery
                ? `找不到包含「${searchQuery}」的文章`
                : "目前還沒有文章"
            }
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Suspense fallback={null}>
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </Suspense>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
