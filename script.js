/* ============================================================
   MORE POWER — WEBSITE V3
   COMPLETE SCRIPT.JS
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* ============================================================
     1. ELEMENT HELPERS
  ============================================================ */

  const $ = (selector, scope = document) =>
    scope.querySelector(selector);

  const $$ = (selector, scope = document) =>
    [...scope.querySelectorAll(selector)];


  const body = document.body;

  const header =
    $(".site-header");

  const mobileMenuButton =
    $(".mobile-menu-btn");

  const mobileNavigation =
    $(".mobile-navigation");

  const menuBackdrop =
    $(".menu-backdrop");

  const backToTop =
    $(".back-to-top");

  const orderModal =
    $(".order-modal");

  const modalClose =
    $(".modal-close");


  /* ============================================================
     2. HEADER SCROLL EFFECT
  ============================================================ */

  function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 30) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }


  handleHeaderScroll();

  window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
  );


  /* ============================================================
     3. MOBILE MENU
  ============================================================ */

  function openMobileMenu() {

    if (!mobileNavigation) return;

    mobileNavigation.classList.add("active");

    if (mobileMenuButton) {
      mobileMenuButton.classList.add("active");
      mobileMenuButton.setAttribute(
        "aria-expanded",
        "true"
      );
    }

    if (menuBackdrop) {
      menuBackdrop.classList.add("active");
    }

    body.classList.add("menu-open");

  }


  function closeMobileMenu() {

    if (mobileNavigation) {
      mobileNavigation.classList.remove("active");
    }

    if (mobileMenuButton) {

      mobileMenuButton.classList.remove("active");

      mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    }

    if (menuBackdrop) {
      menuBackdrop.classList.remove("active");
    }

    body.classList.remove("menu-open");

  }


  function toggleMobileMenu() {

    if (!mobileNavigation) return;

    const isOpen =
      mobileNavigation.classList.contains("active");

    if (isOpen) {

      closeMobileMenu();

    } else {

      openMobileMenu();

    }

  }


  if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
      "click",
      toggleMobileMenu
    );

  }


  if (menuBackdrop) {

    menuBackdrop.addEventListener(
      "click",
      closeMobileMenu
    );

  }


  /* ============================================================
     4. CLOSE MOBILE MENU AFTER LINK CLICK
  ============================================================ */

  const mobileNavLinks =
    $$(".mobile-navigation a");


  mobileNavLinks.forEach(link => {

    link.addEventListener("click", () => {

      closeMobileMenu();

    });

  });


  /* ============================================================
     5. ESC KEY — CLOSE MENU / MODAL
  ============================================================ */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Escape") return;

      closeMobileMenu();

      closeOrderModal();

    }
  );


  /* ============================================================
     6. SMOOTH ANCHOR SCROLL
  ============================================================ */

  const anchorLinks =
    $$('a[href^="#"]');


  anchorLinks.forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const href =
          link.getAttribute("href");

        if (
          !href ||
          href === "#" ||
          href.length < 2
        ) {

          return;

        }

        const target =
          document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        closeMobileMenu();

        const headerHeight =
          header
            ? header.offsetHeight
            : 0;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          15;

        window.scrollTo({

          top: targetPosition,

          behavior: "smooth"

        });

      }
    );

  });


  /* ============================================================
     7. FAQ ACCORDION
  ============================================================ */

  const faqItems =
    $$(".faq-item");


  faqItems.forEach(item => {

    const question =
      $(".faq-question", item);

    if (!question) return;


    question.addEventListener(
      "click",
      () => {

        const alreadyOpen =
          item.classList.contains("active");


        /*
          Close other FAQs first.
          This keeps only one answer open.
        */

        faqItems.forEach(otherItem => {

          if (otherItem !== item) {

            otherItem.classList.remove(
              "active"
            );

            const otherButton =
              $(".faq-question", otherItem);

            if (otherButton) {

              otherButton.setAttribute(
                "aria-expanded",
                "false"
              );

            }

          }

        });


        /*
          Toggle selected FAQ
        */

        item.classList.toggle(
          "active",
          !alreadyOpen
        );

        question.setAttribute(
          "aria-expanded",
          String(!alreadyOpen)
        );

      }
    );

  });


  /* ============================================================
     8. ORDER BUTTON SELECTORS
  ============================================================ */

  /*
     Any button/link using these classes
     will open the order modal.

     You can also add:

     data-order-button

     to any future button.
  */

  const orderButtonSelectors = [

    ".header-order-btn",

    ".hero-order-btn",

    ".primary-gold-btn",

    ".mobile-nav-order",

    ".mega-order-button",

    ".sticky-order-btn",

    ".final-cta-button",

    ".final-product-order",

    ".power-banner-button",

    "[data-order-button]"

  ];


  const orderButtons =
    $$(
      orderButtonSelectors.join(",")
    );


  /* ============================================================
     9. OPEN ORDER MODAL
  ============================================================ */

  function openOrderModal() {

    /*
      If modal exists:
      open modal.

      If modal does not exist:
      scroll user to offer section.
    */

    if (orderModal) {

      orderModal.classList.add("active");

      orderModal.setAttribute(
        "aria-hidden",
        "false"
      );

      body.classList.add("modal-open");

      closeMobileMenu();


      /*
        Focus close button for accessibility
      */

      setTimeout(() => {

        if (modalClose) {

          modalClose.focus();

        }

      }, 100);


      return;

    }


    /*
      Fallback:
      scroll to offer section
    */

    const offerSection =

      $("#order") ||

      $("#offer") ||

      $(".premium-offer-section") ||

      $(".final-product-section");


    if (offerSection) {

      const headerHeight =
        header
          ? header.offsetHeight
          : 0;

      const position =
        offerSection
          .getBoundingClientRect()
          .top +
        window.scrollY -
        headerHeight -
        15;


      window.scrollTo({

        top: position,

        behavior: "smooth"

      });

    }

  }


  /* ============================================================
     10. CLOSE ORDER MODAL
  ============================================================ */

  function closeOrderModal() {

    if (!orderModal) return;

    orderModal.classList.remove("active");

    orderModal.setAttribute(
      "aria-hidden",
      "true"
    );

    body.classList.remove("modal-open");

  }


  /* ============================================================
     11. CONNECT ALL ORDER BUTTONS
  ============================================================ */

  orderButtons.forEach(button => {

    button.addEventListener(
      "click",
      event => {

        /*
          Do not block a real external checkout link.

          Example:

          <a href="https://checkout..."
             class="header-order-btn">

          This will continue to checkout normally.
        */

        const href =
          button.getAttribute("href");


        const isRealExternalLink =

          href &&

          !href.startsWith("#") &&

          href !== "javascript:void(0)";


        if (isRealExternalLink) {

          return;

        }


        event.preventDefault();

        openOrderModal();

      }
    );

  });


  /* ============================================================
     12. MODAL CLOSE BUTTON
  ============================================================ */

  if (modalClose) {

    modalClose.addEventListener(
      "click",
      closeOrderModal
    );

  }


  /* ============================================================
     13. CLOSE MODAL BY CLICKING BACKDROP
  ============================================================ */

  if (orderModal) {

    orderModal.addEventListener(
      "click",
      event => {

        if (
          event.target === orderModal
        ) {

          closeOrderModal();

        }

      }
    );

  }


  /* ============================================================
     14. MODAL ACTION BUTTONS
  ============================================================ */

  const modalActionButtons =
    $$(".modal-action-btn");


  modalActionButtons.forEach(button => {

    button.addEventListener(
      "click",
      event => {

        const href =
          button.getAttribute("href");


        /*
          If button already has a valid
          WhatsApp / checkout / phone URL,
          browser will handle it normally.
        */

        if (
          href &&
          href !== "#" &&
          !href.startsWith("#")
        ) {

          return;

        }


        /*
          Placeholder buttons should not
          jump to top of page.
        */

        if (
          !href ||
          href === "#"
        ) {

          event.preventDefault();

        }

      }
    );

  });


  /* ============================================================
     15. BACK TO TOP
  ============================================================ */

  function handleBackToTopVisibility() {

    if (!backToTop) return;

    if (window.scrollY > 650) {

      backToTop.classList.add(
        "visible"
      );

    } else {

      backToTop.classList.remove(
        "visible"
      );

    }

  }


  handleBackToTopVisibility();


  window.addEventListener(
    "scroll",
    handleBackToTopVisibility,
    { passive: true }
  );


  if (backToTop) {

    backToTop.addEventListener(
      "click",
      event => {

        event.preventDefault();

        window.scrollTo({

          top: 0,

          behavior: "smooth"

        });

      }
    );

  }


  /* ============================================================
     16. SCROLL REVEAL
  ============================================================ */

  /*
     Add reveal animation automatically
     to important content blocks.
  */

  const revealSelectors = [

    ".section-heading",

    ".confidence-content",

    ".african-copy",

    ".ingredient-card",

    ".intimacy-luxury-copy",

    ".visual-story-card",

    ".premium-benefit-card",

    ".power-quote-copy",

    ".premium-offer-copy",

    ".trust-card",

    ".faq-item",

    ".final-product-copy"

  ];


  const revealElements =
    $$(
      revealSelectors.join(",")
    );


  revealElements.forEach(element => {

    element.classList.add(
      "scroll-reveal"
    );

  });


  /*
     Intersection Observer
  */

  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "revealed"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },

        {

          threshold: 0.08,

          rootMargin:
            "0px 0px -40px 0px"

        }

      );


    revealElements.forEach(
      element => {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    /*
      Older browser fallback
    */

    revealElements.forEach(
      element => {

        element.classList.add(
          "revealed"
        );

      }
    );

  }


  /* ============================================================
     17. STAGGER ANIMATIONS
  ============================================================ */

  const staggerGroups = [

    ".ingredient-cards",

    ".premium-benefit-grid",

    ".trust-grid",

    ".visual-story-grid"

  ];


  staggerGroups.forEach(
    groupSelector => {

      const group =
        $(groupSelector);

      if (!group) return;


      const children =
        [...group.children];


      children.forEach(
        (child, index) => {

          child.style.setProperty(

            "--reveal-delay",

            `${index * 80}ms`

          );

        }
      );

    }
  );


  /* ============================================================
     18. ACTIVE NAVIGATION LINK ON SCROLL
  ============================================================ */

  const navigationLinks =
    $$(
      '.desktop-nav a[href^="#"], ' +
      '.mobile-navigation a[href^="#"]'
    );


  const navigationSections = [];


  navigationLinks.forEach(link => {

    const href =
      link.getAttribute("href");

    if (
      !href ||
      href === "#"
    ) {

      return;

    }

    const section =
      document.querySelector(href);

    if (section) {

      navigationSections.push({

        section,

        href

      });

    }

  });


  function updateActiveNavigation() {

    if (
      navigationSections.length === 0
    ) {

      return;

    }


    const scrollPosition =
      window.scrollY +
      window.innerHeight * 0.32;


    let activeHref = "";


    navigationSections.forEach(
      item => {

        if (
          scrollPosition >=
          item.section.offsetTop
        ) {

          activeHref =
            item.href;

        }

      }
    );


    navigationLinks.forEach(link => {

      const isActive =
        link.getAttribute("href") ===
        activeHref;


      link.classList.toggle(
        "active",
        isActive
      );

    });

  }


  updateActiveNavigation();


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );


  /* ============================================================
     19. IMAGE LOADING
  ============================================================ */

  const allImages =
    $$("img");


  allImages.forEach(image => {

    /*
      Lazy load all images except hero/priority
    */

    if (
      !image.hasAttribute(
        "loading"
      )
    ) {

      const isHeroImage =

        image.closest(
          ".hero-section"
        ) ||

        image.classList.contains(
          "hero-product-image"
        );


      if (!isHeroImage) {

        image.setAttribute(
          "loading",
          "lazy"
        );

      }

    }


    /*
      Fade image in when loaded
    */

    const markLoaded = () => {

      image.classList.add(
        "image-loaded"
      );

    };


    if (image.complete) {

      markLoaded();

    } else {

      image.addEventListener(
        "load",
        markLoaded,
        { once: true }
      );

    }


    /*
      Prevent broken image icon
    */

    image.addEventListener(
      "error",
      () => {

        image.classList.add(
          "image-error"
        );

      }
    );

  });


  /* ============================================================
     20. HERO PARALLAX — DESKTOP ONLY
  ============================================================ */

  const heroSection =
    $(".hero-section");

  const heroProduct =
    $(".hero-product-image");


  let ticking = false;


  function updateHeroParallax() {

    if (
      !heroSection ||
      !heroProduct ||
      window.innerWidth <= 980
    ) {

      return;

    }


    const rect =
      heroSection.getBoundingClientRect();


    if (
      rect.bottom < 0 ||
      rect.top >
      window.innerHeight
    ) {

      return;

    }


    const scrollAmount =
      window.scrollY;


    const movement =
      Math.min(
        scrollAmount * 0.035,
        28
      );


    heroProduct.style.transform =
      `translateY(${movement}px)`;

  }


  function requestHeroParallax() {

    if (!ticking) {

      window.requestAnimationFrame(
        () => {

          updateHeroParallax();

          ticking = false;

        }
      );

      ticking = true;

    }

  }


  window.addEventListener(
    "scroll",
    requestHeroParallax,
    { passive: true }
  );


  /* ============================================================
     21. RESET PARALLAX ON MOBILE
  ============================================================ */

  window.addEventListener(
    "resize",
    () => {

      if (
        heroProduct &&
        window.innerWidth <= 980
      ) {

        heroProduct.style.transform = "";

      }

      /*
        Close mobile menu when switching
        back to desktop.
      */

      if (
        window.innerWidth > 980
      ) {

        closeMobileMenu();

      }

    }
  );


  /* ============================================================
     22. PREVENT BODY SCROLL WHEN MODAL/MENU OPEN
  ============================================================ */

  const style =
    document.createElement(
      "style"
    );


  style.textContent = `

    body.menu-open,
    body.modal-open {
      overflow: hidden;
    }

    .scroll-reveal {
      opacity: 0;
      transform: translateY(28px);
      transition:
        opacity 0.75s ease var(--reveal-delay, 0ms),
        transform 0.75s ease var(--reveal-delay, 0ms);
    }

    .scroll-reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }

    img {
      transition:
        opacity 0.45s ease;
    }

    img:not(.image-loaded) {
      opacity: 0;
    }

    img.image-loaded {
      opacity: 1;
    }

    img.image-error {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {

      .scroll-reveal {
        opacity: 1;
        transform: none;
      }

    }

  `;


  document.head.appendChild(
    style
  );


  /* ============================================================
     23. CURRENT YEAR
  ============================================================ */

  const yearElements =
    $$(
      "[data-current-year]"
    );


  const currentYear =
    new Date().getFullYear();


  yearElements.forEach(element => {

    element.textContent =
      currentYear;

  });


  /* ============================================================
     24. INITIAL FAQ
  ============================================================ */

  /*
     If HTML already marks an FAQ
     with class="faq-item active",
     set accessibility state correctly.
  */

  faqItems.forEach(item => {

    const question =
      $(".faq-question", item);

    if (!question) return;

    question.setAttribute(

      "aria-expanded",

      item.classList.contains(
        "active"
      )
        ? "true"
        : "false"

    );

  });


  /* ============================================================
     25. BUTTON RIPPLE EFFECT
  ============================================================ */

  const rippleButtons =
    $$(
      ".primary-gold-btn, " +
      ".header-order-btn, " +
      ".sticky-order-btn, " +
      ".mega-order-button"
    );


  rippleButtons.forEach(button => {

    button.addEventListener(
      "pointerdown",
      event => {

        /*
          Only visual effect.
        */

        const rect =
          button.getBoundingClientRect();


        const ripple =
          document.createElement(
            "span"
          );


        ripple.className =
          "button-ripple";


        ripple.style.left =
          `${
            event.clientX -
            rect.left
          }px`;


        ripple.style.top =
          `${
            event.clientY -
            rect.top
          }px`;


        button.appendChild(
          ripple
        );


        setTimeout(() => {

          ripple.remove();

        }, 650);

      }
    );

  });


  /*
     Ripple CSS
  */

  const rippleStyle =
    document.createElement(
      "style"
    );


  rippleStyle.textContent = `

    .primary-gold-btn,
    .header-order-btn,
    .sticky-order-btn,
    .mega-order-button {

      position: relative;
      overflow: hidden;

    }

    .button-ripple {

      position: absolute;

      z-index: 20;

      width: 10px;
      height: 10px;

      border-radius: 50%;

      background:
        rgba(255,255,255,0.45);

      pointer-events: none;

      transform:
        translate(-50%, -50%)
        scale(0);

      animation:
        morePowerRipple
        0.65s ease-out;

    }

    @keyframes morePowerRipple {

      to {

        opacity: 0;

        transform:
          translate(-50%, -50%)
          scale(22);

      }

    }

  `;


  document.head.appendChild(
    rippleStyle
  );


  /* ============================================================
     26. PAGE READY
  ============================================================ */

  requestAnimationFrame(() => {

    body.classList.add(
      "page-ready"
    );

  });


  console.log(
    "MORE POWER V3 — Website Ready"
  );

});


/* ============================================================
   END OF MORE POWER V3 — SCRIPT.JS
============================================================ */
