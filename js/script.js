document.addEventListener('DOMContentLoaded', () => {

  // ── Smooth Scrolling ───────────────────────────────────────────────
  // Intercept clicks on all nav anchor links and scroll smoothly to
  // the target section instead of jumping instantly.
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });

      // Close mobile menu after clicking a link
      document.querySelector('.nav-links')?.classList.remove('active');
      document.querySelector('.nav-toggle')?.classList.remove('active');
    });
  });

  // ── Mobile Hamburger Menu Toggle ───────────────────────────────────
  // Toggle the .active class on both the nav-links list and the
  // hamburger button so CSS can show/hide the mobile menu.
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksList = document.querySelector('.nav-links');

  if (navToggle && navLinksList) {
    navToggle.addEventListener('click', () => {
      navLinksList.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // ── Navbar Background on Scroll ────────────────────────────────────
  // Add a .scrolled class to the navbar once the user scrolls past
  // 50px, allowing CSS to apply a solid/blurred background.
  const navbar = document.querySelector('.navbar');

  const checkeredNav = document.querySelector('.checkered-nav');

  if (navbar) {
    const handleNavbarScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        if (checkeredNav) checkeredNav.classList.add('visible');
      } else {
        navbar.classList.remove('scrolled');
        if (checkeredNav) checkeredNav.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleNavbarScroll);
    // Run once on load in case the page is already scrolled
    handleNavbarScroll();
  }

  // ── Fade-In Animations on Scroll ───────────────────────────────────
  // Use IntersectionObserver to add a .visible class to elements with
  // .fade-in when they enter the viewport, triggering CSS transitions.
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeElements.forEach(el => fadeObserver.observe(el));
  }

  // ── Typed Text Effect ─────────────────────────────────────────────
  const typedEl = document.getElementById('typed-tagline');
  if (typedEl) {
    const text = 'Georgia Tech - Senior | Computer Science | ML Systems';
    let i = 0;
    const cursor = document.createElement('span');
    cursor.classList.add('typed-cursor');
    typedEl.appendChild(cursor);

    const type = () => {
      if (i < text.length) {
        typedEl.insertBefore(document.createTextNode(text.charAt(i)), cursor);
        i++;
        setTimeout(type, 45);
      } else {
        // Remove cursor after a delay
        setTimeout(() => cursor.remove(), 2000);
      }
    };
    setTimeout(type, 600);
  }

  // ── Active Nav Link Highlighting ───────────────────────────────────
  // Track which section is currently in view and apply an .active class
  // to the corresponding nav link.
  const sections = document.querySelectorAll('section[id]');

  if (sections.length > 0) {
    const highlightNav = () => {
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (link) {
          if (scrollPos >= top && scrollPos < top + height) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    };

    window.addEventListener('scroll', highlightNav);
    // Run once on load to highlight the initial section
    highlightNav();
  }

});
