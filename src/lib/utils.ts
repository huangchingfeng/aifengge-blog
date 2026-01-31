import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 計算閱讀時間
export function calculateReadingTime(content: string): number {
  // 移除 HTML 標籤和 Markdown 語法
  const plainText = content
    .replace(/<[^>]*>/g, "")
    .replace(/[#*`\[\]()]/g, "")
    .trim();

  // 計算中文字數 (閱讀速度約 450 字/分鐘)
  const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length;

  // 計算英文單字數 (閱讀速度約 225 字/分鐘)
  const englishWords = (plainText.match(/[a-zA-Z]+/g) || []).length;

  const chineseTime = chineseChars / 450;
  const englishTime = englishWords / 225;

  return Math.max(1, Math.ceil(chineseTime + englishTime));
}

// 格式化日期
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// 生成 slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
