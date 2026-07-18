/* =========================================================
   MORE POWER
   PART 1 JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header =
        document.getElementById("siteHeader");

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileLinks =
        document.querySelectorAll(".mobile-nav a");


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

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


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    menuToggle.addEventListener("click", function () {

        const isOpen =
            mobileMenu.classList.toggle("active");


        menuToggle.classList.toggle(
            "active",
            isOpen
        );


        document.body.classList.toggle(
            "menu-open",
            isOpen
        );


        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* =====================================================
       CLOSE MENU AFTER LINK CLICK
    ===================================================== */

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mobileMenu.classList.remove("active");

            menuToggle.classList.remove("active");

            document.body.classList.remove("menu-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* =====================================================
       CLOSE MOBILE MENU ON ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                mobileMenu.classList.remove("active");

                menuToggle.classList.remove("active");

                document.body.classList.remove("menu-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


});
