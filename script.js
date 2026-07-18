/* =========================================================
   MORE POWER — COMPLETE SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     1. ELEMENTS
  ======================================================= */

  const body = document.body;

  const header = document.getElementById("header");

  const ageGate = document.getElementById("ageGate");
  const ageYes = document.getElementById("ageYes");
  const ageNo = document.getElementById("ageNo");

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const faqItems = document.querySelectorAll(".faq-item");

  const revealElements = document.querySelectorAll(".reveal");

  const yearElement = document.getElementById("year");

  const orderButton = document.getElementById("orderButton");


  /* =======================================================
     2. CURRENT YEAR
  ======================================================= */

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =======================================================
     3. 18+ AGE GATE
  ======================================================= */

  /*
    sessionStorage means:
    - User confirms once per browser tab/session.
    - Closing the browser/session may show the gate again.

    This is better than permanently hiding it.
  */

  const ageVerified =
    sessionStorage.getItem("morePowerAgeVerified");

  if (ageGate) {

    if (ageVerified === "true") {

      ageGate.classList.add("hidden");

    } else {

      ageGate.classList.remove("hidden");

      body.style.overflow = "hidden";

    }

  }


  if (ageYes) {

    ageYes.addEventListener("click", () => {

      sessionStorage.setItem(
        "morePowerAgeVerified",
        "true"
      );

      if (ageGate) {
        ageGate.classList.add("hidden");
      }

      body.style.overflow = "";

    });

  }


  if (ageNo) {

    ageNo.addEventListener("click", () => {

      /*
        Avoid forcing navigation to a third-party website.
        Instead, replace the age card with a simple message.
      */

      const ageCard =
        ageGate
          ? ageGate.querySelector(".age-card")
          : null;

      if (ageCard) {

        ageCard.innerHTML = `
          <span class="mini-label">
            ACCESS RESTRICTED
          </span>

          <h2>
            Adults Only
          </h2>

          <p>
            This website is intended for visitors
            aged 18 and above.
          </p>
        `;

      }

    });

  }


  /* =======================================================
     4. HEADER SCROLL EFFECT
  ======================================================= */

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }


  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     5. MOBILE MENU
  ======================================================= */

  function openMobileMenu() {

    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.add("active");

    menuToggle.classList.add("active");

    body.classList.add("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

  }


  function closeMobileMenu() {

    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.remove("active");

    menuToggle.classList.remove("active");

    body.classList.remove("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  if (menuToggle) {

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.addEventListener("click", () => {

      const menuIsOpen =
        mobileMenu &&
        mobileMenu.classList.contains("active");

      if (menuIsOpen) {

        closeMobileMenu();

      } else {

        openMobileMenu();

      }

    });

  }


  /*
    Close menu when clicking any mobile menu link.
  */

  if (mobileMenu) {

    const mobileLinks =
      mobileMenu.querySelectorAll("a");

    mobileLinks.forEach((link) => {

      link.addEventListener(
        "click",
        closeMobileMenu
      );

    });

  }


  /*
    Close mobile menu with Escape key.
  */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeMobileMenu();

      }

    }
  );


  /*
    Automatically close menu if desktop size
    is restored.
  */

  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 1050) {

        closeMobileMenu();

      }

    }
  );


  /* =======================================================
     6. SMOOTH INTERNAL LINKS
  ======================================================= */

  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  internalLinks.forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");

        /*
          Ignore empty # links.
        */

        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(targetId);

        if (!target) return;


        event.preventDefault();

        const headerHeight =
          header
            ? header.offsetHeight
            : 0;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;


        window.scrollTo({

          top: targetPosition,

          behavior: "smooth"

        });

      }
    );

  });


  /* =======================================================
     7. SCROLL REVEAL ANIMATIONS
  ======================================================= */

  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(

        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },

        {

          threshold: 0.12,

          rootMargin:
            "0px 0px -45px 0px"

        }

      );


    revealElements.forEach(
      (element, index) => {

        /*
          Small staggered animation effect.
        */

        element.style.transitionDelay =
          `${Math.min(
            (index % 4) * 80,
            240
          )}ms`;

        revealObserver.observe(element);

      }
    );

  } else {

    /*
      Fallback for older browsers.
    */

    revealElements.forEach(
      (element) => {

        element.classList.add("visible");

      }
    );

  }


  /* =======================================================
     8. FAQ ACCORDION
  ======================================================= */

  faqItems.forEach((item) => {

    const question =
      item.querySelector(
        ".faq-question"
      );

    if (!question) return;


    question.addEventListener(
      "click",
      () => {

        const isActive =
          item.classList.contains(
            "active"
          );


        /*
          Close all FAQs first.
        */

        faqItems.forEach(
          (otherItem) => {

            otherItem.classList.remove(
              "active"
            );

          }
        );


        /*
          Open clicked FAQ if it wasn't
          already open.
        */

        if (!isActive) {

          item.classList.add("active");

        }

      }
    );

  });


  /* =======================================================
     9. ORDER BUTTON
  ======================================================= */

  if (orderButton) {

    orderButton.addEventListener(
      "click",
      (event) => {

        const href =
          orderButton.getAttribute(
            "href"
          );


        /*
          Current HTML uses href="#"
          until a real checkout or WhatsApp
          link is added.

          Prevent page jumping while there
          is no real order URL.
        */

        if (
          !href ||
          href.trim() === "#"
        ) {

          event.preventDefault();

          alert(
            "Ordering will be available here soon."
          );

        }

      }
    );

  }


  /* =======================================================
     10. HERO SUBTLE PARALLAX
  ======================================================= */

  const heroBg =
    document.querySelector(".hero-bg");


  function heroParallax() {

    if (!heroBg) return;

    /*
      Disable heavier parallax on mobile.
    */

    if (window.innerWidth <= 768) {

      heroBg.style.transform =
        "scale(1.02)";

      return;

    }


    const scrollPosition =
      window.scrollY;

    /*
      Only animate while near hero section.
    */

    if (
      scrollPosition <
      window.innerHeight * 1.2
    ) {

      const movement =
        scrollPosition * 0.08;

      heroBg.style.transform =
        `scale(1.04)
         translateY(${movement}px)`;

    }

  }


  window.addEventListener(
    "scroll",
    heroParallax,
    { passive: true }
  );


  /* =======================================================
     11. PRODUCT IMAGE FLOAT / POINTER EFFECT
  ======================================================= */

  const floatingImages =
    document.querySelectorAll(
      ".product-visual img, " +
      ".offer-product img, " +
      ".energy-image img"
    );


  floatingImages.forEach((image) => {

    const parent =
      image.parentElement;

    if (!parent) return;


    parent.addEventListener(
      "mousemove",
      (event) => {

        /*
          Disable mouse tilt on touch/mobile.
        */

        if (
          window.innerWidth <= 768
        ) {

          return;

        }


        const rect =
          parent.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;


        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;


        const rotateY =
          ((x - centerX) /
            centerX) * 2.2;

        const rotateX =
          ((centerY - y) /
            centerY) * 1.8;


        image.style.transform =
          `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-5px)
          `;

      }
    );


    parent.addEventListener(
      "mouseleave",
      () => {

        image.style.transform = "";

      }
    );

  });


  /* =======================================================
     12. ACTIVE NAV SECTION
  ======================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const desktopNavLinks =
    document.querySelectorAll(
      '.desktop-nav a[href^="#"]'
    );


  if (
    sections.length &&
    desktopNavLinks.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(

        (entries) => {

          entries.forEach((entry) => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            const id =
              entry.target.id;


            desktopNavLinks.forEach(
              (link) => {

                const matches =
                  link.getAttribute(
                    "href"
                  ) === `#${id}`;


                if (matches) {

                  link.style.color =
                    "var(--gold-light)";

                } else {

                  link.style.color = "";

                }

              }
            );

          });

        },

        {

          threshold: 0.35

        }

      );


    sections.forEach(
      (section) => {

        sectionObserver.observe(section);

      }
    );

  }


  /* =======================================================
     13. IMAGE LOAD HANDLING
  ======================================================= */

  const allImages =
    document.querySelectorAll("img");


  allImages.forEach((image) => {

    /*
      Prevent broken images from displaying
      the browser's broken-image icon.
    */

    image.addEventListener(
      "error",
      () => {

        console.warn(
          `Image could not load: ${image.src}`
        );

        image.style.opacity = "0";

      }
    );


    image.addEventListener(
      "load",
      () => {

        image.style.opacity = "1";

      }
    );

  });


  /* =======================================================
     14. INITIAL REVEAL FIX
  ======================================================= */

  /*
    Ensure elements already visible on first load
    don't remain hidden due to browser timing.
  */

  setTimeout(() => {

    revealElements.forEach(
      (element) => {

        const rect =
          element.getBoundingClientRect();

        if (
          rect.top <
          window.innerHeight * 0.95
        ) {

          element.classList.add(
            "visible"
          );

        }

      }
    );

  }, 150);


  /* =======================================================
     15. PAGE READY
  ======================================================= */

  document.documentElement.classList.add(
    "js-ready"
  );

});
