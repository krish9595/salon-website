/* ==========================================================================
   LUXE AURA SALON & SPA - INTERACTIVE ENGINE (main.js)
   Highly Interactive Premium Web Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Header Shrinkage & Active Navigation ---
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Highlight Active Link in Navigation
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-drawer-nav a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    // Simple check if path contains file name or matches root
    if (currentPath.includes(linkPath) && linkPath !== 'index.html' && linkPath !== '') {
      link.classList.add('active');
    } else if ((currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '') && (linkPath === 'index.html' || linkPath === '')) {
      link.classList.add('active');
    }
  });

  // --- 2. Mobile Drawer Navigation ---
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('active');
      // Prevent body scrolling when menu is active
      document.body.style.overflow = mobileDrawer.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile drawer when clicking a link
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- 3. Premium Interactive Modal Scheduler System ---
  const modalOverlay = document.getElementById('booking-modal');
  const bookButtons = document.querySelectorAll('.btn-book, .btn-spa, .btn-bridal, .btn-cta-book');
  const modalCloseBtn = document.querySelector('.modal-close');
  const bookingForm = document.getElementById('appointment-form');

  if (modalOverlay) {
    // Open Modal
    bookButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Contextual styling adjustments based on what was clicked
        const serviceSelect = document.getElementById('modal-service');
        if (serviceSelect) {
          if (btn.classList.contains('btn-spa')) {
            serviceSelect.value = 'Holistic Aromatherapy Session';
          } else if (btn.classList.contains('btn-bridal')) {
            serviceSelect.value = 'Bridal Makeup Consultation';
          } else if (btn.classList.contains('btn-hair')) {
            serviceSelect.value = 'Creative Haircut & Design';
          } else {
            serviceSelect.value = 'Creative Haircut & Design'; // Default selection
          }
        }
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close Modal
    const closeModal = () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      // Reset form if it exists
      if (bookingForm) {
        bookingForm.reset();
        bookingForm.style.display = 'block';
        const successMessage = document.getElementById('modal-success-message');
        if (successMessage) successMessage.remove();
      }
    };

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Handle Modal Scheduler Submit with Premium Custom Feedback
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic inputs collection
        const nameVal = document.getElementById('modal-name').value;
        const phoneVal = document.getElementById('modal-phone').value;
        const serviceVal = document.getElementById('modal-service').value;
        const dateVal = document.getElementById('modal-date').value;

        // Custom validation check
        if (!nameVal || !phoneVal || !dateVal) {
          alert('Please fill out all required fields to reserve your luxury consultation.');
          return;
        }

        // Hide Form
        bookingForm.style.display = 'none';

        // Render Premium Gold Success Message
        const successCard = document.createElement('div');
        successCard.id = 'modal-success-message';
        successCard.style.textAlign = 'center';
        successCard.style.padding = '2rem 1rem';
        successCard.innerHTML = `
          <div class="badge-icon" style="margin: 0 auto 1.5rem; width: 60px; height: 60px; font-size: 1.8rem; background: var(--soft-highlight); color: var(--luxury-gold);">✓</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 1rem; color: var(--text-primary);">YOUR RADIANCE AWAITS</h3>
          <p style="font-family: var(--font-accent); font-style: italic; font-size: 1.2rem; color: var(--accent-primary); margin-bottom: 1.5rem;">Reservation Request Received Successfully</p>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 2rem; max-width: 420px; margin-inline: auto; line-height: 1.6;">
            Thank you, <strong>${nameVal}</strong>. We have reserved a tentative slot for <strong>${serviceVal}</strong> on <strong>${dateVal}</strong>. A Luxe Aura concierge will contact you within the hour to finalize your exclusive beauty session.
          </p>
          <button class="btn btn-primary" id="btn-success-close" style="padding: 0.8rem 2.5rem; font-size: 0.8rem;">Return to Salon</button>
        `;

        bookingForm.parentNode.appendChild(successCard);

        // Bind Close to the return button
        document.getElementById('btn-success-close').addEventListener('click', closeModal);
      });
    }
  }

  // --- 4. Statistics Count-up Animations ---
  const countUpStats = document.querySelectorAll('.count-up');
  
  if (countUpStats.length > 0) {
    const startCountUp = (element) => {
      const target = parseInt(element.getAttribute('data-target'), 10);
      const suffix = element.getAttribute('data-suffix') || '';
      let current = 0;
      const duration = 1800; // Total count duration in ms
      const stepTime = Math.max(Math.floor(duration / target), 15);
      
      const timer = setInterval(() => {
        current += Math.ceil(target / (duration / stepTime));
        if (current >= target) {
          element.textContent = target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          element.textContent = current.toLocaleString() + suffix;
        }
      }, stepTime);
    };

    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCountUp(entry.target);
          observer.unobserve(entry.target); // Count once
        }
      });
    }, { threshold: 0.2 });

    countUpStats.forEach(stat => countObserver.observe(stat));
  }

  // --- 5. Interactive Tab Category Filtering ---
  const pills = document.querySelectorAll('.category-pills .pill');
  const itemsToFilter = document.querySelectorAll('.filter-item');

  if (pills.length > 0 && itemsToFilter.length > 0) {
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        // Toggle Active Pill Class
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const category = pill.getAttribute('data-category');

        itemsToFilter.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          if (category === 'all' || itemCategory === category) {
            item.style.display = '';
            // Apply a nice premium entry transition
            item.style.opacity = '0';
            setTimeout(() => {
              item.style.transition = 'opacity var(--transition-smooth)';
              item.style.opacity = '1';
            }, 50);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 6. Before and After Slider Interactivity ---
  const sliders = document.querySelectorAll('.slider-comparison');

  sliders.forEach(slider => {
    const afterImg = slider.querySelector('.slider-after');
    const handle = slider.querySelector('.slider-handle');
    let isDragging = false;

    if (!afterImg || !handle) return;

    const setPosition = (x) => {
      const rect = slider.getBoundingClientRect();
      let offsetX = x - rect.left;
      
      // Keep boundaries safe
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      afterImg.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    };

    // Pointer events (Desktop and Mobile)
    slider.addEventListener('pointerdown', (e) => {
      isDragging = true;
      slider.setPointerCapture(e.pointerId);
      setPosition(e.clientX);
    });

    slider.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    });

    slider.addEventListener('pointerup', () => {
      isDragging = false;
    });

    slider.addEventListener('pointercancel', () => {
      isDragging = false;
    });
  });

  // --- 7. Progressive Fallback for Scroll-Driven CSS Reveals ---
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger fallback animation via inline styles or class activation
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.scale = '1';
          if (entry.target.classList.contains('scroll-text-sweep')) {
            entry.target.style.clipPath = 'inset(0 0 0 0)';
          }
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before screen entry
    });

    document.querySelectorAll('.scroll-reveal, .scroll-reveal-slow, .scroll-zoom, .scroll-text-sweep').forEach((el) => {
      // Set initial styles for fallback browsers
      el.style.opacity = '0';
      if (el.classList.contains('scroll-reveal') || el.classList.contains('scroll-reveal-slow')) {
        el.style.transform = 'translateY(35px)';
      }
      if (el.classList.contains('scroll-zoom')) {
        el.style.scale = '0.95';
      }
      if (el.classList.contains('scroll-text-sweep')) {
        el.style.clipPath = 'inset(0 100% 0 0)';
      }
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), scale 0.8s cubic-bezier(0.16, 1, 0.3, 1), clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      
      revealObserver.observe(el);
    });
  }

  // --- 8. Elegant Lightbox Modal for Gallery Images ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    // Create Lightbox Container on-the-fly
    const lightbox = document.createElement('div');
    lightbox.id = 'gallery-lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.inset = '0';
    lightbox.style.backgroundColor = 'rgba(45, 42, 38, 0.95)';
    lightbox.style.zIndex = '300';
    lightbox.style.display = 'none';
    lightbox.style.alignItems = 'center';
    lightbox.style.justifyContent = 'center';
    lightbox.style.cursor = 'zoom-out';
    lightbox.style.opacity = '0';
    lightbox.style.transition = 'opacity var(--transition-smooth)';
    
    lightbox.innerHTML = `
      <div style="position: absolute; top: 1.5rem; right: 2rem; color: #fff; font-size: 2.5rem; cursor: pointer;">&times;</div>
      <img id="lightbox-img" src="" style="max-width: 90%; max-height: 85vh; border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); transform: scale(0.95); transition: transform var(--transition-smooth);" alt="Enlarged Beauty Feature">
    `;

    document.body.appendChild(lightbox);

    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const img = item.querySelector('img');
        if (img) {
          const lImg = document.getElementById('lightbox-img');
          lImg.src = img.src;
          lImg.alt = img.alt;
          
          lightbox.style.display = 'flex';
          // Trigger flow layout before opacity transition
          lightbox.offsetWidth;
          lightbox.style.opacity = '1';
          lImg.style.transform = 'scale(1)';
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.style.opacity = '0';
      document.getElementById('lightbox-img').style.transform = 'scale(0.95)';
      setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
      }, 400);
    };

    lightbox.addEventListener('click', closeLightbox);
  }

  // --- 9. Highlight Business Hours Dynamically ---
  const businessHoursRows = document.querySelectorAll('.contact-detail-row');
  if (businessHoursRows.length > 0) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];
    
    businessHoursRows.forEach(row => {
      const daySpan = row.querySelector('span:first-child');
      if (daySpan && daySpan.textContent.includes(currentDay)) {
        row.classList.add('active');
        const valueSpan = row.querySelector('span:last-child');
        if (valueSpan) {
          valueSpan.innerHTML += ' <strong style="color: var(--accent-primary); font-size: 0.75rem; text-transform: uppercase; margin-left: 5px;">(Today)</strong>';
        }
      }
    });
  }
});
