import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../drizzle/schema";
import { eq } from "drizzle-orm";

// 使用環境變數中的資料庫連線字串
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

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
    publishedAt: new Date("2024-11-15"),
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
    publishedAt: new Date("2024-11-20"),
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

**實際案例**：
某製造業在導入 AI 前，先辦了 5 場「AI 體驗工作坊」，讓員工親自操作 ChatGPT 完成日常任務，大幅降低抗拒心理。

## 錯誤 3：過度依賴外部顧問，缺乏內部能力

**常見情況**：
- 完全外包給顧問公司
- 顧問離開後，系統無人維護
- 無法因應業務變化調整 AI 應用

**解決方案**：
1. 培養內部 AI 種子團隊
2. 要求顧問「教會」而非「代勞」
3. 建立知識文件與 SOP

## 錯誤 4：資料品質不佳，卻期待 AI 產出高品質結果

**常見情況**：
- 資料分散在不同系統
- 資料格式不一致
- 缺乏資料清理與標準化

**解決方案**：
1. 先做資料盤點與清理
2. 建立資料治理機制
3. 從「小數據」開始，逐步擴展

**實際案例**：
某零售業原本想用 AI 預測銷售，但發現歷史資料缺漏嚴重。我們建議先從「庫存優化」開始，因為這部分資料較完整，成功後再擴展到銷售預測。

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

企業導入 AI 不是技術問題，而是「策略 + 執行 + 文化」的綜合挑戰。避開這 5 個常見錯誤，您的 AI 轉型之路將更加順利。

想了解更多企業 AI 導入策略？歡迎預約免費顧問諮詢，讓我為您量身打造最適合的 AI 解決方案！`,
    categorySlug: "ai-applications",
    categoryName: "AI 應用",
    categoryDescription: "生成式 AI 在企業與職場的實際應用案例",
    tags: ["企業應用", "生產力"],
    publishedAt: new Date("2024-11-25"),
  },
  {
    title: "【阿峰老師觀點】Google NotebookLM 再進化！8 招將繁瑣資料秒變「視覺化簡報」，職場生產力翻倍術",
    slug: "google-notebooklm-8-tips-visual-slides",
    excerpt: "Google 正式將 Nano Banana Pro 影像模型引入 NotebookLM，從「閱讀助理」進化成「視覺說書人」。阿峰老師剖析 8 種實用功能，結合台灣企業場景，教你如何提升工作效率。",
    content: `大家好，我是阿峰老師。

在企業諮詢的過程中，我常聽到許多中高階主管或專案負責人抱怨：「資料蒐集容易，但要整理成老闆看得懂、客戶會買單的 PPT，往往要耗費整個週末。」確實，資訊焦慮與製作簡報的繁瑣，一直是職場上的兩大痛點。

最近，Google 正式將最新的 **Nano Banana Pro 影像模型** 引入 NotebookLM。這是一個非常關鍵的里程碑，代表 NotebookLM 已經從一個只能幫你讀 PDF、整理重點的「閱讀助理」，進化成一位能夠進行「視覺化敘事」的專業說書人。今天阿峰老師就要來剖析官方推薦的 8 種用法，並結合台灣企業的實際運作場景，告訴大家如何利用這些功能來提升工作效率。

## 1. 海量報告看不完？一鍵將「深度研究」轉化為決策關鍵圖表

對於負責市場分析的企劃人員來說，最痛苦的莫過於面對幾十份產業報告。老闆一句「下週給我 2025 台灣手搖飲市場競品分析」，你可能就得埋頭苦讀上萬字的資料。

NotebookLM 的「將深度研究轉換為投影片」功能，正是為此而生。你只需要將所有蒐集到的 PDF 報告匯入，它就能梳理出你可能忽略的邏輯連結。舉例來說，針對新產品開發提案，你可以匯入多份「台灣消費者對 ESG 綠色商品的接受度」調查，讓 AI 自動生成一套條理分明的簡報。這不僅節省時間，更能挖掘出資料背後的洞察，讓你在週會上的發言更具說服力。

## 2. 甚至不用打字！把手寫筆記與零散想法，瞬間變成客戶買單的提案初稿

身為 B2B 業務或專案經理（PM），大家一定有過這樣的經驗：剛拜訪完竹科的客戶，筆記本上密密麻麻寫滿了需求、預算限制和系統整合的塗鴉，回程的高鐵上累得半死，心想回去還要整理成正式 PPT 就頭痛。

