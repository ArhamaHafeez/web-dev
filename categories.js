/* =========================================
   JOBNEST - CATEGORIES PAGE JAVASCRIPT
========================================= */


document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("categorySearch");


    // Search while typing
    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                searchCategories();

            }
        );


        // Search on Enter
        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    searchCategories();

                }

            }
        );

    }


    // Make entire category cards clickable
    const categoryCards =
        document.querySelectorAll(".category-card");


    categoryCards.forEach(function (card) {

        card.addEventListener("click", function (event) {

            // Don't trigger twice if link clicked
            if (event.target.tagName === "A") {
                return;
            }


            const link =
                card.querySelector(".category-footer a");


            if (link) {
                window.location.href =
                    link.getAttribute("href");
            }

        });

    });


    // Keyboard accessibility
    categoryCards.forEach(function (card) {

        card.setAttribute("tabindex", "0");


        card.addEventListener("keydown", function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                const link =
                    card.querySelector(
                        ".category-footer a"
                    );


                if (link) {

                    window.location.href =
                        link.getAttribute("href");

                }

            }

        });

    });

});


/* =========================================
   SEARCH CATEGORIES
========================================= */

function searchCategories() {

    const searchInput =
        document.getElementById("categorySearch");


    if (!searchInput) {
        return;
    }


    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(
            ".category-card"
        );


    let visibleCategories = 0;


    cards.forEach(function (card) {

        const categoryData =
            (
                card.dataset.category || ""
            ).toLowerCase();


        const title =
            (
                card.querySelector("h3")
                    .textContent || ""
            ).toLowerCase();


        const description =
            (
                card.querySelector("p")
                    .textContent || ""
            ).toLowerCase();


        const matches =

            searchValue === "" ||

            categoryData.includes(searchValue) ||

            title.includes(searchValue) ||

            description.includes(searchValue);


        if (matches) {

            card.style.display = "block";

            visibleCategories++;

        }

        else {

            card.style.display = "none";

        }

    });


    // Update category count
    updateCategoryCount(
        visibleCategories
    );


    // Show no results
    const noResults =
        document.getElementById(
            "categoryNoResults"
        );


    if (noResults) {

        if (visibleCategories === 0) {

            noResults.style.display =
                "block";

        }

        else {

            noResults.style.display =
                "none";

        }

    }

}


/* =========================================
   UPDATE CATEGORY COUNT
========================================= */

function updateCategoryCount(count) {

    const categoryCount =
        document.getElementById(
            "categoryCount"
        );


    if (!categoryCount) {
        return;
    }


    if (count === 12) {

        categoryCount.textContent =
            "Explore 12 popular job categories";

    }

    else if (count === 1) {

        categoryCount.textContent =
            "1 category found";

    }

    else {

        categoryCount.textContent =
            count + " categories found";

    }

}


/* =========================================
   CLEAR SEARCH
========================================= */

function clearCategorySearch() {

    const searchInput =
        document.getElementById(
            "categorySearch"
        );


    if (searchInput) {

        searchInput.value = "";

    }


    searchCategories();

}