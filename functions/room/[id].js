// Cloudflare Pages Function — fallback for https://foliomatch.app/room/<bookcaseId>
//
// 重要：App 已安裝時，iOS Universal Link / Android App Link 會在瀏覽器載入「之前」
// 由作業系統攔截直接開 App → 這支 function 根本不會跑。
// 它只在「沒裝 App」或「使用者刻意在瀏覽器開」時執行 → 導去商店 + 提供手動開 App。
//
// **這一頁不渲染房間內容。** 房間資料要登入才讀得到（v76 `get_bookcase_room`
// 一律驗 auth.uid()），而且「不公開」的房本來就只給拿到連結的人在 App 裡看 ——
// 把它畫在一個公開網頁上等於自己把門拆了。所以這裡只有：房名（由分享連結的
// `?n=` 帶）＋一句邀請＋下載／開啟。
//
// 房名為什麼走 query 而不是路徑：id 才是身分。改房名不會讓已送出的連結失效，
// 別人也不能靠猜房名撞到別人的房（見 app 的 ShareLinks.roomUrl）。

const APP_STORE = "https://apps.apple.com/app/id6771667110";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.yuliao.folio";
const SITE = "https://foliomatch.app/";

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

  // 房名（分享連結帶的 ?n=）。App 端已截到 12 字，這裡再夾一次 —— 網址是
  // 任何人都能手改的，不能相信長度。
  const rawName = new URL(context.request.url).searchParams.get("n") || "";
  const name = Array.from(rawName.trim()).slice(0, 12).join("");
  const safeName = esc(name);

  const ua = context.request.headers.get("user-agent") || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const store = isIOS ? APP_STORE : isAndroid ? PLAY_STORE : SITE;
  const scheme = `foliomatch://room/${id}`;

  const title = name ? `${safeName}｜Folio 書房` : "有人邀請你參觀他的書房";
  const heading = name
    ? `到〈${safeName}〉坐坐`
    : "有人邀請你參觀他的書房";
  const ogTitle = name
    ? `${safeName} — 來 Folio 看看這間書房`
    : "來 Folio 看看這間書房";

  const html = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="robots" content="noindex">
<meta property="og:title" content="${ogTitle}">
<meta property="og:description" content="每個人都能在 Folio 佈置一間屬於自己的書房，擺上讀過的書。">
<meta property="og:image" content="https://foliomatch.app/assets/og-image.jpg">
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
  <p>Folio 是以書交友的 app。每個人都能佈置一間自己的書房，把讀過的書擺上去 —— 打開 Folio 就能走進這一間。</p>
  <div class="btns">
    <a class="btn primary" href="${store}">下載 / 開啟 Folio</a>
    <a class="btn ghost" href="${scheme}">已安裝？用 App 開啟</a>
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
    },
  });
}
