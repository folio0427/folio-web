# Folio Legal Documents Changelog

每次更新條款 / 隱私政策時、在此記錄變更摘要。
此 changelog 為**律師審閱記錄 + 法律證據鏈**、不可刪除歷史條目。

## 規範

- 版本號採 `vMAJOR.MINOR`、minor 用於錯字 / 章節重排、major 用於實質變更
- 每筆需註記：版本、日期、文件類型、變更類型、摘要、實質變更時須附 PR / commit hash
- 格式：`## v[版本] — [日期]`

---

## terms v1.8（未變更）/ privacy v1.10 — 2026-09-22（草稿／未發佈）

> **草稿批次** — manifest.json privacy 1.10、terms 維持 1.8 不動。
> ⚠ **尚未 commit、尚未 push。`push` 那一下就是發佈**（無預覽、無排程）。
> **effective_date 2026-09-22 是佔位值**、實際 push 當日必須把**四處日期**一起改成當天：
> ① `manifest.json` 的 `privacy.effective_date`（`YYYY-MM-DDT00:00:00+08:00`）；
> ② `privacy_zh.md` 第 3 行標頭的「生效日」與「最後更新」；
> ③ `privacy_en.md` 第 3 行標頭的 Effective Date 與 Last Updated；
> ④ 本條目之標題日期與本段。（`terms` 區塊之 effective_date 2026-09-17 **不要動**。）
> 發佈程序：commit + push folio-web → GitHub Action `sync-tos-versions` 同步 tos_versions →
> 回 `<folio>` 跑 `scripts/sync_legal.sh` 更新 app bundled fallback → build。
> push 前先 `git fetch`、看 `prerender-legal.yml` 有沒有自己 commit 新的渲染 html。
> change_type = **data_consent_required（privacy）** → **全體用戶跳阻擋式 modal 重新同意**。
> ⚠ **時機**：terms 1.8 / privacy 1.9（2026-09-17）那一批仍在收集全體同意。本批是在其上再疊一層
> **data_consent_required**（不是 minor、不觸犯「不可把 minor 疊在尚未被同意的 major 之上」之鐵則），
> 但兩批相隔數日、使用者會連續看到兩次阻擋式視窗；請與 1.0.17 發版時程一起決定發佈日。
> ★ **本批應早於 app 1.0.17 上架**：所揭露的兩項處理都只在 1.0.17 才發生（匯入書單、每日 Open
> Library 熱門書單），條款先行是正常順序；1.9 那批是上線後補揭露、勿重演。

**另改（2026-09-23 補）**：「匯入書單」拿掉「僅國際區提供」—— 創辦人決定兩區都開（`intlLayout` 管版面、匯入是功能）。Open Library 每日熱門書單那段**不動**，它確實只在國際區顯示。

**另改（2026-09-23 補）**：漂流瓶「回覆他人漂流瓶時暱稱與頭像隨回信顯示」改為「回信同樣以匿名方式（「遠方的讀者」）送達、成立筆友後才互相顯示暱稱」—— 對齊 app 1.0.17 起的實際行為（創辦人 09-17 裁定；伺服器端推播 `notify_drift` v15 已先上線、app 端隨 1.0.17 上線）。舊句沿用自 1.9、若不改會變成「文件說得比實際更揭露」。

**狀態**：草稿／未發佈（生效日 2026-09-22 為佔位）
**文件**：privacy_zh.md、privacy_en.md、manifest.json
**變更類型**：
- terms **未變更、維持 1.8** — 逐句核對後無一句因本批而失真：§02 服務性質未宣稱書目來源；§06 UGC
  清單已含「書名」（匯入上傳的就是書名與作者文字）；§07 書籍引用與著作權只規範「書籍原文」之引用與
  上傳、匯入不涉及原文。故本批不動 terms
- privacy **data_consent_required** — **新增資料來源**（您裝置上的 Goodreads／StoryGraph 匯出檔）
  與**新增離開裝置之欄位**（書名、匯出檔所載之作者文字、該列是否已讀），屬新增蒐集項目；並新增一個
  站方伺服器對外之公開資料來源（Open Library 每週熱門書單、英文書目資料集）

**Privacy 變更（v1.9 → v1.10）：**

- §02 使用過程產生 — **新增兩點〈匯入書單〉**（僅國際區）：以作業系統檔案選取器挑選 Goodreads /
  StoryGraph 匯出檔（CSV）、**完全於裝置本機解析**；上傳者只有**書名、匯出檔所載之作者文字、該列是否
  標記為已讀**（已讀＝進度 100%、其餘 0%、**不覆蓋既有進度**）；上傳之書名僅與站方書目比對（同手動
  加書）；匯入之書即書房內容、適用相同之顯示／保留／刪除規則。第二點逐項列出**不上傳亦不儲存**者：
  評分、閱讀日期、已讀與否以外之書架名稱、書評文字、檔案本身；並寫明匯入結束後不於裝置保留
  （第二輪：ISBN 改為「送伺服器比對站方書目後即捨棄、不儲存」——client 1.0.17 匯入時用 ISBN 釘選作品，見 v191）
  該檔案或解析結果
- §03 收集目的 — 書籍推薦與榜單之輸入補「（含您以『匯入書單』加入之書）」（匯入之書進書櫃、就會進
  既有的彙總計數，不補這一句等於漏講目的擴張）
- §04〈您的裝置直接連線之第三方（書籍封面圖片）〉— **新增一點**寫明此方式適用 App 內**所有**顯示封面
  之畫面（書籍頁、書櫃、貼文卡、共讀室列表），並說明版面顯示封面之處較多時、載入次數隨之增加
  （國際區版面之直接後果；**未新增任何主機**，Google Books／Open Library／國家圖書館三家不變）
- §04 — **新增〈公開書目資料來源（不接收您的個人資料）〉小節**三點：伺服器每日一次向 Open Library
  （Internet Archive、美國）取公開之每週熱門書單供國際區瀏覽；英文書目（約 17 萬筆、僅書目欄位）取自
  其公開資料集；★ 兩者皆由**伺服器**發出、**不含帳號識別碼／IP／書櫃內容**、Open Library 於此為
  **資料來源而非接收者**；另明寫「匯入書單**不連線 Goodreads／StoryGraph**、不向任何第三方傳送書單」
