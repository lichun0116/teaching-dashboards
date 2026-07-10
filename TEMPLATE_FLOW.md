# 教學駕駛艙模板流程

本 repo 用來統一管理多個教學駕駛艙。每個單元使用獨立資料夾，例如 `unit1/`、`unit2/`。

## 新增單元流程

### 第一階段：讀取教材與建立內容基準

1. Codex 必須先讀取教材內容，再開始製作任何簡報、資訊圖或駕駛艙。
2. 若教材是 PDF，先確認頁數、是否加密、是否能抽取文字，並渲染代表頁做視覺檢查。
3. 建立或更新內容基準，至少包含：
   - 單元主題
   - 主要教學重點
   - 語言功能或文法重點
   - 閱讀或聽力任務
   - 可用圖片、簡報、資訊圖素材
   - 文字抽取是否有亂碼或需人工校對
4. 只有在內容基準清楚後，才進入素材製作與駕駛艙整理。

### 第二階段：建立新單元駕駛艙

1. 複製既有單元資料夾，例如將 `unit1/` 複製為 `unit2/`。
2. 更新新單元資料夾中的 `index.html`：
   - `<title>`
   - 頁首單元名稱
   - 課程標籤與顯示文字
3. 更新 `app.js`：
   - `focusData`
   - 每個教學重點的 `slides`
   - 每個教學重點的 `infographic`
   - 互動視覺化任務
   - 2 題形成性評量 `assessments`
4. 放入素材：
   - `assets/slides/slide-01.png` 起依序命名
   - `assets/infographics/infographic_*.png`
5. 更新根目錄 `index.html`：
   - 新增一張入口卡片
   - 連結指向新單元資料夾，例如 `./unit2/`
6. 本地預覽：
   - 從 `github-pages/` 啟動本地伺服器
   - 檢查總覽頁、新單元頁、圖片載入、模式切換、抽籤、計時器、畫筆、評量與匯出紀錄。
7. 發布：
   - 確認沒有 PDF、PPTX、暫存輸出或 `.gh-cli/` 被提交。
   - 推送或使用 GitHub API 更新 `main`。
   - 確認 GitHub Pages workflow 成功，Pages 狀態為 `built`。

## 單元資料夾標準結構

```text
unitX/
  index.html
  style.css
  app.js
  assets/
    slides/
      slide-01.png
      slide-02.png
    infographics/
      infographic_01_topic.png
```

## 評量資料格式

每個教學重點至少 2 題：

```js
assessments: [
  {
    question: "題目",
    choices: ["選項 A", "選項 B", "選項 C"],
    answer: 0
  },
  {
    question: "第二題",
    choices: ["選項 A", "選項 B", "選項 C"],
    answer: 1
  }
]
```

## 發布注意

- 不提交 `.gh-cli/`。
- 不提交原始 PDF 或大型素材。
- 若 Windows 憑證造成 `git push` 失敗，可依專案 `AGENTS.md` 改用 GitHub API 發布。
