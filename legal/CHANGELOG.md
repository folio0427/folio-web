# Folio Legal Documents Changelog

每次更新條款 / 隱私政策時、在此記錄變更摘要。
此 changelog 為**律師審閱記錄 + 法律證據鏈**、不可刪除歷史條目。

## 規範

- 版本號採 `vMAJOR.MINOR`、minor 用於錯字 / 章節重排、major 用於實質變更
- 每筆需註記：版本、日期、文件類型、變更類型、摘要、實質變更時須附 PR / commit hash
- 格式：`## v[版本] — [日期]`

---

## terms v1.2 / privacy v1.2 — 2026-05-22

**狀態**：草稿（pre-launch、生效日 2026-05-22）
**文件**：terms_zh.md、terms_en.md、privacy_zh.md、privacy_en.md、manifest.json
**變更類型**：minor（純版本號提升、無實質條文變更）
**摘要**：

- terms 1.1 → 1.2、privacy 1.1 → 1.2。本次為**純版本號提升**：四份條款文件（terms_zh / terms_en / privacy_zh / privacy_en）之實質條文內容**未作任何變更**。
- 文件標頭版號與 manifest.json 版號同步更新至 v1.2、兩者維持一致。
- manifest：terms / privacy change_type 皆 minor、生效日維持 2026-05-22。依現行政策 §11 / §15 分級，任何變更（含 minor）皆以阻擋式 modal 重新取得同意 — 已同意 v1.1 之用戶下次開 app 將被 LegalGateGuard 重新取得 v1.2 同意。
- 對應 Supabase tos_versions：由 sync_tos_versions workflow 於 manifest.json push 後自動補 terms 1.2 / privacy 1.2 active row。

---

## terms v1.1 / privacy v1.1 — 2026-05-22

**狀態**：草稿（pre-launch、生效日 2026-05-22）
**文件**：terms_zh.md、terms_en.md、privacy_zh.md、privacy_en.md、manifest.json
**變更類型**：minor（純版本號提升、無實質條文變更）
**摘要**：

- terms 1.0 → 1.1、privacy 1.0 → 1.1。本次為**純版本號提升**：四份條款文件（terms_zh / terms_en / privacy_zh / privacy_en）之實質條文內容**未作任何變更**。
- 文件標頭版號與 manifest.json 版號同步更新至 v1.1、兩者維持一致（沿續 v1.0 對標頭 / manifest 版號 drift 之校正）。
- manifest：terms / privacy change_type 皆 minor、生效日維持 2026-05-22。依現行政策 §11 / §15 分級，任何變更（含 minor）皆以阻擋式 modal 重新取得同意 — 已同意 v1.0 之用戶下次開 app 將被 LegalGateGuard 重新取得 v1.1 同意。
- 對應 Supabase tos_versions：由 sync_tos_versions workflow 於 manifest.json push 後自動補 terms 1.1 / privacy 1.1 active row。

---

## terms v1.0 / privacy v1.0 — 2026-05-22

**狀態**：草稿（pre-launch、生效日 2026-05-22）
**文件**：terms_zh.md、terms_en.md、privacy_zh.md、privacy_en.md、manifest.json
**變更類型**：minor（事實校正 + 文件用語清理 + 通知分級對齊；無新增蒐集個資、無新增第三方分享、無新增使用目的）
**摘要**：

- **Privacy §04 / §05**：更正 Supabase 主機所在地 —— 原誤寫「美國 / 歐盟」、實際為**新加坡**（Supabase 專案 region `ap-southeast-1`）。資料儲存地未變動、僅文件描述對齊事實；屬據實揭露之校正（個資法 §8、GDPR Art. 13）。§05「可能位於」改為確定之「位於新加坡」。
- **Privacy §06**：移除兩處章節標題內的 app 內部產品版號標註 —「共讀便利貼（v2.2 新增）」→「共讀便利貼」、「帳戶刪除（v2.2.2 —「離開 Folio」）」→「帳戶刪除（「離開 Folio」）」。app 產品版號（v2.2 / v2.2.2）對讀者無意義、不應出現於法律文件；法律文件之版本以文件標頭自身版號為準。
- **Terms §10**：「v1 提供之全部功能均為免費」之「v1」改為「目前」—— 同上、清除產品版號用語。
- **Privacy §11 / Terms §15 變更分級**：「非重大變更：版本號 bump、不另行通知」改為「非重大變更：版本號 bump、仍以阻擋式 modal 重新取得同意」。對齊產品決策 —— 任何條款變更（含非重大）皆透過阻擋式 modal 取得用戶明示再同意、不再有「不另行通知」之 tier。
- **版本**：terms 0.5 → 1.0、privacy 0.9 → 1.0。privacy 文件標頭先前誤植為 v0.8（commit `e8c8602`〔privacy v0.9〕漏更新標頭）、本次一併校正。1.0 作為 pre-launch 定稿版本里程碑。
- 對應：manifest.json 同步；Supabase tos_versions seed terms 1.0 / privacy 1.0（後續由 sync_tos_versions workflow 自動維護）。