- §04 用戶間之顯示 — 社群分區那一點補上**澄清**：**站方書目資料（書名、作者等非用戶內容）不受社群
  分區限制**、搜尋或輸入書名時可能看到另一分區目錄之書（標示為其他語言）；**惟該等書上之公開便利貼、
  書評與書友頁仍僅限同一社群分區**（`book_suggest`／`club_search` 分區感知、`club_*` 牆照舊同區）
- §05 跨境傳輸 — **新增一點**：匯入之解析在裝置完成、僅前述三項上傳至 Supabase（新加坡）；伺服器每日
  向 Open Library（美國）取熱門書單之連線**不含個人資料、非個人資料之跨境傳輸**
- §06 保留期間 — **刻意未改**：匯入之書即書房內容、既有「帳戶存續期間保留以提供服務」與帳戶刪除清單
  之「您的書房（書與個人便利貼）」已完全涵蓋；CSV 檔案與解析結果不留存、無保留期間可寫
- §08 Cookie 與類似技術 — **未改**：匯入不於裝置新增任何儲存（檔案只讀進記憶體、`readAsString`）

**核對紀錄（2026-09-22，對照 `<folio>` master 工作區之 client 程式碼與 edge function）：**
- 上傳欄位逐行核對 `app/lib/services/library_import_runner.dart`：只有 `title`（經
  `stripBookTitleWrapping`）、`bookAuthor: row.author`、`percent: status == read ? 100 : 0`
  三項離開裝置；`upsert_book` 一參數（不釘選目錄作品）；`authoritativePercent: false` ＝ 既有進度不被
  蓋掉（`kImportAuthoritativePercent` 常數 + 測試釘死）
- 解析器 `library_import.dart` 確有讀出 `rating` / `dateRead` / `isbn13`，但**三者只進記憶體與結果卡
  計數、從不上傳**；條文據此寫「不上傳亦不儲存」而非「不解析」（寫「不讀取」會是假的）
- ★ **與上游說明不一致之處**：上游描述「書名會去除 Goodreads 的系列字尾（例如 `(Mistborn, #1)`）」，
  但 client 現況**沒有任何系列字尾處理** —— `stripBookTitleWrapping` 只脫外層《》並 trim
  （`app/lib/util/book_title.dart`）。條文因此只寫「書名」、**不寫「去除系列字尾後的書名」**（照上游
  寫法會是不實陳述）。若 1.0.17 發版前補上該處理、本條文仍為真、不必改
- 檔案生命週期核對 `app/lib/screens/proto/me/import_library_flow.dart`：`openFile` →
  `file.readAsString()` → 字串進 parser；**全程無任何寫檔、無快取、無 SharedPreferences**
- 每日熱門書單核對 `supabase/functions/fetch_ol_trending/index.ts`：cron 台北 05:10 →
  `dispatch_fetch_ol_trending()` → edge fn 打 `openlibrary.org/trending/weekly.json`；送出的只有
  User-Agent 與 function secret `OL_CONTACT_EMAIL`（Folio 官方信箱、**非用戶資料**）；結果寫
  `club_trending_cache`、只對 intl 有值
- 分區澄清核對 `supabase/migrations/20260920110000_v181_book_identity_functions.sql` 第 4 節
  （`book_suggest` / `club_search` 分區感知、另一分區之目錄結果標「其他語言」；`club_key_check` 以
  呼叫者分區解析）

**刻意未納入本批（寫進來就是不實陳述）：**
- **Apple iTunes Search API / mzstatic 封面**：1.0.16 未用、1.0.17 亦已廢（09-17 那批移出時列為「發版前
  須另發一批」之理由已消滅）。**不得**寫進第三方或跨境清單
- `progress.source`：prod 全為 NULL、匯入路徑未寫入
- 閱讀日誌（reading journal）／相機／OCR：未發版，§02「不收集：麥克風、相機」維持原狀
- Goodreads／StoryGraph **帳號連結或 API 串接**：不存在、只有使用者自己挑的檔案

**已知、未在本批處理（程式面待辦）：**
- 匯入每本書走一次 `upsert_book`（每日 400 本配額）、撞配額即中止；條款不寫配額（屬服務限制、非隱私）
- 國際區版面現況幾乎無封面可載（`books.cover_url` prod 15,447 本只有 1 本有值）；§04 新增那句講的是
  機制而非現況，`upsert_book` 釘選時抄目錄封面做完後才會真的變多，屆時無須再改條款

---

## terms v1.8 / privacy v1.9 — 2026-09-17

> **發佈批次** — manifest.json terms 1.8 + privacy 1.9、effective_date 2026-09-17（push 當日）。
> 發佈程序：commit + push folio-web → GitHub Action 同步 tos_versions → 回 `<folio>` 跑
> `scripts/sync_legal.sh` 更新 app bundled fallback → build。
> change_type = **major（terms）/ data_consent_required（privacy）** → **全體用戶跳阻擋式
> modal 重新同意**。
> ⚠ **本批是補揭露**：「大家的便利貼」client 已先於本批上線（prod 2026-09-16 起已有真人公開
> 便利貼；國際區 2026-09-17 由 v174 開啟），應儘速發佈。
> **鐵則**：本批上線後、在多數用戶尚未同意前不可再疊 minor 發布。

**狀態**：正式（生效日 2026-09-17）
**文件**：terms_zh.md、terms_en.md、privacy_zh.md、privacy_en.md、manifest.json、delete-account.html
**變更類型**：
- terms **major** — 新增「公開發布」之權利義務（三種公開操作、書評一律公開含評分、授權範圍擴及公開
  與彙整顯示、收回之界限、下架與功能限制）；停權通知管道更正（不寄 Email）
