// Simple countdown timer for the hero NFT
function startTimer(duration, display) {
  let timer = duration, hours, minutes, seconds;
  setInterval(function () {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt(timer % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + "h " + minutes + "m " + seconds + "s";

    if (--timer < 0) {
      timer = 0;
    }
  }, 1000);
}
window.onload = function () {
  var twoHoursFiftyMin = 2 * 3600 + 50 * 60 + 55;
  var display = document.getElementById('timer');
  startTimer(twoHoursFiftyMin, display);
};

// Highlight active menu link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Smooth scroll fallback for browsers that don't support CSS smooth scroll
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      e.preventDefault();
      window.scrollTo({
        top: targetSection.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Accessibility: High Contrast Toggle
const contrastToggle = document.querySelector('.contrast-toggle');
if (contrastToggle) {
  contrastToggle.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
  });
}

// Accessibility: Font Size Adjuster
const fontSizeUp = document.querySelector('.font-size-up');
const fontSizeDown = document.querySelector('.font-size-down');
let rootFontSize = 16;
if (fontSizeUp && fontSizeDown) {
  fontSizeUp.addEventListener('click', () => {
    rootFontSize = Math.min(rootFontSize + 2, 24);
    document.documentElement.style.fontSize = rootFontSize + 'px';
  });
  fontSizeDown.addEventListener('click', () => {
    rootFontSize = Math.max(rootFontSize - 2, 12);
    document.documentElement.style.fontSize = rootFontSize + 'px';
  });
}

// Cookie Consent Banner
const cookieBanner = document.getElementById('cookieConsent');
const acceptCookies = document.getElementById('acceptCookies');
if (cookieBanner && acceptCookies) {
  if (localStorage.getItem('cookieAccepted')) {
    cookieBanner.style.display = 'none';
  }
  acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookieAccepted', 'yes');
    cookieBanner.style.display = 'none';
  });
}

// Language Switcher (placeholder)
const langSwitcher = document.querySelector('.language-switcher');
if (langSwitcher) {
  langSwitcher.addEventListener('change', (e) => {
    alert('Language switching is a placeholder.');
  });
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinksMenu = document.querySelector('.nav-links');
if (hamburger && navLinksMenu) {
  hamburger.addEventListener('click', function() {
    const expanded = navLinksMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', expanded);
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}

// Theme Toggle (Dark/Light Mode)
const themeToggles = document.querySelectorAll('.theme-toggle');
if (localStorage.getItem('darkMode') === 'on') {
  document.body.classList.add('dark-mode');
}
themeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'on');
    } else {
      localStorage.setItem('darkMode', 'off');
    }
  });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(btn => {
  btn.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    const answer = this.nextElementSibling;
    if (answer) {
      answer.hidden = expanded;
    }
  });
});

// Testimonials Carousel
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
let testimonialIndex = 0;
function showTestimonial(idx) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
}
if (prevBtn && nextBtn && testimonials.length) {
  prevBtn.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(testimonialIndex);
  });
  nextBtn.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
  });
  showTestimonial(testimonialIndex);
}

// Scroll-based Animations
function revealOnScroll() {
  document.querySelectorAll('.scroll-animate').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Animated Stats
function animateStats() {
  document.querySelectorAll('.stat-value').forEach(el => {
    if (el.dataset.animated) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.dataset.animated = 'true';
      const target = parseInt(el.dataset.count.replace(/[^\d]/g, ''));
      let current = 0;
      const isMoney = el.dataset.count.includes('$');
      const duration = 1200;
      const step = Math.ceil(target / (duration / 16));
      function update() {
        current += step;
        if (current >= target) current = target;
        el.textContent = isMoney ? ('$' + current.toLocaleString()) : current.toLocaleString();
        if (current < target) requestAnimationFrame(update);
      }
      update();
    }
  });
}
window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);
