// Folio 官網 — 安靜的水彩風 scroll reveal + nav blur
(() => {
  'use strict';

  // Scroll reveal: IntersectionObserver
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Nav: subtle deepen on scroll
  const nav = document.querySelector('.nav');
  if (nav) {
    let last = 0;
    const update = () => {
      const y = window.scrollY;
      if (y > 30) nav.style.background = 'rgba(248, 241, 228, 0.92)';
      else nav.style.background = 'rgba(248, 241, 228, 0.7)';
      last = y;
    };
    update();
    window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  }

  // Mascot subtle parallax on mouse（hero only、輕量）
  const heroMascots = document.querySelector('.hero-mascots');
  if (heroMascots && window.matchMedia('(min-width: 769px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let raf = null;
    document.addEventListener('mousemove', (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;
        heroMascots.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }
})();