- privacy **data_consent_required** — 新增蒐集項目、新增可見範圍（同社群分區全體、不適用心態過濾
  矩陣、書評逐則顯示評分）、新增使用目的（以全體書櫃彙總計數做推薦與榜單）、新增第三方接收者
  （Google Books / Open Library / 國家圖書館因封面直連而取得 IP）

**校對紀錄（2026-09-17，對照 master 之 migrations、client 程式碼與 prod schema）**——09-15 初稿有下列
錯誤與缺漏，本批已更正後才發佈：
- 初稿「不顯示您個別給了幾分」→ **錯**：每則書評逐則顯示作者評分＋暱稱／匿名書友＋年月、可依評分
  排序（wire 帶 `rating`；`club_screen.dart` 書評卡）
- 初稿以「勾選『也貼到大家的便利貼』」為唯一公開路徑 → **不完整**：另有「貼上牆」
  （`club_publish_note`）與書評（`club_upsert_review`，無勾選框、一律公開）；勾選框路徑固定署名
- 初稿「撤回或下架後只留不含內容之紀錄（時間、書籍、事件類型）」→ **錯**：撤回墓碑
  `club_publish_log` 只有 user_id／kind／created_at、7 天清除；**下架**寫入 `moderation_actions`
  整列快照（含 content、永久保存）；檢舉快照含作者暱稱／性別／生日／心態、結案後 5 年
- 初稿「發布當下您所在之閱讀段落」→ 段落由作者自選、server 只檢查不超過可讀段；段落可自行解鎖
  （`club_unlock_to`）
- 初稿書目回報欄位「書名、作者、ISBN」→ 拆房只收作者（存為 `reason`）；缺書回報之書名由 server
  取自書櫃、作者／ISBN 選填
- 初稿封面來源只列 Google Books / Open Library → **漏列國家圖書館**（`pdsapp.ncl.edu.tw`：內建
  `book_art.json` 94 筆、prod `book_catalog` 53 筆）
- 初稿未揭露：書友頁可開個人資料卡且**不適用心態過濾矩陣**（`v_public_profiles` 無心態過濾）、書友頁
  可送附留言之好友邀請；封鎖不影響匿名貼；段落透露閱讀進度；編輯雙向連動；推薦與榜單使用全體書櫃
  彙總（含未用書圈者）；上線時凍結之逐人快照（`club_launch_cohort`，含心態、性別）
- 初稿 manifest 摘要含 `**` → `tos_update_modal.dart` 以純 `Text` 顯示、會把星號原樣秀給用戶；已去除

**發佈前第二輪獨立覆核（2026-09-17，逐條對照 prod 之 schema、函式、FK、cron 與 client 程式碼）修正之項目**：
- privacy §04「性別、年齡」**既有條文與實作不符**：原寫「依過濾矩陣顯示、純粹書友之檢視者不顯示性別」；實作為
  貼文卡、貼文詳情、共讀室顯示性別，貼文詳情、共讀室、報名資料、個人檔案顯示年齡，皆不看檢視者心態
  （`post_card.dart`、`post_detail_screen.dart`、`room_screen.dart`、`applicants_screen.dart`、
  `peer_profile_sheet.dart`；過濾矩陣只決定貼文是否可見與「想找的性別」是否顯示）。改為據實描述、摘要列為更正
- privacy §04 **補揭露既有第三方 Resend（美國）**：`submit_report` 於理由含 minor／sexual 時寄信給管理人員，
  內含檢舉理由、對象類型、檢舉人自填說明與 report_id（不含快照）；§05 跨境與 APP 8 一併補上
- privacy §06 **補揭露每日活躍名單** `daily_active_users`（day、user_id）：v28 刻意不設 FK（刪帳號不回頭改寫
  歷史活躍），prod 有 1,125 列屬已刪除帳號，與「使用分析原始紀錄隨帳戶刪除」不符；比照 supporter_events
  之處理據實揭露、不洗資料；delete-account.html 同步
- privacy §06 逐人快照改為已發生：`club_launch_cohort` 已於 2026-09-10 凍結，原文「可能於新功能上線時保存」
  改為「已於上線前保存一份、並可能再保存」；摘要一併揭露
- 段落決定方式：只有「貼上牆」由作者自選；勾選框路徑依該則之頁數或進度標記、未標記時依當下書櫃進度
  （`club_also_post.dart`）
- 補揭露「貼上牆」會同時建立書櫃私人便利貼、書不在書櫃時一併加入（進度 0%）（`club_write_sheet.dart`）
- 愛心相關紀錄據實拆開：`club_note_likes`（目前之愛心）、`club_like_events`（只有 user_id 與時間、頻率限制用、
  本人下次操作時清除 2 天以前者）、`club_note_like_push_log`（誰按過哪一則、取消愛心後仍保留）、
  `club_like_notify_day`、`club_bell_push_log`
- 瀏覽紀錄 `club_view_log` 由 `club_bake_boards()` 每日清一次：「保留 2 天」改為「約 2 至 3 天」；補
  `club_read_hourly`（每小時計次、3 小時後刪除）
- `club_publish_log` 除收回墓碑外亦記錄每次發布（配額用）：補揭露
- 下架後阻擋再公開之範圍以私人便利貼家族為單位（`notes.club_removed_at`）：terms、privacy 與摘要改為
  「該私人便利貼日後無法再用於公開」
- 補揭露私人便利貼上之 `club_anon_at`、`named_on_wall_at`、`club_removed_at` 標記（收回公開內容後仍保留、
  隨該私人便利貼刪除）
- 補註禁言期間修改連動中斷（`notes_sync_club_copy` 對禁言者跳過、`club_edit_note` 被 guard 擋下）
- 檢舉快照補列：書名、社群分區、修改時間、作者帳號建立時間
- 推薦與榜單：「最近熱門」另用閱讀進度更新時間與署名作者數；輸入書名時之建議排序用全站書櫃彙總
  （`book_shelf_pop`）
