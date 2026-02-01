import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "../../../../../../drizzle/schema";
import { eq } from "drizzle-orm";

// 簡單的管理員密碼驗證
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace("Bearer ", "");
  return token === process.env.ADMIN_SECRET;
}

// GET: 取得單篇文章
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const postId = parseInt(id, 10);

    const [post] = await db.select().from(posts).where(eq(posts.id, postId));

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// PUT: 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const postId = parseInt(id, 10);
    const body = await request.json();
    const { title, slug, excerpt, content, coverImage, categoryId, status } = body;

    // 檢查文章是否存在
    const [existingPost] = await db.select().from(posts).where(eq(posts.id, postId));
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // 準備更新資料
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (status !== undefined) {
      updateData.status = status;
      // 如果狀態從 draft 變成 published，設定發布時間
      if (status === "published" && existingPost.status === "draft") {
        updateData.publishedAt = new Date();
      }
    }

    const [updatedPost] = await db
      .update(posts)
      .set(updateData)
      .where(eq(posts.id, postId))
      .returning();

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE: 刪除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const postId = parseInt(id, 10);

    const [deletedPost] = await db
      .delete(posts)
      .where(eq(posts.id, postId))
      .returning();

    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
