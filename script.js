// =====================================================
// SAISGREE VISIONARY INTEGRATED MEDIA — script.js
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // ===== BACK TO TOP =====
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== ACTIVE NAV LINK =====
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));

  // ===== REVEAL ON SCROLL =====
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ===== ANIMATED COUNTERS =====
  const animateCounter = (el) => {
    const target = +el.getAttribute('data-target');
    const duration = 2200;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 16);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) counterObserver.observe(heroStats);

  // ===== PARTICLES =====
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    const colors = ['rgba(201,162,39,0.5)', 'rgba(26,58,143,0.5)', 'rgba(255,255,255,0.2)', 'rgba(37,99,235,0.4)'];
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 5 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      Object.assign(p.style, {
        width: size + 'px', height: size + 'px',
        left: Math.random() * 100 + '%',
        background: color,
        animationDuration: (Math.random() * 18 + 12) + 's',
        animationDelay: (Math.random() * 15) + 's',
        opacity: Math.random() * 0.5 + 0.2
      });
      particleContainer.appendChild(p);
    }
  }

  // ===== TESTIMONIALS CAROUSEL =====
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('carouselDots');
  if (track && dotsContainer) {
    const cards = track.querySelectorAll('.testimonial-card');
    let current = 0;
    let autoplayTimer;

    // Create dots
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    const goTo = (index) => {
      current = (index + cards.length) % cards.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dotsContainer.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
      resetAutoplay();
    };

    const resetAutoplay = () => {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => goTo(current + 1), 5500);
    };

    document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
    document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

    // Touch swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });

    resetAutoplay();
  }

  // ===== PORTFOLIO FILTER =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        if (show) {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.style.display = 'block';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { if (btn.getAttribute('data-filter') !== 'all' && card.getAttribute('data-category') !== btn.getAttribute('data-filter')) card.style.display = 'none'; }, 400);
        }
      });
    });
  });




  // ===== SMOOTH ANCHOR SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== NAV ACTIVE STYLE =====
  const style = document.createElement('style');
  style.textContent = '.nav-links a.active { color: var(--gold) !important; background: rgba(201,162,39,0.1); }';
  document.head.appendChild(style);

  // ===== CHART BAR HOVER TOOLTIP =====
  document.querySelectorAll('.bar').forEach(bar => {
    bar.setAttribute('title', 'Campaign ROI');
    bar.style.cursor = 'pointer';
    bar.addEventListener('mouseenter', () => { bar.style.filter = 'brightness(1.2)'; });
    bar.addEventListener('mouseleave', () => { bar.style.filter = ''; });
  });

  // ===== PROCESS STEP HOVER =====
  document.querySelectorAll('.process-step').forEach((step, i) => {
    setTimeout(() => {
      step.classList.add('reveal', 'visible');
    }, 300 + i * 120);
  });

  // ===== LAZY LOAD IMAGES =====
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  }

  // ===== VANILLA TILT 3D CARDS =====
  const initTilt = () => {
    if (typeof VanillaTilt === 'undefined') {
      setTimeout(initTilt, 300);
      return;
    }
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 12,
      speed: 400,
      glare: true,
      'max-glare': 0.12,
      perspective: 1000,
      scale: 1.03,
      transition: true,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
    });
  };
  initTilt();

  // ===== MOUSE PARALLAX ON 3D SHAPES =====
  const shapes = document.querySelectorAll('.shape-3d');
  const depths = [0.02, 0.04, 0.06, 0.03, 0.05, 0.025, 0.035];
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    shapes.forEach((shape, i) => {
      const d = depths[i % depths.length];
      const tx = dx * d;
      const ty = dy * d;
      shape.style.transform = `translate(${tx}px, ${ty}px)`;
    });
  });

  // ===== SCROLL-BASED 3D ROTATION FOR HERO CARD =====
  const mainCard = document.querySelector('.main-card');
  if (mainCard) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rot = Math.min(scrolled * 0.03, 12);
      mainCard.style.transform = `rotateY(${-8 + rot}deg) rotateX(${4 - rot * 0.3}deg)`;
    }, { passive: true });
  }

  // ===== 3D CURSOR GLOW TRAIL =====
  let cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed; width: 280px; height: 280px;
    background: radial-gradient(circle, rgba(255,109,0,0.06) 0%, transparent 70%);
    border-radius: 50%; pointer-events: none; z-index: 0;
    transform: translate(-50%, -50%); transition: opacity 0.3s;
    top: 0; left: 0;
  `;
  document.body.appendChild(cursorGlow);
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  // ===== 3D SECTION ENTRANCE — tilt hint on card reveal =====
  const tiltHintObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target._tilt) {
        entry.target._tilt.reset();
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('[data-tilt]').forEach(el => tiltHintObserver.observe(el));

  console.log('%c🚀 SSV Integrated Media — 3D Website Loaded', 'color: #ff6d00; font-size: 16px; font-weight: bold;');
  console.log('%cWeb Development | SEO | Social Media | Paid Ads', 'color: #1565c0; font-size: 13px;');
});
