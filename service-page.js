// Shared service page JS — service-page.js
document.addEventListener('DOMContentLoaded', () => {
  // VanillaTilt
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 10, speed: 350, glare: true, 'max-glare': 0.1, scale: 1.03
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('open');
      document.querySelectorAll('.faq-q').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) { btn.classList.add('open'); btn.nextElementSibling.classList.add('open'); }
    });
  });



  // Mouse parallax on floating shapes
  const shapes = document.querySelectorAll('.fshape');
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    shapes.forEach((s, i) => {
      const d = (i + 1) * 0.025;
      s.style.transform = `translate(${(e.clientX - cx) * d}px, ${(e.clientY - cy) * d}px)`;
    });
  });
});
