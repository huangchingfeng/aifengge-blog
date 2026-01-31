import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// 文章資料
const articlesData = [
  {
    title: "ChatGPT 企業應用實戰：10 個提升團隊效率的情境",
    slug: "chatgpt-enterprise-use-cases",
    excerpt: "從客服自動化到內容生成，探索 ChatGPT 如何協助企業團隊提升工作效率，並分享 10 個實際應用情境與最佳實踐。",
    content: `# ChatGPT 企業應用實戰：10 個提升團隊效率的情境

在數位轉型的浪潮中，生成式 AI 已成為企業提升競爭力的關鍵工具。本文將分享 10 個 ChatGPT 在企業中的實際應用情境，幫助您的團隊快速掌握 AI 工作流。

## 1. 客戶服務自動化

透過 ChatGPT 建立智能客服系統，可以 24/7 回答常見問題，大幅降低人力成本。關鍵在於建立完整的知識庫，並設計有效的 Prompt 模板。

**實戰技巧**：
- 建立 FAQ 資料庫作為參考資料
- 設計多輪對話流程處理複雜問題
- 設定人工介入的觸發條件

## 2. 內容創作與行銷文案

ChatGPT 可以協助撰寫部落格文章、社群媒體貼文、EDM 文案等，大幅提升內容產出效率。

**實戰技巧**：
- 提供品牌調性與目標受眾資訊
- 使用「角色扮演」技巧讓 AI 模擬專業文案師
- 結合人工審核確保內容品質

## 3. 會議紀錄與摘要

將會議錄音轉文字後，使用 ChatGPT 自動生成會議摘要、待辦事項與決議事項。

## 4. 程式碼撰寫與除錯

開發團隊可以使用 ChatGPT 協助撰寫程式碼、解釋複雜邏輯、找出 Bug 並提供修正建議。

## 5. 數據分析報告

將原始數據提供給 ChatGPT，讓它協助分析趨勢、生成圖表說明文字，並撰寫完整的分析報告。

## 6. 員工培訓教材

使用 ChatGPT 快速生成培訓教材、測驗題目與學習指南，大幅縮短課程開發時間。

## 7. 電子郵件撰寫

從商務提案到日常溝通，ChatGPT 可以協助撰寫專業且有效的電子郵件。

## 8. 翻譯與在地化

支援多國語言的企業可以使用 ChatGPT 進行文件翻譯與在地化調整。

## 9. 市場研究與競品分析

提供產業資訊後，ChatGPT 可以協助整理市場趨勢、競品分析與策略建議。

## 10. 創意發想與腦力激盪

團隊遇到瓶頸時，ChatGPT 可以扮演「虛擬顧問」，提供多元觀點與創意方向。

## 結語

ChatGPT 不是要取代人類，而是成為我們的「AI 助理」。關鍵在於學會如何有效溝通、設計工作流，並持續優化 Prompt。歡迎參加我們的企業內訓課程，讓團隊快速掌握 AI 應用技巧！`,
    categorySlug: "ai-applications",
    categoryName: "AI 應用",
    categoryDescription: "生成式 AI 在企業與職場的實際應用案例",
    tags: ["ChatGPT", "生產力", "企業應用"],
    publishedAt: "2024-11-15",
  },
  {
    title: "Prompt 工程實戰技巧：從新手到專家的 5 個階段",
    slug: "prompt-engineering-guide",
    excerpt: "掌握 Prompt 工程是使用 AI 的關鍵技能。本文將帶您從基礎到進階，逐步提升 Prompt 撰寫能力，讓 AI 輸出更精準、更符合需求。",
    content: `# Prompt 工程實戰技巧：從新手到專家的 5 個階段

Prompt 工程（Prompt Engineering）是與 AI 溝通的藝術與科學。一個好的 Prompt 可以讓 AI 輸出精準、有價值的內容；反之，模糊的指令只會得到模糊的結果。本文將分享從新手到專家的 5 個進階階段。

## 階段 1：基礎指令（新手）

**特徵**：直接提出需求，沒有額外背景資訊。

**範例**：
\`\`\`
寫一篇關於 AI 的文章
\`\`\`

**問題**：
- 缺乏明確目標
- 沒有指定風格、長度、受眾
- 輸出結果過於籠統

## 階段 2：結構化指令（初階）

**特徵**：加入明確的格式、長度與目標受眾。

**範例**：
\`\`\`
請撰寫一篇 800 字的部落格文章，主題是「AI 如何提升企業效率」，目標讀者是中小企業主，語氣要專業但易懂。
\`\`\`

**改善**：
- 明確字數限制
- 指定目標受眾
- 定義語氣風格

## 階段 3：角色扮演（中階）

**特徵**：讓 AI 扮演特定角色，提供專業觀點。

**範例**：
\`\`\`
你是一位擁有 10 年經驗的企業數位轉型顧問。請為一家傳統製造業撰寫「導入 AI 的 3 個月行動計畫」，包含具體步驟、預算建議與風險評估。
\`\`\`

**優勢**：
- AI 會模擬專業角色的思維
- 輸出更具深度與實用性

## 階段 4：多步驟推理（進階）

**特徵**：引導 AI 進行分析、比較、推理，而非直接給答案。

**範例**：
\`\`\`
請先分析「ChatGPT」與「Claude」的核心差異，再根據以下情境推薦最適合的工具：
1. 企業內部知識庫建置
2. 客戶服務自動化
3. 程式碼撰寫與除錯

最後提供選擇理由與實施建議。
\`\`\`

**優勢**：
- 強迫 AI 進行邏輯推理
- 輸出更具說服力

## 階段 5：迭代優化（專家）

**特徵**：透過多輪對話持續優化輸出，並建立可複用的 Prompt 模板。

**範例**：
\`\`\`
第一輪：請列出 10 個「AI 企業內訓課程」的潛在主題
第二輪：從中選出最適合「金融業」的 3 個主題，並說明理由
第三輪：針對「AI 風險管理與法遵」主題，設計 6 小時的課程大綱
第四輪：將課程大綱轉換為學員手冊格式，包含案例與練習題
\`\`\`

**優勢**：
- 逐步聚焦需求
- 建立可重複使用的工作流

## 實戰建議

1. **從簡單開始**：不要一開始就寫複雜的 Prompt，先掌握基礎結構
2. **持續迭代**：第一次輸出不滿意很正常，透過追問優化結果
3. **建立模板庫**：將有效的 Prompt 儲存起來，未來可以快速調用
4. **觀察 AI 行為**：了解不同指令如何影響輸出，累積經驗

## 結語

Prompt 工程不是一次性的技能，而是需要持續練習與優化的過程。歡迎參加我們的「Prompt 工程實戰班」，透過大量案例演練，快速提升您的 AI 應用能力！`,
    categorySlug: "prompt-engineering",
    categoryName: "Prompt 工程",
    categoryDescription: "如何撰寫有效的 AI 提示詞",
    tags: ["ChatGPT", "Prompt"],
    publishedAt: "2024-11-20",
  },
  {
    title: "企業導入 AI 的 5 大常見錯誤與解決方案",
    slug: "common-ai-implementation-mistakes",
    excerpt: "許多企業在導入 AI 時遇到挫折，問題往往不在技術，而在策略與執行。本文分享 5 個常見錯誤與實際解決方案，幫助您避開陷阱。",
    content: `# 企業導入 AI 的 5 大常見錯誤與解決方案

根據我輔導超過 400 家企業的經驗，發現許多公司在導入 AI 時都會踩到類似的坑。本文將分享 5 個最常見的錯誤，以及如何避免這些問題。

## 錯誤 1：沒有明確的應用場景

**常見情況**：
- 聽說 AI 很厲害，就想「全面導入」
- 沒有盤點實際需求，只是跟風
- 期待 AI 自動解決所有問題

**解決方案**：
1. 從「痛點」出發，而非從「技術」出發
2. 選擇 1-2 個高影響、低風險的場景試點
3. 設定明確的成功指標（如：節省 30% 客服時間）

**實際案例**：
某金融業客戶原本想「全面 AI 化」，後來我們建議先從「貸款申請文件審核」開始，3 個月內就看到明顯效益，再逐步擴展到其他部門。

## 錯誤 2：忽略員工培訓與變革管理

**常見情況**：
- 只有 IT 部門知道怎麼用 AI
- 員工抗拒改變，覺得 AI 會取代工作
- 缺乏持續學習機制

**解決方案**：
1. 全員培訓，而非只培訓技術人員
2. 強調「AI 是助手，不是替代品」
3. 建立內部 AI 推廣大使（Champion）制度

## 錯誤 3：過度依賴外部顧問，缺乏內部能力

**常見情況**：
- 完全外包給顧問公司
- 顧問離開後，系統無人維護
- 無法因應業務變化調整 AI 應用

**解決方案**：
1. 培養內部 AI 種子團隊
2. 要求顧問「教會」而非「代勞」
3. 建立知識文件與 SOP

## 錯誤 4：資料品質不佳

**常見情況**：
- 資料分散在不同系統
- 資料格式不一致
- 缺乏資料清理與標準化

**解決方案**：
1. 先做資料盤點與清理
2. 建立資料治理機制
3. 從「小數據」開始，逐步擴展

## 錯誤 5：缺乏長期規劃與持續優化

**常見情況**：
- 導入後就放著不管
- 沒有追蹤成效與 ROI
- 未根據回饋調整策略

**解決方案**：
1. 設定季度檢視機制
2. 建立 AI 應用成效儀表板
3. 持續收集使用者回饋並優化

## 成功導入 AI 的 3 個關鍵

1. **從小處著手**：選擇高價值、低風險的場景試點
2. **重視人才培育**：AI 工具會進步，但人才能力才是核心
3. **持續迭代優化**：AI 導入不是一次性專案，而是持續旅程

## 結語

企業導入 AI 不是技術問題，而是「策略 + 執行 + 文化」的綜合挑戰。避開這 5 個常見錯誤，您的 AI 轉型之路將更加順利。`,
    categorySlug: "ai-applications",
    categoryName: "AI 應用",
    categoryDescription: "生成式 AI 在企業與職場的實際應用案例",
    tags: ["企業應用", "生產力"],
    publishedAt: "2024-11-25",
  },
  {
    title: "【阿峰老師觀點】Google NotebookLM 再進化！8 招將繁瑣資料秒變「視覺化簡報」",
    slug: "google-notebooklm-8-tips-visual-slides",
    excerpt: "Google 正式將 Nano Banana Pro 影像模型引入 NotebookLM，從「閱讀助理」進化成「視覺說書人」。阿峰老師剖析 8 種實用功能，結合台灣企業場景，教你如何提升工作效率。",
    content: `大家好，我是阿峰老師。

在企業諮詢的過程中，我常聽到許多中高階主管或專案負責人抱怨：「資料蒐集容易，但要整理成老闆看得懂、客戶會買單的 PPT，往往要耗費整個週末。」確實，資訊焦慮與製作簡報的繁瑣，一直是職場上的兩大痛點。

最近，Google 正式將最新的 **Nano Banana Pro 影像模型** 引入 NotebookLM。這是一個非常關鍵的里程碑，代表 NotebookLM 已經從一個只能幫你讀 PDF、整理重點的「閱讀助理」，進化成一位能夠進行「視覺化敘事」的專業說書人。

## 1. 海量報告看不完？一鍵將「深度研究」轉化為決策關鍵圖表

對於負責市場分析的企劃人員來說，最痛苦的莫過於面對幾十份產業報告。NotebookLM 的「將深度研究轉換為投影片」功能，正是為此而生。

## 2. 把手寫筆記變成提案初稿

直接拍下你的手寫筆記，NotebookLM 能夠理解這些非結構化的資訊，幫你整理成邏輯通順的初步提案。

## 3. 讓 AI 成為你的靈感謬思

行銷人員最怕的就是靈感枯竭，試試「腦力激盪新點子」的功能，匯入公司過去的產品型錄，讓 AI 發想創意方案。

## 4. 自動套用企業 CIS 識別

NotebookLM 的「使用品牌風格精緻化」功能，可以學習你公司的配色邏輯與排版風格，產出符合企業標準的簡報。

## 5. 用視覺隱喻讓數字說故事

借助 Gemini 模型，它可以將抽象數據轉化為具體的視覺比喻，讓老闆或客戶留下深刻印象。

## 6. 將厚重文件轉化為品牌敘事

透過「將冗長內容轉換成精美故事書」的功能，公關部門可以輕鬆將 ESG 報告轉化為具備敘事結構的簡報。

## 7. 照片變成 SOP 手冊

門市督導只需拍下標準貨架的照片，上傳後請 AI 製作成給工讀生的教學投影片。

## 8. 用文字描述預覽情境

只需用文字描述你想要的視覺風格，NotebookLM 就能根據描述生成相應風格的投影片。

## 阿峰老師總結

NotebookLM 的強大不在於它能「自動完成」所有工作，而在於它能大幅縮短我們從「資訊」到「洞察」，再從「洞察」到「視覺化呈現」的過程。`,
    categorySlug: "ai-tools",
    categoryName: "AI 工具應用",
    categoryDescription: "AI 工具的實戰應用與教學",
    tags: ["NotebookLM", "Google AI", "簡報製作", "職場效率", "AI工具"],
    publishedAt: "2024-12-20",
  },
  {
    title: "Google Sheets 裡的 Gemini 也太神！不用公式，幾句話搞定時間計算",
    slug: "gemini-google-sheets-time-calculation",
    excerpt: "不用複雜公式，只要用自然語言告訴 Gemini 你想做什麼，它就能直接在 Google Sheets 裡幫你完成時間計算、數據分析等繁瑣工作。",
    content: `今天要來跟大家分享一個剛剛發生的「驚呆時刻」。雖然我已經用 AI 用得很習慣了，但剛剛在 Google Sheets 裡面的這波操作，還是讓我忍不住發出了「哇」的一聲。

## 遇到時間計算，你的直覺是什麼？

以前我們大概腦袋裡馬上會浮現：「好，我要用 TIME() 函數，還是要用減法？格式是不是要設定成 hh:mm？」

## Gemini 的「說人話」解法

結果我只是輸入了幾個字的自然語言指令，它就直接幫我算好了！

## 阿峰老師的指令分享

> 「幫我計算 [開始時間] 到 [結束時間] 的時間差，並填入 [目標欄位]」

就是這麼直白！

## 總結：三個關鍵心法

### 1. 打破慣性
下次遇到需要寫公式的場合，先試試看叫 Gemini 幫你做。

### 2. 自然語言
用你最習慣的語言下指令，不要想太多。

### 3. 多方嘗試
無論是算數據還是做圖，AI 的邊界一直在擴大，多試多玩就對了！`,
    categorySlug: "ai-tools",
    categoryName: "AI 工具應用",
    categoryDescription: "AI 工具的實戰應用與教學",
    tags: ["Gemini", "Google Sheets", "AI 工具", "效率提升"],
    publishedAt: "2024-12-22",
  },
  {
    title: "AI 社群文案機器人實戰：4 大工具讓內容產出效率提升 10 倍",
    slug: "ai-social-media-content-automation",
    excerpt: "掌握 R.C.E. 架構、Gemini Gem、NotebookLM 和 Social Flow AI 四大工具，從 0 到 1 打造你的 AI 社群文案自動化工作流。",
    content: `在這個 AI 爆發的時代，社群經營者面臨一個共同的挑戰：如何快速產出高品質的社群內容？

## 一、R.C.E. 架構：打造精準提示詞的黃金法則

**R (Role) 角色設定**
定義 AI 的專業身份，讓它以特定角度思考。

**C (Context) 情境描述**
描述目標受眾、產品特色、季節或發文目的。

**E (Expectation) 期望設定**
指定產出的格式、語氣、風格。

## 二、Gemini Gem：打造你的專屬 AI 團隊

它能將你調整好的 R.C.E. 指令固定下來，變成一個專屬的 AI App，隨開隨用。

## 三、高品質內容精煉工具

**NotebookLM / Perplexity / Deep Research**

這些工具能幫你尋找素材、跨越語言限制、進行深度研究。

## 四、Social Flow AI：一鍵產出圖文神器

將「找素材」、「寫文案」、「生配圖」串聯在同一個介面。

## 總結：從 0 到 1 的社群文案 AI 工作流

1. **定義策略**：使用 R.C.E. 架構設計精準提示詞
2. **建立團隊**：在 Gemini 建立多個專屬 Gem
3. **收集素材**：用各種工具找到高品質內容
4. **一鍵產出**：透過 Social Flow AI 快速生成圖文並茂的社群貼文

記住，AI 是你的助手，但你才是總編輯！`,
    categorySlug: "ai-tools",
    categoryName: "AI 工具應用",
    categoryDescription: "AI 工具的實戰應用與教學",
    tags: ["AI 工具", "社群經營", "Gemini", "NotebookLM", "提示詞工程"],
    publishedAt: "2024-12-23",
  },
];

