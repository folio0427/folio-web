---
type: Policy
title: 安全、隱私與年齡限制
description: Folio 的信任與安全設計：18+ 限制、檢舉封鎖、隱私保護、訊息防刷。
resource: https://foliomatch.app/privacy.html
tags: [安全, 隱私, privacy, 18+, 檢舉, 封鎖, moderation, 防刷]
timestamp: 2026-06-18T00:00:00Z
---

# 安全、隱私與年齡限制

[Folio](./folio.md) 作為交友 app，信任是最重要的設計面。

## 年齡限制（18+）

- 註冊問**出生年月日**（不直接問年齡），未滿 18 歲無法註冊。
- DB 層強制：不論註冊或日後變更生日，未滿 18 一律擋下。
- 性別 / 出生年月日可自行變更，各自 7 天冷卻（非永久鎖定，兼顧資料穩定與更正權）。

## 檢舉、封鎖與後台

- 提供**檢舉**與**封鎖**；後台可 ban 違規帳號。對齊商店審查與 DSA 合規。

## 隱私保護

- 他人資料透過受限的公開 view 取得（只給必要欄位，例如年齡而非生日）。
- 帳號刪除：移除帳號與個資，共有產出（對話 / 便利貼）匿名化保留（joint controllership）。
- 法律文件 master 公開於官方網站：
  [隱私權政策](https://foliomatch.app/privacy.html) ・ [服務條款](https://foliomatch.app/terms.html)。

## 訊息安全

- 訊息長度上限 + 速率限制（每分 / 每日），防刷、防 bot 灌訊息。

相關：[Folio 是什麼](./folio.md) ・ [品牌與命名](./brand.md)
