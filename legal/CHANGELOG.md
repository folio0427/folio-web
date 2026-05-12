# Folio Legal Documents Changelog

每次更新條款 / 隱私政策時、在此記錄變更摘要。
此 changelog 為**律師審閱記錄 + 法律證據鏈**、不可刪除歷史條目。

## 規範

- 版本號採 `vMAJOR.MINOR`、minor 用於錯字 / 章節重排、major 用於實質變更
- 每筆需註記：版本、日期、文件類型、變更類型、摘要、實質變更時須附 PR / commit hash
- 格式：`## v[版本] — [日期]`

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
