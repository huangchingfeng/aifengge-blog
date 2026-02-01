"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../layout";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost();
    fetchCategories();
  }, [id, token]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 404) {
          setError("找不到此文章");
          return;
        }
        throw new Error("Failed to fetch post");
      }

      const post = await res.json();
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt || "");
      setContent(post.content);
      setCoverImage(post.coverImage || "");
      setCategoryId(post.categoryId);
      setStatus(post.status);
    } catch (err) {
      setError("載入文章失敗");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await res.json();
      setCoverImage(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "圖片上傳失敗");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !slug.trim() || !content.trim()) {
      setError("標題、網址代稱和內容為必填");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          coverImage: coverImage || null,
          categoryId,
          status,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update post");
      }

      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "儲存失敗");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error && !title) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">編輯文章</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 標題 */}
        <div>
          <label className="block text-sm font-medium mb-2">標題 *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="文章標題"
          />
        </div>

        {/* 網址代稱 */}
        <div>
          <label className="block text-sm font-medium mb-2">網址代稱 (slug) *</label>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="article-slug"
            />
          </div>
        </div>

        {/* 摘要 */}
        <div>
          <label className="block text-sm font-medium mb-2">摘要</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="文章摘要（顯示在文章列表）"
          />
        </div>

        {/* 封面圖 */}
        <div>
          <label className="block text-sm font-medium mb-2">封面圖</label>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="圖片網址"
              />
              <div className="mt-2">
                <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {uploading ? "上傳中..." : "或上傳圖片"}
                </label>
              </div>
            </div>
            {coverImage && (
              <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={coverImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* 分類 */}
        <div>
          <label className="block text-sm font-medium mb-2">分類</label>
          <select
            value={categoryId || ""}
            onChange={(e) =>
              setCategoryId(e.target.value ? parseInt(e.target.value) : null)
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">選擇分類</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* 內容 */}
        <div>
          <label className="block text-sm font-medium mb-2">內容 * (支援 HTML)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            rows={20}
            placeholder="<p>文章內容...</p>"
          />
        </div>

        {/* 狀態與送出 */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="draft"
                checked={status === "draft"}
                onChange={() => setStatus("draft")}
                className="mr-2"
              />
              儲存為草稿
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="published"
                checked={status === "published"}
                onChange={() => setStatus("published")}
                className="mr-2"
              />
              立即發布
            </label>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
              {saving ? "儲存中..." : "儲存"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
