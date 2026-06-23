// Folio 官網 — 安靜的水彩風 scroll reveal + nav blur
(() => {
  'use strict';

  // Scroll reveal: IntersectionObserver
  const REVEAL_THRESHOLD = 0.12;
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: REVEAL_THRESHOLD, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => {
      // 比視窗高太多的元素（如超長的法律條款頁）一次露不到 REVEAL_THRESHOLD、
      // 門檻永遠跨不過 → 直接顯示、不丟給 observer 否則永久 opacity:0 空白
      const h = el.getBoundingClientRect().height;
      if (h > 0 && window.innerHeight / h < REVEAL_THRESHOLD) {
        el.classList.add('visible');
      } else {
        io.observe(el);
      }
    });
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Nav: stays transparent over entire hero bg, opaque after leaving hero
  // Also drives scroll progress bar via --scroll-progress CSS var
  const nav = document.querySelector('.nav');
  const progressBar = nav?.querySelector('.scroll-progress-bar');
  if (nav) {
    const update = () => {
      const y = window.scrollY;
      const viewH = window.innerHeight;
      const heroH = viewH;
      const overHero = y < heroH * 0.92;
      nav.classList.toggle('nav-over-hero', overHero);
      nav.classList.toggle('nav-scrolled', !overHero);

      if (progressBar) {
        const docH = document.documentElement.scrollHeight - viewH;
        // unitless 0–1 → CSS scaleX；transform 走 compositor、不觸發 layout
        const frac = docH > 0 ? Math.min(1, y / docH) : 0;
        progressBar.style.setProperty('--scroll-progress', frac.toFixed(4));
      }
    };
    // 一個 scroll 事件潮只排一個 frame（多個 scroll event 不重複 queue）
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  }

  // Scrollspy: 目前所在 section → nav 書籤線
  const spyLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (spyLinks.length > 0 && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        spyLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === id));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    spyLinks.forEach((a) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) spy.observe(target);
    });
  }

// Book ribbon: organic sway — multi-freq idle + smoothed scroll velocity
  const ribbon = document.querySelector('.book-ribbon');
  if (ribbon && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let lastY = window.scrollY;
    let smoothedDelta = 0;
    let scrollSway = 0;
    let displayRotation = 0;
    const VELOCITY_FACTOR = 0.10;       // px scrolled per frame → degrees
    const VELOCITY_SMOOTH = 0.22;       // low-pass filter (lower = smoother)
    const MAX_ROTATION = 4.2;           // hard clamp (°)
    const SPRING_DAMP = 0.94;           // current decay factor per frame
    const SPRING_PULL = 0.06;           // new target weight per frame
    const DISPLAY_SMOOTH = 0.18;        // second-stage low-pass on render output

    // Three layered sine waves: slow primary + faster secondary + tiny tertiary
    // Different frequencies + phase offsets = non-repeating organic motion
    const IDLE_A_AMP = 0.42;  const IDLE_A_PERIOD = 3400;
    const IDLE_B_AMP = 0.18;  const IDLE_B_PERIOD = 2100;  const IDLE_B_PHASE = 1.3;
    const IDLE_C_AMP = 0.08;  const IDLE_C_PERIOD = 1250;  const IDLE_C_PHASE = 2.7;

    let lastRotateStr = '';
    let lastSagStr = '';

    const frame = (now) => {
      const currentY = window.scrollY;
      const deltaY = currentY - lastY;
      lastY = currentY;

      // 1st stage: low-pass filter raw scroll input (kills jitter)
      smoothedDelta = smoothedDelta * (1 - VELOCITY_SMOOTH) + deltaY * VELOCITY_SMOOTH;

      // map smoothed velocity → target angle
      const target = -smoothedDelta * VELOCITY_FACTOR;
      const clamped = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, target));

      // spring lerp toward target
      scrollSway = scrollSway * SPRING_DAMP + clamped * SPRING_PULL;

      // multi-frequency idle (Fourier-like sum mimics natural pendulum)
      const idle =
        Math.sin(now / IDLE_A_PERIOD) * IDLE_A_AMP +
        Math.sin(now / IDLE_B_PERIOD + IDLE_B_PHASE) * IDLE_B_AMP +
        Math.sin(now / IDLE_C_PERIOD + IDLE_C_PHASE) * IDLE_C_AMP;

      const totalTarget = scrollSway + idle;

      // 2nd stage: smooth the final display value (organic feel)
      displayRotation = displayRotation * (1 - DISPLAY_SMOOTH) + totalTarget * DISPLAY_SMOOTH;

      // coupled translateY: |rotation| × small factor → gentle "stretch" sag
      const sagY = Math.abs(displayRotation) * 0.35;

      // 值沒變（量化到 0.01）就不碰 style — 免去無效 style invalidation
      const rotateStr = displayRotation.toFixed(2) + 'deg';
      const sagStr = sagY.toFixed(2) + 'px';
      if (rotateStr !== lastRotateStr || sagStr !== lastSagStr) {
        ribbon.style.setProperty('--ribbon-rotate', rotateStr);
        ribbon.style.setProperty('--ribbon-sag', sagStr);
        lastRotateStr = rotateStr;
        lastSagStr = sagStr;
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  // Flow steps: scroll-triggered sequential light-up
  const flowGrid = document.querySelector('.flow-grid');
  if (flowGrid && 'IntersectionObserver' in window) {
    const steps = flowGrid.querySelectorAll('.flow-step');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const flowIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          steps.forEach((step, i) => {
            const delay = prefersReduced ? 0 : i * 280;
            setTimeout(() => step.classList.add('flow-on'), delay);
          });
          flowIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -40px 0px' });
    flowIo.observe(flowGrid);
    // 虛線 dashed-flow 只在 flow 區可見時播放（paint 動畫、離場即停）
    const dashIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => flowGrid.classList.toggle('flow-visible', e.isIntersecting));
    });
    dashIo.observe(flowGrid);
  } else if (flowGrid) {
    flowGrid.classList.add('flow-visible');
    flowGrid.querySelectorAll('.flow-step').forEach((s) => s.classList.add('flow-on'));
  }
})();