async function migrateArticles() {
  console.log("🚀 開始遷移文章...\n");

  try {
    // 1. 建立管理員用戶
    console.log("📦 建立管理員用戶...");
    const existingUsers = await sql`SELECT id FROM users WHERE email = 'admin@aifengge.com'`;

    let adminUserId: number;
    if (existingUsers.length === 0) {
      const [newUser] = await sql`
        INSERT INTO users ("openId", name, email, role, "createdAt", "updatedAt", "lastSignedIn", "isActive")
        VALUES (
          ${"admin_aifengge_" + Date.now()},
          '阿峰老師',
          'admin@aifengge.com',
          'admin',
          NOW(),
          NOW(),
          NOW(),
          true
        )
        RETURNING id
      `;
      adminUserId = newUser.id;
      console.log("  ✅ 建立管理員用戶: 阿峰老師");
    } else {
      adminUserId = existingUsers[0].id;
      console.log("  ✅ 使用現有管理員用戶");
    }

    // 2. 建立分類
    console.log("\n📂 建立分類...");
    const categoryMap = new Map<string, number>();
    const uniqueCategories = new Map<string, { name: string; description: string }>();

    for (const article of articlesData) {
      if (!uniqueCategories.has(article.categorySlug)) {
        uniqueCategories.set(article.categorySlug, {
          name: article.categoryName,
          description: article.categoryDescription,
        });
      }
    }

    for (const [slug, data] of uniqueCategories) {
      const existing = await sql`SELECT id FROM categories WHERE slug = ${slug}`;

      if (existing.length === 0) {
        const [newCategory] = await sql`
          INSERT INTO categories (name, slug, description, "createdAt", "updatedAt")
          VALUES (${data.name}, ${slug}, ${data.description}, NOW(), NOW())
          RETURNING id
        `;
        categoryMap.set(slug, newCategory.id);
        console.log(`  ✅ 建立分類: ${data.name}`);
      } else {
        categoryMap.set(slug, existing[0].id);
        console.log(`  ⏭️  使用現有分類: ${data.name}`);
      }
    }

    // 3. 建立標籤
    console.log("\n🏷️  建立標籤...");
    const tagMap = new Map<string, number>();
    const allTags = new Set<string>();

    for (const article of articlesData) {
      article.tags.forEach((tag) => allTags.add(tag));
    }

    for (const tagName of allTags) {
      const slug = tagName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\u4e00-\u9fa5-]/g, "");
      const existing = await sql`SELECT id FROM tags WHERE name = ${tagName}`;

      if (existing.length === 0) {
        const [newTag] = await sql`
          INSERT INTO tags (name, slug, "createdAt")
          VALUES (${tagName}, ${slug}, NOW())
          RETURNING id
        `;
        tagMap.set(tagName, newTag.id);
        console.log(`  ✅ 建立標籤: ${tagName}`);
      } else {
        tagMap.set(tagName, existing[0].id);
        console.log(`  ⏭️  使用現有標籤: ${tagName}`);
      }
    }

    // 4. 建立文章
    console.log("\n📝 建立文章...");
    for (const article of articlesData) {
      const existing = await sql`SELECT id FROM posts WHERE slug = ${article.slug}`;

      if (existing.length > 0) {
        console.log(`  ⏭️  文章已存在: ${article.title}`);
        continue;
      }

      const categoryId = categoryMap.get(article.categorySlug);
      const viewCount = Math.floor(Math.random() * 500) + 100;

      const [newPost] = await sql`
        INSERT INTO posts (
          title, slug, excerpt, content, "categoryId", "authorId",
          status, "publishedAt", "createdAt", "updatedAt", "viewCount"
        )
        VALUES (
          ${article.title},
          ${article.slug},
          ${article.excerpt},
          ${article.content},
          ${categoryId},
          ${adminUserId},
          'published',
          ${article.publishedAt}::timestamp,
          NOW(),
          NOW(),
          ${viewCount}
        )
        RETURNING id
      `;

      // 建立文章標籤關聯
      for (const tagName of article.tags) {
        const tagId = tagMap.get(tagName);
        if (tagId) {
          await sql`
            INSERT INTO "postTags" ("postId", "tagId", "createdAt")
            VALUES (${newPost.id}, ${tagId}, NOW())
          `;
        }
      }

      console.log(`  ✅ 建立文章: ${article.title}`);
    }

    console.log("\n🎉 遷移完成！");
    console.log(`   - 建立 ${uniqueCategories.size} 個分類`);
    console.log(`   - 建立 ${allTags.size} 個標籤`);
    console.log(`   - 建立 ${articlesData.length} 篇文章`);
  } catch (error) {
    console.error("❌ 遷移失敗:", error);
    throw error;
  }
}

// 執行遷移
migrateArticles();
