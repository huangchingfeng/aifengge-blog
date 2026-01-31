import Link from "next/link";
import { Mail, Users, BookOpen } from "lucide-react";

export function SubstackCTA() {
  return (
    <div className="my-12 space-y-8">
      {/* 分隔線 */}
      <hr className="border-border" />

      {/* 訂閱電子報 */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Mail className="h-5 w-5" />
          訂閱電子報
        </h2>
        <p className="text-muted-foreground">
          想要第一時間收到最新的 AI 實戰技巧和產業趨勢分析嗎？
        </p>
        <p>
          👉{" "}
          <Link
            href="https://aifengge.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:no-underline"
          >
            訂閱阿峰老師的 Substack 電子報
          </Link>
        </p>
      </div>

      {/* 分隔線 */}
      <hr className="border-border" />

      {/* 加入學員社群 */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Users className="h-5 w-5" />
          加入學員社群
        </h2>
        <p className="text-muted-foreground">
          您已被邀請加入「阿峰老師AI學員社群」！
        </p>
        <p>
          👉{" "}
          <Link
            href="https://reurl.cc/GGlLNx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:no-underline"
          >
            點此加入 LINE 社群
          </Link>
        </p>
      </div>

      {/* 分隔線 */}
      <hr className="border-border" />

      {/* 查看課程資訊 */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          查看課程資訊
        </h2>
        <p className="text-muted-foreground">想要系統性學習 AI 應用嗎？</p>
        <p>
          👉{" "}
          <Link
            href="https://www.accupass.com/organizer/detail/720089297172350"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:no-underline"
          >
            查看阿峰老師的課程
          </Link>
        </p>
      </div>
    </div>
  );
}
