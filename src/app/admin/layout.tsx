"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// 認證 Context
interface AuthContextType {
  token: string | null;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // 從 localStorage 讀取 token
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
    }
    setIsLoading(false);
  }, []);

  const login = (password: string): boolean => {
    // 密碼會在客戶端儲存，但實際驗證在 API 端
    localStorage.setItem("admin_token", password);
    setToken(password);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // 如果沒有 token，顯示登入頁面
  if (!token) {
    return (
      <AuthContext.Provider value={{ token, login, logout }}>
        <LoginPage onLogin={login} />
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      <div className="min-h-screen bg-gray-100">
        {/* 側邊導航 */}
        <nav className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6">
          <h1 className="text-xl font-bold mb-8">部落格後台</h1>
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className={`block px-4 py-2 rounded ${
                  pathname === "/admin"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                文章管理
              </Link>
            </li>
            <li>
              <Link
                href="/admin/new"
                className={`block px-4 py-2 rounded ${
                  pathname === "/admin/new"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                新增文章
              </Link>
            </li>
            <li className="pt-4 border-t">
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 rounded hover:bg-red-100 text-red-600"
              >
                登出
              </button>
            </li>
          </ul>
          <div className="absolute bottom-6 left-6 right-6">
            <Link
              href="/"
              className="block text-center text-sm text-gray-500 hover:text-gray-700"
            >
              ← 返回前台
            </Link>
          </div>
        </nav>

        {/* 主內容區 */}
        <main className="ml-64 p-8">{children}</main>
      </div>
    </AuthContext.Provider>
  );
}

// 登入頁面元件
function LoginPage({ onLogin }: { onLogin: (password: string) => boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("請輸入密碼");
      return;
    }
    onLogin(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">部落格後台</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">管理員密碼</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="請輸入密碼"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  );
}
