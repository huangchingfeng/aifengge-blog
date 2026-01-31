"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/blog" className="flex items-center space-x-2">
          <span className="text-xl font-bold">AI峰哥</span>
          <span className="text-sm text-muted-foreground">企業AI實戰培訓</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/blog"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            全部文章
          </Link>
          <Link
            href="/blog/category/ai-trends"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            AI 趨勢
          </Link>
          <Link
            href="/blog/category/tutorials"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            工具教學
          </Link>
          <Link
            href="https://aifengge.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            訂閱電子報
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden border-t bg-background p-4 space-y-4">
          <Link
            href="/blog"
            className="block text-sm font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            全部文章
          </Link>
          <Link
            href="/blog/category/ai-trends"
            className="block text-sm font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            AI 趨勢
          </Link>
          <Link
            href="/blog/category/tutorials"
            className="block text-sm font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            工具教學
          </Link>
          <Link
            href="https://aifengge.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm font-medium text-primary"
          >
            訂閱電子報
          </Link>
        </nav>
      )}
    </header>
  );
}
