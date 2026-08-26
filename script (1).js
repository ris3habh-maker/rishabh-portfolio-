// ===================================================
// Rishabh — Portfolio Site JS
// Mobile menu, header shrink, section highlight,
// work filters, FAQ accordion, scroll reveals
// ===================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile menu toggle ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');

  function closeMenu() {
    mainNav.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = mainNav.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', toggleMenu);

    // close menu whenever a nav link is tapped
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // close menu on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // close menu if resized back to desktop width
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  /* ---------- Header shrink + active link on scroll ---------- */
  const siteHeader = document.querySelector('.site-header');
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function onScroll() {
    // shrink header
    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', window.scrollY > 40);
    }

    // highlight the current section's nav link
    let current = sections[0];
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) current = sec;
    });
    navLinks.forEach(link => {
      const match = current && link.getAttribute('href') === `#${current.id}`;
      link.classList.toggle('active', !!match);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Work filters ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      workCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // close all other items (accordion behaviour)
      faqItems.forEach(other => other.classList.remove('open'));

      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- Scroll-reveal animation ---------- */
  const revealTargets = document.querySelectorAll(
    '.work-card, .service-card, .process-row, .testi-card, .about-grid, .section-head'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    // fallback: just show everything
    revealTargets.forEach(el => el.classList.add('in'));
  }

});
