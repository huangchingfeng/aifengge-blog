import Link from "next/link";
import { Youtube, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 關於 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">AI峰哥部落格</h3>
            <p className="text-sm text-muted-foreground">
              台灣企業 AI 職場實戰專家阿峰老師的部落格，分享 AI
              工具實戰應用與產業趨勢分析。
            </p>
          </div>

          {/* 快速連結 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">快速連結</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  全部文章
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/category/ai-trends"
                  className="text-muted-foreground hover:text-foreground"
                >
                  AI 趨勢
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/category/tutorials"
                  className="text-muted-foreground hover:text-foreground"
                >
                  工具教學
                </Link>
              </li>
            </ul>
          </div>

          {/* 訂閱 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">訂閱電子報</h3>
            <p className="text-sm text-muted-foreground">
              第一時間收到最新的 AI 實戰技巧和產業趨勢分析
            </p>
            <Link
              href="https://aifengge.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"
            >
              立即訂閱
            </Link>
          </div>

          {/* 社群連結 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">追蹤阿峰老師</h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.youtube.com/channel/UCVVZz6m4T4k6-PZxFSlCkRQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Youtube className="h-6 w-6" />
              </Link>
              <Link
                href="https://reurl.cc/GGlLNx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                title="加入 LINE 社群"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:ai@autolab.cloud"
                className="text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI峰哥（黃敬峰）. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
