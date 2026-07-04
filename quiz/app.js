/* ================================================================
   深夜書店：深夜原形測驗 — 流程控制（視覺小說式呈現）
   - 背景依螢幕方向選 land / port 版本
   - 文字逐字浮現、選項淡入、場景交叉淡入淡出
   - 真實音檔：魔幻童話背景音樂（WebAudio 交叉淡接無縫循環）
     + 推門 / 電話 / 選擇 / 翻頁 / 揭曉 / 星屑
   - 音檔頁面載入即預載；file:// 開啟時自動退回 <audio> 播放
   - 打字途中點畫面＝跳過逐字動畫（不會誤觸選項）
   - 敘事段落：右下角「點擊繼續」提示，點畫面任一處前進
   - 分析圖：IG 限動 9:16（1080×1920），可下載或直接分享（含圖）
   ================================================================ */

(function () {
  const APPLE = 'https://apps.apple.com/tw/app/folio-find-your-book-buddy/id6771667110';
  const PLAY = 'https://play.google.com/store/apps/details?id=com.yuliao.folio';

  const root = document.getElementById('quiz-root');
  const bgLayer = document.getElementById('scene-bg');
  const bgLayerPrev = document.getElementById('scene-bg-prev');
  const tintLayer = document.getElementById('type-tint');
  const veil = document.getElementById('scene-veil');
  const progressEl = document.getElementById('progress-dots');
  const muteBtn = document.getElementById('mute-toggle');

  const state = {
    pace: [], motive: [], social: [],
    echoes: [],
    step: 0,
  };

  let currentSceneObj = null;
  let revealTimer = null;

  /* ---------------- 音訊系統 ----------------
     頁面載入立刻 fetch + decode 所有音檔（不需手勢），
     點擊時已就緒 → 修掉「按了沒聲音」的問題。
     fetch 失敗（例如 file:// 開啟）→ 退回 <audio> 元素播放。 */
  const AUDIO = (() => {
    const FILES = {
      door: 'assets/audio/door.mp3',
      phone: 'assets/audio/phone.mp3',
      select: 'assets/audio/select.mp3',
      page: 'assets/audio/page.mp3',
      reveal: 'assets/audio/reveal.mp3',
      typewriter: 'assets/audio/typewriter.mp3',
      quill: 'assets/audio/quill.mp3',
    };
    const BGM_URL = 'assets/audio/bgm.mp3';
    const VOL = { door: 0.62, phone: 0.22, select: 0.4, page: 0.52, reveal: 0.62, typewriter: 0.44, quill: 0.44 };
    const CUT = { phone: 2.8 }; // 秒；電話只響兩聲就淡掉
    const BGM_VOL = 0.3;
    const LOOP_FADE = 3; // 循環交叉淡接秒數（無縫、等功率）

    let muted = localStorage.getItem('folio-quiz-muted') === '1';

    const AC = window.AudioContext || window.webkitAudioContext;
    const ctx = AC ? new AC() : null; // 建立時是 suspended，解碼仍可進行
    let master = null, bgmBus = null;
    if (ctx) {
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 1;
      master.connect(ctx.destination);
      bgmBus = ctx.createGain();
      bgmBus.gain.value = BGM_VOL;
      bgmBus.connect(master);
    }

    const buffers = {};
    let webAudioOk = !!ctx;
    let bgmBuffer = null;
    const fallbackEls = {}; // file:// 退路
    let fallbackBgm = null;

    function decode(url) {
      return fetch(url)
        .then((r) => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
        .then((ab) => new Promise((res, rej) => ctx.decodeAudioData(ab, res, rej)));
    }

    function setupFallback() {
      if (webAudioOk === false && Object.keys(fallbackEls).length) return;
      webAudioOk = false;
      Object.entries(FILES).forEach(([k, url]) => {
        const el = new Audio(url);
        el.preload = 'auto';
        fallbackEls[k] = el;
      });
      fallbackBgm = new Audio(BGM_URL);
      fallbackBgm.preload = 'auto';
      fallbackBgm.loop = true;
      fallbackBgm.volume = muted ? 0 : BGM_VOL;
    }

    if (ctx) {
      Object.entries(FILES).forEach(([k, url]) => {
        decode(url).then((buf) => { buffers[k] = buf; }).catch(() => setupFallback());
      });
      decode(BGM_URL).then((buf) => { bgmBuffer = buf; bgmReady(); }).catch(() => setupFallback());
    } else {
      setupFallback();
    }

    function resume() {
      if (ctx && ctx.state === 'suspended') ctx.resume();
    }

    function play(name) {
      const vol = VOL[name] != null ? VOL[name] : 1;
      const cut = CUT[name];
      if (webAudioOk && buffers[name]) {
        resume();
        const t0 = ctx.currentTime;
        const src = ctx.createBufferSource();
        src.buffer = buffers[name];
        const g = ctx.createGain();
        g.gain.value = vol;
        if (cut && buffers[name].duration > cut) {
          g.gain.setValueAtTime(vol, t0 + cut - 0.4);
          g.gain.linearRampToValueAtTime(0, t0 + cut);
          src.stop(t0 + cut + 0.05);
        }
        src.connect(g).connect(master);
        src.start(t0);
        return;
      }
      const el = fallbackEls[name];
      if (el) {
        const clone = el.cloneNode();
        clone.volume = muted ? 0 : vol;
        clone.play().catch(() => {});
        if (cut) setTimeout(() => { clone.pause(); }, cut * 1000);
      }
    }

    /* --- 背景音樂：雙音源等功率交叉淡接 → 無縫循環 --- */
    let bgmWanted = false;   // 已要求播放（等手勢 / 等解碼）
    let bgmRunning = false;
    let loopTimer = null;

    // 等功率淡入/淡出曲線（sin/cos），交叉時總能量恆定、不會凹陷或突兀
    function fadeCurve(up, n = 48) {
      const arr = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const t = i / (n - 1);
        arr[i] = Math.sin((up ? t : 1 - t) * Math.PI / 2);
      }
      return arr;
    }
    const CURVE_IN = fadeCurve(true);
    const CURVE_OUT = fadeCurve(false);

    function spawnLoop(at, fadeIn) {
      const dur = bgmBuffer.duration;
      const src = ctx.createBufferSource();
      src.buffer = bgmBuffer;
      const g = ctx.createGain();
      src.connect(g).connect(bgmBus);
      const inDur = fadeIn ? 3.2 : LOOP_FADE; // 第一次進場淡入拉長，更溫柔
      g.gain.setValueAtTime(0, at);
      g.gain.setValueCurveAtTime(CURVE_IN, at, inDur);
      g.gain.setValueAtTime(1, at + dur - LOOP_FADE);
      g.gain.setValueCurveAtTime(CURVE_OUT, at + dur - LOOP_FADE, LOOP_FADE);
      src.start(at);
      src.stop(at + dur + 0.1);
      const nextAt = at + dur - LOOP_FADE;
      const waitMs = Math.max((nextAt - ctx.currentTime - 1.5) * 1000, 0);
      loopTimer = setTimeout(() => spawnLoop(nextAt, false), waitMs);
    }

    function bgmReady() {
      if (bgmWanted && !bgmRunning) startBgm();
    }

    function startBgm() {
      bgmWanted = true;
      if (webAudioOk) {
        if (!bgmBuffer || bgmRunning) return;
        resume();
        if (ctx.state !== 'running') return; // 等下一次手勢再試
        bgmRunning = true;
        spawnLoop(ctx.currentTime + 0.05, true);
      } else if (fallbackBgm && fallbackBgm.paused) {
        fallbackBgm.play().then(() => { bgmRunning = true; }).catch(() => {});
      }
    }

    function toggleMute() {
      muted = !muted;
      localStorage.setItem('folio-quiz-muted', muted ? '1' : '0');
      if (master) master.gain.value = muted ? 0 : 1;
      if (fallbackBgm) fallbackBgm.volume = muted ? 0 : BGM_VOL;
      return muted;
    }

    return {
      resume, startBgm, toggleMute,
      get muted() { return muted; },
      door() { play('door'); },
      phone() { play('phone'); },
      select() { play('select'); },
      page() { play('page'); },
      reveal() { play('reveal'); },
      typewriter() { play('typewriter'); },
      quill() { play('quill'); },
      get playing() { return bgmRunning; },
    };
  })();

  // 進頁面就嘗試起播（部分瀏覽器允許）；被擋就等第一個手勢
  function primeAudio() {
    AUDIO.resume();
    AUDIO.startBgm();
    if (AUDIO.playing) hideSoundHint();
    else setTimeout(hideSoundHintIfPlaying, 400);
  }
  primeAudio();
  setTimeout(primeAudio, 300);
  ['pointerdown', 'keydown', 'touchstart'].forEach((ev) => {
    window.addEventListener(ev, primeAudio, { passive: true });
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) primeAudio();
  });

  // 瀏覽器擋自動播放時，優雅提示「點一下開啟聲音」
  let soundHintEl = null;
  function hideSoundHint() {
    if (soundHintEl) { soundHintEl.classList.remove('shown'); const el = soundHintEl; soundHintEl = null; setTimeout(() => el.remove(), 600); }
  }
  function hideSoundHintIfPlaying() { if (AUDIO.playing) hideSoundHint(); }
  setTimeout(() => {
    if (AUDIO.playing || AUDIO.muted) return;
    soundHintEl = document.createElement('div');
    soundHintEl.className = 'sound-hint';
    soundHintEl.textContent = '♪ 點一下畫面，讓書店的聲音進來';
    document.body.appendChild(soundHintEl);
    requestAnimationFrame(() => soundHintEl && soundHintEl.classList.add('shown'));
  }, 1200);

  if (muteBtn) {
    const syncMuteUI = () => {
      muteBtn.classList.toggle('muted', AUDIO.muted);
      muteBtn.setAttribute('aria-label', AUDIO.muted ? '開啟音效' : '關閉音效');
    };
    syncMuteUI();
    muteBtn.addEventListener('click', () => { primeAudio(); AUDIO.toggleMute(); syncMuteUI(); });
  }

  /* ---------------- 場景背景 ---------------- */
  function isPortrait() {
    return window.innerHeight > window.innerWidth;
  }

  function sceneUrl(scene) {
    if (!scene) return '';
    return isPortrait() && scene.port ? scene.port : scene.land;
  }

  function setScene(scene) {
    const url = sceneUrl(scene);
    currentSceneObj = scene;
    if (!url) return;
    if (bgLayer.dataset.url === url) return;
    bgLayerPrev.style.backgroundImage = bgLayer.style.backgroundImage;
    bgLayerPrev.style.opacity = '1';
    bgLayer.style.backgroundImage = `url("${url}")`;
    bgLayer.dataset.url = url;
    bgLayer.style.opacity = '0';
    setTimeout(() => {
      bgLayer.style.opacity = '1';
      bgLayerPrev.style.opacity = '0';
    }, 40);
  }

  function syncSceneOrientation() {
    if (!currentSceneObj) return;
    const url = sceneUrl(currentSceneObj);
    if (bgLayer.dataset.url !== url) {
      bgLayer.style.backgroundImage = `url("${url}")`;
      bgLayer.dataset.url = url;
    }
  }
  let resizeT = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(syncSceneOrientation, 180);
  });
  const orientMq = window.matchMedia('(orientation: portrait)');
  if (orientMq.addEventListener) orientMq.addEventListener('change', syncSceneOrientation);

  function preload() {
    const seen = new Set();
    Object.values(SCENES).forEach((s) => {
      [isPortrait() ? s.port : s.land, isPortrait() ? s.land : s.port].forEach((u, i) => {
        if (!u || seen.has(u)) return;
        seen.add(u);
        const img = new Image();
        if (i === 1) img.loading = 'lazy';
        img.src = u;
      });
    });
  }

  /* ---------------- 共用 UI helpers ---------------- */
  function renderDots(total, filled) {
    progressEl.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i < filled ? ' filled' : '');
      progressEl.appendChild(dot);
    }
  }

  function clearOverlays() {
    document.querySelectorAll('.tap-skip, .tap-advance, .vn-advance').forEach((n) => n.remove());
  }

  function fadeSwap(renderFn) {
    root.classList.add('leaving');
    clearOverlays();
    setTimeout(() => {
      root.innerHTML = '';
      clearTimeout(revealTimer);
      renderFn(root);
      root.classList.remove('leaving');
    }, 360);
  }

  function majority(votes) {
    const sum = votes.reduce((a, b) => a + b, 0);
    return sum * 2 >= votes.length ? 1 : 0;
  }

  // 逐字浮現：把文字拆成 span、交錯 transition-delay。回傳整段完成毫秒
  function typeInto(el, text, perChar = 26) {
    el.innerHTML = '';
    let idx = 0;
    text.split('\n').forEach((line, li) => {
      if (li > 0) el.appendChild(document.createElement('br'));
      for (const ch of line) {
        const sp = document.createElement('span');
        sp.className = 'ch';
        sp.textContent = ch;
        sp.style.transitionDelay = `${idx * perChar}ms`;
        el.appendChild(sp);
        idx++;
      }
    });
    setTimeout(() => el.classList.add('shown'), 30);
    return idx * perChar + 400;
  }

  // 打字 + 全螢幕「點擊跳過」層。打完（或被點）呼叫 onReveal（只觸發一次）。
  function typeAndThen(el, text, perChar, cap, onReveal) {
    const dur = typeInto(el, text, perChar);
    let fired = false;
    const layer = document.createElement('div');
    layer.className = 'tap-skip';
    const fire = (skip) => {
      if (fired) return;
      fired = true;
      if (skip) el.classList.add('skip');
      clearTimeout(revealTimer);
      layer.remove();
      onReveal && onReveal();
    };
    revealTimer = setTimeout(() => fire(false), Math.min(dur, cap));
    layer.addEventListener('click', () => fire(true), { once: true });
    document.body.appendChild(layer);
    return fire;
  }

  // 敘事段落結尾：右下角「點擊繼續」提示 + 全螢幕可點層
  function showAdvance(labelText, onAdvance) {
    const hint = document.createElement('div');
    hint.className = 'vn-advance';
    hint.innerHTML =
      `<span>${labelText}</span>` +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13"/><path d="M13 6l6 6-6 6"/></svg>';
    document.body.appendChild(hint);

    const layer = document.createElement('div');
    layer.className = 'tap-advance';
    const go = () => {
      hint.remove();
      layer.remove();
      onAdvance();
    };
    layer.addEventListener('click', go, { once: true });
    document.body.appendChild(layer);
    requestAnimationFrame(() => hint.classList.add('shown'));
    return go;
  }

  function playSceneSfx(q) {
    if (!q.sfx) return;
    const delay = q.sfx === 'phone' ? 620 : 450;
    setTimeout(() => {
      if (q.sfx === 'phone') AUDIO.phone();
      else if (q.sfx === 'page') AUDIO.page();
      else if (q.sfx === 'typewriter') AUDIO.typewriter();
    }, delay);
  }

  /* ---------------- 各畫面 ---------------- */
  function showOpening() {
    setScene(OPENING.scene);
    veil.classList.remove('dim');
    progressEl.style.display = 'none';
    root.innerHTML = `
      <div class="vn-center">
        <p class="vn-eyebrow">${OPENING.sub}</p>
        <h1 class="vn-title">${OPENING.title}</h1>
        <p class="vn-open-text" id="open-text"></p>
        <button class="btn-primary vn-start" id="btn-start">
          <span>${OPENING.cta}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13"/><path d="M13 6l6 6-6 6"/></svg>
        </button>
      </div>
    `;
    const textEl = document.getElementById('open-text');
    const btn = document.getElementById('btn-start');
    typeAndThen(textEl, OPENING.text, 24, 2800, () => btn.classList.add('shown'));
    btn.addEventListener('click', () => {
      primeAudio();
      AUDIO.door();
      setTimeout(() => fadeSwap(() => showQuestion('act1', 0)), 460);
    });
  }

  function questionSet(actKey) {
    if (actKey === 'act1') return ACT1;
    if (actKey === 'act2') return ACT2[majority(state.pace)];
    return ACT3[majority(state.motive)];
  }

  function showQuestion(actKey, idx) {
    const set = questionSet(actKey);
    const q = set[idx];
    setScene(q.scene);
    veil.classList.remove('dim');
    progressEl.style.display = 'flex';
    renderDots(9, state.step);

    root.innerHTML = `
      <div class="vn-box">
        <p class="vn-text" id="vn-text"></p>
        <p class="vn-prompt" id="vn-prompt">${q.prompt}</p>
        <div class="vn-options" id="vn-options"></div>
      </div>
    `;
    const textEl = document.getElementById('vn-text');
    const promptEl = document.getElementById('vn-prompt');
    const optsEl = document.getElementById('vn-options');

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'vn-option';
      btn.textContent = opt.label;
      btn.style.transitionDelay = `${i * 90}ms`;
      btn.addEventListener('click', () => {
        if (optsEl.classList.contains('locked')) return;
        optsEl.classList.add('locked');
        btn.classList.add('picked');
        // 選項可指定專屬音效（羽毛筆寫字 / 打字機），否則用沉穩點擊聲
        if (opt.sfx === 'quill') AUDIO.quill();
        else if (opt.sfx === 'typewriter') AUDIO.typewriter();
        else AUDIO.select();
        recordAnswer(actKey, opt);
        setTimeout(() => advance(actKey, idx), 320);
      });
      optsEl.appendChild(btn);
    });

    const revealOptions = () => {
      promptEl.classList.add('shown');
      optsEl.classList.add('shown');
    };
    typeAndThen(textEl, q.narration, 26, 3400, revealOptions);
    playSceneSfx(q);
  }

  function recordAnswer(actKey, opt) {
    const axis = actKey === 'act1' ? state.pace : actKey === 'act2' ? state.motive : state.social;
    axis.push(opt.vote);
    state.echoes.push(opt.echo);
    state.step += 1;
  }

  function advance(actKey, idx) {
    const set = questionSet(actKey);
    if (idx + 1 < set.length) {
      fadeSwap(() => showQuestion(actKey, idx + 1));
      return;
    }
    if (actKey === 'act1') {
      fadeSwap(() => showTransition(ACT1_TO_ACT2[majority(state.pace)], () => showQuestion('act2', 0)));
    } else if (actKey === 'act2') {
      fadeSwap(() => showTransition(ACT2_TO_ACT3[majority(state.motive)], () => showQuestion('act3', 0)));
    } else {
      fadeSwap(showEnding);
    }
  }

  function showTransition(text, next) {
    veil.classList.add('dim');
    progressEl.style.display = 'flex';
    renderDots(9, state.step);
    root.innerHTML = `
      <div class="vn-center">
        <p class="vn-transition" id="tr-text"></p>
      </div>
    `;
    const textEl = document.getElementById('tr-text');
    typeAndThen(textEl, text, 30, 2800, () => {
      showAdvance('點擊螢幕繼續', () => {
        AUDIO.page();
        fadeSwap(next);
      });
    });
  }

  function showEnding() {
    // 9 題已答完 → 用完整人格碼給出專屬結局
    const code = majority(state.pace) * 4 + majority(state.motive) * 2 + majority(state.social);
    const ending = ENDING[code];
    setScene(ending.scene);
    veil.classList.remove('dim');
    progressEl.style.display = 'none';
    root.innerHTML = `
      <div class="vn-box">
        <p class="vn-text" id="vn-text"></p>
      </div>
    `;
    const textEl = document.getElementById('vn-text');
    typeAndThen(textEl, ending.text, 30, 3400, () => {
      showAdvance('回顧這一夜', () => {
        AUDIO.page();
        fadeSwap(showRecap);
      });
    });
  }

  function showRecap() {
    veil.classList.add('dim');
    progressEl.style.display = 'none';
    root.innerHTML = `
      <div class="vn-center recap">
        <p class="vn-eyebrow">打烊了。原來今晚被讀完的，是你</p>
        <div class="recap-lines" id="recap-lines"></div>
        <button class="btn-primary vn-start" id="btn-reveal">
          <span>看看書店讀出的你</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13"/><path d="M13 6l6 6-6 6"/></svg>
        </button>
      </div>
    `;
    const wrap = document.getElementById('recap-lines');
    state.echoes.forEach((line, i) => {
      const p = document.createElement('p');
      p.className = 'recap-line';
      p.textContent = line;
      p.style.animationDelay = `${0.22 * i}s`;
      wrap.appendChild(p);
    });
    const btn = document.getElementById('btn-reveal');
    setTimeout(() => btn.classList.add('shown'), 220 * state.echoes.length + 500);
    btn.addEventListener('click', () => {
      AUDIO.page();
      fadeSwap(showResult);
    });
  }

  /* ---------------- 結果頁 ---------------- */
  function showResult() {
    const code = majority(state.pace) * 4 + majority(state.motive) * 2 + majority(state.social);
    const type = TYPES[code];
    const rel = relations(code);
    const soulmate = TYPES[rel.soulmate];
    const spark = TYPES[rel.spark];
    const opposite = TYPES[rel.opposite];

    progressEl.style.display = 'none';
    document.documentElement.style.setProperty('--type-color', type.color);
    document.documentElement.style.setProperty('--type-color-dark', type.colorDark);
    document.documentElement.style.setProperty('--type-color-wash', type.colorWash);
    setScene(SCENES.dawn);
    veil.classList.add('dim');       // 背景壓暗，讓卡片當主角
    tintLayer.classList.remove('on');

    const qr = qrDataUrl(DOWNLOAD_URL, 5);
    const relMini = (label, t) =>
      `<div class="rc-rel"><span class="rc-rel-label">${label}</span>` +
      `<span class="rc-rel-ava" style="--rc:${t.colorDark}"><img src="${t.avatar}" alt=""></span>` +
      `<span class="rc-rel-name">${t.name}</span></div>`;

    root.innerHTML = `
      <div class="result-wrap">
        <div class="result-card" id="result-card">
          <div class="rc-tint"></div>
          <div class="rc-avatar-wrap"><img class="rc-avatar" src="${type.avatar}" alt="${type.name}"></div>
          <div class="rc-panel">
            <p class="rc-brand">深夜書店・人格測驗</p>
            <p class="rc-eyebrow">深夜書店讀出的你</p>
            <h1 class="rc-name">${type.name}</h1>
            <p class="rc-tagline">「${type.tagline}」</p>
            <p class="rc-desc">${type.desc}</p>
            <div class="rc-traits">
              ${type.traits.map((t) => `<span class="rc-tag">${t}</span>`).join('')}
            </div>
            <div class="rc-rel-block">
              <p class="rc-relhead">你和誰最合拍</p>
              <div class="rc-rels">
                ${relMini('最麻吉', soulmate)}
                ${relMini('最來電', spark)}
                ${relMini('意外合拍', opposite)}
              </div>
            </div>
            <div class="rc-books">
              <p class="rc-relhead">深夜書店偷偷塞進你口袋的書</p>
              ${type.books.map((b) => `<p class="rc-book">《${b.title}》<span>${b.author}</span></p>`).join('')}
            </div>
            <div class="rc-foot">
              ${qr ? `<img class="rc-qr" src="${qr}" alt="下載 Folio QR">` : ''}
              <div class="rc-foot-text">
                <p class="rc-foot-q">你會是哪一種？</p>
                <p class="rc-foot-cta">掃碼下載 Folio・foliomatch.app/quiz</p>
              </div>
            </div>
          </div>
        </div>

        <div class="result-panel">
          <div class="dl-note dl-note-primary">
            <p class="dl-note-title">在手機上下載 Folio，找到和你讀同一種故事的人</p>
            <div class="store-row">
              <a class="store-badge" href="${APPLE}" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.365 1.43c0 1.14-.42 2.22-1.19 3.02-.83.87-2.2 1.55-3.35 1.46-.14-1.1.42-2.28 1.16-3.03.83-.86 2.28-1.5 3.38-1.45zM20.7 17.2c-.6 1.37-.9 1.98-1.67 3.19-1.08 1.68-2.6 3.78-4.48 3.79-1.67.02-2.1-1.09-4.37-1.08-2.27.01-2.74 1.1-4.42 1.08-1.88-.02-3.32-1.9-4.4-3.58C-1.4 15.9-1.7 9.14 1.06 5.66c.98-1.24 2.53-2.03 4.16-2.06 1.7-.03 2.77 1.11 4.17 1.11 1.36 0 2.19-1.11 4.16-1.11 1.45 0 2.99.79 4.09 2.16-3.6 1.97-3 7.1.06 8.44z"/></svg>
                <span><small>下載於</small>App Store</span>
              </a>
              <a class="store-badge" href="${PLAY}" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#00D2FF" d="M3.6 1.8 13 11.2 3.6 20.6c-.35-.2-.6-.6-.6-1.1V2.9c0-.5.25-.9.6-1.1z"/><path fill="#00E676" d="M3.6 1.8c.3-.17.68-.2 1.05.02l11.3 6.53-3 3.0L3.6 1.8z"/><path fill="#FFEA00" d="M15.95 8.35 20 10.7c.7.4.7 1.4 0 1.8l-4.05 2.35-3-3.0 3-2.5z"/><path fill="#FF3D00" d="M4.65 22.16c-.37.21-.75.19-1.05.02l9.4-9.4 3 3.0-11.35 6.38z"/></svg>
                <span><small>下載於</small>Google Play</span>
              </a>
            </div>
          </div>

          <p class="share-label">或把這張分析圖貼上限動，讓朋友也走一趟深夜書店。</p>
          <div class="result-actions">
            <button class="act-btn act-share" id="btn-share">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.7 6.8-4.4"/><path d="m8.6 13.3 6.8 4.4"/></svg>
              分享分析圖
            </button>
            <button class="act-btn act-download" id="btn-download">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>
              下載分析圖
            </button>
            <button class="act-btn act-restart" id="btn-restart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
              重新測驗
            </button>
          </div>
        </div>
      </div>
    `;

    requestAnimationFrame(() => document.getElementById('result-card').classList.add('in'));

    document.getElementById('btn-restart').addEventListener('click', () => {
      AUDIO.page();
      state.pace = []; state.motive = []; state.social = []; state.echoes = []; state.step = 0;
      document.documentElement.style.removeProperty('--type-color');
      document.documentElement.style.removeProperty('--type-color-dark');
      document.documentElement.style.removeProperty('--type-color-wash');
      tintLayer.classList.remove('on');
      fadeSwap(showOpening);
    });

    document.getElementById('btn-download').addEventListener('click', () => {
      AUDIO.select();
      exportShareImage(type, { soulmate, spark, opposite }, 'download');
    });
    document.getElementById('btn-share').addEventListener('click', () => {
      AUDIO.select();
      exportShareImage(type, { soulmate, spark, opposite }, 'share');
    });
  }

  /* ---------------- QR code ---------------- */
  const DOWNLOAD_URL = 'https://foliomatch.app/dl'; // 智慧跳轉：Android→Play、iOS→App Store
  function qrDataUrl(text, cell) {
    if (typeof qrcode !== 'function') return '';
    try {
      const qr = qrcode(0, 'M'); // type 0 = 自動選版本；M = 中等容錯
      qr.addData(text);
      qr.make();
      return qr.createDataURL(cell || 8, (cell || 8) * 2); // 黑白最好掃
    } catch (e) { return ''; }
  }
  function qrImg(text, cell) {
    const url = qrDataUrl(text, cell);
    if (!url) return null;
    const img = new Image();
    img.src = url;
    img.alt = '下載 Folio QR';
    img.className = 'qr-img';
    return img;
  }

  function relationCard(label, type) {
    return `
      <div class="relation-card" style="--rc: ${type.colorDark}">
        <p class="relation-label">${label}</p>
        <img src="${type.avatar}" alt="${type.name}" class="relation-avatar">
        <p class="relation-name">${type.name}</p>
      </div>
    `;
  }

  /* ---------------- 分析圖（IG 限動 9:16，1080×1920） ---------------- */
  let h2cPromise = null;
  function ensureHtml2Canvas() {
    if (window.html2canvas) return Promise.resolve(window.html2canvas);
    if (h2cPromise) return h2cPromise;
    h2cPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'html2canvas.min.js'; // 自架，不吃外部 CDN
      s.onload = () => resolve(window.html2canvas);
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return h2cPromise;
  }

  function shareCardNode(type, rels) {
    const wrap = document.createElement('div');
    wrap.className = 'share-card';
    wrap.style.setProperty('--type-color-dark', type.colorDark);
    wrap.style.setProperty('--type-color-wash', type.colorWash);
    const mini = (label, t) =>
      `<div class="sc-rel"><p class="sc-rel-label">${label}</p>` +
      `<span class="sc-rel-ava" style="--rc:${t.colorDark}"><img src="${t.avatar}" alt=""></span>` +
      `<p class="sc-rel-name">${t.name}</p></div>`;
    const qr = qrDataUrl(DOWNLOAD_URL, 6);
    wrap.innerHTML = `
      <img class="sc-bg" src="assets/share/card-bg.jpg" alt="">
      <div class="sc-tint"></div>
      <div class="sc-topwash"></div>
      <p class="sc-brand">深夜書店・人格測驗</p>
      <div class="sc-avatar-wrap"><img class="sc-avatar" src="${type.avatar}" alt=""></div>
      <div class="sc-panel">
        <p class="sc-eyebrow">深夜書店讀出我是</p>
        <h1 class="sc-name">${type.name}</h1>
        <p class="sc-tagline">「${type.tagline}」</p>
        <p class="sc-desc">${type.desc}</p>
        <div class="sc-traits">
          ${type.traits.map((t) => `<span class="sc-chip">${t}</span>`).join('')}
        </div>
        <div class="sc-rels">
          ${mini('最麻吉', rels.soulmate)}
          ${mini('最來電', rels.spark)}
          ${mini('意外合拍', rels.opposite)}
        </div>
        <div class="sc-books">
          <p class="sc-books-head">深夜書店偷偷塞進你口袋的書</p>
          ${type.books.map((b) => `<p class="sc-book">《${b.title}》<span>${b.author}</span></p>`).join('')}
        </div>
        <div class="sc-foot">
          ${qr ? `<img class="sc-qr" src="${qr}" alt="">` : ''}
          <div class="sc-foot-text">
            <p class="sc-foot-q">你會是哪一種？</p>
            <p class="sc-foot-cta">掃碼下載 Folio・foliomatch.app/quiz</p>
          </div>
        </div>
      </div>
    `;
    return wrap;
  }

  function renderShareCanvas(type, rels) {
    return ensureHtml2Canvas().then((h2c) => {
      const node = shareCardNode(type, rels);
      document.body.appendChild(node);
      const imgs = Array.from(node.querySelectorAll('img'));
      return Promise.all(imgs.map((im) => im.complete ? Promise.resolve()
        : new Promise((res) => { im.onload = im.onerror = res; })))
        .then(() => h2c(node, { backgroundColor: '#191410', scale: 1, useCORS: true, logging: false }))
        .then((canvas) => { node.remove(); return canvas; });
    });
  }

  function btnFeedback(btn, label, text) {
    if (!btn) return;
    btn.disabled = false;
    btn.textContent = text;
    setTimeout(() => { btn.innerHTML = label; }, 2200);
  }

  function exportShareImage(type, rels, mode) {
    const btn = document.getElementById(mode === 'share' ? 'btn-share' : 'btn-download');
    const label = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.textContent = '生成圖片中…'; }
    const filename = `深夜原形-${type.name}.png`;

    renderShareCanvas(type, rels).then((canvas) => {
      if (mode === 'share') {
        canvas.toBlob((blob) => {
          if (!blob) { btnFeedback(btn, label, '生成失敗，再試一次'); return; }
          const file = new File([blob], filename, { type: 'image/png' });
          const shareData = {
            files: [file],
            title: '深夜書店・深夜原形測驗',
            text: `深夜書店說我是【${type.name}】——${type.tagline}。你會是哪一種？ https://foliomatch.app/quiz/`,
          };
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share(shareData)
              .then(() => { if (btn) { btn.disabled = false; btn.innerHTML = label; } })
              .catch(() => { if (btn) { btn.disabled = false; btn.innerHTML = label; } });
          } else {
            // 桌機沒有分享面板 → 下載，提示貼到限動
            triggerDownload(canvas, filename);
            btnFeedback(btn, label, '已存圖，貼到限動吧！');
          }
        }, 'image/png');
      } else {
        triggerDownload(canvas, filename);
        if (btn) { btn.disabled = false; btn.innerHTML = label; }
      }
    }).catch(() => btnFeedback(btn, label, '生成失敗，再試一次'));
  }

  function triggerDownload(canvas, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  preload();
  showOpening();
})();
