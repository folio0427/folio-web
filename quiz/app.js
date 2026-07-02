/* ================================================================
   深夜書店：閱讀人格測驗 — 流程控制
   ================================================================ */

(function () {
  const root = document.getElementById('quiz-root');
  const bgLayer = document.getElementById('scene-bg');
  const bgLayerPrev = document.getElementById('scene-bg-prev');
  const tintLayer = document.getElementById('type-tint');
  const progressEl = document.getElementById('progress-dots');

  const state = {
    pace: [],   // votes 0/1
    motive: [],
    social: [],
    echoes: [], // collected echo lines in order, for recap
    step: 0,    // 1-9 answered count, for progress dots
  };

  let currentScene = '';

  function majority(votes) {
    const sum = votes.reduce((a, b) => a + b, 0);
    return sum * 2 >= votes.length ? 1 : 0;
  }

  function setScene(url) {
    if (url === currentScene) return;
    bgLayerPrev.style.backgroundImage = bgLayer.style.backgroundImage;
    bgLayerPrev.style.opacity = '1';
    bgLayer.style.backgroundImage = `url("${url}")`;
    bgLayer.style.opacity = '0';
    // setTimeout (not rAF) so the fade-in still fires in backgrounded/inactive tabs
    setTimeout(() => {
      bgLayer.style.opacity = '1';
      bgLayerPrev.style.opacity = '0';
    }, 30);
    currentScene = url;
  }

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
      renderFn(root);
      root.classList.remove('leaving');
    }, 320);
  }

  function card(html) {
    return `<div class="paper-card">${html}</div>`;
  }

  function showOpening() {
    setScene(OPENING.scene);
    progressEl.style.display = 'none';
    root.innerHTML = card(`
      <p class="eyebrow">${OPENING.sub}</p>
      <h1 class="quiz-title">${OPENING.title}</h1>
      <p class="scene-text">${OPENING.text.replace(/\n/g, '<br>')}</p>
      <button class="btn-primary" id="btn-start">${OPENING.cta}</button>
    `);
    document.getElementById('btn-start').addEventListener('click', () => {
      fadeSwap(() => showQuestion('act1', 0));
    });
  }

  function questionSet(actKey) {
    if (actKey === 'act1') return ACT1;
    if (actKey === 'act2') return ACT2[majority(state.pace)];
    if (actKey === 'act3') return ACT3[majority(state.motive)];
  }

  function showQuestion(actKey, idx) {
    const set = questionSet(actKey);
    const q = set[idx];
    setScene(q.scene);
    progressEl.style.display = 'flex';
    renderDots(9, state.step);

    root.innerHTML = card(`
      <p class="scene-text">${q.narration}</p>
      <p class="prompt">${q.prompt}</p>
      <div class="options">
        <button class="btn-option" data-key="A">${q.options[0].label}</button>
        <button class="btn-option" data-key="B">${q.options[1].label}</button>
      </div>
    `);

    root.querySelectorAll('.btn-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-key');
        const opt = q.options.find((o) => o.key === key);
        recordAnswer(actKey, opt);
        advance(actKey, idx);
      });
    });
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
    // act finished
    if (actKey === 'act1') {
      fadeSwap(() => showTransition(ACT1_TO_ACT2[majority(state.pace)], () => showQuestion('act2', 0)));
    } else if (actKey === 'act2') {
      fadeSwap(() => showTransition(ACT2_TO_ACT3[majority(state.motive)], () => showQuestion('act3', 0)));
    } else if (actKey === 'act3') {
      fadeSwap(showEnding);
    }
  }

  function showTransition(text, next) {
    root.innerHTML = card(`
      <p class="scene-text transition-text">${text}</p>
      <button class="btn-primary" id="btn-continue">繼續</button>
    `);
    document.getElementById('btn-continue').addEventListener('click', () => {
      fadeSwap(next);
    });
  }

  function showEnding() {
    const ending = ENDING[majority(state.social)];
    setScene(ending.scene);
    progressEl.style.display = 'none';
    root.innerHTML = card(`
      <p class="scene-text">${ending.text.replace(/\n/g, '<br>')}</p>
      <button class="btn-primary" id="btn-recap">回顧這一路</button>
    `);
    document.getElementById('btn-recap').addEventListener('click', () => {
      fadeSwap(showRecap);
    });
  }

  function showRecap() {
    root.innerHTML = card(`
      <p class="eyebrow">這一路，你留下的痕跡</p>
      <div class="recap-lines" id="recap-lines"></div>
      <button class="btn-primary" id="btn-reveal" style="display:none">看看你是誰</button>
    `);
    const wrap = document.getElementById('recap-lines');
    state.echoes.forEach((line, i) => {
      const p = document.createElement('p');
      p.className = 'recap-line';
      p.textContent = line;
      p.style.animationDelay = `${0.25 * i}s`;
      wrap.appendChild(p);
    });
    const revealBtn = document.getElementById('btn-reveal');
    setTimeout(() => { revealBtn.style.display = 'inline-block'; }, 250 * state.echoes.length + 400);
    revealBtn.addEventListener('click', () => fadeSwap(showResult));
  }

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
      currentScene = '';
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

  showOpening();
})();
