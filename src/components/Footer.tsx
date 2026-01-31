import Link from "next/link";
import { Youtube, Mail } from "lucide-react";

// LINE Icon Component
function LineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

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
                title="YouTube 頻道"
              >
                <Youtube className="h-6 w-6" />
              </Link>
              <Link
                href="https://reurl.cc/GGlLNx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#00B900] transition-colors"
                title="加入 LINE 社群"
              >
                <LineIcon className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:ai@autolab.cloud"
                className="text-muted-foreground hover:text-foreground"
                title="發送 Email"
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
