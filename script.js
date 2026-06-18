const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const themeButton = document.querySelector('.theme-button');
const header = document.querySelector('.site-header');
const themeIcon = themeButton.querySelector('span');

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.classList.toggle('active', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const savedTheme = localStorage.getItem('portfolio-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.body.classList.add('dark-theme');
  themeIcon.textContent = '☾';
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  themeIcon.textContent = isDark ? '☾' : '☀';
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