---

## privacy v0.9 — 2026-05-21

**狀態**：草稿（pre-launch、生效日 2026-05-21）
**文件**：privacy_zh.md、privacy_en.md、manifest.json
**變更類型**：minor（資料處理「減少」：移除傳送項目，非新增蒐集 / 分享 / 目的）
**摘要**：

- 接續 v0.8（commit `0a0e804`，揭露 Firebase Analytics 為第三方處理者）。v0.8 §04 揭露 Folio 以 `setUserId` 傳送帳號識別碼、並以 user property / event param 傳送性別 / 年齡 / 心態作為分析維度。本次將 app 端對應行為**收斂**、並同步修正 §04 使措辭與新行為一致。
- App 端對應變更（`app/lib/`、`app/android/`；app repo 另有進行中重構，本次變更未隨此 commit 進 app repo）：
  - **移除 `gender` 傳送** — `setUserProperty('gender')` ×3（main.dart 冷啟動 / auth 事件、confirm_screen.dart 註冊）+ `register_complete` 事件之 `gender` 參數（analytics.dart `registerComplete` 簽章）。理由：性別屬敏感個資；Google Analytics 條款禁止上傳可識別 / 敏感資料，性別配合帳號識別碼上傳尤甚。性別分布分析改以 Supabase `profiles` 表第一方 SQL 進行、不出本平台系統。
  - **移除 `setUserId`** — analytics 不再以 Folio 帳號識別碼綁定，改為僅關聯 Firebase 裝置層級 App 實例 ID（由帳號層級 identity-linked 降為裝置層級 pseudonymous）。`age` / `stance` 仍作為 `register_complete` 等 funnel 事件之參數保留 — 非敏感、非 GA 禁類、cohort 分析所需。
  - **`AndroidManifest.xml`** — 以 `tools:node="remove"` 移除 `firebase_analytics` 自動合併進來的 `com.google.android.gms.permission.AD_ID`（廣告 ID）權限，使 §08「不為廣告投放提供識別碼」之主張於 Android 端完全成立。對應 v0.8 CHANGELOG「待確認（工程）」事項之一。
- §04「服務提供者」：Google Analytics for Firebase 條目改寫 — 移除「您的帳號識別碼」與「性別」之描述；明示分析資料僅關聯裝置層級 App 實例 ID、不綁帳號、不傳送性別等敏感資料；保留「年齡、抱持心態」為事件分析維度。
- §02 / §03 / §08 不變：§02 之 App 實例 ID 描述、§03「用量分析」目的、§08 分析識別碼描述於本次變更後仍精確。
- manifest：privacy 0.8 → 0.9、change_type 由 `data_consent_required` 改 `minor` — 本次為資料傳送之「減少」（移除性別 + 解除帳號綁定），對用戶有利、不新增蒐集 / 分享 / 目的，依政策 §11 屬非重大變更、不觸發阻擋式 re-consent。terms 不變（維持 0.5）。
- 法律依據：GDPR Art. 5(1)(c) 資料最小化、Art. 5(1)(a) 透明性（§04 措辭與實際行為對齊）；台灣個資法 §5 比例原則、§8 告知義務。
- 對應 supabase migration：`20260521220000_v25_tos_versions_privacy_v09.sql`（tos_versions 補 privacy 0.9 active row、privacy 其餘版本設 inactive）。
- 待辦（商店合規 + 工程，非條款本身）：
  - **Firebase Console 人工確認**（無法自動驗證）：Google signals 已停用、專案未連結 Google Ads、廣告個人化已關閉。若任一開啟，App 實例 ID + 年齡 + 心態仍可能進入 Google 跨 app 廣告圖譜 → App Store「追蹤」問卷須答 Yes 並導入 ATT。
  - App Store Connect「App 隱私」/ Google Play「資料安全」問卷更新：移除 gender 作為傳送給 Google 之資料類型；因 `setUserId` 已移除，analytics 相關資料類型由「與身分連結」改為「未與身分連結」。

