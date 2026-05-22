// Folio i18n — 中英切換、localStorage 持久化
(() => {
  'use strict';

  const STORAGE_KEY = 'folio-lang';

  const dict = {
    zh: {
      'page.title.home':       'Folio — 從一本書，遇見可能的緣分',
      'page.title.terms':      'Folio — 服務條款',
      'page.title.privacy':    'Folio — 隱私權政策',
      'page.desc.home':        'Folio 是以書交友的 app — 透過共讀促成深度連結。書是對話入口，不是內容本身。',

      'nav.modes':             '模式',
      'nav.flow':              '流程',
      'nav.philosophy':        '理念',
      'nav.terms':             '條款',
      'nav.privacy':           '隱私',
      'nav.home':              '首頁',

      'hero.line1':            '從一本書',
      'hero.line2.prefix':     '遇見',
      'hero.line2.accent':     '可能的緣分',
      'hero.lede':             'Folio 不是配對 app，也不是讀書器。<br>透過一起讀完一本書，慢慢認識一個人。',
      'hero.cta.primary':      '了解 Folio',
      'hero.cta.secondary':    '如何下載',
      'hero.caption':          '每一張便利貼，是一段共讀的紀念。',

      'modes.kicker':          '— Three modes —',
      'modes.title':           '選一個你來這裡的理由',
      'modes.sub':             '三種心態、互相尊重。發帖時、別人就知道你想要的是什麼。',
      'modes.sub.cooldown':    '更換心態有 7 天冷卻期，避免反覆切換造成困擾。',
      'modes.pure.badge':      '純粹書友',
      'modes.pure.h':          '來這，是為了找人一起讀書',
      'modes.pure.tagline':    '「來這裡交朋友，就只是交朋友。」',
      'modes.pure.desc':       '只想找人共讀、交換心得，不發展任何浪漫可能。乾淨、安靜、有書就好。',
      'modes.romance.badge':   '想找緣分',
      'modes.romance.h':       '來這，是想從書裡認識一個人',
      'modes.romance.tagline': '「從一本書，遇見可能的緣分。」',
      'modes.romance.desc':    '從共讀開始尋找關係的可能。不滑卡、不靠話術、看你選的書認識你。',
      'modes.romance.aux':     '註冊時可選想找的性別（女 / 男）；性別只是顯示、不會把人從你的視野中過濾掉。',
      'modes.both.badge':      '不拘',
      'modes.both.h':          '來這，看看會遇見什麼',
      'modes.both.tagline':    '「看書、看人、看緣分。」',
      'modes.both.desc':       '兩種都接受。是純粹書友與想找緣分之間的橋樑。',
      'modes.both.aux':        '註冊時可選想找的性別（女 / 男）；性別只是顯示、不會把人從你的視野中過濾掉。',
      'modes.matrix.main':     '想單純交朋友的人，與想找緣分的人，看見的是不同的書架。',
      'modes.matrix.soft':     '選「不拘」的人，兩個書架都看得見。',

      'flow.kicker':           '— How it works —',
      'flow.title':            '翻過的每一頁、都在認識一個人。',
      'flow.sub':              '四個階段，每一步都有篩選。留下來的，是值得的。',
      'flow.step1.h':          '發帖',
      'flow.step1.p':          '選一本想讀的書，寫下為什麼想讀、期待怎樣的讀友。一天最多兩篇、慢慢來。',
      'flow.step2.h':          '報名',
      'flow.step2.p':          '看見有興趣的帖子，按鏡像表單寫下你能成為的夥伴。',
      'flow.step3.h':          '共讀',
      'flow.step3.p':          '配對成立、共讀室開啟。雙方各自推到 25% 並寫下筆記、聊天才解鎖。解鎖後可自由對話、收藏對方寫過的句子。',
      'flow.step4.h':          '整理',
      'flow.step4.p':          '各自讀到 100%、便利貼整理成一張閱讀紀念 — 可分享自己的讀後心得、或與對方交織出的共讀筆記到 IG、Threads、X。',
      'flow.details.h':        '設計上的小事',
      'flow.detail1.h':        '一天最多兩篇',
      'flow.detail1.p':        '避免洗版、避免被看成「廣告」。每 24 小時兩篇是上限，刪了也不會還你次數 — 想清楚再發。',
      'flow.detail2.h':        '共讀便利貼牆',
      'flow.detail2.p':        '每對共讀都有一面便利貼牆 — 你們隨手寫下的筆記、25% 與 100% 的讀後心得，按時間貼在一起，只屬於你們倆。',
      'flow.detail3.h':        '我的貼文 — 完整管理',
      'flow.detail3.p':        '底部專屬 Tab 看自己發過的所有帖子、報名人數、過期狀態。隨時可關閉、隨時可移除（已配對的共讀不受影響）。',
      'flow.detail4.h':        '進度同步書房',
      'flow.detail4.p':        '發帖時帶入的進度、共讀中的更新、書房的本子 — 同一本書一個進度，三處同步。',

      'solo.kicker':           '— Solo or together —',
      'solo.title':            '也是你一個人的書房',
      'solo.sub':              '不想找夥伴的時候，這裡就是你私人的閱讀紀錄。<br>配對是選項，不是條件。',
      'solo.col1.tag':         '一個人',
      'solo.col1.h':           '把書讀完，把字留下',
      'solo.col1.p':           '記下你讀過的書、寫下隨手心得、整理 100% 的閱讀紀念。可以不發帖、不報名、不開共讀室 — 就是獨屬你的個人書櫃。',
      'solo.col2.tag':         '想找人時',
      'solo.col2.h':           '慢慢來，書會帶人來',
      'solo.col2.p':           '為一本想讀的書留下邀請，看誰也想翻開。願意的人出現之後，從同一頁開始一起往前走。要不要、什麼時候，都由你決定。',
      'solo.note':             '你寫過的字、收藏的句子，永遠是你的 — 誰也帶不走。',

      'philosophy.quote':      '質 &gt; 量。<br>每一層機制（發帖、報名、進度閘）都在篩選，<br>留下來的關係，會比那些一見面就能加好友的更深。',
      'philosophy.cite':       '— Folio 設計信念',

      'launch.tag':            'Coming soon',
      'launch.title':          '準備好讀第一本書了嗎',
      'launch.sub':            'Folio 預計近期上線 iOS 與 Android。',
      'launch.note':           '敬請期待上架公告。',
      'launch.store.prefix':   '下載自',
      'launch.store.state':    '敬請期待',

      'footer.tagline':        'A place for readers who want to be more than readers.',
      'footer.h.explore':      '探索',
      'footer.li.modes':       '三種模式',
      'footer.li.flow':        '共讀流程',
      'footer.li.philosophy':  '設計理念',
      'footer.h.legal':        '法務',
      'footer.li.terms':       '服務條款',
      'footer.li.privacy':     '隱私權政策',
      'footer.li.childsafety': '兒童安全',
      'footer.h.contact':      '聯絡',
      'footer.copyright':      '© 2026 Folio · 由獨立開發者提供 · 18+ 限定服務',

      'lang.toggle':           'EN',

      'legal.draft.banner':    'English version of this document is being prepared.',
    },

    en: {
      'page.title.home':       'Folio — From one book, meet a possible kindred',
      'page.title.terms':      'Folio — Terms of Service',
      'page.title.privacy':    'Folio — Privacy Policy',
      'page.desc.home':        'Folio is a book-first social app — meaningful connections through co-reading. Books open the conversation, not the content.',

      'nav.modes':             'Modes',
      'nav.flow':              'How',
      'nav.philosophy':        'Why',
      'nav.terms':             'Terms',
      'nav.privacy':           'Privacy',
      'nav.home':              'Home',

      'hero.line1':            'From one book,',
      'hero.line2.prefix':     'meet',
      'hero.line2.accent':     'a possible kindred',
      'hero.lede':             'Folio isn\'t a dating app, nor a reading tracker.<br>By finishing a book together, slowly come to know a person.',
      'hero.cta.primary':      'About Folio',
      'hero.cta.secondary':    'How to get it',
      'hero.caption':          'Every sticky note is a memento of reading together.',

      'modes.kicker':          '— Three modes —',
      'modes.title':           'Choose why you came here',
      'modes.sub':              'Three states of mind, mutual respect. When you post, others know what you\'re looking for.',
      'modes.sub.cooldown':    'Switching modes has a 7-day cooldown — to prevent back-and-forth confusion.',
      'modes.pure.badge':      'Pure friends',
      'modes.pure.h':          'Here to find someone to read with',
      'modes.pure.tagline':    '"Here for friends. Just friends."',
      'modes.pure.desc':       'Looking for co-readers and conversation, no romantic possibility. Clean, quiet — books are enough.',
      'modes.romance.badge':   'Open to chemistry',
      'modes.romance.h':       'Here to meet a person through books',
      'modes.romance.tagline': '"From one book, a possible kindred."',
      'modes.romance.desc':    'Start with reading, see where it goes. No swiping, no scripted lines — let the books you choose speak for you.',
      'modes.romance.aux':     'At sign-up you may pick the gender you\'re open to (women / men). Gender is for display, not a hard filter.',
      'modes.both.badge':      'Either way',
      'modes.both.h':          'Here to see what comes',
      'modes.both.tagline':    '"Books. People. Maybe more."',
      'modes.both.desc':       'Open to both kinds. The bridge between pure friends and those seeking chemistry.',
      'modes.both.aux':        'At sign-up you may pick the gender you\'re open to (women / men). Gender is for display, not a hard filter.',
      'modes.matrix.main':     'Those seeking friends and those seeking chemistry see different bookshelves.',
      'modes.matrix.soft':     'Those who pick "either way" see both shelves.',

      'flow.kicker':           '— How it works —',
      'flow.title':            'Page by page, we come to know someone.',
      'flow.sub':              'Four stages. Each step filters. What remains is worth it.',
      'flow.step1.h':          'Post',
      'flow.step1.p':          'Pick a book you want to read. Write why, and what kind of partner you hope for. Two posts max per day — take your time.',
      'flow.step2.h':          'Apply',
      'flow.step2.p':          'When a post resonates, mirror the form to say what kind of partner you could be.',
      'flow.step3.h':          'Read together',
      'flow.step3.p':          'Match made, room opens. Both reach 25% and write notes — only then chat unlocks. Once unlocked, talk freely and save each other\'s words.',
      'flow.step4.h':          'Compile',
      'flow.step4.p':          'When both reach 100%, the notes compile into a reading memento — share your own reflections or the co-reading notes you wove together to IG, Threads, X.',
      'flow.details.h':        'The small designs',
      'flow.detail1.h':        'Two posts a day, no more',
      'flow.detail1.p':        'Prevents spam, prevents the feed feeling like ads. Two per 24 hours — deleting doesn\'t refund quota. Think before you post.',
      'flow.detail2.h':        'Shared sticky-note wall',
      'flow.detail2.p':        'Every co-reading has its own wall — casual notes and the 25% / 100% reflections from both sides, in time order, belonging only to the two of you.',
      'flow.detail3.h':        'My Posts — full control',
      'flow.detail3.p':        'A dedicated tab shows all your posts, applicant counts, expiry status. Close or remove anytime (existing rooms are untouched).',
      'flow.detail4.h':        'Progress syncs to bookshelf',
      'flow.detail4.p':        'Progress entered when posting, updates during reading, your shelf entry — one progress per book, synced across all three.',

      'solo.kicker':           '— Solo or together —',
      'solo.title':            'Also your own private library',
      'solo.sub':              'When you don\'t want a partner, this is your private reading record.<br>Pairing is an option, not a requirement.',
      'solo.col1.tag':         'Solo',
      'solo.col1.h':           'Finish the book. Keep the words.',
      'solo.col1.p':           'Log what you\'ve read, jot quick reflections, compile 100% mementos. Skip posting, applying, rooms — it\'s simply your own shelf.',
      'solo.col2.tag':         'When ready for company',
      'solo.col2.h':           'Take your time. Books will bring people.',
      'solo.col2.p':           'Leave an invitation on a book you want to read, see who wants to open it too. When someone willing appears, walk forward from the same page. Whether or when — your call.',
      'solo.note':             'The words you\'ve written and the lines you\'ve saved are always yours — no one can take them away.',

      'philosophy.quote':      'Quality &gt; quantity.<br>Each layer (posting, applying, the progress gate) filters.<br>Relationships that remain run deeper than those formed at first sight.',
      'philosophy.cite':       '— Folio design belief',

      'launch.tag':            'Coming soon',
      'launch.title':          'Ready to read your first book?',
      'launch.sub':            'Folio is launching on iOS and Android soon.',
      'launch.note':           'Stay tuned for the launch announcement.',
      'launch.store.prefix':   'Download on',
      'launch.store.state':    'Coming soon',

      'footer.tagline':        'A place for readers who want to be more than readers.',
      'footer.h.explore':      'Explore',
      'footer.li.modes':       'Three modes',
      'footer.li.flow':        'Reading flow',
      'footer.li.philosophy':  'Design belief',
      'footer.h.legal':        'Legal',
      'footer.li.terms':       'Terms',
      'footer.li.privacy':     'Privacy',
      'footer.li.childsafety': 'Child Safety',
      'footer.h.contact':      'Contact',
      'footer.copyright':      '© 2026 Folio · by an independent developer · 18+ only',

      'lang.toggle':           '中',

      'legal.draft.banner':    '此文件的中文版本正在準備中。',
    },
  };

  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'zh' || saved === 'en') return saved;
    // Fallback: detect browser language
    const nav = (navigator.language || 'zh').toLowerCase();
    return nav.startsWith('zh') ? 'zh' : 'en';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    apply(lang);
  }

  function apply(lang) {
    const d = dict[lang];
    if (!d) return;
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
    document.documentElement.setAttribute('data-lang', lang);

    // Text content (innerHTML to support <br> and entities)
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (d[key] !== undefined) el.innerHTML = d[key];
    });

    // Attribute translations: data-i18n-attr="alt:key1,title:key2"
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (attr && key && d[key] !== undefined) el.setAttribute(attr, d[key]);
      });
    });

    // Document title
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      const key = titleEl.getAttribute('data-i18n');
      if (d[key] !== undefined) document.title = d[key];
    }

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"][data-i18n]');
    if (metaDesc) {
      const key = metaDesc.getAttribute('data-i18n');
      if (d[key] !== undefined) metaDesc.setAttribute('content', d[key]);
    }

    // Update toggle button label
    document.querySelectorAll('.lang-toggle').forEach((btn) => {
      btn.textContent = d['lang.toggle'];
      btn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切換為繁體中文');
    });

    // Notify subscribers (e.g. legal page markdown loader)
    document.dispatchEvent(new CustomEvent('folio-lang', { detail: { lang } }));
  }

  function toggle() {
    const cur = getLang();
    setLang(cur === 'zh' ? 'en' : 'zh');
  }

  // Bind on DOMContentLoaded
  function init() {
    apply(getLang());
    document.querySelectorAll('.lang-toggle').forEach((btn) => {
      btn.addEventListener('click', toggle);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for debugging
  window.FolioI18n = { getLang, setLang, toggle, dict };
})();
