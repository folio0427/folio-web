---
type: Product Concept
title: 進度模型 User × Book
description: Folio 的閱讀進度範圍是「一個使用者 × 一本書」一個全局值，跨所有共讀室與個人書房同步。
tags: [進度, progress, user-book, 書房, 同步]
timestamp: 2026-06-18T00:00:00Z
---

# 進度模型 User × Book

[Folio](./folio.md) 的閱讀進度 scope = **一個使用者 × 一本書 一個全局值**，跨所有
[共讀室](./co-reading-room.md) + 個人書房同步。

特性：
- 一本書一個 0–100% 進度；在任何房間或書房更新，他處即時反映。
- [解鎖閘](./co-reading-room.md)在 Room 層判斷（雙方各自 ≥ 25%），但進度本身是全局的。
- [心得便利貼](./notes-and-reflections.md)也是 User × Book scope：一則心得跨房間 + 書房顯示。
- 個人達 100% 慶祝為 User × Book 級（僅一次）；房間雙方 100% 慶祝為 Room 級（每房一次）。

## 書房（個人）

書房 = `progress` 表，一列一本書，完全自己控制；狀態由 `percent` 推導
（0 = 還沒讀 / 1–99 = 在讀 / 100 = 看完了），可單獨使用、不配對也行。

相關：[共讀室與進度閘](./co-reading-room.md) ・ [便利貼與讀後分享卡](./notes-and-reflections.md)
