import Image from "next/image";
import Link from "next/link";
import { Youtube, Linkedin, Mail } from "lucide-react";

export function AuthorBio() {
  return (
    <div className="my-12 p-6 border rounded-lg bg-card">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 作者照片 - 必須使用真實照片 */}
        <div className="flex-shrink-0">
          <Image
            src="/images/teacher-photo.jpg"
            alt="阿峰老師 - 黃敬峰"
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>

        {/* 作者介紹 */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-xl font-bold">阿峰老師（黃敬峰）</h3>
            <p className="text-muted-foreground">台灣企業 AI 職場實戰專家</p>
          </div>

          <p className="text-sm leading-relaxed">
            累積超過 400+ 企業合作、300+ 場次課程、10,000+ 學員人次見證。
            專注於 AI 工具實戰應用，幫助企業員工提升工作效率，建構 AI 文化。
            核心心法：「會用、懂用、好用、每天用」
          </p>

          <div className="flex gap-2">
            <Link
              href="https://reurl.cc/GGlLNx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 border rounded-md text-sm hover:bg-muted"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LINE 社群
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCVVZz6m4T4k6-PZxFSlCkRQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 border rounded-md text-sm hover:bg-muted"
            >
              <Youtube className="h-4 w-4 mr-2" />
              YouTube
            </Link>
            <Link
              href="mailto:ai@autolab.cloud"
              className="inline-flex items-center px-3 py-1.5 border rounded-md text-sm hover:bg-muted"
            >
              <Mail className="h-4 w-4 mr-2" />
              聯絡
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
