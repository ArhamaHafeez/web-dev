/* =========================================
   JOBNEST - ABOUT PAGE JAVASCRIPT
========================================= */


document.addEventListener("DOMContentLoaded", function () {

    const counters =
        document.querySelectorAll(".counter");


    let started = false;


    // Animate counters when section appears
    function startCounters() {

        if (started) return;

        const statsSection =
            document.querySelector(".about-stats");


        if (!statsSection) return;


        const sectionTop =
            statsSection.getBoundingClientRect().top;


        const screenHeight =
            window.innerHeight;


        if (sectionTop < screenHeight - 100) {

            started = true;


            counters.forEach(function (counter) {

                const target =
                    Number(counter.dataset.target);


                const symbol =
                    counter.dataset.symbol || "+";


                let count = 0;


                const duration = 1800;

                const increment =
                    target / (duration / 16);


                function updateCounter() {

                    count += increment;


                    if (count < target) {

                        counter.textContent =
                            Math.floor(count)
                                .toLocaleString() +
                            symbol;


                        requestAnimationFrame(
                            updateCounter
                        );

                    }

                    else {

                        counter.textContent =
                            target.toLocaleString() +
                            symbol;

                    }

                }


                updateCounter();

            });

        }

    }


    // Run on scroll
    window.addEventListener(
        "scroll",
        startCounters
    );


    // Run in case already visible
    startCounters();


    /* =====================================
       SMOOTH SCROLL FOR ABOUT LINKS
    ===================================== */

    const storyButton =
        document.querySelector(
            ".about-hero-btn"
        );


    if (storyButton) {

        storyButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const target =
                    document.querySelector(
                        "#our-story"
                    );


                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =====================================
       SIMPLE SCROLL REVEAL
    ===================================== */

    const revealElements =
        document.querySelectorAll(
            ".mission-card, .why-card, .team-card"
        );


    const revealOnScroll = function () {

        revealElements.forEach(function (element) {

            const position =
                element.getBoundingClientRect().top;


            const screenHeight =
                window.innerHeight;


            if (position < screenHeight - 70) {

                element.style.opacity = "1";

                element.style.transform =
                    "translateY(0)";

            }

        });

    };


    // Initial state
    revealElements.forEach(function (element) {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

    });


    window.addEventListener(
        "scroll",
        revealOnScroll
    );


    revealOnScroll();

});