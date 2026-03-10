const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-top');

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveNav(id) {
     navLinks.forEach(link => {
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === `#${id}`) {
               link.classList.add('nav-active');
          }
     });
}

function updateActiveNav() {
     const scrollY = window.scrollY;
     const offset = 120;

     let currentId = sections[0].id;

     sections.forEach(section => {
          if (scrollY >= section.offsetTop - offset) {
               currentId = section.id;
          }
     });

     setActiveNav(currentId);
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

const html = document.documentElement;
const themeIcon = document.getElementById('theme-icon');

function applyTheme(theme) {
     if (theme === 'dark') {
          html.classList.add('dark');
          themeIcon.className = 'fa-solid fa-sun';
     } else {
          html.classList.remove('dark');
          themeIcon.className = 'fa-solid fa-moon';
     }
     localStorage.setItem('theme', theme);
}

const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(saved);

document.getElementById('theme-toggle').addEventListener('click', () => {
     applyTheme(html.classList.contains('dark') ? 'light' : 'dark');
});

let mobileOpen = false;
document.getElementById('hamburger').addEventListener('click', () => {
     mobileOpen = !mobileOpen;
     const menu = document.getElementById('mobile-menu');
     menu.style.display = mobileOpen ? 'flex' : 'none';
     document.getElementById('ham-icon').className = mobileOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
          const el = entry.target;
          if (entry.isIntersecting) {
               el.classList.remove('exit');
               el.classList.add('visible');
          } else if (el.classList.contains('visible')) {
               if (entry.boundingClientRect.top < 0) {
                    el.classList.remove('visible');
                    el.classList.add('exit');
               } else {
                    el.classList.remove('visible', 'exit');
               }
          }
     });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

document.querySelectorAll('.filter-btn').forEach(btn => {
     btn.addEventListener('click', () => {
          document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.dataset.filter;
          document.querySelectorAll('.project-card').forEach(card => {
               const show = filter === 'All' || card.dataset.category === filter;
               card.classList.toggle('hidden-card', !show);
          });
     });
});


const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTags = document.getElementById('modal-tags');
const modalLive = document.getElementById('modal-live');
const modalGithub = document.getElementById('modal-github');
const modalClose = document.getElementById('modal-close');

function openModal(card) {
     const img = card.querySelector('.project-img img')?.src || '';
     const title = card.querySelector('.project-body h3')?.textContent || '';
     const desc = card.querySelector('.project-body p')?.textContent || '';
     const tags = card.querySelector('.project-tags')?.innerHTML || '';

     const liveBtn = card.querySelector('.overlay-btn[aria-label="Live demo"]');
     const githubBtn = card.querySelector('.overlay-btn[aria-label="GitHub"]');

     modalImg.src = img;
     modalImg.alt = title;
     modalTitle.textContent = title;
     modalDesc.textContent = desc;
     modalTags.innerHTML = tags;

     if (liveBtn) {
          modalLive.href = liveBtn.href;
          modalLive.classList.remove('hidden');
     } else {
          modalLive.classList.add('hidden');
     }

     if (githubBtn) {
          modalGithub.href = githubBtn.href;
          modalGithub.classList.remove('hidden');
     } else {
          modalGithub.classList.add('hidden');
     }

     modal.classList.add('open');
     document.body.classList.add('modal-open');
}

function closeModal() {
     modal.classList.remove('open');
     document.body.classList.remove('modal-open');
}

document.querySelectorAll('.project-card').forEach(card => {
     card.addEventListener('click', (e) => {
          if (e.target.closest('.overlay-btn')) return;
          openModal(card);
     });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });