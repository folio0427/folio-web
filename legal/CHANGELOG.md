# Folio Legal Documents Changelog

每次更新條款 / 隱私政策時、在此記錄變更摘要。
此 changelog 為**律師審閱記錄 + 法律證據鏈**、不可刪除歷史條目。

## 規範

- 版本號採 `vMAJOR.MINOR`、minor 用於錯字 / 章節重排、major 用於實質變更
- 每筆需註記：版本、日期、文件類型、變更類型、摘要、實質變更時須附 PR / commit hash
- 格式：`## v[版本] — [日期]`

---

## terms v1.5 / privacy v1.5 — 2026-06-24

> **發佈批次** — manifest.json + 四份文件標頭 v1.5、effective_date 2026-06-24（push 當日）。
> 發佈程序：commit + push folio-web → 跑 `scripts\sync_legal.bat`（同步進 app/assets/legal）→ GitHub Action 同步 tos_versions → 全用戶 re-consent。
> change_type = major（新增澳洲 / 澳門司法管轄區 + 管轄 / 責任條款）。

**狀態**：正式（生效日 2026-06-24）
**文件**：terms_zh.md、terms_en.md、privacy_zh.md、privacy_en.md、manifest.json
**變更類型**：major（除原美國上架合規批次外，新增澳洲與澳門兩個司法管轄區之適用法律、用戶權利與管轄/責任條款 —— 屬實質變更。美國批：US-state 隱私權揭露、敏感類標旗、不販售/不分享聲明、DMCA 程序、責任 carve-out、美國安全資源；**無新增蒐集、無新增第三方分享、無新增使用目的**。註：app LegalGate 以版本號觸發、change_type 僅決定 modal 標籤）
**摘要**：

美國地區上架前合規批次。terms 1.4 → 1.5、privacy 1.4 → 1.5。

**Privacy 變更：**

- §01 適用法律：美國由「加州用戶適用 CCPA」改寫為「美國用戶適用 CCPA/CPRA 及其他綜合隱私法之州；本平台目前規模可能未達受規範企業門檻、惟仍自願將權利延伸予美國各州居民」。修正「自我宣稱為 CCPA 受規範 business」之過度宣稱（FTC §5 representation 風險）。
- §02 新增「敏感個人資料之特別說明」：揭露 stance（尤其 fate）+ desired_gender 合併可衍生**性傾向**訊號、於 CCPA/CPRA 及維州系列州法屬敏感類；明示「僅用於提供服務（配對）、絕不用於廣告 / 剖繪、由用戶 opt-in」。並澄清分析服務僅收 `mode + age`、**不附性別 / desired_gender** → 性傾向推斷不外送（消除與 §04 之表面矛盾）。
- §04「不分享給」後新增明確聲明：「**不販售**、亦**不為跨情境行為廣告分享**個人資料；未嵌廣告 SDK、App 內無廣告」。
- §07 新增「**美國各州隱私權**（CCPA/CPRA 及其他州）」子節：知悉 / 查閱 / 刪除 / 更正 / 拒絕販售分享 / 限制敏感資料使用 / 不歧視；說明規模或未達門檻仍自願提供。
- 英文版（privacy_en.md）同步。

**Terms 變更：**

- §05「禁止內容違法」新增：商業性交易、媒介賣淫 / 性招攬、人口販運 / 性剝削、以對價換取陪伴或性關係（sugar-dating）。強化 FOSTA-SESTA §1595「good actor」姿態 + 對齊 Apple 1.1.4 / Google Play。
- §07 新增「**美國 DMCA 通知與取下程序（17 U.S.C. §512）**」子節：指定代理人（folio0427@gmail.com）、通知要件、取下、反通知、還原（10–14 工作日）、重複侵權者終止。為取得 §512 安全港。
- §08 安全守則新增：美國向措辭（個檔 / 初次訊息勿透露全名 / email / 電話 / 工作地、被逼問個資或金錢即停）；緊急聯絡**依地區**（台灣 110/113、美國 911 + FTC reportfraud.ftc.gov + FBI IC3 ic3.gov）；明示「不對用戶進行刑事背景查核或身分驗證」。
- §13 免責新增 carve-out：不排除依適用強行法不得排除之責任、及本平台因故意 / 重大過失所生之責任。
- §14 責任上限新增 carve-out：上限與排除不適用於 (a) 故意 / 重大過失、(b) 人身傷害或死亡、(c) 慣居地強行消費者法不得排除限制之責任。
- 英文版（terms_en.md）同步。

