/* =========================================
   JOBNEST - JOBS PAGE JAVASCRIPT
========================================= */


let currentPage = 1;
const jobsPerPage = 6;


/* =========================================
   INITIALIZE PAGE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    const urlJob = urlParams.get("job");
    const urlLocation = urlParams.get("location");

    const keywordInput = document.getElementById("jobKeyword");
    const locationInput = document.getElementById("jobLocation");


    // Fill search fields from home page
    if (urlJob && keywordInput) {
        keywordInput.value = urlJob;
    }

    if (urlLocation && locationInput) {
        locationInput.value = urlLocation;
    }


    // Add events to filters
    const filters = document.querySelectorAll(
        ".job-type, .work-mode, .experience-level, input[name='salary']"
    );

    filters.forEach(function (filter) {

        filter.addEventListener("change", function () {

            currentPage = 1;
            filterJobs();

        });

    });


    // Search with Enter key
    if (keywordInput) {

        keywordInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                currentPage = 1;
                filterJobs();

            }

        });

    }


    if (locationInput) {

        locationInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                currentPage = 1;
                filterJobs();

            }

        });

    }


    // Setup pagination
    setupPagination();


    // Initial load
    filterJobs();

});


/* =========================================
   GET FILTERED JOBS
========================================= */

function getFilteredJobs() {

    const keywordInput = document.getElementById("jobKeyword");
    const locationInput = document.getElementById("jobLocation");


    const keyword = keywordInput
        ? keywordInput.value.toLowerCase().trim()
        : "";


    const location = locationInput
        ? locationInput.value.toLowerCase().trim()
        : "";


    const jobs = Array.from(
        document.querySelectorAll(".job-list-card")
    );


    // Selected job types
    const selectedTypes = Array.from(
        document.querySelectorAll(".job-type:checked")
    ).map(function (item) {
        return item.value;
    });


    // Selected work modes
    const selectedModes = Array.from(
        document.querySelectorAll(".work-mode:checked")
    ).map(function (item) {
        return item.value;
    });


    // Selected experience
    const selectedExperience = Array.from(
        document.querySelectorAll(".experience-level:checked")
    ).map(function (item) {
        return item.value;
    });


    // Selected salary
    const salaryInput = document.querySelector(
        "input[name='salary']:checked"
    );


    const selectedSalary = salaryInput
        ? salaryInput.value
        : "any";


    // Filter jobs
    const filteredJobs = jobs.filter(function (job) {

        const title =
            (job.dataset.title || "").toLowerCase();

        const company =
            (job.dataset.company || "").toLowerCase();

        const jobLocation =
            (job.dataset.location || "").toLowerCase();

        const type = job.dataset.type || "";

        const mode = job.dataset.mode || "";

        const experience = job.dataset.experience || "";

        const salary = Number(job.dataset.salary || 0);


        const keywordMatch =
            keyword === "" ||
            title.includes(keyword) ||
            company.includes(keyword);


        const locationMatch =
            location === "" ||
            jobLocation.includes(location);


        const typeMatch =
            selectedTypes.length === 0 ||
            selectedTypes.includes(type);


        const modeMatch =
            selectedModes.length === 0 ||
            selectedModes.includes(mode);


        const experienceMatch =
            selectedExperience.length === 0 ||
            selectedExperience.includes(experience);


        const salaryMatch =
            selectedSalary === "any" ||
            salary >= Number(selectedSalary);


        return (
            keywordMatch &&
            locationMatch &&
            typeMatch &&
            modeMatch &&
            experienceMatch &&
            salaryMatch
        );

    });


    return filteredJobs;

}


/* =========================================
   FILTER JOBS
========================================= */

function filterJobs() {

    currentPage = 1;

    const filteredJobs = getFilteredJobs();

    updateJobCount(filteredJobs.length);

    updateNoResults(filteredJobs.length);

    updatePagination(filteredJobs);

    showCurrentPage(filteredJobs);

}


/* =========================================
   SHOW CURRENT PAGE
========================================= */

function showCurrentPage(filteredJobs) {

    const allJobs = Array.from(
        document.querySelectorAll(".job-list-card")
    );


    // Hide all jobs
    allJobs.forEach(function (job) {
        job.style.display = "none";
    });


    // Calculate page range
    const startIndex =
        (currentPage - 1) * jobsPerPage;

    const endIndex =
        startIndex + jobsPerPage;


    // Show only current page jobs
    filteredJobs
        .slice(startIndex, endIndex)
        .forEach(function (job) {

            job.style.display = "flex";

        });


    // Update active button
    updateActiveButton();

}


/* =========================================
   UPDATE JOB COUNT
========================================= */

