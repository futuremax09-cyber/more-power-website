document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".main-nav a");
    const faqItems = document.querySelectorAll(".faq-item");
    const faqQuestions = document.querySelectorAll(".faq-question");
    const backToTop = document.querySelector(".back-to-top");

    const WHATSAPP_NUMBER = "917689064456";

    const DEFAULT_MESSAGE =
        "Namaste, mujhe MORE POWER ke baare mein jaankari chahiye. Main ₹2999 offer price par order karna chahta hoon.";

    function createWhatsAppURL(message = DEFAULT_MESSAGE) {
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    function setupWhatsAppLinks() {
        const whatsappSelectors = [
            ".header-order",
            ".offer-button",
            ".final-order-button",
            ".whatsapp-strip-button",
            ".floating-whatsapp",
            ".footer-order-button",
            ".mobile-order-bar > a",
            'a[href*="wa.me"]',
            'a[href*="whatsapp.com"]'
        ];

        const whatsappLinks = document.querySelectorAll(
            whatsappSelectors.join(",")
        );

        whatsappLinks.forEach((link) => {
            link.setAttribute(
                "href",
                createWhatsAppURL()
            );

            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );
        });
    }

    setupWhatsAppLinks();

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 30) {
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

    function openMenu() {
        if (!mainNav || !menuToggle) return;

        mainNav.classList.add("open");
        menuToggle.classList.add("active");
        document.body.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );
    }

    function closeMenu() {
        if (!mainNav || !menuToggle) return;

        mainNav.classList.remove("open");
        menuToggle.classList.remove("active");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    function toggleMenu() {
        if (!mainNav) return;

        if (mainNav.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (menuToggle) {
        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.addEventListener(
            "click",
            toggleMenu
        );
    }

    navLinks.forEach((link) => {
        link.addEventListener(
            "click",
            () => {
                closeMenu();
            }
        );
    });

    document.addEventListener(
        "click",
        (event) => {
            if (
                !mainNav ||
                !menuToggle ||
                !mainNav.classList.contains("open")
            ) {
                return;
            }

            const clickedInsideNav =
                mainNav.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideNav &&
                !clickedToggle
            ) {
                closeMenu();
            }
        }
    );

    document.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        }
    );

    window.addEventListener(
        "resize",
        () => {
            if (window.innerWidth > 1020) {
                closeMenu();
            }
        }
    );

    faqQuestions.forEach((question) => {
        question.setAttribute(
            "aria-expanded",
            "false"
        );

        question.addEventListener(
            "click",
            () => {
                const currentItem =
                    question.closest(".faq-item");

                if (!currentItem) return;

                const alreadyOpen =
                    currentItem.classList.contains(
                        "active"
                    );

                faqItems.forEach((item) => {
                    item.classList.remove(
                        "active"
                    );

                    const itemQuestion =
                        item.querySelector(
                            ".faq-question"
                        );

                    if (itemQuestion) {
                        itemQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                });

                if (!alreadyOpen) {
                    currentItem.classList.add(
                        "active"
                    );

                    question.setAttribute(
                        "aria-expanded",
                        "true"
                    );
                }
            }
        );
    });

    const firstFAQ =
        document.querySelector(".faq-item");

    if (firstFAQ) {
        firstFAQ.classList.add("active");

        const firstQuestion =
            firstFAQ.querySelector(
                ".faq-question"
            );

        if (firstQuestion) {
            firstQuestion.setAttribute(
                "aria-expanded",
                "true"
            );
        }
    }

    function updateBackToTop() {
        if (!backToTop) return;

        if (window.scrollY > 550) {
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
        { passive: true }
    );

    if (backToTop) {
        backToTop.addEventListener(
            "click",
            (event) => {
                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]:not([href="#"])'
        );

    internalLinks.forEach((link) => {
        link.addEventListener(
            "click",
            (event) => {
                const href =
                    link.getAttribute("href");

                if (!href) return;

                const target =
                    document.querySelector(href);

                if (!target) return;

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.pageYOffset -
                    headerHeight -
                    15;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

                closeMenu();
            }
        );
    });

    const revealElements =
        document.querySelectorAll(
            [
                ".benefit-card",
                ".ingredient-item",
                ".symbol-card",
                ".experience-highlights > div",
                ".formula-features > div",
                ".faq-item"
            ].join(",")
        );

    if (
        "IntersectionObserver" in window &&
        revealElements.length > 0
    ) {
        revealElements.forEach(
            (element) => {
                element.classList.add(
                    "reveal-item"
                );
            }
        );

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach(
                        (entry) => {
                            if (
                                entry.isIntersecting
                            ) {
                                entry.target.classList.add(
                                    "revealed"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.1,
                    rootMargin:
                        "0px 0px -35px 0px"
                }
            );

        revealElements.forEach(
            (element) => {
                revealObserver.observe(
                    element
                );
            }
        );
    }

    const orderButtons =
        document.querySelectorAll(
            [
                ".header-order",
                ".offer-button",
                ".final-order-button",
                ".footer-order-button",
                ".mobile-order-bar > a"
            ].join(",")
        );

    orderButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                button.classList.add(
                    "button-clicked"
                );

                setTimeout(() => {
                    button.classList.remove(
                        "button-clicked"
                    );
                }, 300);
            }
        );
    });

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach(
        (element) => {
            element.textContent =
                currentYear;
        }
    );
});