現在，你可以利用「從草稿筆記生成投影片」的功能。直接拍下你的手寫筆記，或是貼上手機記事本裡零散的紀錄，甚至是 Google Slides 的草稿。NotebookLM 能夠理解這些非結構化的資訊，幫你整理成邏輯通順的初步提案。這意味著，你在回公司的路上，第一版的解決方案簡報就已經完成了。

## 3. 行銷創意枯竭？讓 AI 成為你的靈感謬思，節慶活動提案信手捻來

行銷人員最怕的就是靈感枯竭，特別是每逢雙 11、中元節、過年這些大檔期，要想出新梗真的不容易。

這時候，不妨試試「腦力激盪新點子」的功能。你可以匯入公司過去的產品型錄或過往的結案報告，並要求 AI 進行發想。例如，針對接下來的「中元節」，請它結合公司的零食產品，發想一個具備創意 Slogan（如：拜得澎湃，好運自來）與視覺風格的行銷提案。它能提供你一個全新的切入點，打破思維的僵局。

## 4. 告別「美工苦手」標籤！自動套用企業 CIS 識別，讓簡報質感專業升級

在許多台灣企業，對於品牌識別（CIS）有嚴格的規範。業務助理或行銷新人常常因為簡報配色不對、Logo 位置錯誤而被主管退件。

NotebookLM 的「使用品牌風格精緻化」功能，可以解決這個問題。你只需上傳公司的品牌手冊（Brandbook）或過往的高質感簡報作為參考來源，AI 就會學習其中的配色邏輯與排版風格。無論是年度經銷商大會，還是對外的業務推廣，都能確保產出的簡報符合企業標準，展現一致的專業度。

## 5. 數據太硬老闆不想看？用視覺隱喻讓冰冷數字「說」出精彩故事

當你在做季報或向非專業背景的客戶解說產品規格（如伺服器算力、保險條款）時，單純的表格與數字往往令人昏昏欲睡。

這時，「利用插圖更快理解各種主題」的功能就派上用場了。借助 Gemini 模型對世界知識的理解，它可以將抽象數據轉化為具體的視覺比喻。阿峰老師建議，你可以試著讓它將本季成長的業績數字，轉化為「疊起來相當於 2 座台北 101 的高度」這樣的圖像化概念，這絕對比一張 Excel 表格更能讓老闆或客戶留下深刻印象。

## 6. 企業年報沒人讀？將厚重文件轉化為引人入勝的品牌敘事旅程

許多大型企業每年都會發布厚達數百頁的「永續發展報告書（ESG Report）」或公司年報，內容雖好，但往往因為太過冗長而乏人問津。

透過「將冗長內容轉換成精美故事書」的功能，公關（PR）部門或內訓講師可以輕鬆將這些長篇文件轉化為具備敘事結構的簡報。試想一下，將公司 30 年來的歷史文件匯入，生成一份像故事書一樣的簡報，在尾牙或記者會上講述企業如何從家庭工廠轉型為國際公司的歷程，這樣的感染力絕對大於枯燥的文字敘述。

## 7. 只有照片也能做手冊？門市 SOP 與活動結案報告的無痛生成術

對於連鎖門市的督導或活動執行人員來說，整理照片並加上說明文字是一項繁瑣的工作。

NotebookLM 允許你「將照片變成食譜書」（或我們可理解為 SOP 操作手冊）。比如門市換季陳列，督導只需拍下標準貨架的照片，上傳後請 AI 製作成給工讀生的「商品上架與陳列教學」投影片。系統會自動辨識圖片內容並加上重點標註，讓經驗傳承變得簡單又高效。

## 8. 風格由你定義：用文字描述就能預覽情境，打造最具氛圍感的創意提案

最後，如果你是創意總監或活動企劃，需要再提案階段就展現強烈的視覺氛圍（Mood），但手邊資源不足以先請設計師畫 3D 圖。

你可以利用「以你偏好的風格草擬計畫」功能。只需用文字描述，例如：「幫我草擬一份華山文創園區快閃店的企劃簡報，視覺風格要像『手繪黑板風格』搭配暖色系燈光插圖，呈現週末市集的放鬆感。」NotebookLM 就能根據你的描述生成相應風格的投影片，讓業主在第一時間就能「看見」你的創意。

## 阿峰老師總結：AI 不是取代思考，而是釋放你的策略價值

