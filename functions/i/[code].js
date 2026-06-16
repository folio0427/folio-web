// Cloudflare Pages Function — fallback for https://foliomatch.app/i/<code>
//
// /i/<code> = 舊「一次性好友邀請」連結（app ShareLinks.inviteUrl、v31）。
// v31.1 後已改用固定好友碼 /u/<code>；/i/ 僅保留相容（舊連結還能用）。
// App 已安裝時 iOS Universal Link / Android App Link 直接攔截開 App
// （→ openFriendInviteByCode → 接受邀請）→ 這支 function 不會跑。
// 只在沒裝 App / 桌機開時執行 → 導商店。一次性碼不可手動重輸、故不印碼。

const APP_STORE =
  "https://apps.apple.com/tw/app/folio-find-your-book-buddy/id6771667110";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.yuliao.folio";
const SITE = "https://foliomatch.app/";

export async function onRequestGet(context) {
  const rawCode = context.params.code || "";
  const code = String(rawCode).replace(/[^A-Za-z0-9]/g, "").slice(0, 32);
  const ua = context.request.headers.get("user-agent") || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const store = isIOS ? APP_STORE : isAndroid ? PLAY_STORE : SITE;
  const scheme = `foliomatch://i/${code}`;

  const html = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Folio — 好友邀請</title>
<meta name="apple-itunes-app" content="app-id=6771667110">
<meta property="og:title" content="Folio — 有人邀你成為書友">
<meta property="og:description" content="在 Folio 接受這則好友邀請，一起讀一本書。">
<meta property="og:image" content="https://foliomatch.app/assets/welcome.webp">
<meta property="og:url" content="https://foliomatch.app/i/${code}">
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
  <h1>有人邀你成為書友</h1>
  <p>下載 Folio 接受這則好友邀請，一起讀一本書、慢慢認識。</p>
  <div class="btns">
    <a class="btn primary" href="${store}">下載 / 開啟 Folio</a>
    <a class="btn ghost" href="${scheme}">已安裝？用 App 開啟</a>
  </div>
  <script>
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
