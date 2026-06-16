// Cloudflare Pages Function — fallback for https://foliomatch.app/u/<code>
//
// /u/<code> = 固定好友碼連結（app ShareLinks.friendCodeUrl）。
// App 已安裝時，iOS Universal Link / Android App Link 會在瀏覽器載入「之前」由
// 作業系統攔截直接開 App（→ openFriendCodeRequest → 顯示對方預覽 + 發好友請求）
// → 這支 function 根本不會跑。它只在「沒裝 App」或刻意在瀏覽器開時執行。
//
// 與 /post 的差別：此頁「不自動跳商店」。好友碼要讓使用者看得見、記得下 ——
// iOS 沒有 deferred deep link，裝完 App 後得手動輸碼，所以把碼大字印出來，
// 配商店按鈕，讓使用者自己決定節奏。

// region-less Apple URL → 裝置上 App Store app 自動導當地 storefront（TW / HK /
// 其他地區皆可、app 多區上架）。region-less 在桌機瀏覽器會 404、故桌機不丟此連結。
const APP_STORE = "https://apps.apple.com/app/id6771667110";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.yuliao.folio";
const SITE = "https://foliomatch.app/";

export async function onRequestGet(context) {
  const rawCode = context.params.code || "";
  // 好友碼安全化：只留英數、轉大寫、長度封頂，擋 HTML / scheme 注入。
  const code = String(rawCode)
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .slice(0, 16);
  const ua = context.request.headers.get("user-agent") || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const scheme = `foliomatch://u/${code}`;

  // 主商店依平台；桌機兩個都給。
  const primary = isIOS ? APP_STORE : isAndroid ? PLAY_STORE : null;

  const codeBlock = code
    ? `<div class="code"><span class="code-label">好友碼</span><span class="code-val">${code}</span></div>`
    : "";

  // 桌機（無 primary）：region-less App Store 連結會 404 → 一律導官網（有商店 badge）。
  const storeBtns = primary
    ? `<a class="btn primary" href="${primary}">下載 Folio</a>`
    : `<a class="btn primary" href="${SITE}">前往 Folio 官網下載</a>`;

  const html = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Folio — 加我為好友</title>
<meta name="apple-itunes-app" content="app-id=6771667110">
<meta property="og:title" content="Folio — 在 Folio 加我為好友">
<meta property="og:description" content="用我的好友碼，在 Folio 上加我，一起讀一本書。">
<meta property="og:image" content="https://foliomatch.app/assets/welcome.webp">
<meta property="og:url" content="https://foliomatch.app/u/${code}">
<meta name="twitter:card" content="summary_large_image">
<style>
  :root { color-scheme: light; }
  body{margin:0;min-height:100vh;display:flex;flex-direction:column;align-items:center;
    justify-content:center;gap:18px;background:#F8F1E4;color:#3D2F1F;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans TC",sans-serif;
    text-align:center;padding:32px;box-sizing:border-box;}
  img{width:96px;height:96px;border-radius:22px;}
  h1{font-size:20px;font-weight:700;margin:0;}
  p{font-size:14px;color:#6B5B45;margin:0;max-width:300px;line-height:1.6;}
  .code{display:flex;flex-direction:column;gap:4px;align-items:center;
    background:#FAF3E7;border:1px solid #C9B89A;border-radius:14px;
    padding:14px 28px;margin-top:4px;}
  .code-label{font-size:11px;font-weight:700;color:#6B5B45;letter-spacing:.12em;}
  .code-val{font-size:30px;font-weight:700;letter-spacing:.18em;
    font-family:"SFMono-Regular",ui-monospace,Menlo,Consolas,monospace;color:#3D2F1F;}
  .btns{display:flex;flex-direction:column;gap:12px;width:100%;max-width:280px;margin-top:8px;}
  a.btn{display:block;padding:14px 20px;border-radius:999px;text-decoration:none;font-size:15px;font-weight:600;}
  a.primary{background:#6B8064;color:#FAF3E7;}
  a.ghost{background:transparent;color:#3D2F1F;border:1px solid #C9B89A;}
  .hint{font-size:12px;color:#9b8b72;max-width:300px;}
</style>
</head>
<body>
  <img src="https://foliomatch.app/assets/folio_icon.webp" alt="Folio">
  <h1>在 Folio 加我為好友</h1>
  <p>Folio 是以書交友的 app — 一起讀一本書，慢慢認識。下載後輸入下面的好友碼加我。</p>
  ${codeBlock}
  <div class="btns">
    ${storeBtns}
    <a class="btn ghost" href="${scheme}">已安裝？用 App 開啟</a>
  </div>
  <p class="hint">在 Folio 的「聊天 → 好友 → 加好友」輸入好友碼，送出後我確認就成立。</p>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
