"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath = "/blog",
}: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  // 計算要顯示的頁碼範圍
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const showPages = 5; // 最多顯示 5 個頁碼

    if (totalPages <= showPages) {
      // 總頁數少於等於 5，全部顯示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 總頁數大於 5
      if (currentPage <= 3) {
        // 靠近開頭
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 靠近結尾
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 在中間
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="分頁導航">
      {/* 上一頁 */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-2 text-sm rounded-md border hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          上一頁
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 text-sm rounded-md border text-muted-foreground cursor-not-allowed">
          <ChevronLeft className="h-4 w-4" />
          上一頁
        </span>
      )}

      {/* 頁碼 */}
      <div className="hidden sm:flex items-center gap-1">
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-sm text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                currentPage === page
                  ? "bg-primary text-primary-foreground"
                  : "border hover:bg-muted"
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* 手機版頁碼顯示 */}
      <span className="sm:hidden text-sm text-muted-foreground">
        {currentPage} / {totalPages}
      </span>

      {/* 下一頁 */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-2 text-sm rounded-md border hover:bg-muted transition-colors"
        >
          下一頁
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 text-sm rounded-md border text-muted-foreground cursor-not-allowed">
          下一頁
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