看完這 8 個功能，阿峰老師想強調的是，NotebookLM 的強大不在於它能「自動完成」所有工作，而在於它能大幅縮短我們從「資訊」到「洞察」，再從「洞察」到「視覺化呈現」的過程。

在 AI 時代，我們不需要花費 80% 的時間在排版與整理資料，而應該將這些時間節省下來，專注於那 20% 最核心的策略思考與人際溝通。希望大家都能在工作中善用這些工具，成為更高效的職場工作者。

---

**資料來源：**

- Google. (2024, December). NotebookLM Slide功能官方分享：8 種NotebookLM slide用法. Retrieved from Google Official Announcement.
- Google. (2024, December). Nano Banana Pro 影像模型發布資訊. Retrieved from Google DeepMind Blog.
- Google. (2024). NotebookLM Official Guide & Use Cases. Retrieved from NotebookLM Help Center.`,
    categorySlug: "ai-tools",
    categoryName: "AI 工具應用",
    categoryDescription: "AI 工具的實戰應用與教學",
    tags: ["NotebookLM", "Google AI", "簡報製作", "職場效率", "AI工具"],
    publishedAt: new Date("2024-12-20"),
  },
  {
    title: "Google Sheets 裡的 Gemini 也太神！不用公式，幾句話搞定時間計算",
    slug: "gemini-google-sheets-time-calculation",
    excerpt: "不用複雜公式，只要用自然語言告訴 Gemini 你想做什麼，它就能直接在 Google Sheets 裡幫你完成時間計算、數據分析等繁瑣工作。分享實戰案例與三個關鍵心法。",
    content: `今天要來跟大家分享一個剛剛發生的「驚呆時刻」。老實說，雖然我已經用 AI 用得很習慣了，但剛剛在 Google Sheets 裡面的這波操作，還是讓我忍不住發出了「哇」的一聲。

## 遇到時間計算，你的直覺是什麼？

事情是這樣的，我剛剛在處理一個表格，需要計算兩個時間點之間的「時間長度」（或是加總時間）。

