# Folio Legal Documents Changelog

每次更新條款 / 隱私政策時、在此記錄變更摘要。
此 changelog 為**律師審閱記錄 + 法律證據鏈**、不可刪除歷史條目。

## 規範

- 版本號採 `vMAJOR.MINOR`、minor 用於錯字 / 章節重排、major 用於實質變更
- 每筆需註記：版本、日期、文件類型、變更類型、摘要、實質變更時須附 PR / commit hash
- 格式：`## v[版本] — [日期]`

---

## terms v0.5 / privacy v0.7 — 2026-05-21

**狀態**：草稿（pre-launch、生效日 2026-05-21）
**文件**：terms_zh.md、terms_en.md、privacy_zh.md、privacy_en.md、manifest.json
**變更類型**：data_consent_required（新增處理目的：停權規避防護之 OAuth 識別碼雜湊保留）
**摘要**：

- Terms §05 新增「停權通知與申訴」子節 — 對齊 GDPR / DSA Art. 17（statement of reasons）+ Art. 20（內部申訴機制）：明訂停權通知方式（app 內 + email）、申訴管道（folio0427@gmail.com）、14 日申訴期、7 工作天回覆時程，並完整揭露**重複違規之 OAuth 識別碼雜湊保留機制**（salted SHA-256、5 年、解 ban 即時移除、雜湊不可反推、最小化原則）。
- Privacy §06「特定資料之保留期間」新增「停權雜湊識別碼」條目，與 Terms 新章對應；說明用途、保留期限、刪除時機。
- manifest：terms 0.4 → 0.5、privacy 0.6 → 0.7；兩者皆 `change_type=data_consent_required` — 因為新增了「停權規避防護」這個新的處理目的，依政策 §11「新增收集個資 / 新增第三方分享 / 改變使用目的」分類，現有用戶下次開 app 將被 LegalGateGuard 強制阻擋式 modal 重新勾選同意（pre-launch 階段無實際用戶受影響）。
- 法律依據：GDPR Art. 6(1)(f) legitimate interest（防止社群濫用、Recital 47 防詐欺）+ Art. 5(1)(c) 資料最小化（只存雜湊、不存明文 sub）+ Art. 5(1)(e) 儲存限制（5 年期限 + 自動清除 cron）+ Art. 13 透明度（先揭露、後處理）；台灣個資法 §8 告知義務 + §11 期限屆滿應刪除。
- 工程順序遵循「揭露在先、處理在後」原則：本次先 push 條款上線、待 GitHub Pages 重建後、再做後端 banned_oauth_identities 表 + edge functions + 註冊時 check 的程式實作（避免條款未告知期間偷偷處理用戶資料）。

---

## terms v0.4 / privacy v0.6 — 2026-05-20

**狀態**：草稿（pre-launch、生效日 2026-05-20）
**文件**：terms_zh.md、terms_en.md、privacy_zh.md、privacy_en.md、manifest.json
**變更類型**：minor（校正、章節移除、用語對齊；無新增蒐集個資、無新增第三方分享、無新增使用目的）
**摘要**：

- 移除「句子收藏 snapshot 機制」整節（privacy §06 / terms §06）— 該功能（將他人句子收藏進自己書房）於 app v2.3 已下線、`bookshelf_quotes` 資料表已隨 migration 移除、條款描述之資料流向已不存在。terms §06 改以「共讀內容於帳號刪除後之留存」如實描述便利貼 / 訊息之匿名保留。
- 移除「18+ 驗證雜湊識別碼保留 1 年」（privacy §06 / terms §03）— app 未實作此雜湊；年齡驗證實際以註冊 DatePicker 下限 + DB trigger `trg_profiles_enforce_adult` 強制、不留存任何雜湊識別碼。
- 帳戶刪除時程「30 日內」更正為「即時」（privacy §06、terms §11）— 對齊 edge function `delete_account` 之同步刪除（`auth.admin.deleteUser` + cascade）、並消除與 privacy「帳戶刪除」一節既有「即時生效」描述之內部矛盾。
- 「違規 / 停權紀錄 5 年」「檢舉紀錄 1–3 年」兩條固定年限改為目的限制式描述（為社群安全 / 防濫用 / 法律抗辯保留、帳號刪除後移除與帳號之關聯）— app 目前無固定年限之自動清除排程、原數字無對應機制。
- 書房用語「收藏的句子 / 書房句子」對齊現行資料模型改為「便利貼」（privacy §02 / §04）。
- 匿名化顯示名稱統一為「已離開的書友」（privacy §06 聊天訊息段、terms §06）— 對齊 app 實際寫入字串。
- 補列「想找的性別」「角色造型設定」為蒐集項目、釐清不蒐集者為「真人相片」（privacy §02）— 原文漏列 desired_gender 與 mascot avatar、且與「帳戶刪除」一節提及之頭像互相矛盾。
- 帳號刪除入口路徑更正為「我」分頁 → 設定 → 離開 Folio（terms §11）。
- 平台閒置終止由 12 個月對齊為 24 個月（terms §11）— 對齊後端 `purge_dormant_accounts` 函數預設值。
- manifest：privacy 0.5 → 0.6；terms 0.3 → 0.4、change_type 由 `data_consent_required` 改 `minor`（本次為校正、放寬、用語對齊、不需阻擋式 re-consent）。

---

## privacy v0.5 — 2026-05-11

**狀態**：草稿（pre-launch、未生效）
**文件**：privacy_zh.md、privacy_en.md、manifest.json
**變更類型**：minor（放寬、非實質義務變更）
**摘要**：

- 移除「寄送確認 email 至註冊地址作為書面證據」承諾 — GDPR Art. 12 / 個資法 §3 均未強制 email 確認、刪除生效自身即為法律事實；自設承諾若無法兌現反而違反個資法 §27 一致性義務、故刪除
- 軟化「此為唯一保證之刪除路徑」→ 補充 email (folio0427@gmail.com) 為替代管道；GDPR Art. 12(2) 要求 controller 便利化權利行使、單一路徑寫法過嚴
- 處理時程改寫為「點擊離開 Folio 後即時生效」、反映 edge fn `delete_account` 之同步刪除行為（auth.admin.deleteUser + cascade）
- manifest.json privacy 0.4 → 0.5、change_type 由 `data_consent_required` 改 `minor`（放寬、不需阻擋式 re-consent）

---

## v0.1 — 2026-05-09

**狀態**：草稿（pre-launch、未生效）
**文件**：terms_zh.md、terms_en.md、privacy_zh.md、privacy_en.md
**變更類型**：initial draft
**摘要**：

- 初始版本草稿
- 包含 16 條服務條款 + 12 條隱私政策架構
- 主要框架：個資法 + GDPR + CCPA 三層
- 18+ 限制、snapshot 機制、多管道告知（L1–L4）三大核心已寫入
- 待律師審閱填上正式法律用語、生效日待定
