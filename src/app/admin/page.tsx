"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "./layout";

interface Post {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt: string;
  viewCount: number;
  categoryName: string | null;
}

export default function AdminPostsPage() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          setError("密碼錯誤，請重新登入");
          return;
        }
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError("載入文章失敗");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`確定要刪除「${title}」嗎？此操作無法復原。`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete post");
      }

      // 重新載入列表
      fetchPosts();
    } catch (err) {
      alert("刪除失敗");
      console.error(err);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("zh-TW");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">文章管理</h1>
        <Link
          href="/admin/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          + 新增文章
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                標題
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                分類
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                狀態
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                發布日期
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                瀏覽數
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 truncate max-w-xs">
                    {post.title}
                  </div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    /{post.slug}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {post.categoryName || "-"}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      post.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.status === "published" ? "已發布" : "草稿"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(post.publishedAt)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {post.viewCount}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    預覽
                  </Link>
                  <Link
                    href={`/admin/edit/${post.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    編輯
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="text-red-500 hover:text-red-700"
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            還沒有文章，
            <Link href="/admin/new" className="text-blue-500 hover:underline">
              新增一篇
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
