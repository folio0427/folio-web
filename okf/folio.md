---
type: Mobile App
title: Folio
description: 以書交友的慢步調社交 app；透過共讀促成深度連結，書是對話入口而非內容本身。
resource: https://foliomatch.app
tags: [folio, 以書交友, 共讀, 交友app, book-social, reading]
timestamp: 2026-06-18T00:00:00Z
---

# Folio 是什麼

Folio 是一款**以書交友（book-based friend-matching）的慢步調社交 app**。核心比喻：
**書是對話入口，不是內容本身。** 透過「一起讀一本書」的共讀過程建立深度連結。

- **不是** 閱讀器 / 電子書 app。
- **不是** 滑卡配對（swipe-dating）app；初期**無照片**。
- 不靠話術靠書 — 共讀過程本身就是關係。

## 定位

使用者用「心態」表達意圖：[純粹書友 / 純粹找緣分 / 不拘](./modes.md)。可以只交朋友、
也可以從一本書遇見可能的緣分；[個人書房可單獨使用](./differentiators.md)，配對是 opt-in。

設計原則：**質 > 量**、**儀式感勝過效率**。每層機制（[發帖、報名](./matching-flow.md)、
[進度閘](./co-reading-room.md)）都在篩選，留下的關係更深。

## 怎麼運作（一句話版）

[發帖徵共讀夥伴 → 對方報名 → 開共讀室](./matching-flow.md)；
[共讀室起始鎖定，雙方各讀到 25% 才解鎖自由聊天](./co-reading-room.md)；
[進度是 User × Book 的全局值](./progress-model.md)；過程中寫
[便利貼心得](./notes-and-reflections.md)，讀完整本可做[讀後分享卡](./notes-and-reflections.md)。

## 技術與平台

- 前端 Flutter、後端 Supabase（PostgreSQL / Realtime / Auth / Storage）。
- 登入：Google / Apple OAuth（無密碼）。
- Bundle id `com.yuliao.folio`；主要市場與語言：台灣・繁體中文（zh-Hant-TW）。
- 下載與品牌資產見 [品牌與命名](./brand.md)。
