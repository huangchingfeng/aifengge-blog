import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

// 圖片 URL 對照表：舊 URL → 本地檔案名
const imageMapping: Record<string, string> = {
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/anthropic-ai-10-years-banner-1769425552627.png": "001_anthropic-ai-10-years-banner-1769425552627.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog-covers/sam-altman-town-hall-hkuhhrsumsq.png": "002_sam-altman-town-hall-hkuhhrsumsq.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/XqPSOkiRmvjmUMtq.png": "003_XqPSOkiRmvjmUMtq.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/bill-gates-banner-2026.png": "004_bill-gates-banner-2026.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/FCZmuyFxQpENNhEZ.png": "005_FCZmuyFxQpENNhEZ.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/gemini-prompts-banner.png": "006_gemini-prompts-banner.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/MGjGtibfCEkuJTEf.png": "007_MGjGtibfCEkuJTEf.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/MgpDswnJVSYpURmT.png": "008_MgpDswnJVSYpURmT.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/OzYmFBUUIncrVzYt.png": "009_OzYmFBUUIncrVzYt.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/JysvkkKAErgnrUUZ.png": "010_JysvkkKAErgnrUUZ.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/MsXcRkpOpWTQEelZ.png": "011_MsXcRkpOpWTQEelZ.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/KXGXBlhLVhZxmUJX.png": "012_KXGXBlhLVhZxmUJX.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/YgzErCKipRPEjkZX.png": "013_YgzErCKipRPEjkZX.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/yLSSVlWoOkfVRjkN.png": "014_yLSSVlWoOkfVRjkN.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/ltdjJozAqquTYPBw.png": "015_ltdjJozAqquTYPBw.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/hMyYGMOJvKHyruMm.png": "016_hMyYGMOJvKHyruMm.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/imhonIOJdahhHhcm.png": "017_imhonIOJdahhHhcm.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/XSQaHiNDWwCNXKYk.png": "018_XSQaHiNDWwCNXKYk.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/SLSUdiJrtNToUyTA.png": "019_SLSUdiJrtNToUyTA.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/TZzkecvPeqABFJpy.png": "020_TZzkecvPeqABFJpy.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/pAjoXndZbMWAjnzI.png": "021_pAjoXndZbMWAjnzI.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/pdSZSoNaUxPIIPDF.png": "022_pdSZSoNaUxPIIPDF.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/gzRkcRZaBcoXVZQT.png": "023_gzRkcRZaBcoXVZQT.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/xAFsjFukIpsSAWrf.png": "024_xAFsjFukIpsSAWrf.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/manus-ai-agent-cover-1766388216067.png": "025_manus-ai-agent-cover-1766388216067.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/manus-article/ai-evolution.png": "026_ai-evolution.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/manus-article/ai-to-ai.png": "027_ai-to-ai.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/manus-article/custom-slides.png": "028_custom-slides.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/manus-article/no-code-app.png": "029_no-code-app.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/manus-article/wire-research.png": "030_wire-research.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/manus-article/ai-mindset.png": "031_ai-mindset.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/ai-crm/banner.png": "032_banner.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/ai-crm/excel-crash.png": "033_excel-crash.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/ai-crm/ai-agent.png": "034_ai-agent.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/ai-crm/efficiency.png": "035_efficiency.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/notebooklm-8-tips-banner-1766211871157.png": "036_notebooklm-8-tips-banner-1766211871157.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/notebooklm-deep-research-1766212133845.png": "037_notebooklm-deep-research-1766212133845.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/notebooklm-handwritten-notes-1766212133845.png": "038_notebooklm-handwritten-notes-1766212133845.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/notebooklm-brainstorm-ideas-1766212133845.png": "039_notebooklm-brainstorm-ideas-1766212133845.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/notebooklm-brand-style-1766212133845.png": "040_notebooklm-brand-style-1766212133845.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/notebooklm-visual-metaphor-1766212133845.png": "041_notebooklm-visual-metaphor-1766212133845.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/notebooklm-story-book-1766212133845.png": "042_notebooklm-story-book-1766212133845.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/notebooklm-photo-to-sop-1766212133845.png": "043_notebooklm-photo-to-sop-1766212133845.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/notebooklm-style-preview-1766212133845.png": "044_notebooklm-style-preview-1766212133845.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/xincheng-master-gpt-user.png": "046_xincheng-master-gpt-user.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/xincheng-training-user.png": "047_xincheng-training-user.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/xincheng-ai-ecosystem-user.png": "048_xincheng-ai-ecosystem-user.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/xincheng-3keys-user.png": "049_xincheng-3keys-user.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/gemini-3-guide-banner-1766013069700.png": "050_gemini-3-guide-banner-1766013069700.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/gemini-crossroad-1766013422555.png": "051_gemini-crossroad-1766013422555.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/gemini-two-systems-1766013422555.png": "052_gemini-two-systems-1766013422555.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/gemini-team-table-1766013422555.png": "053_gemini-team-table-1766013422555.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/gemini-three-stages-1766013422555.png": "054_gemini-three-stages-1766013422555.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/gemini-3-enterprise/gemini-cover.png": "055_gemini-cover.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/gemini-3-enterprise/virtual-dev-dept.png": "056_virtual-dev-dept.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/gemini-3-enterprise/ai-studio-3d-game.png": "057_ai-studio-3d-game.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/gemini-3-enterprise/ai-coach.png": "058_ai-coach.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/gemini-3-enterprise/data-driven-decision.png": "059_data-driven-decision.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/gemini-3-enterprise/google-search-enterprise-loan.png": "060_google-search-enterprise-loan.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/gemini-3-enterprise/learn-ai-now.png": "061_learn-ai-now.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/jian-ai-survival-guide/jian-ai-strategy-infographic.png": "062_jian-ai-strategy-infographic.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/jian-ai-survival-guide/jian-ai-paradigm-shift.png": "063_jian-ai-paradigm-shift.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/jian-ai-survival-guide/jian-myth1-hardware.png": "064_jian-myth1-hardware.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/jian-ai-survival-guide/jian-myth2-talent-funnel.png": "065_jian-myth2-talent-funnel.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/jian-ai-survival-guide/jian-solution-world-fleet.png": "066_jian-solution-world-fleet.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/jian-ai-survival-guide/jian-myth3-vertical-integration.png": "067_jian-myth3-vertical-integration.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/jian-ai-survival-guide/jian-myth4-boss-key.png": "068_jian-myth4-boss-key.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/jian-ai-survival-guide/jian-tunnel-superhuman.png": "069_jian-tunnel-superhuman.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/jian-ai-survival-guide/jian-taiwan-new-role.png": "070_jian-taiwan-new-role.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana-10-tips/nano-banana-10-tips-1.jpg": "071_nano-banana-10-tips-1.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana-10-tips/nano-banana-10-tips-2.jpg": "072_nano-banana-10-tips-2.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana-10-tips/nano-banana-10-tips-3.jpg": "073_nano-banana-10-tips-3.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana-10-tips/nano-banana-data-viz.jpg": "074_nano-banana-data-viz.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana-10-tips/nano-banana-10-tips-5.jpg": "075_nano-banana-10-tips-5.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana-10-tips/nano-banana-2d-to-3d.webp": "076_nano-banana-2d-to-3d.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana-10-tips/nano-banana-10-tips-7.webp": "077_nano-banana-10-tips-7.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana-10-tips/nano-banana-10-tips-8.jpg": "078_nano-banana-10-tips-8.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana-10-tips/nano-banana-10-tips-9.jpg": "079_nano-banana-10-tips-9.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana-10-tips/nano-banana-10-tips-10.jpg": "080_nano-banana-10-tips-10.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana/nano-banana-tip-1.png": "082_nano-banana-tip-1.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana/nano-banana-tip-2.png": "083_nano-banana-tip-2.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana/nano-banana-tip-3.jpg": "084_nano-banana-tip-3.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana/nano-banana-tip-4.jpg": "085_nano-banana-tip-4.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana/nano-banana-tip-5.jpg": "086_nano-banana-tip-5.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana/nano-banana-tip-6.png": "087_nano-banana-tip-6.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/95179607/D8QXMb7ThVwxNTQZRzfrBM/blog/nano-banana/nano-banana-tip-7.jpg": "088_nano-banana-tip-7.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/YEbKBYmwXGEpzKuM.png": "090_YEbKBYmwXGEpzKuM.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/lHiXmSHFSDfAcLym.png": "091_lHiXmSHFSDfAcLym.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/qCtEKZwnMAXlujib.png": "092_qCtEKZwnMAXlujib.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/95179607/FWVEcjSxDonushQI.png": "093_FWVEcjSxDonushQI.png",
};

