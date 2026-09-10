// Folio i18n, 中英切換、localStorage 持久化
(() => {
  'use strict';

  const STORAGE_KEY = 'folio-lang';

  const dict = {
    zh: {
      'page.title.home':       'Folio 以書會友｜以書交友 app、共讀與虛擬書房，從一本書遇見緣分',
      'page.title.terms':      'Folio｜服務條款，以書交友 app 使用條款',
      'page.title.privacy':    'Folio｜隱私權政策，個資保護與資料使用說明',
      'page.desc.home':        'Folio（以書會友）是不滑卡、不看照片的以書交友 app：發帖徵共讀夥伴、雙方讀到 25% 才解鎖聊天，還有虛擬書房、漂流瓶匿名信與讀後分享卡。iOS 與 Android 免費下載，18 歲以上限定。',

      'nav.modes':             '模式',
      'nav.flow':              '流程',
      'nav.features':          '功能',
      'nav.philosophy':        '理念',
      'nav.blog':              '筆記',
      'nav.quiz':              '閱讀人格測驗',
      'nav.guide':             '教學',
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

      'modes.kicker':          'Three modes',
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

      'flow.kicker':           'How it works',
      'flow.title':            '翻過的每一頁、都在認識一個人。',
      'flow.sub':              '四個階段，每一步都有篩選。留下來的，是值得的。',
      'flow.step1.h':          '發帖',
      'flow.step1.p':          '選一本想讀的書，寫下為什麼想讀、期待怎樣的讀友。一天最多五篇、慢慢來。',
      'flow.step2.h':          '報名',
      'flow.step2.p':          '看見有興趣的帖子，按鏡像表單寫下你能成為的夥伴。',
      'flow.step3.h':          '共讀',
      'flow.step3.p':          '配對成立、共讀室開啟。雙方各自推到 25% 並在牆上寫下便利貼，聊天才解鎖。解鎖後可自由對話，也能把便利貼引用進訊息裡。',
      'flow.step4.h':          '整理',
      'flow.step4.p':          '各自讀到 100%，把這本書寫過的便利貼整理成一頁閱讀紀念，留住你們一起讀完的痕跡。',
      'flow.details.h':        '設計上的小事',
      'flow.detail1.h':        '一天最多五篇',
      'flow.detail1.p':        '避免洗版、避免被看成「廣告」。每天五篇是上限，台灣時間午夜重置，刪掉或關閉都不會還你次數，想清楚再發。',
      'flow.detail2.h':        '共讀便利貼牆',
      'flow.detail2.p':        '每對共讀都有一面便利貼牆，你們隨手寫下的句子按時間貼在一起，只屬於你們倆。對方寫的預設是磨砂的，點一下才看得到，不會先被劇透。',
      'flow.detail3.h':        '五個分頁，各司其職',
      'flow.detail3.p':        '底部依序是探索、貼文、書櫃、共讀、我：探索找人，貼文管理自己發過的帖與收到的報名（有人報名會亮紅點），書櫃放你的書與便利貼，共讀是所有共讀室與好友，我是個人設定。',
      'flow.detail4.h':        '進度同步書櫃',
      'flow.detail4.p':        '發帖時帶入的進度、共讀室裡的更新、書櫃上的那一本，同一本書一個進度，三處同步。',

      'solo.kicker':           'Solo or together',
      'solo.title':            '也是你一個人的書櫃',
      'solo.sub':              '不想找夥伴的時候，這裡就是你私人的閱讀紀錄。<br>配對是選項，不是條件。',
      'solo.col1.tag':         '一個人',
      'solo.col1.h':           '把書讀完，把字留下',
      'solo.col1.p':           '記下你讀過的書、寫下隨手心得、整理 100% 的閱讀紀念。可以不發帖、不報名、不開共讀室，就是獨屬你的個人書櫃。',
      'solo.col2.tag':         '想找人時',
      'solo.col2.h':           '慢慢來，書會帶人來',
      'solo.col2.p':           '為一本想讀的書留下邀請，看誰也想翻開。願意的人出現之後，從同一頁開始一起往前走。要不要、什麼時候，都由你決定。',
      'solo.note':             '你寫過的字、貼過的便利貼，永遠是你的，誰也帶不走。',

      'features.kicker':       'More inside Folio',
      'features.title':        '在 Folio，你可以做這些',
      'features.sub':          '找人一起讀，只是其中一條路。書也可以是一面牆、一間房、一封信，或一張卡片。',
      'features.club.alt':     'Folio 書圈：每本書都有一面公開的便利貼牆，卡片上是書封、作者與讀者給的星星',
      'features.club.tag':     '書圈',
      'features.club.h':       '每一本書，都有一面牆',
      'features.club.p':       '讀過的人一邊讀一邊把句子貼在書的牆上。牆依進度分成六段，你讀到哪一段就打開到哪一段，後面先蓋著，不會被劇透。看到寫得好的一句話，可以點名字去看那個人在別本書寫過什麼。',
      'features.club.go':      '書圈怎麼用',
      'features.room.alt':     'Folio 虛擬書房實景：木屋書房裡的書櫃排著讀過的書，窗邊有串燈、地毯與睡著的貓狗',
      'features.room.tag':     '虛擬書房',
      'features.room.h':       '佈置一間屬於你的書房',
      'features.room.p':       '選背景、擺書櫃、放擺飾，把讀過的書排上書架，連書背的字體與顏色都能自己調。書房可以只留給自己，也可以公開到「今日書房展」讓別人來參觀、按讚、寫訪客簿。分享出去的連結，會變成一張你的書房名片。',
      'features.room.go':      '虛擬書房怎麼用',
      'features.drift.tag':    '漂流瓶',
      'features.drift.h':      '匿名的信，慢慢漂過來',
      'features.drift.p':      '把一段讀書心得或一封親筆信投進海裡，傍晚靠岸到另一個讀者手上。作者只顯示為「遠方的讀者」，收到的人可以收藏、回信；兩邊都願意，就成為筆友。一天一瓶，急不得。',
      'features.drift.go':     '漂流瓶怎麼玩',
      'features.card.tag':     '讀後分享卡',
      'features.card.h':       '讀完了，做一張卡片',
      'features.card.p':       '一本書讀到 100%，可以把這本書寫過的便利貼整理起來，做成一張讀後分享卡，存成圖片分享到 IG 或 Threads。書名、作者、起訖日期與心得都能自己編輯，一本書想做幾張都行。',
      'features.card.go':      '讀完之後會發生什麼',
      'features.friends.tag':  '好友與個人碼',
      'features.friends.h':    '共讀之外，也能留下聯繫',
      'features.friends.p':    '每個人有一組 8 碼個人邀請碼，可以直接給、可以掃 QR，覺得被打擾隨時換一組新的。加好友一律要對方確認；共讀室解鎖之後，也能在房裡直接加。解除好友不會影響已經開始的共讀。',

      'philosophy.quote':      '質 &gt; 量。<br>每一層機制（發帖、報名、進度閘）都在篩選，<br>留下來的關係，會比那些一見面就能加好友的更深。',
      'philosophy.cite':       'Folio 設計信念',

      'notes.kicker':          'Notes on slow social design',
      'notes.title':           '慢社交筆記',
      'notes.sub':             '關於共讀、慢步調社交、書與人，我們一邊做、一邊寫下來的思考。',
      'notes.more':            '看所有筆記',

      'launch.tag':            'iOS · Android · Available now',
      'launch.title':          '準備好讀第一本書了嗎',
      'launch.sub':            'Folio 已在 App Store 與 Google Play 上架。',
      'launch.note':           '免費下載、18 歲以上限定。',
      'launch.store.prefix':   '下載自',
      'launch.store.state':    '即將上架',
      'launch.store.state.live': '立即下載',

      'footer.tagline':        'A place for readers who want to be more than readers.',
      'footer.h.explore':      '探索',
      'footer.li.modes':       '三種模式',
      'footer.li.flow':        '共讀流程',
      'footer.li.room':        '虛擬書房',
      'footer.li.drift':       '漂流瓶',
      'footer.li.philosophy':  '設計理念',
      'footer.li.blog':        '慢社交筆記',
      'footer.li.quiz':        '閱讀人格測驗',
      'footer.li.guide':       '使用教學',
      'footer.h.legal':        '法務',
      'footer.li.terms':       '服務條款',
      'footer.li.privacy':     '隱私權政策',
      'footer.li.childsafety': '兒童安全',
      'footer.h.contact':      '聯絡',
      'footer.li.support':     '支持 Folio',
      'footer.copyright':      '© 2026 Folio · 由獨立開發者提供 · 18+ 限定服務',
      'footer.brandline':      'Folio（Foliomatch）——以書會友、慢步調的共讀交友 App。',

      'lang.toggle':           'EN',

      'legal.draft.banner':    'English version of this document is being prepared.',
    },

    en: {
      'page.title.home':       'Folio｜Book-First Social App: Slow Co-Reading, Study Rooms, Drift Bottles',
      'page.title.terms':      'Folio｜Terms of Service, Co-Reading Social App',
      'page.title.privacy':    'Folio｜Privacy Policy, Data Use & Protection',
      'page.desc.home':        'Folio is a book-first social app with no swiping and no photos: post to find a co-reading partner, chat unlocks only after both of you pass 25%, plus virtual study rooms, anonymous drift-bottle letters and shareable reading cards. Free on iOS and Android, 18+.',

      'nav.modes':             'Modes',
      'nav.flow':              'How',
      'nav.features':          'Features',
      'nav.philosophy':        'Why',
      'nav.blog':              'Notes',
      'nav.quiz':              'Reading Quiz',
      'nav.guide':             'Guide',
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

      'modes.kicker':          'Three modes',
      'modes.title':           'Choose why you came here',
      'modes.sub':              'Three states of mind, mutual respect. When you post, others know what you\'re looking for.',
      'modes.sub.cooldown':    'Switching modes has a 7-day cooldown, to prevent back-and-forth confusion.',
      'modes.pure.badge':      'Pure friends',
      'modes.pure.h':          'Here to find someone to read with',
      'modes.pure.tagline':    '"Here for friends. Just friends."',
      'modes.pure.desc':       'Looking for co-readers and conversation, no romantic possibility. Clean, quiet, books are enough.',
      'modes.romance.badge':   'Open to chemistry',
      'modes.romance.h':       'Here to meet a person through books',
      'modes.romance.tagline': '"From one book, a possible kindred."',
      'modes.romance.desc':    'Start with reading, see where it goes. No swiping, no scripted lines, let the books you choose speak for you.',
      'modes.romance.aux':     'At sign-up you may pick the gender you\'re open to (women / men). Gender is for display, not a hard filter.',
      'modes.both.badge':      'Either way',
      'modes.both.h':          'Here to see what comes',
      'modes.both.tagline':    '"Books. People. Maybe more."',
      'modes.both.desc':       'Open to both kinds. The bridge between pure friends and those seeking chemistry.',
      'modes.both.aux':        'At sign-up you may pick the gender you\'re open to (women / men). Gender is for display, not a hard filter.',
      'modes.matrix.main':     'Those seeking friends and those seeking chemistry see different bookshelves.',
      'modes.matrix.soft':     'Those who pick "either way" see both shelves.',

      'flow.kicker':           'How it works',
      'flow.title':            'Page by page, we come to know someone.',
      'flow.sub':              'Four stages. Each step filters. What remains is worth it.',
      'flow.step1.h':          'Post',
      'flow.step1.p':          'Pick a book you want to read. Write why, and what kind of partner you hope for. Five posts max per day, take your time.',
      'flow.step2.h':          'Apply',
      'flow.step2.p':          'When a post resonates, mirror the form to say what kind of partner you could be.',
      'flow.step3.h':          'Read together',
      'flow.step3.p':          'Match made, room opens. Both reach 25% and post a sticky note on the wall, only then chat unlocks. Once unlocked, talk freely and quote sticky notes into messages.',
      'flow.step4.h':          'Compile',
      'flow.step4.p':          'When both of you reach 100%, the notes you wrote gather into a single reading keepsake, a record of the book you finished together.',
      'flow.details.h':        'The small designs',
      'flow.detail1.h':        'Five posts a day, no more',
      'flow.detail1.p':        'Prevents spam, prevents the feed feeling like ads. Five a day, reset at midnight Taipei time. Deleting or closing a post doesn\'t refund quota. Think before you post.',
      'flow.detail2.h':        'Shared sticky-note wall',
      'flow.detail2.p':        'Every co-reading has its own wall: the lines you both jot down, in time order, belonging only to the two of you. Notes from the other side start frosted, tap to reveal, so nothing spoils you.',
      'flow.detail3.h':        'Five tabs, one job each',
      'flow.detail3.p':        'Explore, Posts, Shelf, Reading, Me. Explore to find people; Posts manages what you published and who applied (a red dot when someone does); Shelf holds your books and sticky notes; Reading holds every co-reading room and your friends; Me is your settings.',
      'flow.detail4.h':        'Progress syncs to your shelf',
      'flow.detail4.p':        'Progress entered when posting, updates inside the room, the entry on your shelf: one progress per book, synced across all three.',

      'solo.kicker':           'Solo or together',
      'solo.title':            'Also your own private library',
      'solo.sub':              'When you don\'t want a partner, this is your private reading record.<br>Pairing is an option, not a requirement.',
      'solo.col1.tag':         'Solo',
      'solo.col1.h':           'Finish the book. Keep the words.',
      'solo.col1.p':           'Log what you\'ve read, jot quick reflections, compile 100% mementos. Skip posting, applying, rooms, it\'s simply your own shelf.',
      'solo.col2.tag':         'When ready for company',
      'solo.col2.h':           'Take your time. Books will bring people.',
      'solo.col2.p':           'Leave an invitation on a book you want to read, see who wants to open it too. When someone willing appears, walk forward from the same page. Whether or when, your call.',
      'solo.note':             'The words you\'ve written and the notes you\'ve posted are always yours, no one can take them away.',

      'features.kicker':       'More inside Folio',
      'features.title':        'What you can do here',
      'features.sub':          'Finding someone to read with is only one of the paths. A book can also be a wall, a room, a letter, or a card.',
      'features.club.alt':     'Folio book circle: every book has a public sticky-note wall, with covers, authors and reader star ratings',
      'features.club.tag':     'Book circle',
      'features.club.h':       'Every book has a wall',
      'features.club.p':       'Readers pin lines onto a book\'s wall as they go. The wall is split into six bands by reading progress: you only open as far as you\'ve read, the rest stays covered, so nothing spoils you. Like a line someone wrote? Tap their name to see what they\'ve written in other books.',
      'features.club.go':      'How the book circle works',
      'features.room.alt':     'A Folio virtual study room: a cabin shelf lined with books already read, string lights by the window, a rug, a sleeping cat and dog',
      'features.room.tag':     'Virtual study room',
      'features.room.h':       'Build a study room of your own',
      'features.room.p':       'Pick a backdrop, place bookcases and props, line up the books you\'ve read, and style the spines down to the typeface and colour. Keep the room private, or make it public and let it appear in Today\'s Study Rooms for visitors to look around, leave a like and sign the guestbook. Share the link and it becomes your reading calling card.',
      'features.room.go':      'How study rooms work',
      'features.drift.tag':    'Drift bottle',
      'features.drift.h':      'An anonymous letter, drifting over',
      'features.drift.p':      'Drop a reflection or a handwritten letter into the sea; it lands with another reader in the evening. The sender shows only as "a reader far away". Whoever receives it can keep it or write back, and if both sides are willing you become pen pals. One bottle a day, no rushing it.',
      'features.drift.go':     'How drift bottles work',
      'features.card.tag':     'Reading card',
      'features.card.h':       'Finished a book? Make a card.',
      'features.card.p':       'Reach 100% on a book and you can gather the sticky notes you wrote into a shareable reading card, saved as an image for Instagram or Threads. Title, author, start and end dates and the reflection are all editable, and you can make as many as you like per book.',
      'features.card.go':      'What happens after 100%',
      'features.friends.tag':  'Friends & personal code',
      'features.friends.h':    'Keep in touch beyond the room',
      'features.friends.p':    'Everyone gets an 8-character personal invite code to hand out or share as a QR. Rotate it any time if you\'d rather not be reached. Every friend request needs the other side to confirm, and once a co-reading room unlocks you can add each other right there. Unfriending never touches a co-reading already underway.',

      'philosophy.quote':      'Quality &gt; quantity.<br>Each layer (posting, applying, the progress gate) filters.<br>Relationships that remain run deeper than those formed at first sight.',
      'philosophy.cite':       'Folio design belief',

      'notes.kicker':          'Notes on slow social design',
      'notes.title':           'Slow Social Notes',
      'notes.sub':             'On co-reading, slow-paced social, books and people, thoughts we write down as we build.',
      'notes.more':            'Read all notes',

      'launch.tag':            'iOS · Android · Available now',
      'launch.title':          'Ready to read your first book?',
      'launch.sub':            'Folio is now on the App Store and Google Play.',
      'launch.note':           'Free to download · 18+ only.',
      'launch.store.prefix':   'Download on',
      'launch.store.state':    'Coming soon',
      'launch.store.state.live': 'Get it now',

      'footer.tagline':        'A place for readers who want to be more than readers.',
      'footer.h.explore':      'Explore',
      'footer.li.modes':       'Three modes',
      'footer.li.flow':        'Reading flow',
      'footer.li.room':        'Virtual study room',
      'footer.li.drift':       'Drift bottle',
      'footer.li.philosophy':  'Design belief',
      'footer.li.blog':        'Slow social notes',
      'footer.li.quiz':        'Reading Personality Quiz',
      'footer.li.guide':       'How-to Guide',
      'footer.h.legal':        'Legal',
      'footer.li.terms':       'Terms',
      'footer.li.privacy':     'Privacy',
      'footer.li.childsafety': 'Child Safety',
      'footer.h.contact':      'Contact',
      'footer.li.support':     'Support Folio',
      'footer.copyright':      '© 2026 Folio · by an independent developer · 18+ only',
      'footer.brandline':      'Folio (Foliomatch) — a slow-paced, book-first social app for co-reading friendships (以書會友).',

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
