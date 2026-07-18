/* ============================================================
   MORE POWER — COMPLETE FINAL SCRIPT.JS
   WhatsApp: +91 7689064456
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* ============================================================
       1. BASIC HELPERS
    ============================================================ */

    const $ = (selector, scope = document) =>
        scope.querySelector(selector);

    const $$ = (selector, scope = document) =>
        Array.from(scope.querySelectorAll(selector));

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


    /* ============================================================
       2. WHATSAPP SETTINGS
    ============================================================ */

    /*
       WhatsApp number:
       +91 7689064456

       wa.me format me + sign nahi lagta.
    */

    const whatsappNumber =
        "917689064456";


    const whatsappMessage =
`Namaste,

Mujhe MORE POWER Premium Men's Herbal Wellness Formula ke baare mein jaankari chahiye aur main order karna chahta hoon.

Kripya mujhe price, offer, delivery aur order process ki details bhejiye.`;


    /* ============================================================
       3. OPEN WHATSAPP FUNCTION
    ============================================================ */

    function openMorePowerWhatsApp() {

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(
                whatsappMessage
            );


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    }


    /* ============================================================
       4. CONNECT ALL ORDER BUTTONS TO WHATSAPP
    ============================================================ */

    /*
       In sab classes wale buttons WhatsApp kholenge.

       Future me kisi bhi button ko WhatsApp order button
       banana ho to:

       data-order-button

       attribute laga sakte ho.
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

        ".offer-order-btn",

        ".buy-now-btn",

        ".order-now-btn",

        "[data-order-button]"

    ];


    const orderButtons =
        $$(
            orderButtonSelectors.join(",")
        );


    orderButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                /*
                   Mobile menu open ho to close karo.
                */

                closeMobileMenu();

                /*
                   WhatsApp open karo.
                */

                openMorePowerWhatsApp();

            }
        );

    });


    /* ============================================================
       5. FLOATING WHATSAPP BUTTON
    ============================================================ */

    const whatsappFloat =
        document.getElementById(
            "whatsappFloat"
        );


    if (whatsappFloat) {

        whatsappFloat.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openMorePowerWhatsApp();

            }
        );

    }


    /* ============================================================
       6. HEADER SCROLL EFFECT
    ============================================================ */

    function handleHeaderScroll() {

        if (!header) return;


        if (window.scrollY > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    handleHeaderScroll();


    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        {
            passive: true
        }
    );


    /* ============================================================
       7. OPEN MOBILE MENU
    ============================================================ */

    function openMobileMenu() {

        if (!mobileNavigation) return;


        mobileNavigation.classList.add(
            "active"
        );


        if (mobileMenuButton) {

            mobileMenuButton.classList.add(
                "active"
            );

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        if (menuBackdrop) {

            menuBackdrop.classList.add(
                "active"
            );

        }


        body.classList.add(
            "menu-open"
        );

    }


    /* ============================================================
       8. CLOSE MOBILE MENU
    ============================================================ */

    function closeMobileMenu() {

        if (mobileNavigation) {

            mobileNavigation.classList.remove(
                "active"
            );

        }


        if (mobileMenuButton) {

            mobileMenuButton.classList.remove(
                "active"
            );

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        if (menuBackdrop) {

            menuBackdrop.classList.remove(
                "active"
            );

        }


        body.classList.remove(
            "menu-open"
        );

    }


    /* ============================================================
       9. TOGGLE MOBILE MENU
    ============================================================ */

    function toggleMobileMenu() {

        if (!mobileNavigation) return;


        const menuIsOpen =
            mobileNavigation.classList.contains(
                "active"
            );


        if (menuIsOpen) {

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
       10. CLOSE MOBILE MENU AFTER LINK CLICK
    ============================================================ */

    const mobileNavigationLinks =
        $$(".mobile-navigation a");


    mobileNavigationLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                }
            );

        }
    );


    /* ============================================================
       11. ESC KEY
    ============================================================ */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeMobileMenu();

            }

        }
    );


    /* ============================================================
       12. SMOOTH SCROLL
    ============================================================ */

    const anchorLinks =
        $$('a[href^="#"]');


    anchorLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    /*
                       Order buttons are already handled
                       by WhatsApp system.

                       Don't treat them as navigation.
                    */

                    if (
                        link.matches(
                            orderButtonSelectors.join(",")
                        )
                    ) {

                        return;

                    }


                    if (
                        link.id ===
                        "whatsappFloat"
                    ) {

                        return;

                    }


                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#" ||
                        href.length < 2
                    ) {

                        return;

                    }


                    let target;


                    try {

                        target =
                            document.querySelector(
                                href
                            );

                    } catch (error) {

                        return;

                    }


                    if (!target) return;


                    event.preventDefault();


                    closeMobileMenu();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target
                            .getBoundingClientRect()
                            .top +

                        window.scrollY -

                        headerHeight -

                        15;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );


    /* ============================================================
       13. FAQ ACCORDION
    ============================================================ */

    const faqItems =
        $$(".faq-item");


    faqItems.forEach(
        function (item) {

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


            question.addEventListener(
                "click",
                function () {

                    const alreadyOpen =
                        item.classList.contains(
                            "active"
                        );


                    /*
                       Close all other FAQs
                    */

                    faqItems.forEach(
                        function (otherItem) {

                            if (
                                otherItem === item
                            ) {

                                return;

                            }


                            otherItem.classList.remove(
                                "active"
                            );


                            const otherQuestion =
                                $(
                                    ".faq-question",
                                    otherItem
                                );


                            if (otherQuestion) {

                                otherQuestion.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }

                        }
                    );


                    /*
                       Toggle selected FAQ
                    */

                    if (alreadyOpen) {

                        item.classList.remove(
                            "active"
                        );

                        question.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    } else {

                        item.classList.add(
                            "active"
                        );

                        question.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    }

                }
            );

        }
    );


    /* ============================================================
       14. BACK TO TOP BUTTON
    ============================================================ */

    function updateBackToTop() {

        if (!backToTop) return;


        if (
            window.scrollY > 650
        ) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }


    updateBackToTop();


    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior:
                        "smooth"

                });

            }
        );

    }


    /* ============================================================
       15. ACTIVE NAVIGATION LINK ON SCROLL
    ============================================================ */

    const navigationLinks =
        $$(
            '.desktop-nav a[href^="#"], ' +
            '.mobile-navigation a[href^="#"]'
        );


    const navigationSections =
        [];


    navigationLinks.forEach(
        function (link) {

            const href =
                link.getAttribute(
                    "href"
                );


            if (
                !href ||
                href === "#"
            ) {

                return;

            }


            let section;


            try {

                section =
                    document.querySelector(
                        href
                    );

            } catch (error) {

                return;

            }


            if (section) {

                navigationSections.push({

                    section:
                        section,

                    href:
                        href

                });

            }

        }
    );


    function updateActiveNavigation() {

        if (
            navigationSections.length === 0
        ) {

            return;

        }


        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.30;


        let activeHref =
            "";


        navigationSections.forEach(
            function (item) {

                if (
                    scrollPosition >=
                    item.section.offsetTop
                ) {

                    activeHref =
                        item.href;

                }

            }
        );


        navigationLinks.forEach(
            function (link) {

                const isActive =

                    link.getAttribute(
                        "href"
                    ) === activeHref;


                link.classList.toggle(
                    "active",
                    isActive
                );

            }
        );

    }


    updateActiveNavigation();


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    /* ============================================================
       16. SCROLL REVEAL ANIMATIONS
    ============================================================ */

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


    revealElements.forEach(
        function (element) {

            element.classList.add(
                "scroll-reveal"
            );

        }
    );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

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

                        }
                    );

                },

                {

                    threshold:
                        0.08,

                    rootMargin:
                        "0px 0px -35px 0px"

                }

            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "revealed"
                );

            }
        );

    }


    /* ============================================================
       17. STAGGERED CARD ANIMATION
    ============================================================ */

    const staggerGroups = [

        ".ingredient-cards",

        ".premium-benefit-grid",

        ".trust-grid",

        ".visual-story-grid"

    ];


    staggerGroups.forEach(
        function (groupSelector) {

            const group =
                $(groupSelector);


            if (!group) return;


            const children =
                Array.from(
                    group.children
                );


            children.forEach(
                function (
                    child,
                    index
                ) {

                    child.style.setProperty(

                        "--reveal-delay",

                        (index * 80) +
                        "ms"

                    );

                }
            );

        }
    );


    /* ============================================================
       18. IMAGE LOADING
    ============================================================ */

    const allImages =
        $$("img");


    allImages.forEach(
        function (image) {

            /*
               Lazy loading except hero images.
            */

            if (
                !image.hasAttribute(
                    "loading"
                )
            ) {

                const isHeroImage =

                    image.closest(
                        ".hero-section"
                    );


                if (!isHeroImage) {

                    image.setAttribute(
                        "loading",
                        "lazy"
                    );

                }

            }


            /*
               Loaded state
            */

            function markImageLoaded() {

                image.classList.add(
                    "image-loaded"
                );

            }


            if (image.complete) {

                markImageLoaded();

            } else {

                image.addEventListener(
                    "load",
                    markImageLoaded,
                    {
                        once: true
                    }
                );

            }


            /*
               Broken image safety
            */

            image.addEventListener(
                "error",
                function () {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        }
    );


    /* ============================================================
       19. CURRENT YEAR
    ============================================================ */

    const currentYearElements =
        $$(
            "[data-current-year]"
        );


    const currentYear =
        new Date().getFullYear();


    currentYearElements.forEach(
        function (element) {

            element.textContent =
                currentYear;

        }
    );


    /* ============================================================
       20. BUTTON RIPPLE EFFECT
    ============================================================ */

    const rippleButtons =
        $$(
            ".primary-gold-btn, " +
            ".header-order-btn, " +
            ".sticky-order-btn, " +
            ".mega-order-button, " +
            ".mobile-nav-order"
        );


    rippleButtons.forEach(
        function (button) {

            button.addEventListener(
                "pointerdown",
                function (event) {

                    const rect =
                        button.getBoundingClientRect();


                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.className =
                        "button-ripple";


                    ripple.style.left =
                        (
                            event.clientX -
                            rect.left
                        ) +
                        "px";


                    ripple.style.top =
                        (
                            event.clientY -
                            rect.top
                        ) +
                        "px";


                    button.appendChild(
                        ripple
                    );


                    setTimeout(
                        function () {

                            ripple.remove();

                        },
                        650
                    );

                }
            );

        }
    );


    /* ============================================================
       21. ADD REQUIRED JS CSS
    ============================================================ */

    const dynamicStyle =
        document.createElement(
            "style"
        );


    dynamicStyle.textContent = `

        body.menu-open {
            overflow: hidden;
        }


        .scroll-reveal {

            opacity: 0;

            transform:
                translateY(25px);

            transition:
                opacity
                0.75s
                ease
                var(--reveal-delay, 0ms),

                transform
                0.75s
                ease
                var(--reveal-delay, 0ms);

        }


        .scroll-reveal.revealed {

            opacity: 1;

            transform:
                translateY(0);

        }


        img {

            transition:
                opacity
                0.4s
                ease;

        }


        img:not(.image-loaded) {

            opacity: 0;

        }


        img.image-loaded {

            opacity: 1;

        }


        img.image-error {

            display: none !important;

        }


        .primary-gold-btn,
        .header-order-btn,
        .sticky-order-btn,
        .mega-order-button,
        .mobile-nav-order {

            position: relative;

            overflow: hidden;

        }


        .button-ripple {

            position: absolute;

            z-index: 50;

            width: 10px;

            height: 10px;

            border-radius: 50%;

            background:
                rgba(
                    255,
                    255,
                    255,
                    0.45
                );

            pointer-events: none;

            transform:
                translate(-50%, -50%)
                scale(0);

            animation:
                morePowerRipple
                0.65s
                ease-out;

        }


        @keyframes morePowerRipple {

            to {

                opacity: 0;

                transform:
                    translate(-50%, -50%)
                    scale(24);

            }

        }


        @media
        (prefers-reduced-motion: reduce) {

            .scroll-reveal {

                opacity: 1 !important;

                transform: none !important;

                transition: none !important;

            }

        }

    `;


    document.head.appendChild(
        dynamicStyle
    );


    /* ============================================================
       22. RESIZE HANDLING
    ============================================================ */

    window.addEventListener(
        "resize",
        function () {

            /*
               Desktop par jane par
               mobile menu automatically close.
            */

            if (
                window.innerWidth > 980
            ) {

                closeMobileMenu();

            }

        }
    );


    /* ============================================================
       23. PAGE READY
    ============================================================ */

    requestAnimationFrame(
        function () {

            body.classList.add(
                "page-ready"
            );

        }
    );


    console.log(
        "MORE POWER — Website Ready | WhatsApp Order Active"
    );

});


/* ============================================================
   END OF MORE POWER — COMPLETE SCRIPT.JS
============================================================ */
