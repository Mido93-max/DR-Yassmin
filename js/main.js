/**
 * Main Application Logic — Dr. Yasmine Fikry Emara Clinic Website
 * Vanilla JavaScript (ES6+) — No external libraries or build steps required.
 */

(function () {
  'use strict';

  // Global Application State for Booking Stepper & Components
  const AppState = {
    booking: {
      currentStep: 1,
      serviceId: "checkup",
      serviceTitle: "كشف نساء وتوليد",
      branchId: "mubtadiyan",
      branchName: "عيادة المبتديان",
      selectedDate: null,
      selectedDateFormatted: null,
      selectedPeriodId: "period_afternoon",
      selectedPeriodLabel: "فترة مسائية أولى (5:00 م - 7:00 م)",
      patientName: "",
      patientPhone: "",
      patientNotes: "",
      privacyConsent: false
    },
    calendar: {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() // 0-indexed
    },
    slider: {
      currentIndex: 0,
      totalSlides: 0,
      autoPlayTimer: null,
      isPaused: false
    }
  };

  /* ------------------------------------------------------------------------
     SVG Icon Helper
     ------------------------------------------------------------------------ */
  function getServiceIconSvg(iconType) {
    const icons = {
      maternity: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M12 7v5l3 3"/><circle cx="12" cy="12" r="3"/></svg>`,
      "high-risk": `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 11v4"/><circle cx="12" cy="8" r="0.75" fill="currentColor"/></svg>`,
      infertility: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><circle cx="12" cy="12" r="2"/></svg>`,
      ovulation: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><circle cx="12" cy="12" r="2"/></svg>`,
      gynecology: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M12 15v7"/><path d="M9 19h6"/></svg>`,
      "family-planning": `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      surgery: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="M18 13l3.5-3.5a2.12 2.12 0 1 0-3-3L15 10"/><path d="m14 6 4 4"/></svg>`,
      counseling: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/></svg>`
    };
    return icons[iconType] || icons.gynecology;
  }

  /* ------------------------------------------------------------------------
     1. Navigation, Sticky Header & Scroll Handling
     ------------------------------------------------------------------------ */
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const drawerClose = document.getElementById('drawerClose');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const navLinks = document.querySelectorAll('.nav-link, .drawer-nav-link');

    // Sticky Header & Scroll To Top Visibility
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      if (header) {
        if (scrollPos > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
      if (scrollTopBtn) {
        if (scrollPos > 350) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      }
    }, { passive: true });

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Mobile Drawer Toggle
    function openDrawer() {
      if (mobileDrawer && drawerBackdrop) {
        mobileDrawer.classList.add('active');
        drawerBackdrop.classList.add('active');
        document.body.classList.add('drawer-open');
        menuToggle?.setAttribute('aria-expanded', 'true');
        drawerClose?.focus();
      }
    }

    function closeDrawer() {
      if (mobileDrawer && drawerBackdrop) {
        mobileDrawer.classList.remove('active');
        drawerBackdrop.classList.remove('active');
        document.body.classList.remove('drawer-open');
        menuToggle?.setAttribute('aria-expanded', 'false');
      }
    }

    menuToggle?.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    drawerClose?.addEventListener('click', closeDrawer);
    drawerBackdrop?.addEventListener('click', closeDrawer);

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDrawer();
        closeModal();
        closeDispatchModal();
      }
    });

    // Close drawer when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          closeDrawer();
          const targetSection = document.querySelector(href);
          if (targetSection) {
            e.preventDefault();
            const headerHeight = header ? header.offsetHeight : 70;
            const targetPos = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
          }
        }
      });
    });

    // Active Section Observer for Navigation Highlighting
    const sections = document.querySelectorAll('section[id]');
    if ('IntersectionObserver' in window && sections.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, { rootMargin: '-20% 0px -60% 0px' });

      sections.forEach(sec => observer.observe(sec));
    }
  }

  /* ------------------------------------------------------------------------
     2. Services Grid & Detail Modal
     ------------------------------------------------------------------------ */
  function initServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = '';
    SITE_CONFIG.services.forEach(service => {
      const card = document.createElement('article');
      card.className = 'service-card';
      card.innerHTML = `
        <div class="service-icon-box" aria-hidden="true">
          ${getServiceIconSvg(service.icon)}
        </div>
        <h3 class="service-card-title">${escapeHTML(service.title)}</h3>
        <p class="service-card-desc">${escapeHTML(service.shortDesc)}</p>
        <div class="service-card-actions">
          <button type="button" class="service-detail-btn" data-service-id="${service.id}">
            <span>معلومات الخدمة</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <button type="button" class="service-book-btn" data-service-id="${service.id}" data-service-title="${escapeHTML(service.title)}">
            احجزي الآن
          </button>
        </div>
      `;
      servicesGrid.appendChild(card);
    });

    // Handle clicks on "معلومات الخدمة" (Detail Modal)
    servicesGrid.addEventListener('click', (e) => {
      const detailBtn = e.target.closest('.service-detail-btn');
      const bookBtn = e.target.closest('.service-book-btn');

      if (detailBtn) {
        const id = detailBtn.getAttribute('data-service-id');
        openServiceModal(id);
      } else if (bookBtn) {
        const id = bookBtn.getAttribute('data-service-id');
        const title = bookBtn.getAttribute('data-service-title');
        selectServiceAndNavigateToBooking(id, title);
      }
    });

    // Modal close listeners
    const modalBackdrop = document.getElementById('serviceModalBackdrop');
    const modalCloseBtn = document.getElementById('serviceModalClose');
    modalCloseBtn?.addEventListener('click', closeModal);
    modalBackdrop?.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  function openServiceModal(serviceId) {
    const service = SITE_CONFIG.services.find(s => s.id === serviceId);
    if (!service) return;

    const modalTitle = document.getElementById('modalServiceTitle');
    const modalDesc = document.getElementById('modalServiceDesc');
    const modalIcon = document.getElementById('modalServiceIcon');
    const modalBookBtn = document.getElementById('modalBookServiceBtn');
    const modalBackdrop = document.getElementById('serviceModalBackdrop');

    if (modalTitle) modalTitle.textContent = service.title;
    if (modalDesc) modalDesc.textContent = service.fullDesc;
    if (modalIcon) modalIcon.innerHTML = getServiceIconSvg(service.icon);
    
    if (modalBookBtn) {
      modalBookBtn.onclick = () => {
        closeModal();
        selectServiceAndNavigateToBooking(service.id, service.title);
      };
    }

    if (modalBackdrop) {
      modalBackdrop.classList.add('active');
      document.body.classList.add('modal-open');
    }
  }

  function closeModal() {
    const modalBackdrop = document.getElementById('serviceModalBackdrop');
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }

  function selectServiceAndNavigateToBooking(serviceId, serviceTitle) {
    AppState.booking.serviceId = serviceId;
    AppState.booking.serviceTitle = serviceTitle;
    
    // Update Radio UI in Step 1
    const serviceCards = document.querySelectorAll('.option-select-card[data-service]');
    serviceCards.forEach(c => {
      if (c.getAttribute('data-service') === serviceId) {
        c.classList.add('selected');
      } else {
        c.classList.remove('selected');
      }
    });

    // Jump directly to Step 2 (Branch Selection) for effortless CRO
    goToStep(2);

    // Scroll to booking section smoothly
    const bookingSec = document.getElementById('booking');
    if (bookingSec) {
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70;
      const targetPos = bookingSec.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  }

  /* ------------------------------------------------------------------------
     3. Patient Reviews (Accessible Testimonial Carousel)
     ------------------------------------------------------------------------ */
  function initTestimonials() {
    const track = document.getElementById('reviewsTrack');
    const dotsContainer = document.getElementById('reviewsDots');
    const prevBtn = document.getElementById('prevReviewBtn');
    const nextBtn = document.getElementById('nextReviewBtn');
    const sliderWrapper = document.querySelector('.reviews-slider-wrapper');

    if (!track || !dotsContainer) return;

    track.innerHTML = '';
    dotsContainer.innerHTML = '';
    AppState.slider.totalSlides = SITE_CONFIG.testimonials.length;

    SITE_CONFIG.testimonials.forEach((review, idx) => {
      // Slide
      const slide = document.createElement('div');
      slide.className = 'review-slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${idx + 1} من ${SITE_CONFIG.testimonials.length}`);

      slide.innerHTML = `
        <div class="review-card">
          <div class="review-quote-mark" aria-hidden="true">“</div>
          <p class="review-quote-text">«${escapeHTML(review.quote)}»</p>
          <div class="review-author-meta">
            <span class="review-author-name">${escapeHTML(review.patient)}</span>
            <span class="review-date">${escapeHTML(review.date)}</span>
            <a href="${review.sourceUrl}" target="_blank" rel="noopener noreferrer" class="review-source-link">
              <span>المصدر: ${escapeHTML(review.source)}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>
      `;
      track.appendChild(slide);

      // Dot
      const dot = document.createElement('button');
      dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `الانتقال إلى الرأي ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
      });
      dotsContainer.appendChild(dot);
    });

    function updateSlider() {
      // In RTL layout, moving to the next slide shifts by positive percentage
      const offset = AppState.slider.currentIndex * 100;
      track.style.transform = `translateX(${offset}%)`;

      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => {
        if (idx === AppState.slider.currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function goToSlide(index) {
      if (index < 0) {
        AppState.slider.currentIndex = AppState.slider.totalSlides - 1;
      } else if (index >= AppState.slider.totalSlides) {
        AppState.slider.currentIndex = 0;
      } else {
        AppState.slider.currentIndex = index;
      }
      updateSlider();
    }

    // In Arabic RTL: Next is visually left (-1 index), Prev is visually right (+1 index)
    nextBtn?.addEventListener('click', () => {
      goToSlide(AppState.slider.currentIndex + 1);
    });

    prevBtn?.addEventListener('click', () => {
      goToSlide(AppState.slider.currentIndex - 1);
    });

    // Touch & Swipe gestures
    let touchStartX = 0;
    let touchEndX = 0;

    sliderWrapper?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      pauseAutoPlay();
    }, { passive: true });

    sliderWrapper?.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      resumeAutoPlay();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 40;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // Swiped right -> In RTL goes to previous
          goToSlide(AppState.slider.currentIndex - 1);
        } else {
          // Swiped left -> In RTL goes to next
          goToSlide(AppState.slider.currentIndex + 1);
        }
      }
    }

    // Gentle Auto-advance (Pause on hover/focus, respect reduced motion)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function startAutoPlay() {
      if (prefersReducedMotion) return;
      stopAutoPlay();
      AppState.slider.autoPlayTimer = setInterval(() => {
        if (!AppState.slider.isPaused) {
          goToSlide(AppState.slider.currentIndex + 1);
        }
      }, 7000);
    }

    function stopAutoPlay() {
      if (AppState.slider.autoPlayTimer) {
        clearInterval(AppState.slider.autoPlayTimer);
      }
    }

    function pauseAutoPlay() {
      AppState.slider.isPaused = true;
    }

    function resumeAutoPlay() {
      AppState.slider.isPaused = false;
    }

    sliderWrapper?.addEventListener('mouseenter', pauseAutoPlay);
    sliderWrapper?.addEventListener('mouseleave', resumeAutoPlay);
    sliderWrapper?.addEventListener('focusin', pauseAutoPlay);
    sliderWrapper?.addEventListener('focusout', resumeAutoPlay);

    startAutoPlay();
  }

  /* ------------------------------------------------------------------------
     4. FAQ Accordion
     ------------------------------------------------------------------------ */
  function initFaqs() {
    const faqContainer = document.getElementById('faqList');
    if (!faqContainer) return;

    faqContainer.innerHTML = '';
    SITE_CONFIG.faqs.forEach((item, idx) => {
      const faqItem = document.createElement('div');
      faqItem.className = 'faq-item';
      faqItem.innerHTML = `
        <button type="button" class="faq-trigger" id="faq-btn-${idx}" aria-expanded="false" aria-controls="faq-panel-${idx}">
          <span>${escapeHTML(item.q)}</span>
          <span class="faq-icon-arrow" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        </button>
        <div class="faq-panel" id="faq-panel-${idx}" role="region" aria-labelledby="faq-btn-${idx}">
          <div class="faq-body">
            ${escapeHTML(item.a)}
          </div>
        </div>
      `;
      faqContainer.appendChild(faqItem);
    });

    faqContainer.addEventListener('click', (e) => {
      const trigger = e.target.closest('.faq-trigger');
      if (!trigger) return;

      const parentItem = trigger.closest('.faq-item');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other items for clean accordion UX
      const allItems = faqContainer.querySelectorAll('.faq-item');
      allItems.forEach(item => {
        if (item !== parentItem) {
          item.classList.remove('active');
          item.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });

      if (isExpanded) {
        parentItem.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        parentItem.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. Two Clinic Branch Cards & Branch Interactivity
     ------------------------------------------------------------------------ */
  function initBranches() {
    const branchesContainer = document.getElementById('branchesContainer');
    if (!branchesContainer) return;

    branchesContainer.innerHTML = '';
    const branches = [SITE_CONFIG.branches.mubtadiyan, SITE_CONFIG.branches.dokki];

    branches.forEach(branch => {
      const isSelected = AppState.booking.branchId === branch.id;
      const card = document.createElement('div');
      card.className = `branch-card ${isSelected ? 'selected' : ''}`;
      card.id = `branch-card-${branch.id}`;

      // Schedule text based on configuration status
      const scheduleNotice = branch.scheduleStatus === 'active'
        ? `<div class="branch-schedule-box active-schedule">
            <div class="schedule-icon">✓</div>
            <div class="schedule-text"><strong>مواعيد العمل:</strong> ${escapeHTML(branch.schedule.hoursText)}</div>
           </div>`
        : `<div class="branch-schedule-box">
            <div class="schedule-icon">ℹ</div>
            <div class="schedule-text">
              <strong>تنبيه المواعيد:</strong> ${escapeHTML(branch.pendingNotice)}
            </div>
           </div>`;

      // Phone display button (disclaimer regarding verification)
      const phoneButton = branch.phoneVerified
        ? `<a href="tel:${branch.phone}" class="btn btn-secondary btn-sm">
             <span class="btn-icon">📞</span>
             <span>اتصال: <span class="bdi">${branch.phone}</span></span>
           </a>`
        : `<button type="button" class="btn btn-secondary btn-sm" onclick="alert('رقم العيادة المنشور: ${branch.phone}\\n${branch.phoneNotice}');">
             <span class="btn-icon">📞</span>
             <span>رقم العيادة: <span class="bdi">${branch.phone}</span></span>
           </button>`;

      card.innerHTML = `
        <div class="branch-header">
          <div>
            <h3 class="branch-name">${escapeHTML(branch.name)}</h3>
            <span class="branch-area">📍 ${escapeHTML(branch.subName)}</span>
          </div>
          <span class="badge ${branch.id === 'mubtadiyan' ? 'badge-sage' : 'badge-blush'}">${escapeHTML(branch.governorate)}</span>
        </div>

        <div class="branch-address-box">
          <div class="branch-address-label">العنوان بالتفصيل:</div>
          <div class="branch-address-text">${escapeHTML(branch.address)}</div>
          ${branch.addressNote ? `<div class="branch-address-note">${escapeHTML(branch.addressNote)}</div>` : ''}
        </div>

        ${scheduleNotice}

        <div class="branch-actions">
          <a href="${branch.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            <span class="btn-icon">🗺️</span>
            <span>الاتجاهات على الخريطة</span>
          </a>
          <button type="button" class="btn btn-primary btn-sm select-branch-btn" data-branch-id="${branch.id}">
            <span>اختيار هذا الفرع للحجز</span>
          </button>
        </div>
      `;
      branchesContainer.appendChild(card);
    });

    // Handle selecting a branch from section G
    branchesContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.select-branch-btn');
      if (btn) {
        const branchId = btn.getAttribute('data-branch-id');
        selectBranch(branchId);
        goToStep(3); // Go to Date step
        const bookingSec = document.getElementById('booking');
        if (bookingSec) {
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70;
          const targetPos = bookingSec.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      }
    });
  }

  function selectBranch(branchId) {
    AppState.booking.branchId = branchId;
    AppState.booking.branchName = branchId === 'mubtadiyan' ? 'عيادة المبتديان (السيدة زينب)' : 'عيادة الدقي (الكوثر كلينيك)';

    // Update section G visual selection
    document.querySelectorAll('.branch-card').forEach(c => c.classList.remove('selected'));
    document.getElementById(`branch-card-${branchId}`)?.classList.add('selected');

    // Update Booking Step 2 cards
    document.querySelectorAll('.option-select-card[data-branch]').forEach(c => {
      if (c.getAttribute('data-branch') === branchId) {
        c.classList.add('selected');
      } else {
        c.classList.remove('selected');
      }
    });

    // Refresh calendar for the selected branch constraints
    renderCalendar();
  }

  /* ------------------------------------------------------------------------
     6. Custom Accessible Calendar Component & Preferred Periods
     ------------------------------------------------------------------------ */
  const ARABIC_MONTH_NAMES = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];

  function initCalendar() {
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');

    // In RTL: Prev month is visually right (next chronological arrow), Next is visually left
    prevMonthBtn?.addEventListener('click', () => {
      AppState.calendar.currentMonth--;
      if (AppState.calendar.currentMonth < 0) {
        AppState.calendar.currentMonth = 11;
        AppState.calendar.currentYear--;
      }
      renderCalendar();
    });

    nextMonthBtn?.addEventListener('click', () => {
      AppState.calendar.currentMonth++;
      if (AppState.calendar.currentMonth > 11) {
        AppState.calendar.currentMonth = 0;
        AppState.calendar.currentYear++;
      }
      renderCalendar();
    });

    renderCalendar();
    initPreferredPeriods();
  }

  function renderCalendar() {
    const monthLabel = document.getElementById('calendarMonthName');
    const grid = document.getElementById('calendarGridDays');
    if (!monthLabel || !grid) return;

    const { currentYear, currentMonth } = AppState.calendar;
    monthLabel.textContent = `${ARABIC_MONTH_NAMES[currentMonth]} ${currentYear}`;

    grid.innerHTML = '';

    // Cairo local today comparison
    const nowInEgypt = new Date();
    const todayYear = nowInEgypt.getFullYear();
    const todayMonth = nowInEgypt.getMonth();
    const todayDate = nowInEgypt.getDate();

    // First day of month & number of days
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Empty lead cells
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day-cell disabled';
      emptyCell.setAttribute('aria-hidden', 'true');
      grid.appendChild(emptyCell);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'calendar-day-cell';
      cell.textContent = day;

      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      cell.setAttribute('data-date', dateStr);

      const isPast = (currentYear < todayYear) ||
                     (currentYear === todayYear && currentMonth < todayMonth) ||
                     (currentYear === todayYear && currentMonth === todayMonth && day < todayDate);

      const isToday = (currentYear === todayYear && currentMonth === todayMonth && day === todayDate);

      if (isToday) {
        cell.classList.add('today');
      }

      if (isPast) {
        cell.classList.add('disabled');
        cell.disabled = true;
        cell.setAttribute('aria-disabled', 'true');
      } else {
        if (AppState.booking.selectedDate === dateStr) {
          cell.classList.add('selected');
        }

        cell.addEventListener('click', () => {
          selectDate(dateStr, `${day} ${ARABIC_MONTH_NAMES[currentMonth]} ${currentYear}`);
        });
      }

      grid.appendChild(cell);
    }
  }

  function selectDate(dateStr, formattedDate) {
    AppState.booking.selectedDate = dateStr;
    AppState.booking.selectedDateFormatted = formattedDate;

    // Highlight cell
    document.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('selected'));
    const targetCell = document.querySelector(`.calendar-day-cell[data-date="${dateStr}"]`);
    targetCell?.classList.add('selected');

    // Display selected date helper
    const dateFeedback = document.getElementById('selectedDateFeedback');
    if (dateFeedback) {
      dateFeedback.textContent = `التاريخ المفضل المحدد: ${formattedDate}`;
      dateFeedback.style.display = 'block';
    }
  }

  function initPreferredPeriods() {
    const container = document.getElementById('preferredPeriodsContainer');
    if (!container) return;

    container.innerHTML = '';
    SITE_CONFIG.booking.defaultPreferredPeriods.forEach((period, idx) => {
      const isSelected = AppState.booking.selectedPeriodId === period.id || (idx === 0 && !AppState.booking.selectedPeriodId);
      const pill = document.createElement('div');
      pill.className = `period-pill ${isSelected ? 'selected' : ''}`;
      pill.setAttribute('data-period-id', period.id);
      pill.setAttribute('data-period-label', period.label);
      pill.textContent = period.label;

      pill.addEventListener('click', () => {
        container.querySelectorAll('.period-pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        AppState.booking.selectedPeriodId = period.id;
        AppState.booking.selectedPeriodLabel = period.label;
      });

      container.appendChild(pill);
    });
  }

  /* ------------------------------------------------------------------------
     7. Interactive Multi-Step Stepper Engine
     ------------------------------------------------------------------------ */
  function initBookingStepper() {
    // Step 1: Services Cards selection
    const serviceOptionCards = document.querySelectorAll('.option-select-card[data-service]');
    serviceOptionCards.forEach(card => {
      card.addEventListener('click', () => {
        serviceOptionCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        AppState.booking.serviceId = card.getAttribute('data-service');
        AppState.booking.serviceTitle = card.getAttribute('data-title');
      });
    });

    // Step 2: Branch Cards selection
    const branchOptionCards = document.querySelectorAll('.option-select-card[data-branch]');
    branchOptionCards.forEach(card => {
      card.addEventListener('click', () => {
        const bId = card.getAttribute('data-branch');
        selectBranch(bId);
      });
    });

    // Stepper Navigation Buttons
    document.getElementById('step1NextBtn')?.addEventListener('click', () => goToStep(2));
    document.getElementById('step2BackBtn')?.addEventListener('click', () => goToStep(1));
    document.getElementById('step2NextBtn')?.addEventListener('click', () => goToStep(3));
    document.getElementById('step3BackBtn')?.addEventListener('click', () => goToStep(2));
    
    document.getElementById('step3NextBtn')?.addEventListener('click', () => {
      if (!AppState.booking.selectedDate) {
        alert('يُرجى اختيار التاريخ المفضل من التقويم قبل المتابعة.');
        return;
      }
      goToStep(4);
    });

    document.getElementById('step4BackBtn')?.addEventListener('click', () => goToStep(3));
    
    document.getElementById('step4NextBtn')?.addEventListener('click', () => {
      if (validateStep4()) {
        updateSummaryReview();
        goToStep(5);
      }
    });

    document.getElementById('step5BackBtn')?.addEventListener('click', () => goToStep(4));
    document.getElementById('step5SubmitBtn')?.addEventListener('click', handleBookingSubmit);
  }

  function goToStep(stepNumber) {
    AppState.booking.currentStep = stepNumber;

    // Update Steps header indicators
    const stepIndicators = document.querySelectorAll('.step-indicator');
    stepIndicators.forEach((ind, idx) => {
      const stepIdx = idx + 1;
      ind.classList.remove('active', 'completed');
      if (stepIdx === stepNumber) {
        ind.classList.add('active');
      } else if (stepIdx < stepNumber) {
        ind.classList.add('completed');
      }
    });

    // Show active step pane
    document.querySelectorAll('.step-pane').forEach((pane, idx) => {
      if (idx + 1 === stepNumber) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });
  }

  function validateStep4() {
    let isValid = true;
    const nameInput = document.getElementById('patientNameInput');
    const phoneInput = document.getElementById('patientPhoneInput');
    const consentInput = document.getElementById('privacyConsentInput');
    const notesInput = document.getElementById('patientNotesInput');

    const nameGroup = nameInput?.closest('.form-group');
    const phoneGroup = phoneInput?.closest('.form-group');

    // Name validation
    const nameVal = nameInput ? nameInput.value.trim() : "";
    if (nameVal.length < 3) {
      nameGroup?.classList.add('has-error');
      isValid = false;
    } else {
      nameGroup?.classList.remove('has-error');
      AppState.booking.patientName = nameVal;
    }

    // Egyptian phone validation: 11 digits starting with 010, 011, 012, or 015
    const phoneVal = phoneInput ? phoneInput.value.trim().replace(/\s+/g, '') : "";
    const egPhoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    const egIntlPhoneRegex = /^(\+?20)(10|11|12|15)[0-9]{8}$/;

    if (!egPhoneRegex.test(phoneVal) && !egIntlPhoneRegex.test(phoneVal)) {
      phoneGroup?.classList.add('has-error');
      isValid = false;
    } else {
      phoneGroup?.classList.remove('has-error');
      AppState.booking.patientPhone = phoneVal;
    }

    // Privacy Consent
    if (consentInput && !consentInput.checked) {
      alert('يُرجى الموافقة على سياسة الخصوصية واستخدام البيانات للتواصل بشأن الموعد.');
      isValid = false;
    } else {
      AppState.booking.privacyConsent = true;
    }

    if (notesInput) {
      AppState.booking.patientNotes = notesInput.value.trim();
    }

    return isValid;
  }

  function updateSummaryReview() {
    const summaryService = document.getElementById('summaryService');
    const summaryBranch = document.getElementById('summaryBranch');
    const summaryDate = document.getElementById('summaryDate');
    const summaryPeriod = document.getElementById('summaryPeriod');
    const summaryName = document.getElementById('summaryName');
    const summaryPhone = document.getElementById('summaryPhone');

    if (summaryService) summaryService.textContent = AppState.booking.serviceTitle;
    if (summaryBranch) summaryBranch.textContent = AppState.booking.branchName;
    if (summaryDate) summaryDate.textContent = AppState.booking.selectedDateFormatted || AppState.booking.selectedDate;
    if (summaryPeriod) summaryPeriod.textContent = AppState.booking.selectedPeriodLabel;
    if (summaryName) summaryName.textContent = AppState.booking.patientName;
    if (summaryPhone) summaryPhone.textContent = AppState.booking.patientPhone;
  }

  /* ------------------------------------------------------------------------
     8. Real Request Dispatch Workflow (No Fake DB / No False Confirmations)
     ------------------------------------------------------------------------ */
  function handleBookingSubmit() {
    const bookingData = {
      patientName: AppState.booking.patientName,
      patientPhone: AppState.booking.patientPhone,
      service: AppState.booking.serviceTitle,
      branch: AppState.booking.branchName,
      date: AppState.booking.selectedDateFormatted || AppState.booking.selectedDate,
      period: AppState.booking.selectedPeriodLabel,
      notes: AppState.booking.patientNotes || "لا توجد ملاحظات إضافية",
      submittedAt: new Date().toISOString()
    };

    // Format Arabic Request Text for WhatsApp & Clipboard
    const formattedRequestText = 
`السلام عليكم ورحمة الله وبركاته،
أود تقديم طلب حجز موعد كشف مع د. ياسمين فكري عمارة:
• الاسم: ${bookingData.patientName}
• رقم الموبايل: ${bookingData.patientPhone}
• الخدمة المطلوبة: ${bookingData.service}
• الفرع: ${bookingData.branch}
• التاريخ المفضل: ${bookingData.date}
• الفترة المفضلة: ${bookingData.period}
${bookingData.notes !== 'لا توجد ملاحظات إضافية' ? `• ملاحظات إدارية: ${bookingData.notes}\n` : ''}
(طلب حجز عبر الموقع الإلكتروني — في انتظار تواصل العيادة لتأكيد الموعد النهائي)`;

    // Open Request Dispatch Modal
    openDispatchModal(formattedRequestText, bookingData);

    // Call future backend integration hook
    BookingBackendAdapter.submitRequest(bookingData);
  }

  function openDispatchModal(formattedText, bookingData) {
    const modal = document.getElementById('dispatchModalBackdrop');
    const textContainer = document.getElementById('dispatchSummaryText');
    const copyBtn = document.getElementById('copyRequestBtn');
    const whatsappBtn = document.getElementById('dispatchWhatsappBtn');
    const toast = document.getElementById('copyFeedbackToast');

    if (textContainer) {
      textContainer.textContent = formattedText;
    }

    // Configure WhatsApp Button
    if (whatsappBtn) {
      if (SITE_CONFIG.booking.whatsappEnabled && SITE_CONFIG.booking.whatsappNumber) {
        whatsappBtn.style.display = 'inline-flex';
        const encoded = encodeURIComponent(formattedText);
        whatsappBtn.href = `https://wa.me/${SITE_CONFIG.booking.whatsappNumber}?text=${encoded}`;
      } else {
        // WhatsApp is not verified yet
        whatsappBtn.style.display = 'none';
      }
    }

    // Copy to clipboard handler
    if (copyBtn) {
      copyBtn.onclick = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(formattedText).then(() => {
            showCopyToast(toast);
          }).catch(() => {
            fallbackCopy(formattedText, toast);
          });
        } else {
          fallbackCopy(formattedText, toast);
        }
      };
    }

    if (modal) {
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    }
  }

  function showCopyToast(toast) {
    if (toast) {
      toast.style.display = 'block';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 3000);
    }
  }

  function fallbackCopy(text, toast) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showCopyToast(toast);
    } catch (err) {
      alert('تعذر النسخ التلقائي، يمكنكِ تحديد النص ونسخه يدوياً.');
    }
    document.body.removeChild(textArea);
  }

  function closeDispatchModal() {
    const modal = document.getElementById('dispatchModalBackdrop');
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }

  /* ------------------------------------------------------------------------
     9. Future Booking Backend Adapter (Contract & Integration Hook)
     ------------------------------------------------------------------------ */
  const BookingBackendAdapter = {
    submitRequest: async function (bookingPayload) {
      if (!SITE_CONFIG.apiBackend.enabled) {
        // Frontend-only mode: Logs structured request for auditing
        console.info('[Booking Backend Adapter] Request prepared locally:', bookingPayload);
        return {
          status: "prepared_locally",
          message: "Request successfully formatted on client-side for contact channel transmission."
        };
      }

      try {
        const response = await fetch(`${SITE_CONFIG.apiBackend.baseUrl}${SITE_CONFIG.apiBackend.endpoints.createRequest}`, {
          method: 'POST',
          headers: SITE_CONFIG.apiBackend.headers,
          body: JSON.stringify(bookingPayload)
        });
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('[Booking Backend Adapter] Failed to dispatch to backend endpoint:', error);
        return { status: "error", error: error.message };
      }
    }
  };

  /* ------------------------------------------------------------------------
     10. Utility Functions
     ------------------------------------------------------------------------ */
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ------------------------------------------------------------------------
     11. Initialize Everything on DOMContentLoaded
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic copyright year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Setup close button on dispatch modal
    document.getElementById('dispatchModalClose')?.addEventListener('click', closeDispatchModal);
    document.getElementById('dispatchModalBackdrop')?.addEventListener('click', (e) => {
      if (e.target === document.getElementById('dispatchModalBackdrop')) {
        closeDispatchModal();
      }
    });

    initNavigation();
    initServices();
    initTestimonials();
    initBranches();
    initCalendar();
    initBookingStepper();
    initFaqs();
  });

})();