- 補揭露：`book_pick`（同名書之版本選擇）、已署名書評可事後改為匿名
- **本批只揭露目前上線版 App（1.0.16+21）實際發生之處理**（創辦人 2026-09-17 指示「條款要對齊目前 App
  上線的情況」）。因此移出本批：國際區以書名＋作者向 Apple iTunes Search API 查詢封面、自 mzstatic.com
  載圖、向 Open Library 取每週熱門書單、查得之封面網址寫入 `books.cover_url`（prod 目前 0 列），以及
  匯入 Goodreads／StoryGraph 匯出檔；兩者皆在 `international_ver` 分支、尚未發版。`progress.source` 亦移出
  （prod 38,059 列全為 NULL、上線版 client 未寫入）。**國際區版本發版前須另發一批 data_consent_required**
  （Apple 為新增第三方接收者）
- 「發現頁」改為「大家的便利貼」之「發現」分頁（介面沒有「發現頁」之稱）
- EN：三種心態名稱與 App 不一致，且同一份文件內 "Pure Book Friend / Open to Connection / Open" 與
  "Looking for fate / Open to either" 並存；全數對齊 App 字串 Reading friends only / Looking for fate /
  Open to either
- delete-account.html：補「大家的便利貼」公開內容與相關紀錄之刪除、逐人快照之刪除、每日活躍名單之保留；
  EN「a reader who has left」對齊 App「A book friend who left」；最後更新日改為 2026-09-17
- 本批新增文字中兩處破折號改為分號（文案規範）

**發佈前第三輪全文稽核（2026-09-17，三組平行逐句核對未改動之舊段落，基準為上線版 origin/master 1.0.16+21 與 prod）修正之項目**：
- 服務條款：§02 書評一律公開與「可選擇公開」之措辭矛盾、心態名稱對齊 App 選擇畫面「純粹找書友」；§04 冷卻期自註冊時起算
  （`*_changed_at` 預設建立時間）；§05 停權雜湊只在**永久**停權時記錄、表內另存原帳號識別碼與停權原因；§06「100% 整理頁
  分享」改為實際可分享之「讀後心得分享卡」（系統分享選單或下載圖片）；§10 書背樣式僅於訂閱結束後不可再改（降級仍可改）；
  §11 刪除後保留項目不只法令保留、24 個月判準補「且未使用、訂閱中除外」（`purge_dormant_accounts`）
- 隱私 §02：OAuth 另存 Google 顯示名稱與大頭貼網址；生日為「年齡限制」非驗證；角色造型移至使用過程產生；
  報名無「想說的話」（UI 從未實作、prod 0 筆）；里程碑「心得」已廢、改列便利貼；貼文補共讀方式與收藏；書房互動補推播
  去重與頻率限制紀錄；檢舉快照補貼文、書房、留言、漂流瓶對象之個資與檢舉人暱稱；設備資訊補 Firebase 自動收集之裝置型號；
  IP 實際存於登入工作階段與同意紀錄；操作日誌之功能點選為第一方；購買紀錄補價格、幣別、國家、原因、優惠碼；
  想找的性別**無冷卻**
- 隱私 §03：「媒合演算法」改寫為實際機制；**行銷推播機制不存在**、改寫為目前不發送；App 內公告實際含問卷邀請與支持方案介紹
- 隱私 §04：**RevenueCat 於登入後即以帳號識別碼查詢（非購買時才收）**；補 Firebase Remote Config（每次啟動、備援 GitHub
  Pages）與 Cloudflare（網站與條款託管、網站頁面載入 Google Fonts）；書房連結路徑不受社群分區限制；勳章已不對他人展示；
  報名僅發文者可見、分享卡不對他人顯示；共讀夥伴可引用您的牆上便利貼至聊天；**書房讚數僅房主可見**；**回覆漂流瓶時暱稱與
  頭像即顯示給投瓶人**
- 隱私 §06：貼文期滿 3 天刪除；**「IP／登入日誌 6 個月至 1 年」查無機制**（`auth.sessions` 無逾時、無清除），改寫為保留至登出或
  刪帳號；**`tos_notification_log` 從未寫入（prod 0 列）**、刪除該敘述；檢舉紀錄之暱稱與內容快照於刪帳號後仍保留；刑事調查
  改為「經司法或檢警要求保全」（無 legal hold 機制）；補每日備份 7 天；補頻率限制紀錄可能殘留（`bookcase_like_events`、
  `friend_invite_lookups` 無 FK）；聊天室無「刪除」功能、雙方皆離開時整房刪除；刪除清單補齊（所有報名、收藏、漂流瓶、
  站內通知、共讀室中之貼文與報名文字快照匿名保留）；移除具名之業界比較（LINE／WhatsApp／Discord、Bumble／Tinder／Hinge）
- 隱私 §07：冷卻自註冊起算；自動化決策改寫；敏感資料用途含自有後台彙總統計；澳洲撤回同意之實際方式（來信或改為純粹找書友）
- 隱私 §08：無 Keychain、補 SQLite 聊天快取與封面快取、補 Remote Config 與 RevenueCat 連線；§09「未經同意之未成年配對」與
  18+ 矛盾；§10 無密碼（實有審核用 Email 帳號）、最小權限（`profiles` 欄位權限過寬）、日誌監控（查無實作）三句改寫
- 隱私 §11：破折號改冒號；§12 台灣個資主管機關由 NCC／法務部更正為個人資料保護委員會（籌備處）
- manifest 四段摘要改寫：對齊正文（所在段落、發布或收回之紀錄、全站書名建議、檢舉快照、刪帳號刪除公開內容、上述校正重點）
- delete-account.html：同步上述刪除清單、匿名保留、統計與系統保留、同意紀錄內容（IP 與 user-agent 為明文）、付費紀錄欄位、
  24 個月判準；封存區信件改列「由 Folio 封存」

**Terms 變更（v1.7 → v1.8）：**

- §02 服務性質 — 補上「大家的便利貼」＝每本書一面公開便利貼牆與書評區（含評分）
- §05 違反處置 — 「限制功能」明列包含暫停公開牆發布權限（`profiles.club_muted_until`）
- §05 停權通知 — 刪除「與您 OAuth 登入之 email 同時通知」（系統沒有寄信給用戶的機制；實際為 App 內
  之通知視窗／停權畫面／使用受限功能時之提示）；通知內容改為「視處置類型」（公開牆禁言之提示只有
  期限、沒有原因）