如果是以前，我們大概腦袋裡馬上會浮現：「好，我要用 \`=TIME()\` 函數，還是要用減法？格式是不是要設定成 \`hh:mm\`？如果不小心跨日了怎麼辦？」

雖然我們都知道用函數絕對可以解，但就是稍微繁瑣了一點點，對吧？

## Gemini 的「說人話」解法

但我剛剛想說，既然 Google Sheets 旁邊就有 Gemini（有訂閱 Advanced 的同學應該都有看到），不如就隨口問問它看它能不能幫我做苦工。

結果... 我真的只是輸入了幾個字的自然語言指令，它就直接幫我算好了！

我本來是不期不待，想說它頂多給我一個公式讓我自己貼，沒想到它是直接理解我的意圖，然後把整欄的數據都處理得服服貼貼。

這讓我再次深刻體會到：**「善用工具，真的能把時間留給更重要的事情。」**

## 阿峰老師的指令分享 (Prompt)

很多同學會覺得 AI 很難，是不是要學什麼複雜的咒語？其實真的不用！這次的指令簡單到不行，分享給大家：

> 「幫我計算 [開始時間] 到 [結束時間] 的時間差，並填入 [目標欄位]」

或是直接說：

> 「幫我把這兩欄的時間加總算出總時數」

就是這麼直白！這就是自然語言強大的地方，你把你想要做的事情「說」出來，AI 就幫你做出來。

## 同場加映：連排版也是 AI 做的？

順帶一提，大家看到的這張示意圖排版，其實也是 Gemini 的 Nano Banana 模型幫我排版完成的。

這年頭，從數據計算到圖片排版，AI 都在用驚人的速度進化。如果你也是有付費訂閱 Gemini 的同學，強烈建議不要把它只當成聊天機器人，試著在 Google Docs、Sheets 裡面呼叫它出來，絕對會有意想不到的收穫喔！

## 總結：三個關鍵心法

### 1. 打破慣性

下次遇到需要寫公式的場合，先試試看叫 Gemini 幫你做。不要被過去的經驗限制住，AI 工具的能力往往超乎你的想像。

### 2. 自然語言

用你最習慣的語言下指令，不要想太多。不需要學習複雜的語法或公式，直接用人話告訴 AI 你想要什麼結果。

### 3. 多方嘗試

無論是算數據還是做圖，AI 的邊界一直在擴大，多試多玩就對了！每一次的嘗試都可能帶來意想不到的驚喜。

## 實戰應用場景

Google Sheets 裡的 Gemini 不只能處理時間計算，還能協助你：

- **數據分析**：快速產生統計圖表、計算平均值、找出趨勢
- **格式整理**：批次處理日期格式、文字大小寫轉換
- **公式建議**：當你不確定該用什麼函數時，直接問 Gemini
- **資料清理**：移除重複項目、填補空白欄位、標準化資料格式

## 開始使用 Google Sheets 的 Gemini

如果你還沒有試過 Google Sheets 裡的 Gemini，現在就是最好的時機：

1. 確保你有訂閱 **Gemini Advanced**（Google One AI Premium 方案）
2. 打開任何一個 Google Sheets 試算表
3. 在右側邊欄找到 **Gemini 圖示**並點擊
4. 開始用自然語言下指令，讓 AI 幫你處理繁瑣的工作

今天的分享就到這邊，希望這幾個簡單的小技巧能幫大家稍微提早一點下班！我們下次見！`,
    categorySlug: "ai-tools",
    categoryName: "AI 工具應用",
    categoryDescription: "AI 工具的實戰應用與教學",
    tags: ["Gemini", "Google Sheets", "AI 工具", "效率提升", "自然語言"],
    publishedAt: new Date("2024-12-22"),
  },
  {
    title: "AI 社群文案機器人實戰：4 大工具讓你的內容產出效率提升 10 倍",
    slug: "ai-social-media-content-automation",
    excerpt: "掌握 R.C.E. 架構、Gemini Gem、NotebookLM 和 Social Flow AI 四大工具，從 0 到 1 打造你的 AI 社群文案自動化工作流，讓內容產出效率提升 10 倍。",
    content: `在這個 AI 爆發的時代,社群經營者面臨一個共同的挑戰:如何快速產出高品質的社群內容?本文將分享 2025/12/23 直播課程的精華內容,帶你掌握四大 AI 工具,讓你的社群文案產出效率提升 10 倍。

## 一、R.C.E. 架構:打造精準提示詞的黃金法則

### 為什麼需要 R.C.E.?

許多人使用 AI 時,常常得到很大眾化、像維基百科般的內容,缺乏個人特色與專業度。問題出在哪裡?答案是:你沒有給 AI 足夠精準的指令。

R.C.E. 架構就是解決這個問題的關鍵,它能讓你的 AI 產出從「平庸」提升到「專業」。

### R.C.E. 三大維度

**R (Role) 角色設定**

定義 AI 的專業身份,讓它以特定角度思考。

範例:
- 「你是一位擁有 40 年經驗的奧美公關社群經營總監」
- 「專門在亞太區操作保養品社群行銷的頂尖專家」

**重點提示**:年資寫 40 年的效果通常比 10 年好,要賦予具體的專業領域。

**C (Context) 情境描述**

描述目標受眾(TA)、產品特色、季節或發文目的。

範例:
- 「目標客群是 35-50 歲的企業中階主管」
- 「現在是冬天,媽媽們喜歡買給全家人吃的中藥滷味」

**E (Expectation) 期望設定**

指定產出的格式、語氣、風格。

範例:
- 「請給我一篇 IG 短貼文」
- 「語氣要專業但不要太嚴肅」
- 「我的客群喜歡 Emoji,請多用一點」或「我是專業人士,完全不要 Emoji」

### 實戰操作步驟

1. 先自己草擬 R.C.E. 的基本架構
2. 使用「黃金提示詞優化師」工具
3. 將草稿貼入,請 AI 幫忙優化成更完整的指令
4. 選擇優化後的版本(如風格 A 或風格 B)來使用

### 核心心法

**你才是總編輯**:AI 負責產出,但你要定義策略。你必須比 AI 更了解你的客戶和產品。

**精準度決定品質**:指令下得越細節(包含禁忌詞、語氣範例),產出越接近滿分。

## 二、Gemini Gem:打造你的專屬 AI 團隊

### 為什麼要使用 Gem?

想像一下,每次要寫社群文案時,都要重新輸入一長串的角色設定和指令,是不是很麻煩?Gemini Gem 就是為了解決這個痛點而生。

它能將你調整好的 R.C.E. 指令固定下來,變成一個專屬的 AI App,隨開隨用,大幅節省時間。

### 建立 Gem 的步驟

1. **進入 Gemini**:打開 [Google Gemini](https://gemini.google.com/) 介面
2. **建立 Gem**:點擊左側「Gem 管理器」或「我的 Gem」→ 新增 Gem
3. **輸入指令**:將透過 R.C.E. 優化好的完整提示詞,貼入「指示(Instructions)」欄位
4. **命名與說明**:
   - 幫機器人取名(如:AI 管理私域顧問)
   - 技巧:若想不出名字,可將指令貼給 AI,請它幫忙想 5 個名字和 10 字簡介
5. **上傳知識庫(選用)**:若有特定的產品資料、背景 PDF,可在「知識(Knowledge)」欄位上傳
6. **保存與使用**:儲存後,該 Gem 會出現在選單中,點擊即可開始對話

### 打造個人 AI 團隊

你可以建立多個 Gem,一個是「文案總監」、一個是「簡報專家」、一個是「課程規劃師」,一人即是一個團隊。

### 注意事項

- Gem 就像 App,需要隨時代或需求微調指令(沒有 100% 完美的設定,要持續迭代)
- 可以將做好的 Gem 分享連結給同事或朋友使用

## 三、高品質內容精煉:NotebookLM / Perplexity / Deep Research

### 為什麼需要這些工具?

AI 寫作需要素材,單靠 AI 瞎掰會產生幻覺。這些工具能幫你:

- **尋找燃料(Content)**:提供 AI 寫作所需的真實素材
- **跨越語言與格式限制**:將國外文章、YouTube 影片、Podcast 轉化為中文社群貼文素材
- **深度研究**:獲取比一般 Google 搜尋更結構化、更廣泛的市場資訊

### A. 搜尋素材工具

**Perplexity (小P) / Felo**

輸入問題(如「如何挑選咖啡豆」、「香港青年關注議題」),獲取結構化的答案和引用來源。

**Gemini Deep Research**

輸入指令(如「研究台灣市面上有哪些熱門頰彩霜及其韓國競品」),它會深度瀏覽數百個網站並整理報告。

重點是取得這些工具提供的「引用來源(Source Links)」。

### B. 內容轉化工具:NotebookLM

**YouTube 影片轉文字**
- 複製影片網址 → 貼入 NotebookLM → 生成摘要/逐字稿

**Podcast/錄音檔轉文字**
- 方法一:下載 MP3 → 上傳至 NotebookLM
- 方法二:錄下老闆/產品經理的口語介紹 → 上傳

**PDF/文章整理**
- 直接上傳或貼上網址

產出:利用 NotebookLM 整理好的重點或逐字稿,作為「燃料」餵給你的 Gemini Gem 寫成貼文。

### 核心心法

**全世界都是你的素材庫**:語言不是問題(AI 可翻譯),格式不是問題(影片/聲音皆可轉文字)。

**來源把關**:雖然 AI 能找資料,但身為總編輯仍需快速檢視來源的可信度。

### 工具連結

- [NotebookLM](https://notebooklm.google.com/)
- [Perplexity](https://www.perplexity.ai/)
- [Felo](https://felo.ai/)

### 注意事項

- NotebookLM 容量很大(可吃下魔戒三部曲等級的字數),不用擔心資料太長
- 不要直接抄襲,而是利用 AI 進行「重組」、「改寫」與「觀點摘要」

## 四、Social Flow AI:一鍵產出圖文神器

### 為什麼這是王牌工具?

Social Flow AI 是學員專屬的一站式神器,將「找素材」、「寫文案」、「生配圖」串聯在同一個介面,大幅縮短工作流。

### 操作步驟

1. **登入**:[Social Flow AI](https://social-flow-ai.manus.space/)

2. **輸入主題**:在搜尋框輸入想寫的主題(如:芝麻蛋白質的好處、旅遊找領隊的優點)

3. **選擇來源**:
   - 點擊「小P (Perplexity)」或「Google News」
   - 系統會抓出相關文章/影片
   - 勾選你覺得不錯的來源(可選多個,甚至跨平台)

4. **設定參數**:
   - 平台:選擇 FB、IG、Line 等
   - 模板/人設:選擇預設風格(如:迷思破解型、情感型)
   - 細節設定:是否用 Emoji、第一人稱、長度、語氣(熱情/客觀)

5. **一鍵撰寫**:點擊開始,AI 會根據選定的來源文章自動撰寫貼文

6. **生成配圖**:
   - 文案完成後,點擊「生成配圖」
   - 選擇圖片風格(如:寫實攝影、插畫風)
   - AI 自動產圖

### 核心心法

**策略與創意優先**:工具解決了執行面,你的精力應花在「要選什麼主題」和「要用什麼角度切入」。

### 注意事項

- 這是老師自行研發的工具,目前僅供學員使用
- 若生成的圖片或文字不滿意,可以重新生成或手動微調
- 使用該工具會消耗 Tokens (費用),請學員珍惜使用

## 總結:從 0 到 1 的社群文案 AI 工作流

掌握這四大工具後,你的社群文案產出流程將變成:

1. **定義策略**:使用 R.C.E. 架構設計精準提示詞
2. **建立團隊**:在 Gemini 建立多個專屬 Gem
3. **收集素材**:用 Perplexity / NotebookLM / Deep Research 找到高品質內容
4. **一鍵產出**:透過 Social Flow AI 快速生成圖文並茂的社群貼文

記住,AI 是你的助手,但你才是總編輯。策略思考、受眾洞察、品牌定位,這些才是你不可取代的核心價值。

現在就開始行動,打造屬於你的 AI 社群文案機器人吧！`,
    categorySlug: "ai-tools",
    categoryName: "AI 工具應用",
    categoryDescription: "AI 工具的實戰應用與教學",
    tags: ["AI 工具", "社群經營", "Gemini", "NotebookLM", "提示詞工程"],
    publishedAt: new Date("2025-12-23"),
  },
];

