// Folio legal page markdown loader — 動態 fetch .md + marked.js 解析
// 監聽 folio-lang 事件、語言切換時自動 reload 對應 .md
// 頁內已 prerender 的語言（build 時由同一份 .md 生成）直接沿用、零 fetch 零 marked
(() => {
  'use strict';

  const article = document.getElementById('legal-content');
  if (!article) return;

  const doc = article.getAttribute('data-legal-doc'); // 'terms' or 'privacy'
  if (!doc) return;

  // marked 按需載入 — zh（prerendered）訪客完全不需要它
  const MARKED_SRC = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
  let markedPromise = null;
  function ensureMarked() {
    if (typeof marked !== 'undefined') return Promise.resolve();
    if (!markedPromise) {
      markedPromise = new Promise((resolve) => {
        const s = document.createElement('script');
        s.src = MARKED_SRC;
        s.onload = resolve;
        s.onerror = resolve; // load() 內的 typeof 檢查會顯示錯誤訊息
        document.head.appendChild(s);
      });
    }
    return markedPromise;
  }

  const ERROR_MSG = {
    zh: '條款內容載入失敗。請來信 <a href="mailto:folio0427@gmail.com">folio0427@gmail.com</a>。',
    en: 'Failed to load. Please email <a href="mailto:folio0427@gmail.com">folio0427@gmail.com</a>.',
  };
  const LOADING_MSG = { zh: '載入中…', en: 'Loading…' };

  let currentLang = null;

  async function load(lang) {
    if (lang === currentLang) return;
    currentLang = lang;

    await ensureMarked();
    if (typeof marked === 'undefined') {
      article.innerHTML = '<p>marked.js library failed to load (CDN blocked or offline). Check network.</p>';
      console.error('[legal-loader] marked is undefined');
      return;
    }

    article.innerHTML = `<p class="legal-loading"><em>${LOADING_MSG[lang] || LOADING_MSG.en}</em></p>`;

    const protocol = window.location.protocol;
    if (protocol === 'file:') {
      article.innerHTML = `
        <p>${ERROR_MSG[lang] || ERROR_MSG.en}</p>
        <p style="font-family: var(--font-mono); font-size: 0.8rem; opacity: 0.7; margin-top: 8px;">
          原因：file:// 協定無法 fetch local .md。<br>
          請用 HTTP 開啟（如 <code>npx serve</code> / <code>python -m http.server</code>）。
        </p>`;
      console.error('[legal-loader] file:// protocol cannot fetch');
      return;
    }

    const url = `legal/${doc}_${lang}.md`;
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} @ ${url}`);
      const md = await res.text();
      if (!md || md.length < 20) throw new Error(`Empty content: ${url}`);
      marked.use({ gfm: true, breaks: false });
      article.innerHTML = marked.parse(md);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch (err) {
      console.error('[legal-loader]', err);
      article.innerHTML = `
        <p>${ERROR_MSG[lang] || ERROR_MSG.en}</p>
        <p style="font-family: var(--font-mono); font-size: 0.78rem; color: #b35; opacity: 0.8; margin-top: 8px;">
          ${err.name}: ${err.message}
        </p>`;
    }
  }

  // Initial load: use current saved language or detect
  function getInitialLang() {
    const saved = localStorage.getItem('folio-lang');
    if (saved === 'zh' || saved === 'en') return saved;
    return (navigator.language || 'zh').toLowerCase().startsWith('zh') ? 'zh' : 'en';
  }

  // Initial：prerendered 語言相符 → 不抹不抓；不符（如 en）才走 fetch
  const prerendered = article.querySelector('[data-prerendered-lang]');
  const initialLang = getInitialLang();
  if (prerendered && prerendered.getAttribute('data-prerendered-lang') === initialLang) {
    currentLang = initialLang;
  } else {
    load(initialLang);
  }

  // React to language change
  document.addEventListener('folio-lang', (e) => {
    if (e.detail && e.detail.lang) load(e.detail.lang);
  });
})();
