// Cloudflare Pages Function — fallback for https://foliomatch.app/room/<bookcaseId>
//
// 重要：App 已安裝時，iOS Universal Link / Android App Link 會在瀏覽器載入「之前」
// 由作業系統攔截直接開 App → 這支 function 根本不會跑。
// 它只在「沒裝 App」或「使用者刻意在瀏覽器開」時執行 → 導去商店 + 提供手動開 App。
//
// **這一頁不渲染房間內容。** 房間資料要登入才讀得到（v76 `get_bookcase_room`
// 一律驗 auth.uid()），而且「不公開」的房本來就只給拿到連結的人在 App 裡看 ——
// 把它畫在一個公開網頁上等於自己把門拆了。這裡只有：房名／房主暱稱（v77 的
// get_room_card，就這兩個欄位）＋預覽圖＋一句邀請＋下載／開啟。
//
// 網址只有 id、不帶任何中文：id 才是身分，而中文放進 query 會被編碼成一長串
// %E6%…（見 app 的 ShareLinks.roomUrl）。

// v77 — 落地頁自己去問房名與房主暱稱（`get_room_card`，匿名可呼叫）。
// 為什麼不從網址帶：中文放進 query 會被百分比編碼成一長串 %E6%…，比 uuid
// 還長還醜。這支 RPC **只回房名與暱稱**，房間內容（書、擺設、便條）一律
// 要登入走 get_bookcase_room。
const SUPABASE_URL = "https://icceblokyandhpyobjwc.supabase.co";
const SUPABASE_ANON = "sb_publishable_5ROkmEDWm1IZtV0sPwgpMQ_aDfJtt_y";

const APP_STORE = "https://apps.apple.com/app/id6771667110";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.yuliao.folio";
const SITE = "https://foliomatch.app/";

// 語言。只分兩種（繁中／英文），跟 app 的規則一樣：非 zh 一律英文。
//
// ★ 抓 og 預覽的機器人和真人分開判斷。機器人送來的 Accept-Language 不一定是
//   分享者的語言：網路上記錄到 Facebook 的爬蟲送 en-US（LINE 的送分享者自己的
//   zh-TW，但只有一筆紀錄，不能當規則）。照 header 走的話，台灣用戶分享到
//   Facebook／Messenger／Threads 的預覽卡會變英文。所以：
//   - 機器人：只認 `?lang`（app 1.0.17 起英文介面分享才會帶 `?lang=en`），
//     沒帶就繁中，跟改版前逐字相同。
//   - 真人：Accept-Language 第一個語言 > `?lang` > 繁中。`?lang` 說的是「分享者」
//     的介面語言；點開來讀的是另一個人，他的瀏覽器語言才是他讀得懂的。
const PREVIEW_BOT =
  /facebookexternalhit|facebot|meta-external|line-poker|whatsapp|telegrambot|twitterbot|slackbot|discordbot|linkedinbot|pinterestbot|skypeuripreview|kakaotalk-scrap|embedly|bot\/|crawler|spider/i;

function langParam(request) {
  let q = "";
  try {
    q = (new URL(request.url).searchParams.get("lang") || "").toLowerCase();
  } catch (_) {}
  if (q === "en") return "en";
  if (q === "zh" || q.startsWith("zh-")) return "zh";
  return null;
}

function pickLang(request) {
  const param = langParam(request);
  if (PREVIEW_BOT.test(request.headers.get("user-agent") || "")) {
    return param || "zh";
  }
  const first = (request.headers.get("accept-language") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  if (first) return first.startsWith("zh") ? "zh" : "en";
  return param || "zh";
}

// 文案分兩套；帶房名／暱稱的句子是函式，呼叫時傳的是**已逸出**的字串。
const STR = {
  zh: {
    htmlLang: "zh-Hant",
    ogLocale: "zh_TW",
    ogTitle: (owner) =>
      owner ? `來 Folio 看看 ${owner} 的書房吧` : "來 Folio 看看這間書房吧",
    title: (name, ogTitle) => (name ? `${name}｜Folio 書房` : ogTitle),
    heading: (name, owner) =>
      name
        ? `到〈${name}〉坐坐`
        : owner
          ? `${owner} 邀請你參觀他的書房`
          : "有人邀請你參觀他的書房",
    ogDesc: (name) =>
      name
        ? `〈${name}〉—— 每個人都能在 Folio 佈置一間屬於自己的書房，擺上讀過的書。`
        : "每個人都能在 Folio 佈置一間屬於自己的書房，擺上讀過的書。",
    p: "Folio 是以書交友的 app。每個人都能佈置一間自己的書房，把讀過的書擺上去 —— 打開 Folio 就能走進這一間。",
    primary: "下載 / 開啟 Folio",
    ghost: "已安裝？用 App 開啟",
  },
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    ogTitle: (owner) =>
      owner
        ? `Come see ${owner}'s study on Folio`
        : "Come see this study on Folio",
    title: (name, ogTitle) => (name ? `${name} | Folio Study` : ogTitle),
    heading: (name, owner) =>
      name
        ? `Come sit a while in “${name}”`
        : owner
          ? `${owner} invites you to visit their study`
          : "Someone invites you to visit their study",
    ogDesc: (name) =>
      name
        ? `“${name}” — Everyone can arrange a study of their own on Folio and put the books they've read on the shelves.`
        : "Everyone can arrange a study of their own on Folio and put the books they've read on the shelves.",
    p: "Folio is an app for making friends through books. Everyone can arrange a study of their own and put the books they've read on the shelves. Open Folio to step into this one.",
    primary: "Download / Open Folio",
    ghost: "Already installed? Open in the app",
  },
};

