import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts, categories, users } from "../../../../../drizzle/schema";
import { desc, eq, sql } from "drizzle-orm";

// 簡單的管理員密碼驗證
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace("Bearer ", "");
  return token === process.env.ADMIN_SECRET;
}

// GET: 取得所有文章
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        excerpt: posts.excerpt,
        coverImage: posts.coverImage,
        status: posts.status,
        publishedAt: posts.publishedAt,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        viewCount: posts.viewCount,
        categoryId: posts.categoryId,
        categoryName: categories.name,
      })
      .from(posts)
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .orderBy(desc(posts.createdAt));

    return NextResponse.json(allPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST: 新增文章
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, coverImage, categoryId, status } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 }
      );
    }

    // 取得或建立預設作者（ID=1）
    const authorId = 1;

    const [newPost] = await db
      .insert(posts)
      .values({
        title,
        slug,
        excerpt: excerpt || null,
        content,
        coverImage: coverImage || null,
        categoryId: categoryId || null,
        authorId,
        status: status || "draft",
        publishedAt: status === "published" ? new Date() : null,
      })
      .returning();

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