function updateJobCount(count) {

    const jobCount =
        document.getElementById("jobCount");


    if (jobCount) {

        jobCount.textContent =
            "Showing " +
            count +
            " job opportunit" +
            (count === 1 ? "y" : "ies");

    }

}


/* =========================================
   NO RESULTS
========================================= */

function updateNoResults(count) {

    const noResults =
        document.getElementById("noResults");


    if (!noResults) {
        return;
    }


    if (count === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


/* =========================================
   SETUP PAGINATION
========================================= */

function setupPagination() {

    const buttons =
        document.querySelectorAll(".page-btn");


    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const text =
                button.textContent.trim();


            const filteredJobs =
                getFilteredJobs();


            const totalPages =
                Math.ceil(
                    filteredJobs.length / jobsPerPage
                );


            // NEXT BUTTON
            if (text === "Next →") {

                if (currentPage < totalPages) {

                    currentPage++;

                    showCurrentPage(filteredJobs);

                    scrollToJobs();

                }

            }


            // PAGE NUMBER
            else {

                const pageNumber =
                    Number(text);


                if (
                    pageNumber >= 1 &&
                    pageNumber <= totalPages
                ) {

                    currentPage =
                        pageNumber;

                    showCurrentPage(filteredJobs);

                    scrollToJobs();

                }

            }

        });

    });

}


/* =========================================
   UPDATE PAGINATION
========================================= */

function updatePagination(filteredJobs) {

    const pagination =
        document.querySelector(".pagination");


    if (!pagination) {
        return;
    }


    const totalPages =
        Math.ceil(
            filteredJobs.length / jobsPerPage
        );


    // Hide pagination if only 1 page
    if (totalPages <= 1) {

        pagination.style.display = "none";

        return;

    }


    pagination.style.display = "flex";


    // Update numbered buttons
    const buttons =
        pagination.querySelectorAll(".page-btn");


    buttons.forEach(function (button) {

        const text =
            button.textContent.trim();


        if (text !== "Next →") {

            const pageNumber =
                Number(text);


            if (pageNumber > totalPages) {

                button.style.display =
                    "none";

            } else {

                button.style.display =
                    "block";

            }

        }

    });

}


/* =========================================
   UPDATE ACTIVE BUTTON
========================================= */

function updateActiveButton() {

    const buttons =
        document.querySelectorAll(".page-btn");


    buttons.forEach(function (button) {

        button.classList.remove("active");


        const pageNumber =
            Number(
                button.textContent.trim()
            );


        if (pageNumber === currentPage) {

            button.classList.add("active");

        }

    });

}


/* =========================================
   CLEAR FILTERS
========================================= */

function clearFilters() {

    const keywordInput =
        document.getElementById("jobKeyword");

    const locationInput =
        document.getElementById("jobLocation");


    if (keywordInput) {
        keywordInput.value = "";
    }


    if (locationInput) {
        locationInput.value = "";
    }


    // Uncheck filters
    const checkboxes =
        document.querySelectorAll(
            ".job-type, .work-mode, .experience-level"
        );


    checkboxes.forEach(function (checkbox) {

        checkbox.checked = false;

    });


    // Reset salary
    const anySalary =
        document.querySelector(
            "input[name='salary'][value='any']"
        );


    if (anySalary) {

        anySalary.checked = true;

    }


    currentPage = 1;

    filterJobs();

}


/* =========================================
   SORT JOBS
========================================= */

function sortJobs() {

    const sortSelect =
        document.getElementById("sortJobs");

    const jobList =
        document.getElementById("jobList");


    if (!sortSelect || !jobList) {
        return;
    }


    const jobs =
        Array.from(
            jobList.querySelectorAll(
                ".job-list-card"
            )
        );


    const sortValue =
        sortSelect.value;


    // Store original position first time
    jobs.forEach(function (job, index) {

        if (
            job.dataset.originalIndex === undefined
        ) {

            job.dataset.originalIndex =
                index;

        }

    });


    if (sortValue === "salary-high") {

        jobs.sort(function (a, b) {

            return (
                Number(b.dataset.salary) -
                Number(a.dataset.salary)
            );

        });

    }


    else if (sortValue === "salary-low") {

        jobs.sort(function (a, b) {

            return (
                Number(a.dataset.salary) -
                Number(b.dataset.salary)
            );

        });

    }


    else {

        jobs.sort(function (a, b) {

            return (
                Number(a.dataset.originalIndex) -
                Number(b.dataset.originalIndex)
            );

        });

    }


    // Put sorted jobs back
    jobs.forEach(function (job) {

        jobList.appendChild(job);

    });


    currentPage = 1;

    filterJobs();

}


/* =========================================
   SCROLL TO JOBS
========================================= */

function scrollToJobs() {

    const jobsMain =
        document.querySelector(".jobs-main");


    if (jobsMain) {

        jobsMain.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}