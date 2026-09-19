/* ==========================================================================
   SUJAL RAKSHE - PORTFOLIO INTERACTIVE SCRIPT
   Features: Typewriter, Filtering, Scrollspy, Theme Switcher, Toast Feedback
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. DYNAMIC TYPEWRITER EFFECT
  // ------------------------------------------------------------------------
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const roles = [
      "Full-Stack Developer",
      "Java & Spring Boot Engineer",
      "React & Frontend Specialist",
      "SQL Database Architect"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next word
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // ------------------------------------------------------------------------
  // 2. THEME SWITCHER (DARK / LIGHT MODE)
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlDoc = document.documentElement;

  // Read stored preference or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlDoc.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlDoc.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlDoc.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode!`, 'fa-circle-half-stroke');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
      themeToggleBtn.title = 'Switch to Light Mode';
    } else {
      icon.className = 'fa-solid fa-moon';
      themeToggleBtn.title = 'Switch to Dark Mode';
    }
  }

  // ------------------------------------------------------------------------
  // 3. PROJECT FILTER TABS
  // ------------------------------------------------------------------------
  const projectTabs = document.querySelectorAll('#projectFilterTabs .tab-btn');
  const projectCards = document.querySelectorAll('#projectsContainer .project-card');

  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Set active tab
      projectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 4. SKILL FILTER TABS
  // ------------------------------------------------------------------------
  const skillTabs = document.querySelectorAll('#skillFilterTabs .tab-btn');
  const skillCards = document.querySelectorAll('#skillsContainer .skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 5. MOBILE NAVIGATION DRAWER
  // ------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileMenuBtn.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }

  // ------------------------------------------------------------------------
  // 6. SCROLLSPY & BACK TO TOP BUTTON
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Scrollspy
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------------
  // 7. CONTACT FORM SUBMISSION WITH VALIDATION
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactform');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all fields before sending!', 'fa-triangle-exclamation');
        return;
      }

      // Simple Email Format Regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'fa-circle-exclamation');
        return;
      }

      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate network request delay
      setTimeout(() => {
        showToast(`Thank you, ${name}! Your message has been sent successfully.`, 'fa-circle-check');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }

  // Set Current Year in Footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// ------------------------------------------------------------------------
// 8. CLIPBOARD COPY UTILITY & TOAST HELPER
// ------------------------------------------------------------------------
function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(message || 'Copied to clipboard!', 'fa-check');
  }).catch(err => {
    console.error('Copy failed: ', err);
    showToast('Failed to copy', 'fa-xmark');
  });
}

function showToast(message, iconClass = 'fa-info-circle') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  // Remove toast after animation completes (3s)
  setTimeout(() => {
    toast.remove();
  }, 3000);
}