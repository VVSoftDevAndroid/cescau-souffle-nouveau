/**
 * Cescau, un souffle nouveau - Main JavaScript
 * Handles content loading, navigation, animations, and interactions
 * SPA-style navigation to keep audio playing across pages
 */

// ========================================
// Utility Functions
// ========================================

/**
 * Fetch JSON data from a URL
 * @param {string} url - The URL to fetch
 * @returns {Promise<Object>} The parsed JSON data
 */
async function loadJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${url}:`, error);
    return null;
  }
}

// ========================================
// SPA Navigation (keeps audio playing)
// ========================================

/**
 * Load a page via AJAX and swap content
 * @param {string} url - The page URL to load
 * @param {boolean} pushState - Whether to push to browser history
 */
async function navigateToPage(url, pushState = true) {
  try {
    // Show loading state
    const currentMain = document.querySelector('main');
    if (currentMain) {
      currentMain.style.opacity = '0.5';
      currentMain.style.pointerEvents = 'none';
    }
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Page not found');
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Get the main content
    const newMain = doc.querySelector('main');
    
    if (newMain && currentMain) {
      // Fade out
      currentMain.style.opacity = '0';
      
      await new Promise(r => setTimeout(r, 150));
      
      // Swap content
      currentMain.innerHTML = newMain.innerHTML;
      
      // Update page title
      document.title = doc.title;
      
      // Fade in
      currentMain.style.opacity = '1';
      currentMain.style.pointerEvents = '';
      
      // Update active nav link
      updateActiveNavLink(url);
      
      // Re-initialize page-specific content
      await initPageContent(url);
      
      // Re-init scroll animations
      initScrollAnimations();
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Push to history
      if (pushState) {
        history.pushState({ url }, '', url);
      }
      
      // Close mobile menu if open
      const menuToggle = document.querySelector('.menu-toggle');
      const nav = document.querySelector('.nav');
      if (menuToggle && nav) {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    } else {
      // If main element not found, don't fall back - just log error
      console.error('Could not find main element in', url);
      if (currentMain) {
        currentMain.style.opacity = '1';
        currentMain.style.pointerEvents = '';
      }
    }
  } catch (error) {
    console.error('Navigation error:', error);
    // Restore current page state instead of falling back
    const currentMain = document.querySelector('main');
    if (currentMain) {
      currentMain.style.opacity = '1';
      currentMain.style.pointerEvents = '';
    }
  }
}

/**
 * Update the active state on nav links
 * @param {string} url - Current page URL
 */
function updateActiveNavLink(url) {
  const page = url.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
}

/**
 * Check if a link should use SPA navigation
 * @param {string} href - The href attribute
 * @returns {boolean}
 */
function shouldUseSPANavigation(href) {
  if (!href) return false;
  if (href.startsWith('http')) return false;
  if (href.startsWith('mailto:')) return false;
  if (href.startsWith('tel:')) return false;
  if (href.startsWith('#')) return false;
  if (href.startsWith('javascript:')) return false;
  
  // Handle .html files and root paths
  return href.endsWith('.html') || href === '' || href === '/' || href === './';
}

/**
 * Initialize SPA navigation on all internal links
 */
function initSPANavigation() {
  // Use capture phase to catch all clicks before they bubble
  document.addEventListener('click', function spaClickHandler(e) {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    if (shouldUseSPANavigation(href)) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      // Normalize the URL
      let targetUrl = href;
      if (href === '' || href === '/' || href === './') {
        targetUrl = 'index.html';
      }
      
      // Don't navigate if already on this page
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      if (targetUrl === currentPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return false;
      }
      
      navigateToPage(targetUrl);
      return false;
    }
  }, true);
  
  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.url) {
      navigateToPage(e.state.url, false);
    } else {
      // Handle initial page load after back
      const page = window.location.pathname.split('/').pop() || 'index.html';
      navigateToPage(page, false);
    }
  });
  
  // Set initial state
  const initialPage = window.location.pathname.split('/').pop() || 'index.html';
  history.replaceState({ url: initialPage }, '', window.location.pathname);
}

/**
 * Create HTML element from template string
 * @param {string} html - The HTML template string
 * @returns {HTMLElement} The created element
 */
function createElementFromHTML(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
}

// ========================================
// Content Rendering Functions
// ========================================

/**
 * Render team members into the DOM
 * @param {Object} data - The team data from JSON
 */
function renderTeam(data) {
  const container = document.getElementById('team-container');
  if (!container || !data) return;

  const html = data.members.map(member => `
    <div class="card team-card reveal">
      <div class="card-image">
        <img src="${member.image}" alt="${member.name}" loading="lazy" 
             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22%3E%3Crect fill=%22%232D5A3D%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23fff%22 font-family=%22sans-serif%22 font-size=%2280%22 x=%22200%22 y=%22220%22 text-anchor=%22middle%22%3E${member.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
      </div>
      <div class="card-content">
        <p class="card-role">${member.role}</p>
        <h3 class="card-title">${member.name}</h3>
        <p class="card-text">${member.bio}</p>
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
  initScrollAnimations();
}