- §06 用戶內容 — **新增〈公開發布至「大家的便利貼」〉一節**：三種公開操作（勾選／貼上牆／儲存
  書評）、書評一律公開含評分；預設署名、貼上牆與書評可匿名；授權範圍及於公開顯示與彙整顯示；須為
  本人所撰且不侵權；可收回但已被讀過／截圖／抄錄者無從回收；「只刪這裡」與移除整本書不刪公開副本；
  檢舉下架（之後不可再公開）與功能限制；★ 段落分段不是隱私或權限設定（讀者可自行解鎖）
- §06 帳號刪除後之留存 — 新增：公開便利貼與書評不適用匿名保留、隨帳號刪除（檢舉／處置快照除外）
- EN §06 交叉引用更正：「Book References & Copyright」→「Book Citations & Copyright」（對齊 §07 標題）

**Privacy 變更（v1.8 → v1.9）：**

- §02 使用過程產生 — 新增：公開便利貼與書評（文字、評分、書、書名寫法、所選段落、匿名、時間、與
  私人便利貼之對應）／公開牆互動與使用紀錄（愛心含按／取消時間、解鎖段落含自行解鎖、開過之公開牆與
  書友頁、進入來源與次數、「這本書的提醒」）／書目回報（拆房：作者；缺書：書櫃原書名＋作者＋
  ISBN）；社交關係補「附帶之留言與來源」；檢舉對象補「公開便利貼或書評」及其快照內容
- §03 收集目的 — 新增「書籍推薦與書籍榜單」（全體書櫃彙總計數、含未用書圈者、達一定人數才列入、
  不顯示身分）；服務型推播例示補「這本書的提醒」
- §04 — **新增〈您的裝置直接連線之第三方（書籍封面圖片）〉**：Google Books、Open Library、國家
  圖書館；對方可取得 IP、可由網址（ISBN／書籍識別碼）推知所看之書；本機快取 30 天；非受託處理者。
  （國際區之 iTunes 封面查詢已移出本批，見上方第二輪覆核）
- §04 用戶間之顯示 — 社群分區清單補「大家的便利貼」；**新增九點**：可見範圍與三種公開方式；書評逐則
  顯示評分、可依評分排序；★ 不適用心態過濾矩陣（書友頁、個人檔案、好友邀請）；匿名之範圍與限制
  （審核人員可見）；封鎖不影響匿名貼；段落透露閱讀進度、段落非隱私設定；修改連動；愛心數公開、書名
  寫法；可收回
- §05 跨境傳輸 — 補封面來源（Google 全球／Open Library 美國／國圖臺灣）；APP 8 境外接收者補
  RevenueCat 美國（第二輪另補 Resend 美國）
- §06 特定資料之保留期間 — 使用分析補「功能點選事件保留 365 天」與「新功能上線時之逐人使用狀態快照
  （含心態、性別等、隨帳號刪除）」
- §06 — **新增〈公開便利貼與書評〉小節**：保留至收回／下架／帳戶刪除（含 24 個月未登入）；「只刪這裡」
  與移除整本書不刪公開副本；收回墓碑不含內容、7 天清除、刪書評不留；檢舉／下架之快照依既有規定；
  ★ 刪帳號真實刪除（`club_notes.user_id` ON DELETE CASCADE，prod 已核）；愛心隨貼或按愛心者刪除；
  瀏覽紀錄 2 天；其餘隨帳號刪除
- §06 帳戶刪除 — 「會被徹底清除」補公開便利貼與書評等項目
- §11 變更通知 — **刪除「多管道告知」之 L1 推播／L2 Email／L3 banner**：與 terms §16（v1.7 起「不以
  Email 或推播通知條款變更」）及本政策 §06「目前之告知管道為 App 內之阻擋式視窗」矛盾；改為與 terms
  §16 一致。「不勾選將限制相關功能」更正為「未同意無法繼續使用」（對齊 `tos_update_modal.dart` 只有
  同意／刪除帳戶兩個出口）
- EN 交叉引用更正：「Platform termination scenarios」→「Platform-initiated termination」；
  「Retention periods for specific data」→「Specific retention periods」

**已知、未在本批處理（程式面待辦）**：
- `club_like_events`、`club_like_notify_day` 沒有 user FK，刪帳號後會殘留（prod 目前 0 列）→ 建議補
  ON DELETE CASCADE
- App 內文案寫「Folio 上的人都看得到」（實際分社群）；書評 sheet 沒有任何公開告知；空段落首貼提示
  會蓋掉公開說明；EN 有兩處寫成「Everyone's notes」（master 工作區已修、待發版）
- `admin_club_mute` 寫入的 `moderation_notices` kind `club_muted`，client `ModerationNoticeKindDb.fromRaw`
  沒有對應、fallback 成 `postRemoved` → 被禁言者會看到「你的一則貼文因違反社群規範已被移除」之錯誤告知
  （master 工作區已修、待發版；**發版前後台勿使用公開牆禁言**，prod 目前 0 人被禁言）
- `bookcase_like_events`（10 列）、`friend_invite_lookups`（20 列）同樣沒有 user FK、刪帳號後有頻率限制用之
  時間戳殘留 → 建議補 ON DELETE CASCADE 或排程清除

---

## terms v1.7 / privacy v1.8 — 2026-08-28

> **發佈批次** — manifest.json terms 1.7 + privacy 1.8、effective_date 2026-08-28（push 當日）。
> 發佈程序：commit + push folio-web → GitHub Action 同步 tos_versions → 回 `<folio>` 跑
> `scripts/sync_legal.sh` 更新 app bundled fallback → build。
> change_type = **major（terms）/ data_consent_required（privacy）** → **全體用戶跳阻擋式 modal
> 重新同意**。上線時機須早於雙商店送審（Apple 審核員會點購買頁的條款連結；Google 會比對
> 資料安全表與線上隱私政策）。
> **鐵則**：本批上線後、在多數用戶尚未同意前不可再疊 minor 發布。

