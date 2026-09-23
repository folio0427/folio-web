// Cloudflare Pages Function — fallback for https://foliomatch.app/post/<id>
//
// 重要：App 已安裝時，iOS Universal Link / Android App Link 會在瀏覽器載入「之前」
// 由作業系統攔截直接開 App → 這支 function 根本不會跑。
// 它只在「沒裝 App」或「使用者刻意在瀏覽器開」時執行 → 導去商店 + 提供手動開 App。
//
// 貼文內容本身受 RLS 保護（非公開），故這裡不抓貼文資料、只做品牌頁 + 商店導流。

// region-less Apple URL → 裝置上 App Store app 自動導當地 storefront（TW / HK /
// 其他地區皆可、app 多區上架）。region-less 在「桌機瀏覽器」會 404、故桌機
// （非 iOS/Android）走 SITE、不丟商店連結。
const APP_STORE = "https://apps.apple.com/app/id6771667110";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.yuliao.folio";
const SITE = "https://foliomatch.app/";

// 語言：`?lang=en|zh` 明確指定 > Accept-Language 第一個語言是否 zh 開頭 > 預設繁中。
// 只分兩種（繁中／英文），跟 app 的規則一樣：非 zh 一律英文。沒帶 header 的
// 平台爬蟲（LINE / Facebook 抓 og 預覽）維持繁中，跟改版前完全一樣；分享者是
// 英文介面時 app 端可在網址加 ?lang=en，讓預覽卡也是英文。
function pickLang(request) {
  let q = "";
  try {
    q = (new URL(request.url).searchParams.get("lang") || "").toLowerCase();
  } catch (_) {}
  if (q === "en") return "en";
  if (q === "zh" || q.startsWith("zh-")) return "zh";
  const first = (request.headers.get("accept-language") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  if (!first) return "zh";
  return first.startsWith("zh") ? "zh" : "en";
}

const STR = {
  zh: {
    htmlLang: "zh-Hant",
    ogLocale: "zh_TW",
    title: "Folio — 共讀貼文",
    ogTitle: "Folio — 以書交友",
    ogDesc: "在 Folio 打開這則共讀貼文，一起讀一本書。",
    h1: "在 Folio 打開這則貼文",
    p: "下載 Folio 即可查看這則共讀貼文，找人一起讀一本書。",
    primary: "下載 / 開啟 Folio",
    ghost: "已安裝？用 App 開啟",
  },
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    title: "Folio — Reading post",
    ogTitle: "Folio — Make friends through books",
    ogDesc: "Open this reading post in Folio and read a book together.",
    h1: "Open this post in Folio",
    p: "Download Folio to see this reading post and find someone to read a book with.",
    primary: "Download / Open Folio",
    ghost: "Already installed? Open in the app",
  },
};

export async function onRequestGet(context) {
  const rawId = context.params.id || "";
  // UUID-ish 安全化：只留英數與連字號，擋 HTML / scheme 注入。
  const id = String(rawId).replace(/[^A-Za-z0-9-]/g, "");
  const ua = context.request.headers.get("user-agent") || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const store = isIOS ? APP_STORE : isAndroid ? PLAY_STORE : SITE;
  const scheme = `foliomatch://post/${id}`;
  const t = STR[pickLang(context.request)];

  const html = `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t.title}</title>
<meta property="og:title" content="${t.ogTitle}">
<meta property="og:locale" content="${t.ogLocale}">
<meta property="og:description" content="${t.ogDesc}">
<meta property="og:image" content="https://foliomatch.app/assets/welcome.webp">
<meta property="og:url" content="https://foliomatch.app/post/${id}">
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
  a.primary{background:#586D52;color:#FAF3E7;}
  a.primary:hover{background:#4B6045;}
  a.btn:focus-visible{outline:3px solid #3D2F1F;outline-offset:3px;}
  a.ghost{background:transparent;color:#3D2F1F;border:1px solid #C9B89A;}
</style>
</head>
<body>
  <img src="https://foliomatch.app/assets/folio_icon.webp" alt="Folio">
  <h1>${t.h1}</h1>
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
      // 嘗試喚起 App（沒裝會靜默失敗、計時器接手）。
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
