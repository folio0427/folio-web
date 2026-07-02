/* ================================================================
   深夜書店：閱讀人格測驗 — 流程控制（視覺小說式呈現）
   - 背景依螢幕方向選 land / port 版本
   - 文字逐字浮現、選項淡入、場景交叉淡入淡出
   - WebAudio 合成音效（推門 / 翻頁 / 轉場 / 揭曉），無外部音檔
   ================================================================ */

(function () {
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

  /* ---------------- 音效（WebAudio 合成） ---------------- */
  const SFX = (() => {
    let ctx = null;
    let master = null;
    let muted = localStorage.getItem('folio-quiz-muted') === '1';

    function ensure() {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = muted ? 0 : 0.7;
        master.connect(ctx.destination);
      }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    }

    function noiseBuffer(dur) {
      const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      return buf;
    }

    // 翻頁：兩段帶通噪音 swish
    function page() {
      if (!ensure()) return;
      const t0 = ctx.currentTime;
      [[0, 0.16, 1600, 0.20], [0.09, 0.22, 2400, 0.13]].forEach(([off, dur, freq, vol]) => {
        const src = ctx.createBufferSource();
        src.buffer = noiseBuffer(dur);
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = 0.9;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t0 + off);
        g.gain.linearRampToValueAtTime(vol, t0 + off + dur * 0.25);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + off + dur);
        src.connect(bp).connect(g).connect(master);
        src.start(t0 + off);
      });
    }

    // 推門：低頻嘎吱滑音 + 悶響
    function door() {
      if (!ensure()) return;
      const t0 = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(52, t0);
      osc.frequency.linearRampToValueAtTime(88, t0 + 0.55);
      osc.frequency.linearRampToValueAtTime(70, t0 + 0.9);
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 320; lp.Q.value = 4;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.10, t0 + 0.12);
      g.gain.setValueAtTime(0.10, t0 + 0.7);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 1.0);
      osc.connect(lp).connect(g).connect(master);
      osc.start(t0); osc.stop(t0 + 1.05);
      // 門碰上的悶響
      const thud = ctx.createOscillator();
      thud.type = 'sine';
      thud.frequency.setValueAtTime(85, t0 + 0.92);
      thud.frequency.exponentialRampToValueAtTime(48, t0 + 1.15);
      const tg = ctx.createGain();
      tg.gain.setValueAtTime(0, t0 + 0.92);
      tg.gain.linearRampToValueAtTime(0.22, t0 + 0.95);
      tg.gain.exponentialRampToValueAtTime(0.001, t0 + 1.3);
      thud.connect(tg).connect(master);
      thud.start(t0 + 0.92); thud.stop(t0 + 1.32);
    }

    // 轉場：柔和低通噪音湧動
    function whoosh() {
      if (!ensure()) return;
      const t0 = ctx.currentTime;
      const src = ctx.createBufferSource();
      src.buffer = noiseBuffer(0.7);
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.Q.value = 0.7;
      lp.frequency.setValueAtTime(260, t0);
      lp.frequency.linearRampToValueAtTime(1100, t0 + 0.3);
      lp.frequency.linearRampToValueAtTime(300, t0 + 0.7);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.12, t0 + 0.28);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.72);
      src.connect(lp).connect(g).connect(master);
      src.start(t0);
    }

    // 揭曉：暖和的三音琴聲
    function chime() {
      if (!ensure()) return;
      const t0 = ctx.currentTime;
      [[523.25, 0], [783.99, 0.14], [1046.5, 0.30]].forEach(([f, off]) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine'; osc.frequency.value = f;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t0 + off);
        g.gain.linearRampToValueAtTime(0.07, t0 + off + 0.03);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + off + 1.4);
        osc.connect(g).connect(master);
        osc.start(t0 + off); osc.stop(t0 + off + 1.45);
      });
    }

    function toggleMute() {
      muted = !muted;
      localStorage.setItem('folio-quiz-muted', muted ? '1' : '0');
      if (master) master.gain.value = muted ? 0 : 0.7;
      return muted;
    }

    return { page, door, whoosh, chime, toggleMute, get muted() { return muted; }, warm: ensure };
  })();

  if (muteBtn) {
    const syncMuteUI = () => {
      muteBtn.classList.toggle('muted', SFX.muted);
      muteBtn.setAttribute('aria-label', SFX.muted ? '開啟音效' : '關閉音效');
    };
    syncMuteUI();
    muteBtn.addEventListener('click', () => { SFX.toggleMute(); syncMuteUI(); });
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

  // 轉向 / resize 時換對應方向的圖
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

  // 預載全部場景圖（目前方向優先）
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

  function fadeSwap(renderFn) {
    root.classList.add('leaving');
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

  // 逐字浮現：把文字拆成 span、交錯 transition-delay
  // 回傳整段浮現完成所需毫秒數
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
    // 下一個 frame 才加 .shown，讓 transition 生效
    setTimeout(() => el.classList.add('shown'), 30);
    return idx * perChar + 400;
  }

  // 點文字區跳過逐字動畫
  function skippable(el, onSkip) {
    el.addEventListener('click', () => {
      el.classList.add('skip');
      onSkip && onSkip();
    }, { once: true });
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
        <button class="btn-primary vn-start" id="btn-start">${OPENING.cta}</button>
      </div>
    `;
    const textEl = document.getElementById('open-text');
    const dur = typeInto(textEl, OPENING.text, 24);
    skippable(textEl);
    const btn = document.getElementById('btn-start');
    setTimeout(() => btn.classList.add('shown'), Math.min(dur, 2200));
    btn.addEventListener('click', () => {
      SFX.warm();
      SFX.door();
      setTimeout(() => fadeSwap(() => showQuestion('act1', 0)), 420);
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
        SFX.page();
        recordAnswer(actKey, opt);
        setTimeout(() => advance(actKey, idx), 260);
      });
      optsEl.appendChild(btn);
    });

    const revealOptions = () => {
      promptEl.classList.add('shown');
      optsEl.classList.add('shown');
    };
    const dur = typeInto(textEl, q.narration, 26);
    revealTimer = setTimeout(revealOptions, Math.min(dur, 3200));
    skippable(textEl, revealOptions);
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
      SFX.whoosh();
      fadeSwap(() => showTransition(ACT1_TO_ACT2[majority(state.pace)], () => showQuestion('act2', 0)));
    } else if (actKey === 'act2') {
      SFX.whoosh();
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
        <button class="btn-primary vn-start" id="btn-continue">繼續</button>
      </div>
    `;
    const textEl = document.getElementById('tr-text');
    const dur = typeInto(textEl, text, 30);
    skippable(textEl);
    const btn = document.getElementById('btn-continue');
    setTimeout(() => btn.classList.add('shown'), Math.min(dur, 2400));
    btn.addEventListener('click', () => {
      SFX.page();
      fadeSwap(next);
    });
  }

  function showEnding() {
    const ending = ENDING[majority(state.social)];
    setScene(ending.scene);
    veil.classList.remove('dim');
    progressEl.style.display = 'none';
    root.innerHTML = `
      <div class="vn-box">
        <p class="vn-text" id="vn-text"></p>
        <div class="vn-options shown" style="margin-top:18px">
          <button class="btn-primary vn-start" id="btn-recap" style="align-self:flex-start"></button>
        </div>
      </div>
    `;
    const textEl = document.getElementById('vn-text');
    const dur = typeInto(textEl, ending.text, 30);
    skippable(textEl);
    const btn = document.getElementById('btn-recap');
    btn.textContent = '回顧這一路';
    setTimeout(() => btn.classList.add('shown'), Math.min(dur, 3000));
    btn.addEventListener('click', () => {
      SFX.page();
      fadeSwap(showRecap);
    });
  }

  function showRecap() {
    veil.classList.add('dim');
    root.innerHTML = `
      <div class="vn-center recap">
        <p class="vn-eyebrow">這一路，你留下的痕跡</p>
        <div class="recap-lines" id="recap-lines"></div>
        <button class="btn-primary vn-start" id="btn-reveal">看看你是誰</button>
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
      SFX.chime();
      fadeSwap(showResult);
    });
  }

  function showResult() {
    const code = majority(state.pace) * 4 + majority(state.motive) * 2 + majority(state.social);
    const type = TYPES[code];
    const rel = relations(code);
    const soulmate = TYPES[rel.soulmate];
    const spark = TYPES[rel.spark];
    const opposite = TYPES[rel.opposite];

    progressEl.style.display = 'none';
    veil.classList.remove('dim');
    document.documentElement.style.setProperty('--type-color', type.color);
    document.documentElement.style.setProperty('--type-color-dark', type.colorDark);
    document.documentElement.style.setProperty('--type-color-wash', type.colorWash);
    setScene(ENDING[majority(state.social)].scene);
    tintLayer.classList.add('on');

    root.innerHTML = `
      <div class="result-card">
        <img src="${type.avatar}" alt="${type.name}" class="result-avatar">
        <p class="eyebrow" style="color: var(--type-color-dark)">你的讀感人格</p>
        <h1 class="quiz-title result-name">${type.name}</h1>
        <p class="result-tagline">${type.tagline}</p>
        <p class="result-desc">${type.desc}</p>
        <p class="result-swatch">代表色：<span style="color: var(--type-color-dark)">●</span> ${colorLabel(type.id)}</p>

        <div class="relation-row">
          ${relationCard('最麻吉', soulmate)}
          ${relationCard('最來電', spark)}
          ${relationCard('三觀不合但意外合拍', opposite)}
        </div>

        <div class="book-list">
          <p class="section-label">推薦你讀</p>
          ${type.books.map((b) => `<p class="book-item">《${b.title}》<span class="book-author">${b.author}</span></p>`).join('')}
        </div>

        <p class="cta-line">如果你也想找到深夜還在讀書的人，<a href="/" class="cta-link">Folio</a> 在等你。</p>

        <div class="result-actions">
          <button class="btn-option" id="btn-share">複製分享文字</button>
          <button class="btn-option" id="btn-restart">重新測驗</button>
        </div>
      </div>
    `;

    document.getElementById('btn-restart').addEventListener('click', () => {
      state.pace = []; state.motive = []; state.social = []; state.echoes = []; state.step = 0;
      document.documentElement.style.removeProperty('--type-color');
      document.documentElement.style.removeProperty('--type-color-dark');
      document.documentElement.style.removeProperty('--type-color-wash');
      tintLayer.classList.remove('on');
      fadeSwap(showOpening);
    });

    document.getElementById('btn-share').addEventListener('click', () => {
      const text = `我在「深夜書店・閱讀人格測驗」測出是【${type.name}】：${type.tagline}\n來測測你是哪一種讀者 → https://foliomatch.app/quiz/`;
      navigator.clipboard?.writeText(text).then(() => {
        const btn = document.getElementById('btn-share');
        const original = btn.textContent;
        btn.textContent = '已複製！';
        setTimeout(() => { btn.textContent = original; }, 1600);
      });
    });
  }

  function colorLabel(id) {
    const map = {
      persimmon: '柿橙', blush: '緋櫻', navy: '紺藍', sky: '湛藍',
      lavender: '薰衣紫', sienna: '赭紅', sage: '黛綠', amber: '鵝黃',
    };
    return map[id] || id;
  }

  function relationCard(label, type) {
    return `
      <div class="relation-card" style="border-color: ${type.colorDark}">
        <p class="relation-label">${label}</p>
        <img src="${type.avatar}" alt="${type.name}" class="relation-avatar">
        <p class="relation-name">${type.name}</p>
      </div>
    `;
  }

  preload();
  showOpening();
})();