/**
 * Render projects into the DOM
 * @param {Object} data - The projects data from JSON
 */
function renderProjects(data) {
  const currentContainer = document.getElementById('projects-current');
  const upcomingContainer = document.getElementById('projects-upcoming');
  
  if (!data) return;

  if (currentContainer && data.current) {
    currentContainer.innerHTML = data.current.map(project => `
      <div class="card project-card reveal">
        <div class="card-content">
          <span class="card-icon">${project.icon}</span>
          <h4 class="card-title">${project.title}</h4>
          <p class="card-text">${project.description}</p>
          <span class="card-status current">${project.status}</span>
        </div>
      </div>
    `).join('');
  }

  if (upcomingContainer && data.upcoming) {
    upcomingContainer.innerHTML = data.upcoming.map(project => `
      <div class="card project-card reveal">
        <div class="card-content">
          <span class="card-icon">${project.icon}</span>
          <h4 class="card-title">${project.title}</h4>
          <p class="card-text">${project.description}</p>
          <span class="card-status upcoming">${project.status}</span>
        </div>
      </div>
    `).join('');
  }

  initScrollAnimations();
}

/**
 * Render gallery into the DOM
 * @param {Object} data - The gallery data from JSON
 */
function renderGallery(data) {
  const container = document.getElementById('gallery-container');
  if (!container || !data) return;

  const html = data.images.map(image => `
    <div class="gallery-item ${image.featured ? 'featured' : ''} reveal" 
         data-src="${image.src}" 
         data-caption="${image.caption}">
      <img src="${image.src}" alt="${image.caption}" loading="lazy"
           onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 600%22%3E%3Crect fill=%22%234A7C9B%22 width=%22800%22 height=%22600%22/%3E%3Ctext fill=%22%23fff%22 font-family=%22sans-serif%22 font-size=%2240%22 x=%22400%22 y=%22320%22 text-anchor=%22middle%22%3EImage%3C/text%3E%3C/svg%3E'">
      <div class="gallery-caption">${image.caption}</div>
    </div>
  `).join('');

  container.innerHTML = html;
  initGalleryLightbox();
  initScrollAnimations();
}

// ========================================
// Navigation
// ========================================

/**
 * Initialize navigation functionality
 */
function initNavigation() {
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header shadow on scroll
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Mobile menu toggle
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ========================================
// Scroll Animations
// ========================================

/**
 * Initialize scroll-triggered reveal animations
 */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal:not(.active)');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    reveals.forEach(el => el.classList.add('active'));
  }
}

// ========================================
// Parallax Effect
// ========================================

/**
 * Initialize parallax effect on hero section
 */
function initParallax() {
  const hero = document.querySelector('.hero-background');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    hero.style.transform = `translate3d(0, ${rate}px, 0)`;
  }, { passive: true });
}

// ========================================
// Lightbox
// ========================================

let lightbox = null;

/**
 * Create lightbox element if it doesn't exist
 */
function createLightbox() {
  if (lightbox) return;

  lightbox = createElementFromHTML(`
    <div class="lightbox" role="dialog" aria-modal="true" aria-label="Galerie photo">
      <button class="lightbox-close" aria-label="Fermer">&times;</button>
      <div class="lightbox-content">
        <img src="" alt="">
        <p class="lightbox-caption"></p>
      </div>
    </div>
  `);

  document.body.appendChild(lightbox);

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close button
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/**
 * Open lightbox with image
 * @param {string} src - Image source
 * @param {string} caption - Image caption
 */
function openLightbox(src, caption) {
  createLightbox();
  
  const img = lightbox.querySelector('img');
  const captionEl = lightbox.querySelector('.lightbox-caption');
  
  img.src = src;
  img.alt = caption;
  captionEl.textContent = caption;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Close the lightbox
 */
function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * Initialize gallery lightbox functionality
 */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.src;
      const caption = item.dataset.caption;
      openLightbox(src, caption);
    });
  });
}

// ========================================
// Page Initialization
// ========================================

/**
 * Initialize page-specific content based on URL
 * @param {string} url - Optional URL (defaults to current page)
 */
async function initPageContent(url) {
  const page = (url || window.location.pathname).split('/').pop() || 'index.html';

  switch (page) {
    case 'equipe.html':
      const teamData = await loadJSON('data/team.json');
      if (teamData) renderTeam(teamData);
      break;
    
    case 'projets.html':
      const projectsData = await loadJSON('data/projects.json');
      if (projectsData) renderProjects(projectsData);
      break;
    
    case 'village.html':
      const galleryData = await loadJSON('data/gallery.json');
      if (galleryData) renderGallery(galleryData);
      break;
      
    case 'index.html':
    case '':
      initParallax();
      break;
  }
}

// ========================================
// Main Initialization
// ========================================

let initialized = false;

function initApp() {
  if (initialized) return;
  initialized = true;
  
  initNavigation();
  initScrollAnimations();
  initParallax();
  initPageContent();
}

// IMPORTANT: Initialize SPA navigation IMMEDIATELY (before DOM ready)
// This ensures click interception works as early as possible
initSPANavigation();

// Initialize rest when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