**Privacy 變更（澳洲 / 澳門，2026-06-17 追加）：**

- §01 適用法律新增：澳洲用戶適用 Privacy Act 1988 + APPs（主管機關 OAIC）+ Online Safety Act 2021（eSafety）；澳門用戶適用第 8/2005 號法律（主管機關 DSPDP，2024-02-01 自 GPDP 更名）。
- §05 跨境傳輸新增澳洲段：依 APP 8 就境外接收者（Supabase 新加坡 / Google / Apple）負當責。
- §07 新增「澳洲隱私權（APPs）」子節（查閱 APP 12 / 更正 APP 13 / 敏感資料同意撤回 / NDB 外洩通知 / OAIC + eSafety 投訴）與「澳門個人資料權（8/2005）」子節（查閱 / 更正 / 反對 / DSPDP 投訴）。
- §10 資料安全新增澳洲 NDB（第 IIIC 部）外洩通知機制。
- §12 聯絡新增主管機關：OAIC + eSafety（澳洲）、DSPDP（澳門）。

**Terms 變更（澳洲，2026-06-17 追加）：**

- §14 責任限制新增澳洲消費者 carve-out：不排除《澳洲消費者法》（ACL）不可排除之消費者保證；ACL 保證之責任限於重新提供服務或支付其費用（codex 紅隊指既有籠統 carve-out 不足、須明文點名 ACL）。
- §17 準據法新增：強行法例示加入澳洲；台北地院專屬管轄不適用於澳洲消費者（Karpik v Carnival [2023] HCA 39）。

**補強（2026-06-17，多區 compliance workflow 稽核發現）：**

- §04 用戶間顯示補列「想找的性別（依過濾矩陣有條件顯示）」（原僅列於蒐集、未列於對外顯示 → 透明度補正）。
- §08 新增 **CalOPPA Do-Not-Track 揭露**：不回應 DNT、無第三方行為廣告 cookie、唯一用量處理者為 Firebase Analytics。CalOPPA（加州 B&P §22575）無規模門檻、是唯一不論公司大小都吃的美國隱私要求。
- privacy_en 澳門主管機關英文名校正：「Office for Personal Data Protection」→「Personal Data Protection Bureau」（2024-02-01 第 42/2023 號行政法規重組為常設局；DSPDP / dspdp.gov.mo 不變）。

**資料流校正（2026-06-17，codex 實查 app code 發現）：**

- §02 敏感資料：原稱「想找的性別」用於「配對與過濾」、但程式（`filters.dart` `canSeeEachOther` 只看 stance）證實它**僅顯示、不參與配對篩選** → 改正為「心態用於配對過濾矩陣、想找的性別僅對符合條件之對方顯示」。
- §02 / §04：原稱分析服務收到「心態 + 年齡」cohort 訊號；已將 **stance（心態）自 Firebase 全面移除**（持久 user property + 報名 / 接受事件之雙方 stance 參數，屬 app code 改動、待隨 build 發版）→ 改為「Firebase 僅收年齡 + 去識別化使用事件、不收心態 / 性別 / 想找性別」；心態 cohort 分析改於 Supabase 第一方 SQL 進行。

**變更類型理由**：本批為美國上架合規補強 —— US-state 隱私權之揭露補正、敏感類別標旗（既有蒐集之揭露 / 分類補正、**非新蒐集**）、不販售/不分享之有利聲明、DMCA 程序、責任 carve-out、美國安全資源。美國批本身非新增蒐集、非新增第三方分享、非改變使用目的（單獨可為 `minor`）；惟本版另追加澳洲 / 澳門司法管轄區之適用法律 + 管轄 / 責任條款、屬實質變更 → 整體分類 `major`（與 manifest 一致）。註：app LegalGate 對 minor / major / data_consent_required 均以「accepted 版本 < 最新版本」觸發同一阻擋式 modal、change_type 僅決定 modal 標籤；現有用戶下次開 app 仍會因 1.4 → 1.5 被 LegalGateGuard 強制重新取得同意。

**法律依據**：Cal. Civ. Code §1798.140(d)/(ae)/§1798.121（CCPA/CPRA）；維州系列州隱私法（敏感資料）；FTC Act §5（陳述一致性）；17 U.S.C. §512（DMCA 安全港）；FOSTA-SESTA（§230(e)(5)(A) carve-out 姿態）；各州約會安全法 + FTC 反詐騙立場；台灣民法 §222（故意/重大過失不得預先免除）、消保法 §12 / 民法 §247-1。

