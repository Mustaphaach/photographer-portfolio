// ═══════════════════
// CUSTOM CURSOR
// ═══════════════════
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateFollower() {
  if (follower) {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

// ═══════════════════
// PAGE LOADER
// ═══════════════════
const loader = document.getElementById('loader');
if (loader) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 1600);
  });
}

// ═══════════════════
// NAVBAR SCROLL
// ═══════════════════
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}

// ═══════════════════
// HAMBURGER MENU
// ═══════════════════
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ═══════════════════
// HERO SLIDESHOW
// ═══════════════════
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slide-dot');
let currentSlide = 0;

function goToSlide(i) {
  slides[currentSlide]?.classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  currentSlide = i;
  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');
}

if (slides.length > 1) {
  setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5000);
  dots.forEach(dot => dot.addEventListener('click', () => goToSlide(+dot.dataset.index)));
}

// ═══════════════════
// PAGE HERO PARALLAX
// ═══════════════════
const pageHeroBg = document.querySelector('.page-hero-bg');
if (pageHeroBg) {
  setTimeout(() => pageHeroBg.classList.add('active'), 100);
  window.addEventListener('scroll', () => {
    pageHeroBg.style.transform = `scale(1.04) translateY(${window.scrollY * 0.25}px)`;
  }, { passive: true });
}

// ═══════════════════
// SCROLL REVEAL
// ═══════════════════
const revealEls = document.querySelectorAll('.reveal-up');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// ═══════════════════
// GALLERY FILTER
// ═══════════════════
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    galleryItems.forEach(item => {
      const show = f === 'all' || item.dataset.category === f;
      item.style.opacity = '0';
      item.style.transform = 'scale(0.95)';
      setTimeout(() => {
        item.style.display = show ? 'block' : 'none';
        if (show) {
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.4s, transform 0.4s';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        }
      }, 150);
    });
  });
});

// ═══════════════════
// TESTIMONIALS SLIDER
// ═══════════════════
const track = document.getElementById('testimonials-track');
const prevBtn = document.getElementById('testi-prev');
const nextBtn = document.getElementById('testi-next');

if (track && prevBtn && nextBtn) {
  const cardWidth = 380 + 24;
  let pos = 0;

  nextBtn.addEventListener('click', () => {
    pos = Math.min(pos + cardWidth, (track.children.length - 1) * cardWidth);
    track.style.transform = `translateX(-${pos}px)`;
    track.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
  });
  prevBtn.addEventListener('click', () => {
    pos = Math.max(pos - cardWidth, 0);
    track.style.transform = `translateX(-${pos}px)`;
    track.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
  });
}

// ═══════════════════
// ANIMATED COUNTERS
// ═══════════════════
const counters = document.querySelectorAll('.stat-number');
if (counters.length) {
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current);
          if (current >= target) clearInterval(timer);
        }, 16);
        cObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cObs.observe(c));
}

// ═══════════════════
// 3D TILT EFFECT
// ═══════════════════
document.querySelectorAll('[data-tilt]').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
    el.style.transition = 'transform 0.5s ease';
  });
  el.addEventListener('mouseenter', () => {
    el.style.transition = 'none';
  });
});

// ═══════════════════
// CONTACT FORM
// ═══════════════════
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.querySelector('span').textContent = 'Sending...';
    submitBtn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        status.textContent = '✓ Message received — I will reply within 24 hours.';
        form.reset();
      } else {
        status.textContent = '✗ Something went wrong. Please try again.';
      }
    } catch {
      status.textContent = '✗ Network error. Please try again.';
    }
    submitBtn.querySelector('span').textContent = 'Send Message';
    submitBtn.disabled = false;
  });
}