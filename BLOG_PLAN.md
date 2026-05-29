# Folio Blog — Cornerstone Content Plan

> Phase 3 SEO play. Long-tail keyword capture + brand authority.
> Each article 800–1500 words, internal links back to home + App Store.

---

## Why a blog?

The marketing site is one page. Google has **one** chance to rank you for **one**
intent (brand search "Folio"). For everything else — "以書交友 app 推薦"、
"慢社交 app 比較"、"讀書交友軟體"、"book club app 2026" — you have nothing.

A blog gives you 5–20 *additional* landing pages, each ranking for its own
long-tail keyword. Done right: traffic compounds, organic install rises 6–18
months later.

---

## Target keywords (researched intent)

| Keyword | Volume | Difficulty | Intent |
|---|---|---|---|
| 以書交友 app | low (台灣) | low | 高轉換、品牌附近 |
| 慢社交 app | low-mid | low | 概念詞、教育型 |
| 讀書 app 推薦 | mid | mid | 比較型、需多文章打 |
| 共讀 app | low | low | 直接競品/類型詞 |
| book buddy app | mid | mid | 英文 long-tail |
| slow dating app | mid | high | 國際話題、難打但放未來 |
| 讀書交友軟體 | low | low | 完美 niche、直接打 |
| 文青約會 app | low | low | tangent 但 brand fit |
| 不滑卡的交友 app | low | low | counter-trend 角度 |
| 共讀社團 vs app | very-low | very-low | 比較型、教育 |

---

## 5 篇 cornerstone outline

### 1. 「為什麼共讀比配對 app 更容易遇到對的人」
**Target**: 慢社交 app、不滑卡的交友 app
**Angle**: counter-trend、philosophy-first
**長度**: ~1200 字
**Outline**:
- Hook：交友 app 的「滑卡疲勞」數據（Statista / Pew Research 引用）
- Why 滑卡 fail：注意力經濟、表象優先、決策疲乏
- 共讀的不對稱：要花時間、show vs tell、共同 reference
- Folio 的解法：進度閘、便利貼牆、雙方紀念
- CTA：下載 Folio iOS（內部連結首頁）
- Bonus：FAQ section（"共讀要花多久"、"沒讀過書怎麼辦"、"已讀完同本書怎辦"）

**內部連結**：→ 首頁三模式區、→ Privacy policy（建立 trust）

---

### 2. 「2026 慢社交 app 比較：Slowly、Folio、Bumble Find Friends」
**Target**: 慢社交 app、慢社交 app 比較
**Angle**: 比較型（高 CTR）
**長度**: ~1500 字
**Outline**:
- 什麼是「慢社交」（定義 + 為什麼興起 + Z 世代 burnout）
- 3 個 app 對比表（核心機制 / 進度 / 隱私 / 收費 / 用戶 base）
  - Slowly（虛擬郵件、距離決定送達時間）
  - Bumble Find Friends（friend-only swiping）
  - Folio（共讀進度閘）
- 各自適合的人（不是 attacking 競品、是分眾推薦）
- 結論：Folio 適合「想靠書交朋友 / 找緣分」這個 niche
- CTA：下載 Folio iOS

**內部連結**：→ Modes 區、→ Flow 區

---

### 3. 「以書交友：5 種挑書策略，更容易遇到合得來的讀友」
**Target**: 以書交友 app、讀書交友軟體
**Angle**: 實用 how-to（最容易分享）
**長度**: ~1000 字
**Outline**:
- 5 個策略：
  1. 挑「正在讀」的書、不挑「想讀但沒開始」
  2. 挑「中度困難」的書（太簡單沒共讀價值、太難半途而廢）
  3. 挑「會引發對話」的非虛構（理財、心理、哲學 > 散文）
  4. 挑「節奏一致」的（厚度跟你的閱讀速度匹配）
  5. 在「為什麼想讀」寫得具體（"想釐清 X 議題" > "聽說很紅"）
- 每個策略用 Folio 真實機制舉例
- 結尾：開始試的 prompt
- CTA：下載 Folio iOS

**內部連結**：→ Flow step 1 (發帖)

---

### 4. 「Folio 設計筆記：為什麼共讀室一開始是『鎖住』的」
**Target**: brand authority、HN/Threads 分享傾向
**Angle**: dev blog / behind-the-scenes
**長度**: ~1500 字
**Outline**:
- The problem：配對成立後立刻聊 = 還是滑卡心理
- 進度閘的取捨：25%、雙方、各寫一則心得 — 為什麼這 3 個條件
- 設計過程：考慮過的替代方案（時間閘、訊息次數閘）為什麼被砍
- 結果觀察：解鎖後的對話確實不一樣（質性引用）
- 結論：摩擦設計（friction by design）是社交產品的反主流招
- CTA：下載 Folio iOS（內部連結）

**內部連結**：→ Philosophy quote 區、→ Flow step 3

**Bonus**：可同步 cross-post 到 HN / Threads / Medium 帶流量

---

### 5. 「便利貼牆：把 LINE 對話留下來的另一種方式」
**Target**: 便利貼 app、共讀筆記、emotional/lifestyle 詞
**Angle**: feature deep dive、感性向
**長度**: ~800 字
**Outline**:
- LINE 對話的「沒留下」感
- Folio 便利貼牆的設計：immutable、只有你們倆、按書歸位
- 雙方 100% 時的「整理頁」分享卡 — 可貼 IG
- 真實截圖（用 mock data 做 hero shot）
- 結論：對話作為紀念、不只是溝通
- CTA：下載 Folio iOS

**內部連結**：→ Flow step 4、→ 首頁 hero

**Bonus**：適合放 IG 引流（視覺強）

---

## 技術實作建議

### 結構
```
folio-web/
├── blog/
│   ├── index.html              # 文章列表
│   ├── why-co-reading.html     # 文章 1
│   ├── slow-social-apps.html
│   ├── book-pairing-strategies.html
│   ├── design-progress-gate.html
│   └── sticky-note-walls.html
```

### 每篇文章必備
- `<title>` 含 target keyword
- `<meta description>` 155 字、含 keyword、自然
- `<link rel="canonical">`
- OG + Twitter card
- JSON-LD `BlogPosting` schema with `datePublished`, `author`, `image`
- H1 = 文章標題（含 keyword）
- 內部連結 3–5 個（指首頁 / 其他文章 / Modes / Flow / store link）
- 結尾 CTA box（下載 App Store）
- 約 800–1500 字、自然 keyword 密度 1–2%

### Sitemap 更新
每篇文章上線 → 加進 `sitemap.xml`。

### 發布節奏
- Week 1：文章 1（counter-trend、立論基石）
- Week 3：文章 2（比較型、流量大）
- Week 6：文章 3（how-to、易分享）
- Week 9：文章 4（dev blog、自然 cross-post）
- Week 12：文章 5（feature deep dive、視覺強）

3 個月後重新 audit Search Console、看哪些 ranking 起來、補位 query expansion。

---

## 不建議做（避免錯）

- ❌ AI 大量生成填字數 — Google E-E-A-T 開始懲罰、且品牌折損
- ❌ 寫超過 5 篇前就追新文 — 先 polish 這 5 篇排名穩定
- ❌ 塞太多 keyword（密度 > 3%）— 古早 SEO、現在會被懲罰
- ❌ 沒有 internal link strategy — 各篇文章不互相連、權重浪費
- ❌ 標題打 clickbait — 跟品牌 tone 不合、bounce rate 高

---

> 此 plan 為 v1。每 3 個月根據 Search Console 數據迭代主題清單。