**待辦（push 時一併）**：bump `manifest.json` terms/privacy 1.4→1.5 + change_type=major；bump 四份文件標頭版號；跑 `scripts\sync_legal.bat`；commit + push folio-web → GitHub Pages 重建 + sync_tos_versions workflow 自動 upsert terms 1.5 / privacy 1.5；重建 app 帶新 bundled fallback；App Store / Play 資料安全表單依 `STORE_DATA_DISCLOSURE_CHECKLIST.md` 確認。

---

## terms v1.4 / privacy v1.4 — 2026-06-05

**狀態**：正式（生效日 2026-06-05）
**文件**：terms_zh.md、privacy_zh.md、privacy_en.md、manifest.json（terms_en.md 僅標頭版號 bump、內容不變）
**變更類型**：minor（補齊後續版本新功能所需之蒐集揭露 + 部分敘述用詞精確化；無新增蒐集、無新增第三方分享、無新增使用目的）
**摘要**：

配合 app 後續版本（1.0.7 起）新增之「地區（選填）」個人檔案欄位，依「揭露在先、處理在後」原則預先補齊相關蒐集揭露；並修改部分敘述用詞使表述更精確一致。terms 1.3 → 1.4、privacy 1.3 → 1.4。

**Privacy 變更：**

- §02「收集之個人資料」新增「地區（選填、由您自行填寫之文字、可留空、可隨時修改）」。此欄位將於 app 後續版本（1.0.7 起）之註冊流程（`basic_screen`）與「我」頁提供、存於 `profiles.location`；依「揭露在先、處理在後」原則於功能上線前先行揭露。英文版同步補「Region」。
- §04「用戶間之顯示」補列「地區（若您填寫）」— 該欄位將顯示於對方個人檔案（`peer_profile_sheet`）與貼文詳情（`post_detail_screen`）。
- §04「用戶間之顯示」補充揭露「性別、年齡」對其他用戶之顯示（依抱持心態過濾矩陣、純粹書友之檢視者不顯示性別；年齡由出生年月日推算、`v_public_profiles` 僅曝 `age` int 不曝完整 `birth_date`）。此為既有顯示行為（自 app v2.1 起即顯示於對方個人檔案 / 貼文詳情）之揭露補正、先前未於本節明列；同時揭露 app v2.8（1.0.7）新增之 `hide_gender` / `hide_age` 隱藏開關（用戶可選擇不對外顯示性別 / 年齡、伺服器端由 `v_public_profiles` 之 `CASE … THEN NULL` 強制）。屬揭露完整性補正 + 新增用戶隱私控制、非新增蒐集、非新增第三方分享、非改變使用目的。英文版同步補。
- 修改部分敘述用詞，使表述更精確、並與全文及 app UI 用語一致（§02、§04、§06）；不涉蒐集範圍、權利義務或處理目的之變更。

**Terms 變更：**

- 修改部分敘述用詞，使表述更精確一致（§05、§06）；英文版內容不變、僅標頭版號 bump。無實質條款變更。

**變更類型理由**：本批為 (1) 配合後續版本新功能「地區」欄位、依「揭露在先、處理在後」原則之預先揭露、(2) 部分敘述用詞之精確化；非新增蒐集行為、非新增第三方分享、非改變使用目的，故採 `minor`。註：app LegalGate 對 minor / major / data_consent_required 均以「accepted 版本 < 最新版本」觸發同一阻擋式 modal、change_type 僅決定 modal 標籤文字；現有用戶下次開 app 仍會因 1.3 → 1.4 版號 bump 被 LegalGateGuard 強制重新取得同意。

**法律依據**：台灣個資法 §8 告知義務（地區欄位揭露）；GDPR Art. 13 透明性、Art. 5(1)(a)；香港 PDPO DPP1（蒐集告知）/ DPP5（開放）。在地化用語屬文意清理、不涉實質義務變更。

**對應 Supabase tos_versions**：由 sync_tos_versions workflow 於 manifest.json push 後自動 upsert（含 summary）terms 1.4 / privacy 1.4 active row。

**待辦（非條款本身）**：

- 跑 `scripts\sync_legal.bat` 同步進 `app/assets/legal/`（離線 fallback）。
- commit + push folio-web → GitHub Pages 重建 + sync_tos_versions workflow 觸發。
- 重建 app（flutter build）使 bundled fallback 帶新版。
- （商店問卷）App Store「App 隱私」/ Google Play「資料安全」：確認「地區」自填欄位已反映於蒐集之資料類型（粗略位置 / 使用者內容）。