// 將外部 URL 轉換為本地路徑
function toLocalPath(filename: string): string {
  return `/blog-images/${filename}`;
}

// 替換文字中所有的外部 URL
function replaceUrls(text: string): string {
  let result = text;
  for (const [oldUrl, filename] of Object.entries(imageMapping)) {
    const localPath = toLocalPath(filename);
    result = result.split(oldUrl).join(localPath);
  }
  return result;
}

async function migrateImages() {
  console.log("========== 開始圖片遷移 ==========\n");

  // 1. 取得所有文章
  const posts = await sql`
    SELECT id, slug, title, "coverImage", content
    FROM posts
    WHERE status = 'published'
  `;

  console.log(`找到 ${posts.length} 篇已發布文章\n`);

  let coverUpdated = 0;
  let contentUpdated = 0;

  for (const post of posts) {
    const updates: { coverImage?: string; content?: string } = {};

    // 檢查封面圖
    if (post.coverImage) {
      const localFilename = imageMapping[post.coverImage];
      if (localFilename) {
        updates.coverImage = toLocalPath(localFilename);
        coverUpdated++;
        console.log(`✓ 封面圖: ${post.slug}`);
        console.log(`  ${post.coverImage}`);
        console.log(`  → ${updates.coverImage}`);
      }
    }

    // 檢查內文
    if (post.content) {
      const newContent = replaceUrls(post.content);
      if (newContent !== post.content) {
        updates.content = newContent;
        contentUpdated++;
        console.log(`✓ 內文圖: ${post.slug}`);
      }
    }

    // 更新資料庫
    if (Object.keys(updates).length > 0) {
      if (updates.coverImage && updates.content) {
        await sql`
          UPDATE posts
          SET "coverImage" = ${updates.coverImage}, content = ${updates.content}
          WHERE id = ${post.id}
        `;
      } else if (updates.coverImage) {
        await sql`
          UPDATE posts
          SET "coverImage" = ${updates.coverImage}
          WHERE id = ${post.id}
        `;
      } else if (updates.content) {
        await sql`
          UPDATE posts
          SET content = ${updates.content}
          WHERE id = ${post.id}
        `;
      }
    }
  }

  console.log("\n========== 遷移完成 ==========");
  console.log(`封面圖更新: ${coverUpdated} 篇`);
  console.log(`內文圖更新: ${contentUpdated} 篇`);

  // 最終檢查
  const remaining = await sql`
    SELECT slug, "coverImage"
    FROM posts
    WHERE status = 'published'
      AND "coverImage" LIKE 'https://d2xsxph8kpxj0f.cloudfront.net%'
  `;

  if (remaining.length > 0) {
    console.log(`\n⚠ 還有 ${remaining.length} 篇文章使用 cloudfront URL:`);
    remaining.forEach((p: any) => console.log(`  - ${p.slug}`));
  } else {
    console.log("\n✅ 所有 cloudfront URL 已成功替換");
  }
}

migrateImages().catch(console.error);