---

## privacy v0.8 — 2026-05-21

**狀態**：草稿（pre-launch、生效日 2026-05-21）
**文件**：privacy_zh.md、privacy_en.md、manifest.json
**變更類型**：data_consent_required（新增第三方資料處理者：Google Analytics for Firebase）
**摘要**：

- §04「服務提供者（資料處理者）」新增 **Google Analytics for Firebase（Firebase Analytics）by Google LLC**。app 自 `firebase_analytics` SDK（`app/lib/services/analytics.dart`）起即蒐集用量數據（DAU、v2.1 進度閘 funnel 七事件）；SDK 已在 production build 內、先前條款未揭露 → 本次為**揭露補正**（disclosure catch-up）。揭露 Google 透過此服務收集之資料類型（App 實例 ID、概略位置、App 生命週期與產品互動事件），並揭露 Folio 額外以 `setUserId` / `setUserProperty` 傳送之分析維度（帳號識別碼、性別、年齡、心態）。
- §02「收集之個人資料」：設備資訊補列 Firebase Analytics 之 App 實例 ID；新增「概略位置（國家 / 城市層級、由遮罩 IP 推得）」為蒐集項目；操作日誌註明部分經 Firebase Analytics 互動事件收集。移除「裝置 ID（去識別）」措辭 — App 實例 ID 與帳號識別碼經 `setUserId` 關聯、屬 pseudonymous 而非 de-identified。
- §03「收集目的」：「服務改進（去識別化分析）」更正為「服務改進與用量分析（DAU、使用流程）」 — Firebase Analytics 為 pseudonymous，原「去識別化」措辭不再精確。
- §05「跨境傳輸」：節點清單補列 Firebase Analytics。
- §08「Cookie 與類似技術」：「不使用第三方 cookie 追蹤」改為「不使用瀏覽器第三方 cookie 追蹤」並補述 Firebase Analytics 以 App 實例 ID（非 cookie）運作；「不向第三方廣告商提供識別碼」改為明確界定為 Folio 自身行為（未嵌廣告 SDK、App 內無廣告、不為廣告投放提供識別碼）。
- manifest：privacy 0.7 → 0.8、change_type=`data_consent_required` — 依政策 §11「新增第三方分享」分類，現有用戶下次開 app 將被 LegalGateGuard 強制阻擋式 modal 重新勾選同意（pre-launch 階段無實際用戶受影響）。terms 不變（維持 0.5）。
- 法律依據：台灣個資法 §8 告知義務（第三方處理者揭露）；GDPR Art. 13(1)(e) 揭露 recipients、Art. 44–46 跨境傳輸、Art. 5(1)(a) 透明性。注意：本次與 v0.7「揭露在先、處理在後」相反 — Firebase Analytics SDK 已在 app 內運行、屬既成處理之事後補揭，應儘速上線以縮短未揭露期間。
- 對應 supabase migration：`20260521210000_v25_tos_versions_privacy_v08.sql`（tos_versions 補 privacy 0.8 active row、供 record_consent FK linkage；註：privacy 0.6 / 0.7 從未 seed 進 tos_versions，屬既有 drift、本次不回填）。
- 待辦（商店合規、非條款本身）：因新增 Coarse Location + Device ID（App Instance ID）+ Product Interaction 揭露，需同步更新 App Store Connect「App 隱私」問卷與 Google Play「資料安全」表單；gender / age 作為 analytics 維度亦須於問卷反映。
- 待確認（工程）：Android `AndroidManifest.xml` 未以 `tools:node="remove"` 移除 Firebase Analytics 合併進來的 `com.google.android.gms.permission.AD_ID`，且 Firebase 專案未確認關閉 Google signals / 廣告個人化；若要讓 §08「不為廣告投放提供識別碼」之主張完全成立，建議移除 AD_ID 權限並於 Firebase Console 關閉廣告個人化訊號。

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