---

## terms v1.3 / privacy v1.3 — 2026-06-02

**狀態**：正式（生效日 2026-06-02）
**文件**：terms_zh.md、terms_en.md、privacy_zh.md、privacy_en.md、manifest.json
**變更類型**：major（新增香港管轄地區適用 + 既有蒐集行為之揭露補正：檢舉 / 封鎖資料、同意紀錄 IP / 裝置識別、通知送達紀錄）
**摘要**：

香港地區上架前合規批次。新增香港《個人資料（私隱）條例》(PDPO, Cap. 486) 適用、並補正既有資料蒐集行為之揭露。terms 1.2 → 1.3、privacy 1.2 → 1.3。

**Privacy 變更：**

- §01 適用範圍新增「香港用戶適用：個人資料（私隱）條例（PDPO，第 486 章）、主管機關 PCPD」。
- §02 校正：喜歡的書籍類別上限由「最多 5」更正為「最多 10」（對齊 app `kMaxBookCategories = 10`、原文 stale；pre-push review 抓出）。
- §02 揭露補正（既有蒐集、先前未明列 → 揭露 catch-up）：帖子 / 書房補列「作者」欄；聊天訊息補列「回覆引用之原訊息片段」；新增「讀後心得分享卡（心得、作者、閱讀起訖日、模板）」獨立項；書房補列「分類、閱讀進度與頁數」；**新增「檢舉與封鎖資料」項** — 明確揭露檢舉時伺服器擷取之內容快照範圍（含被檢舉者個人資料、近期貼文、雙方共讀室訊息與便利貼）、及封鎖僅記錄對應關係、被封鎖者不獲通知、該等資料僅供審核 / 管理人員必要範圍存取。
- §03 直接行銷：區分服務型推播（非直接行銷）與行銷推播（須另行明示同意、可免費撤回）、對齊 PDPO 第 6A 部。
- §04 法定揭露新增「香港 PCPD 停止披露通知 + 香港法律下合法內容移除要求」。
- §05 跨境傳輸新增香港段：HK 無資料在地化要求、第 33 條未生效、仍依 PCPD 建議保障措施處理。
- §06 同意紀錄補列「IP 位址 + user-agent」為法律證據；新增「條款變更通知送達紀錄（tos_notification_log）」保留說明。
- §07 新增「香港 PDPO 賦予之權利」：查閱（DAR）/ 改正（DCR）/ 拒絕直接行銷 / 向 PCPD 投訴 / 40 日回覆期限。
- §11 同意生效方式：移除未實作之「7 日緩衝 / 暫緩」承諾、改為據實描述阻擋式 modal（同意或刪帳號、無緩衝）— 對齊 app LegalGate / TosUpdateModal 之 hard-block 行為（程式註解明載 GDPR / 個資法須先同意後處理、不設寬限）。
- §12 聯絡資訊新增主管機關（香港）PCPD。
- §06 檢舉紀錄保留：揭露既有 5 年清除機制（`purge_reports` cron：結案 actioned/dismissed 後 5 年自動真刪、未結案不刪），對齊 code、補上原本缺漏之保留期限揭露。
- §06 匿名化措辭修正：刪帳號後共讀內容之保留，由「匿名化後不再屬於可識別個人資料」改為精確描述「僅移除帳號連結並以『已離開的書友』顯示；內文若本身含可識別資訊仍可能為個資、依法律 / 檢舉 / 刪除請求處理」——避免過度宣稱、對齊 PCPD 較嚴之匿名化標準（已驗證 code：sender_id→NULL、messages 不快取暱稱、作者身分確實清除，殘留風險僅在內文自填 PII）。

**Terms 變更：**