**狀態**：正式（生效日 2026-08-28）
**文件**：terms_zh.md、terms_en.md、privacy_zh.md、privacy_en.md、manifest.json、delete-account.html
**變更類型**：
- terms **major** — 新增付款義務與自動扣款之實質條款；並修改條款修改條之處理方式（權利義務變更）
- privacy **data_consent_required** — 新增第三方接收者（RevenueCat, Inc.、美國）與新跨境傳輸目的地，屬資料處理變更

**Terms 變更（v1.6 → v1.7）：**

- §10 付費功能：由「目前全部免費、未來推出另行公告」全面改寫為訂閱型「支持方案」之完整條款——
  自動續訂與 24 小時前取消、付款由 Apple / Google 收取且本平台不經手卡號、升級即時生效並按比例
  折抵 / 降級期末生效、退訂與降級後之權益範圍（書房全保留可瀏覽分享改名刪除；額度內自選書房
  續留佈置權，完成挑選前全部暫停、選定後不可更改；書背樣式保留但不可再改；勳章隨訂閱結束收起）、
  跨平台須於原購買商店管理、退款依商店政策、**刪除帳號不會取消訂閱**、免費功能不回溯收費。
- §16 條款修改：「輕微調整」由「版本號 bump、仍以阻擋式 modal 重新取得同意」改為「更新版本號並
  記錄於 CHANGELOG 後逕行生效、不另行打擾」。**此條原文與 `LegalGate` 實作（change_type=minor
  靜默）長期矛盾**，本次以條文對齊實作、三段閘門（minor／major／data_consent_required）與條文
  三款一一對應。

**Privacy 變更（v1.7 → v1.8）：**

- §02 使用過程產生：新增「購買與訂閱狀態」（方案檔位、購買 / 續訂 / 到期時間、商店交易與收據
  識別資訊；付款由 Apple / Google 處理、不收集信用卡號）。
- §04 第三方：新增 **RevenueCat, Inc.（訂閱狀態管理、美國主機）**，逐項列明其接收與不接收之
  資料範圍。
- §04 用戶間顯示：新增支持者勳章（訂閱期間可能顯示、檔位可辨、實際展示範圍以 App 內顯示為準、
  訂閱結束即不再顯示）。
- §05 跨境傳輸：接收地新增美國（RevenueCat）。
- §06 帳戶存續期間：**新增揭露「連續 24 個月未登入自動刪除帳戶」**。此機制 2026 年起即由
  `folio_purge_dormant_accounts(24)` cron 執行、terms §11「平台終止情境」亦已載明，惟 privacy
  之保留期間節從未揭露 —— 本次補正（個資法第 8 條、GDPR Art. 13(2)(a) 之保存期間告知義務）。
- §06 特定資料之保留期間，新增 / 修訂四項：
  - **使用分析之原始事件紀錄**（app_opens / feature_events / screen_time_daily）：不設刪除期限、
    隨帳戶刪除一併清除。
  - **匿名彙總統計**（daily_metrics、20 欄純計數、無任何用戶識別碼）：永久保留、非個人資料。
  - **付費與訂閱事件紀錄**（supporter_events）：作為財務憑證保留、不設刪除期限；刪帳號後
    user_id SET NULL、僅餘商店端交易識別碼。
  - **管理處置之稽核紀錄**（moderation_actions）：不隨帳號刪除而移除。此表 v59 起即為 append-only
    且無 purge，原條文僅涵蓋 `reports`（結案 5 年真刪）、未涵蓋本表 —— 本次補正。
- §06 漂流瓶：封存區之**信件內文於歸檔滿 2 年後自動清除**、僅保留類型與時間之統計欄位。
  對應新增之 migration `20260828120000_v99_drift_archive_payload_retention.sql`
  （`purge_drift_archive_payload()` ＋ cron `folio_purge_drift_archive_payload`）。
  ★ 此為本批**唯一新增的刪除機制**：先改實作、再由條文對標，非以條文遷就現況。
- §06 帳戶刪除：新增「**訂閱不會自動取消**」段（與 app 內 `deleteAccountSubscriptionNote` 一致）。

**發佈前獨立覆核（2026-08-28、對 prod DB 與 client code 逐項查證）修正之項目：**

- `supporter_events` 之揭露原寫「刪帳號後僅餘商店端之交易識別碼」，**與實作不符** —— 該表另有無 FK 之
  `app_user_id` 文字欄（179/184 列存 Folio 帳號 UUID）、`payload` 內另有 177 份。此為 v80 之刻意設計
  （註解：「app_user_id 留著、RevenueCat 端仍查得到」），供退款爭議查考。**不洗欄位**（洗掉即毀掉該表
  存在之理由），改以據實揭露處理：明列仍保留訂閱服務所用之帳號識別碼、並說明其於本平台已無對應
  之個人檔案可回溯。四處同步（privacy zh/en、delete-account.html zh/en）。
- 兩份條款共 7 處仍指示用戶點擊已不存在之按鈕「離開 Folio」（實際 UI 為 設定 → 帳號管理 → 刪除帳號），
  且 privacy §08 之路徑漏了「帳號管理」一層。全數修正（Apple 5.1.1(v) 會查核所述刪除路徑）。
- `delete-account.html` 原寫條款同意紀錄「自帳戶刪除起保留 5 年」，實際 `user_tos_consents.retention_until`
  之預設為**同意當下 + 5 年**（`purge_expired_consents` 依此刪除、與刪帳號時點無關）。改為「自您同意當下起」。
  ★ 附帶發現（未於本批處理）：帳號存續中若逾 5 年未再同意、該筆證據會先行消滅，與其設計目的相悖，
  待日後於 `app_delete_account_data` 補 `retention_until` 重錨或改變預設。
