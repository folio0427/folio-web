// Folio legal page markdown loader — 動態 fetch .md + marked.js 解析
// 監聽 folio-lang 事件、語言切換時自動 reload 對應 .md
(() => {
  'use strict';

  const article = document.getElementById('legal-content');
  if (!article) return;

  const doc = article.getAttribute('data-legal-doc'); // 'terms' or 'privacy'
  if (!doc) return;

  const ERROR_MSG = {
    zh: '條款內容載入失敗。請來信 <a href="mailto:folio0427@gmail.com">folio0427@gmail.com</a>。',
    en: 'Failed to load. Please email <a href="mailto:folio0427@gmail.com">folio0427@gmail.com</a>.',
  };
  const LOADING_MSG = { zh: '載入中…', en: 'Loading…' };

  let currentLang = null;

  async function load(lang) {
    if (lang === currentLang) return;
    currentLang = lang;

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

  // Wait for marked to be available (CDN async)
  function whenReady(cb) {
    if (typeof marked !== 'undefined') return cb();
    let tries = 0;
    const tick = () => {
      if (typeof marked !== 'undefined') return cb();
      if (++tries > 40) return cb(); // ~4s max wait
      setTimeout(tick, 100);
    };
    tick();
  }

  whenReady(() => load(getInitialLang()));

  // React to language change
  document.addEventListener('folio-lang', (e) => {
    if (e.detail && e.detail.lang) load(e.detail.lang);
  });
})();
