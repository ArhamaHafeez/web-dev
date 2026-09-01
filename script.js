/* =========================================
   JOBNEST - MAIN JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {

    const navLinks = document.querySelector(".nav-links");

    if (navLinks) {
        navLinks.classList.toggle("show");
    }

}


/* =========================================
   JOB SEARCH
========================================= */

function searchJobs() {

    const jobInput = document.getElementById("jobSearch");
    const locationInput = document.getElementById("locationSearch");

    if (!jobInput || !locationInput) {
        return;
    }

    const job = jobInput.value.trim();
    const location = locationInput.value.trim();


    if (job === "" && location === "") {

        alert(
            "Please enter a job title, skill, keyword or location."
        );

        jobInput.focus();

        return;
    }


    window.location.href =
        "jobs.html?job=" +
        encodeURIComponent(job) +
        "&location=" +
        encodeURIComponent(location);

}


/* =========================================
   ENTER KEY SEARCH
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const jobInput = document.getElementById("jobSearch");
    const locationInput = document.getElementById("locationSearch");


    if (jobInput) {

        jobInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                searchJobs();
            }

        });

    }


    if (locationInput) {

        locationInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                searchJobs();
            }

        });

    }

});


/* =========================================
   CLOSE MOBILE MENU AFTER CLICK
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".nav-links a");
    const navMenu = document.querySelector(".nav-links");


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navMenu) {
                navMenu.classList.remove("show");
            }

        });

    });

});


/* =========================================
   SMOOTH SCROLL FOR SAME PAGE LINKS
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});