/** HTML 逸出 —— 房名是使用者自由輸入，直接內插等於開一個 XSS。 */
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function onRequestGet(context) {
  const rawId = context.params.id || "";
  // UUID-ish 安全化：只留英數與連字號，擋 HTML / scheme 注入。
  const id = String(rawId).replace(/[^A-Za-z0-9-]/g, "");

  // 房名與房主暱稱：跟 Supabase 問（失敗就退回通用文案，落地頁絕不能因為
  // 一支 RPC 掛掉就變成錯誤頁）。
  let name = "";
  let owner = "";
  if (id) {
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_room_card`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          apikey: SUPABASE_ANON,
          authorization: `Bearer ${SUPABASE_ANON}`,
        },
        body: JSON.stringify({ _bookcase: id }),
        // 爬蟲有逾時，寧可沒有房名也不要讓整頁等太久。
        signal: AbortSignal.timeout(2500),
      });
      if (r.ok) {
        const card = await r.json();
        if (card && card.ok) {
          name = String(card.name || "").slice(0, 40);
          owner = String(card.owner_nickname || "").slice(0, 40);
        }
      }
    } catch (_) {
      // 靜默：沒有房名的通用預覽仍然完全可用。
    }
  }
  const safeName = esc(name);
  const safeOwner = esc(owner);

  // 預覽圖固定用品牌圖（2026-08-19 Max 定案，取消 v77 的房間快照分享卡）。
  //
  // 為什麼不放房間截圖：房間裡的便條是使用者自己寫的字，截圖會把它烤進一張
  // **公開網址**的圖片（在 app 裡讀那些字要登入），而 LINE / Facebook 會把
  // OG 圖鏡像到自己的 CDN，作者事後刪掉也收不回來。
  // 個人化由文字承擔就夠了：分享訊息是「XX 邀請你參觀他的書房〈房名〉」，
  // 下面的 og:title 也帶暱稱 —— 收到的人在意的是「誰找我」，那是文字。
  const cardImg = "https://foliomatch.app/assets/og-image.jpg";

  const ua = context.request.headers.get("user-agent") || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const store = isIOS ? APP_STORE : isAndroid ? PLAY_STORE : SITE;
  const scheme = `foliomatch://room/${id}`;

  // 標題以**人**為主詞（Max 2026-08-18：「來 Folio 看看 XX 的書房吧」）——
  // 收到連結的人在意的是「誰找我」，不是房間叫什麼。
  const t = STR[pickLang(context.request)];
  const ogTitle = t.ogTitle(safeOwner);
  const title = t.title(safeName, ogTitle);
  const heading = t.heading(safeName, safeOwner);
  const ogDesc = t.ogDesc(safeName);

  const html = `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="robots" content="noindex">
<meta property="og:title" content="${ogTitle}">
<meta property="og:locale" content="${t.ogLocale}">
<meta property="og:description" content="${ogDesc}">
<meta property="og:image" content="${cardImg}">
<meta property="og:url" content="https://foliomatch.app/room/${id}">
<meta name="twitter:card" content="summary_large_image">
<style>
  :root { color-scheme: light; }
  body{margin:0;min-height:100vh;display:flex;flex-direction:column;align-items:center;
    justify-content:center;gap:20px;background:#F8F1E4;color:#3D2F1F;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans TC",sans-serif;
    text-align:center;padding:32px;box-sizing:border-box;}
  img{width:96px;height:96px;border-radius:22px;}
  h1{font-size:20px;font-weight:700;margin:0;}
  p{font-size:14px;color:#6B5B45;margin:0;max-width:300px;line-height:1.6;}
  .btns{display:flex;flex-direction:column;gap:12px;width:100%;max-width:280px;margin-top:8px;}
  a.btn{display:block;padding:14px 20px;border-radius:999px;text-decoration:none;font-size:15px;font-weight:600;}
  a.primary{background:#6B8064;color:#FAF3E7;}
  a.ghost{background:transparent;color:#3D2F1F;border:1px solid #C9B89A;}
</style>
</head>
<body>
  <img src="https://foliomatch.app/assets/folio_icon.webp" alt="Folio">
  <h1>${heading}</h1>
  <p>${t.p}</p>
  <div class="btns">
    <a class="btn primary" href="${store}">${t.primary}</a>
    <a class="btn ghost" href="${scheme}">${t.ghost}</a>
  </div>
  <script>
    // 既裝情境下 Universal Link 已直接開 App、走不到這頁；保險再試一次 custom scheme，
    // 短延遲後若仍停在頁面（= 沒裝）→ 導去商店。桌機不自動跳、讓使用者看頁面。
    (function () {
      var isMobile = ${isIOS || isAndroid ? "true" : "false"};
      if (!isMobile) return;
      var t = setTimeout(function () { window.location.href = ${JSON.stringify(
        store
      )}; }, 1400);
      window.location.href = ${JSON.stringify(scheme)};
      window.addEventListener("pagehide", function () { clearTimeout(t); });
    })();
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  });
}