async function migrateArticles() {
  console.log("🚀 開始遷移文章...\n");

  try {
    // 1. 建立或取得管理員用戶
    console.log("📦 建立管理員用戶...");
    const existingUsers = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, "admin@aifengge.com"));

    let adminUser;
    if (existingUsers.length === 0) {
      const [newUser] = await db
        .insert(schema.users)
        .values({
          name: "阿峰老師",
          email: "admin@aifengge.com",
          role: "admin",
          imageUrl: "/images/teacher-photo.jpg",
        })
        .returning();
      adminUser = newUser;
      console.log("  ✅ 建立管理員用戶:", adminUser.name);
    } else {
      adminUser = existingUsers[0];
      console.log("  ✅ 使用現有管理員用戶:", adminUser.name);
    }

    // 2. 建立分類（去重複）
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
      const existing = await db
        .select()
        .from(schema.categories)
        .where(eq(schema.categories.slug, slug));

      if (existing.length === 0) {
        const [newCategory] = await db
          .insert(schema.categories)
          .values({
            name: data.name,
            slug: slug,
            description: data.description,
          })
          .returning();
        categoryMap.set(slug, newCategory.id);
        console.log(`  ✅ 建立分類: ${data.name}`);
      } else {
        categoryMap.set(slug, existing[0].id);
        console.log(`  ⏭️  使用現有分類: ${data.name}`);
      }
    }

    // 3. 建立標籤（去重複）
    console.log("\n🏷️  建立標籤...");
    const tagMap = new Map<string, number>();
    const allTags = new Set<string>();

    for (const article of articlesData) {
      article.tags.forEach((tag) => allTags.add(tag));
    }

    for (const tagName of allTags) {
      const slug = tagName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\u4e00-\u9fa5-]/g, "");
      const existing = await db
        .select()
        .from(schema.tags)
        .where(eq(schema.tags.name, tagName));

      if (existing.length === 0) {
        const [newTag] = await db
          .insert(schema.tags)
          .values({
            name: tagName,
            slug: slug,
          })
          .returning();
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
      const existing = await db
        .select()
        .from(schema.posts)
        .where(eq(schema.posts.slug, article.slug));

      if (existing.length > 0) {
        console.log(`  ⏭️  文章已存在: ${article.title}`);
        continue;
      }

      const categoryId = categoryMap.get(article.categorySlug);

      const [newPost] = await db
        .insert(schema.posts)
        .values({
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          authorId: adminUser.id,
          categoryId: categoryId!,
          status: "published",
          publishedAt: article.publishedAt,
          viewCount: Math.floor(Math.random() * 500) + 100, // 隨機瀏覽次數
        })
        .returning();

      // 建立文章標籤關聯
      for (const tagName of article.tags) {
        const tagId = tagMap.get(tagName);
        if (tagId) {
          await db.insert(schema.postTags).values({
            postId: newPost.id,
            tagId: tagId,
          });
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