- §06 UGC 新增「依各營運地區適用法律移除違法 / 受主管機關要求移除之內容（含 PCPD 去起底停止披露通知、香港法律下合法內容移除要求）」。
- §06 新增「內容不代表平台立場」：用戶內容僅代表發布者、本平台為中立媒合場所、不背書、不擔保內容真實 / 合法，惟仍得依法 / 依本條款限制移除處置（UGC safe-harbor 姿態、配合 HK PDPO s.66M 去起底移除令可及境外平台）。
- §13 免責新增「非專業建議」：書籍心得 / 討論屬個人意見、非專業 / 醫療 / 心理 / 法律 / 財務 / 投資建議，重要決定請諮詢合格專業人士。
- **新增 §15 用戶賠償（indemnification）**：用戶因其內容 / 違約 / 侵權致平台受第三人求償、損害或依法可轉嫁之裁罰時，於法律允許最大範圍內賠償；限「可歸責於用戶且直接造成」之範圍、carve out 平台故意 / 重大過失與依法不得免除 / 轉嫁之責任、且不影響用戶對他人依法應負之責任。
- **章節重編號**：原 §15 條款修改 → §16；原 §16 準據法與管轄 → §17（兩者內容不變、僅編號順延）。
- **新增 §18 一般條款（boilerplate）**：可分性、完整合意、不放棄、權利讓與（企業重組 / 公司設立 / 併購時可移轉本契約、免逐一重簽）、語言版本（中文為準）、存續條款。屬業界標準雜項條款、原本缺漏。
- 用戶賠償條款之法律依據：HK《管制免責條款條例》Cap. 71 s.9（消費者賠償條款須過合理性測試）+ s.7（疏忽致死 / 人身傷害不得免責、其他損失受合理性測試）；台灣消保法 §12、民法 §247-1（定型化契約顯失公平條款無效）、民法 §222（故意 / 重大過失責任不得預先免除）、行政罰法 §3 / §7（平台自身行政罰屬公法責任、不可契約轉嫁用戶）。

**變更類型理由**：本批主軸為新增香港管轄 + 補揭露既有蒐集行為（非啟動新蒐集、非新增第三方分享）。依 §15「管轄」屬重大變更、採 `major`；檢舉 / 封鎖屬既有蒐集之揭露補正、非新蒐集、故不採 `data_consent_required`。註：app LegalGate 對 minor / major / data_consent_required 均以「accepted 版本 < 最新版本」觸發同一阻擋式 modal（agree-or-delete、無緩衝）、change_type 僅決定 modal 顯示之標籤文字（重大變更 / Major change）與顏色；故此分類屬法律記錄 / 顯示用途、不影響 re-consent 是否觸發。現有用戶下次開 app 仍會因 1.2 → 1.3 版本號 bump 被 LegalGateGuard 強制重新取得同意。

**法律依據**：香港 PDPO 六項保障資料原則（尤其 DPP1 蒐集告知、DPP3 使用限制、DPP5 開放、DPP6 查閱改正）+ 第 6A 部直接促銷 + 第 8A 部去起底 + s.33（未生效）；GDPR Art. 13 透明性、Art. 4(5) 假名化；台灣個資法 §8 告知義務。

**對應 Supabase tos_versions**：由 sync_tos_versions workflow 於 manifest.json push 後自動 upsert（含 summary）terms 1.3 / privacy 1.3 active row。

**待辦（非條款本身）**：

- 跑 `scripts\sync_legal.bat` 同步進 `app/assets/legal/`（離線 fallback）。
- commit + push folio-web → GitHub Pages 重建 + sync_tos_versions workflow 觸發。
- 重建 app（flutter build）使 bundled fallback 帶新版。
- App Store Connect「App 隱私」/ Google Play「資料安全」問卷：確認檢舉快照、IP / user-agent 已反映於「資料類型」。
- （可選）PICS：註冊頁加香港 PDPO 風格之個人資料蒐集聲明（目前以本政策 §02 + GDPR 同意 UI 涵蓋）。

---

## terms v1.2 / privacy v1.2 — 2026-05-22

**狀態**：正式（上線版本、生效日 2026-05-22）
**文件**：terms_zh.md、terms_en.md、privacy_zh.md、privacy_en.md、manifest.json
**變更類型**：minor（正式版上線定版；條文沿用 v1.1）
**摘要**：

- terms 1.1 → 1.2、privacy 1.1 → 1.2。v1.2 為 **Folio 正式版上線版本** — 將服務條款與隱私權政策定為正式生效版本（v1.0 / v1.1 為 pre-launch 草稿）。四份條款文件（terms_zh / terms_en / privacy_zh / privacy_en）之條文內容沿用 v1.1。
- 文件標頭版號與 manifest.json 版號同步更新至 v1.2、兩者維持一致。
- manifest：terms / privacy change_type 皆 minor、生效日 2026-05-22。依現行政策 §11 / §15 分級，任何變更（含 minor）皆以阻擋式 modal 重新取得同意 — 已同意 v1.1 之用戶下次開 app 將被 LegalGateGuard 重新取得 v1.2 同意。
- 對應 Supabase tos_versions：由 sync_tos_versions workflow 於 manifest.json push 後自動 upsert（含 summary）更新 terms 1.2 / privacy 1.2 row。

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
