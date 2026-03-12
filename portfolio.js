// ── Navbar: solid background on scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ── Active nav link highlight based on scroll position
const sections = ['home', 'about', 'skills', 'projects', 'publication', 'education', 'contact'];
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});

// ── Hamburger toggle (mobile)
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// ── Close mobile menu when a link is clicked
function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// ── Hero: animate profile bar + handle broken photo
window.addEventListener('load', () => {
  setTimeout(() => {
    const bar = document.getElementById('progBar');
    if (bar) bar.style.width = '65%';
  }, 700);

  // If photo.jpg doesn't exist, show placeholder instead
});

// ── Scroll reveal
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Research: toggle abstract preview
const previewToggle = document.getElementById('previewToggle');
const paperPreview  = document.getElementById('paperPreview');
const previewClose  = document.getElementById('previewClose');

previewToggle.addEventListener('click', (e) => {
  e.preventDefault();
  paperPreview.classList.toggle('open');
  previewToggle.innerHTML = paperPreview.classList.contains('open')
    ? '✕ &nbsp;Hide Preview'
    : '👁 &nbsp;Preview Abstract';
});

previewClose.addEventListener('click', () => {
  paperPreview.classList.remove('open');
  previewToggle.innerHTML = '👁 &nbsp;Preview Abstract';
});

// ── Project Modal
function openPreview(id) {
  document.querySelectorAll('.modal-content').forEach(el => el.style.display = 'none');
  document.getElementById(id).style.display = 'grid';
  document.getElementById('projModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePreview() {
  document.getElementById('projModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePreview();
});

// ── Contact Form (FormSpree)
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const formError   = document.getElementById('formError');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '⏳ &nbsp;Sending...';
  formSuccess.style.display = 'none';
  formError.style.display   = 'none';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // Success
      formSuccess.style.display = 'block';
      contactForm.reset();
      submitBtn.innerHTML = '✅ &nbsp;Sent!';
      setTimeout(() => {
        submitBtn.innerHTML = '▶ &nbsp;Send Message';
        submitBtn.disabled = false;
      }, 3000);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (err) {
    // Error
    formError.style.display = 'block';
    submitBtn.innerHTML = '▶ &nbsp;Send Message';
    submitBtn.disabled = false;
  }
});