- 刪除範圍原稱「您投出的瓶子」一律永久刪除，未涵蓋**已移入封存區之自有信件**（過期 / 遭婉拒 /
  管理處置；prod 9,225 列中 1,185 列帶內文）。補上 carve-out：依封存區規則、內文於歸檔滿 2 年後清除。
- `manifest.json` 之 `summary_zh` 原寫「可在到期前 24 小時取消」，語意與商店規則相反（應為「最晚須於
  當期結束 24 小時前」）。此字串逐字顯示於強制同意 modal、且涉及扣款，已改正；en 同步加強。
- 四份文件之版本標頭（第 3 行）仍停在舊版號與舊生效日，已同步為 terms v1.7 / privacy v1.8、2026-08-28。
- `terms_en` §11 之「24 consecutive months of inactivity」與 zh「連續 24 個月未登入」不對稱（機制為
  `COALESCE(last_sign_in_at, created_at)`、確為「未登入」），en 已對齊為 "No sign-in for..."。
- RevenueCat 之「只會收到」列舉未含服務運作必要之裝置與連線技術資訊，已補述。
- v99：`SET search_path` 對齊專案慣例（`TO ''` + 全限定名）、修正註解之欄位計數筆誤。
- **新增揭露：帳號所屬社群分區（`profiles.community`）**（2026-08-28 admin 對照稽核發現）。此欄自 v38
  上線即存在、於註冊當下依有效介面語言判定（zh 靜默入華人區、非 zh 顯示選區頁）、**之後無 UI 可改**，
  且經 `same_community()` 閘門決定探索 feed / 搜尋 / 他人書櫃與書房 / 好友三閘 / 報名 / 漂流瓶配對 /
  今日書房展 / 後台公告分眾之可見範圍 —— 亦即**決定使用者能遇見誰**。條款與隱私政策先前**完全未提及**。
  補入 §02（收集項目與不可變更之說明）、§03（服務公告目的）、§04 用戶間之顯示（列為首條，說明其
  決定可見範圍）。中英同步。
- **§02 敏感資料段補正第一方分析之揭露**（owner 於覆核中提出、2026-08-28）：原文結尾寫「故『性傾向』
  之推斷**從不進入分析或廣告**」，惟該句只對第三方成立。`admin/index.html` 之「數據」與「配對組成」
  分頁確有**心態 × 性別交叉分析器**（含女×男的心態、女×男的年齡、各格解鎖率）與心態分布、性別 /
  年齡輪廓圖，屬 Apple 定義之「衡量受眾規模或特徵」＝分析。改為：第三方分析與廣告用途仍為否定
  （`analytics.dart:56` 明確不送 gender / desired_gender / stance、亦不呼叫 setUserId），但明文揭露
  本平台於自有後台以**彙總統計**形式檢視此類資料之目的與界線（僅管理人員可見、不傳第三方、不用於
  廣告或個人化、不據以對個別用戶差別待遇）。中英同步。
  ★ 連帶：App Store 隱私標籤之「敏感資訊」用途**應保留「分析」**（先前擬取消，為誤判）。
- **terms §16 告知管道改為與實作一致**（owner 指示、2026-08-28）：原文承諾重大變更以「站內公告 ＋ 推播
  ＋ Email ＋ 阻擋式 modal」四管道告知，惟 `supabase/functions/` 並無任何寄信基礎建設、亦無條款變更
  推播管線，唯一實際運作之管道為 `LegalGate` 的阻擋式視窗。§16 改為只述阻擋式視窗、並明列「不以
  Email 或推播通知條款變更」。privacy 之 `tos_notification_log` 條同步移除不存在之管道列舉。
  ★ 本批 terms 1.7 為 major、發佈當日即受此條拘束，先改條文即避免上線當天自我違約。

**同批更新之非條款文件：**

- `delete-account.html`（Play Console 帳號刪除網址所指之頁面）：最後更新自 2026-05-20 起未同步，
  本次補齊——頁首加訂閱取消警語；刪除範圍補虛擬書房、書房按讚、漂流瓶、好友關係與好友碼、
  使用分析紀錄；保留範圍補訪客簿留言、筆友線、他人信匣之信件副本、付費紀錄、檢舉與處置紀錄；
  新增「長期未使用的帳戶」節；**修正 App 內操作步驟的按鈕字樣**（「離開 Folio」→ 實際標籤
  「刪除帳號」）。中英兩份同步。

---

## terms v1.6 / privacy v1.7 — 2026-08-21

> **發佈批次** — manifest.json terms 1.6 + privacy 1.7、effective_date 2026-08-21（push 當日）。
> 發佈程序：commit + push folio-web → GitHub Action 同步 tos_versions → 跑 `scripts/sync_legal.sh` 更新 app bundled fallback。
> change_type = minor → 既有用戶靜默、不跳 modal（新註冊用戶於註冊流程一次性同意最新版）。

**狀態**：正式（生效日 2026-08-21）
**文件**：terms_zh.md、terms_en.md、privacy_zh.md、privacy_en.md、manifest.json
**變更類型**：minor（既有已上線功能之揭露補正 disclosure catch-up；無新增第三方分享、無新增使用目的；新列項目均為用戶主動建立之 UGC、處理目的仍為既已同意之「提供服務」）
**摘要**：

補齊兩個已上線功能之條款揭露：虛擬書房（2026-08 上線、含公開展示與訪客互動）與漂流瓶（2026-07-20 上線、privacy v1.6 當時未同步補入）。terms 1.5 → 1.6、privacy 1.6 → 1.7。

**Privacy 變更：**

- §02 使用過程產生：新增「虛擬書房內容（房間名稱、佈置、便條疊、可見性設定）」「書房互動紀錄（對他人書房之讚、訪客簿留言）」「漂流瓶內容（信件、回信與筆友通信、收藏副本、投遞與靠岸狀態）」。
- §02 檢舉與封鎖：檢舉對象由「貼文或用戶」擴列為「貼文、用戶、書房、訪客簿留言、漂流瓶、漂流瓶對話」；補述書房 / 留言 / 信件之快照範圍（對齊 `submit_report` v15 之 bookcase / bookcase_comment / drift 分支、server 端既有行為）。
- §04 用戶間之顯示：新增書房展示範圍 —— 公開＝進「今日書房展」對所有用戶展示（房名、佈置、便條疊、頭像、暱稱）；**不公開＝不進探索、但知悉房間連結且已登入之用戶可檢視**（連結即存取權、封鎖雙向阻擋；對齊 v76 `get_bookcase_room` 語意與 app 內可見性說明文字）。訪客簿留言以暱稱具名顯示給房主與其他訪客；讚：房主收到含暱稱之通知、房內僅顯示累計數、不對其他訪客顯示身分（對齊 `notify_room_like` 與 `bookcase_likes` RLS）。漂流瓶：匿名投遞（顯示「遠方的讀者」）、成立筆友後才互見暱稱。
- §06 特定資料保留：新增漂流瓶段 —— 他人收藏之信件副本存於收藏者信匣直至其刪除；婉拒 / 過期 / 管理處置之內容移入封存區（濫用防制、營運統計、法律抗辯；對齊 `drift_archive` v56 / v72 機制）。
- §06 帳戶刪除：「徹底清除」補列虛擬書房（房間、佈置、便條疊、該房收到的讚與留言；`bookcases` FK ON DELETE CASCADE 全連鎖）；「匿名保留」標題改「給共讀夥伴與其他用戶的紀念」並補列：他人書房訪客簿留言（v74n：`author_nickname` 改寫「已離開的書友」）、已成立筆友線（對方端唯讀紀念）；並註明未成立筆友之回信與投遞直接刪除。

**Terms 變更：**

- §06 UGC 列舉補上：虛擬書房之房間名稱與佈置、便條疊、訪客簿留言、漂流瓶信件。
- §06 留存節標題「共讀內容於帳號刪除後之留存」改「用戶內容於帳號刪除後之留存」（涵蓋範圍已不限共讀）、補一條：訪客簿留言匿名保留、筆友通信唯讀紀念、依同一機制。
- 英文版（terms_en.md、privacy_en.md）同步；「不公開」對齊 app EN 用語 "Unlisted"、「遠方的讀者」對齊 "A reader far away"。

**變更類型理由**：全部為既有已上線功能之揭露補正。內容均為用戶主動建立並主動發布之 UGC、處理目的仍為既已同意之「提供服務」（§03）；無新增第三方處理者、無新增使用目的；書房展示範圍由用戶自選可見性控制（預設不公開）。依 §11 分級屬「既有蒐集範圍或處理方式之澄清補充」→ minor、既有用戶靜默（LegalGate 2026-07-15 起 minor 靜默放行）。營運鐵則檢查：上次強制同意為 terms / privacy 1.5（major、2026-06-24 全用戶 re-consent）、其後 privacy 1.6 → 1.7 與 terms 1.6 皆 minor、疊加合法（自上次強制同意以來最強變更仍為 minor）。

**法律依據**：台灣個資法 §8 告知義務；GDPR Art. 13 透明性、Art. 5(1)(a)；香港 PDPO DPP1（蒐集告知）/ DPP5（開放）。漂流瓶部分為既成處理之事後補揭（同 v0.8 Firebase 先例）、應儘速上線縮短未揭露期間。

**關聯 commit / migration**：書房社交鏈 `20260814120000_v74_room_social.sql` 至 `20260818130000_v76_room_link_sharing.sql`；刪帳號匿名化 `20260816124000_v74n_delete_account_guestbook_anonymize.sql`；漂流瓶封存 v56 / v72（`drift_archive`）。

---

## privacy v1.6 — 2026-07-25

> **發佈批次** — manifest.json privacy 1.6、effective_date 2026-07-25（push 當日）。terms 維持 1.5、不動。
> 發佈程序：commit + push folio-web → GitHub Action 同步 tos_versions（app 讀取判斷是否 re-consent）。
> change_type = minor → 既有用戶靜默、不跳 modal（新註冊用戶於註冊流程一次性同意最新版）。

**狀態**：正式（生效日 2026-07-25）
**文件**：privacy_zh.md、privacy_en.md、manifest.json
**變更類型**：minor（既有用戶靜默、不需重新同意）。嚴格性質為「透明度補充揭露」（比純錯字 / 重排多一點）：於既有已同意目的下列出一項收集細項，非新使用目的 / 非新第三方 / 非敏感資料 → 依 LegalGate change_type 閘門規則歸 minor（靜默上線）。
**摘要**：

app v78 新增「頁面停留時間」遙測：每人每天彙總各功能頁的停留秒數與進入次數，存 Supabase（第一方、關聯帳號），用於後台用量分析與產品改進。此收集之目的（服務改進 / 用量分析，§03）與載體（Supabase，§04）於 privacy 1.5 已揭露並經同意；本次僅將 §02「操作日誌」講得更細。privacy 1.5 → 1.6。

**Privacy 變更：**

- §02 使用過程產生 → 操作日誌：補列「各功能頁面的停留時間與進入次數」，並註明此項為第一方（Supabase）收集、關聯帳號、僅用於產品改進與用量分析、不傳第三方、不用於廣告或剖繪（與 §04 Firebase Analytics「不綁帳號」之敘述明確區分，避免混淆）。
- 文件標頭版本號 v1.5 → v1.6（生效日 / 最後更新 2026-07-25）。上一批次（同日稍早）僅升了 manifest、漏改文件正文標頭，本次補齊 —— 否則用戶查看政策時印刷版本號仍顯示 1.5、對不上 tos_versions。
- §11 同意生效方式：第 292 / 299 行原述「非重大變更亦以 L4 阻擋式 modal 重新取得同意」，與 app LegalGate（2026-07-15 起 minor 靜默放行）不符 → 改為「重大變更才跳 modal；非重大變更靜默生效、不打斷既有用戶」，令條文與實作一致。屬既有敘述之更正、對用戶更寬鬆（少打擾）。

**關聯 commit**：app 端 v78 埋點 `2652f6f`（folio private repo）。

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
