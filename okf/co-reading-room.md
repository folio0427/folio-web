---
type: Product Feature
title: 共讀室與進度閘
description: 配對後進入共讀室；聊天起始鎖定，雙方各讀到 25% 並各寫一則心得才解鎖自由聊天。
tags: [共讀室, room, 進度閘, 解鎖, 25%, 100%, 慶祝]
timestamp: 2026-06-18T00:00:00Z
---

# 共讀室與進度閘

[配對成立](./matching-flow.md)後，雙方進入一間**共讀室（Room）**。一個帖子可開多間
共讀室（答應 3 人 = 3 間）。

## 生命週期

1. **起始：鎖定（LOCKED）** — 只能用固定罐頭訊息 + 拉自己的進度；自由打字停用。
   頂部有 sticky 進度卡，顯示雙方進度。
2. **進度推進** — 拉進度到 ≥ 25% 時，跳出寫「25% 心得」[便利貼](./notes-and-reflections.md)（必填）。
3. **解鎖（UNLOCK）** — 條件：**雙方各自 ≥ 25%（room-scoped）+ 各自在此房間寫過一則心得**
   （共 4 個 ✓）。解鎖後可自由聊天、[引用便利貼](./notes-and-reflections.md)。
4. **100% 雙事件**：
   - 單方先到 100% → 可選寫 100% 心得 → 解鎖[讀後分享卡](./notes-and-reflections.md)。
   - 雙方都到 100% → 共讀室內慶祝畫面 + 紀念訊息（含開始／結束日、共讀時長）。

## 進度從哪來

進度是 [User × Book 的全局值](./progress-model.md)：配對時若對方已讀 60%，會如實顯示。
解鎖閘在 Room 層判斷，但進度與心得跨房間 + 書房同步。

相關：[進度模型](./progress-model.md) ・ [便利貼與分享卡](./notes-and-reflections.md) ・ [產品差異點](./differentiators.md)
