/* =========================================
   JOBNEST - CONTACT PAGE JAVASCRIPT
========================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       CONTACT FORM
    ===================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById("contactName")
                        .value
                        .trim();


                const email =
                    document
                        .getElementById("contactEmail")
                        .value
                        .trim();


                const subject =
                    document
                        .getElementById("contactSubject")
                        .value;


                const message =
                    document
                        .getElementById("contactMessage")
                        .value
                        .trim();


                let isValid = true;


                // Clear previous errors
                clearErrors();


                /* NAME VALIDATION */

                if (name.length < 2) {

                    showError(
                        "contactName",
                        "nameError",
                        "Please enter your full name."
                    );

                    isValid = false;

                }


                /* EMAIL VALIDATION */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    showError(
                        "contactEmail",
                        "emailError",
                        "Please enter a valid email address."
                    );

                    isValid = false;

                }


                /* SUBJECT VALIDATION */

                if (subject === "") {

                    showError(
                        "contactSubject",
                        "subjectError",
                        "Please select a subject."
                    );

                    isValid = false;

                }


                /* MESSAGE VALIDATION */

                if (message.length < 10) {

                    showError(
                        "contactMessage",
                        "messageError",
                        "Message must contain at least 10 characters."
                    );

                    isValid = false;

                }


                // Stop if invalid
                if (!isValid) {
                    return;
                }


                /* =====================================
                   SAVE MESSAGE LOCALLY
                ===================================== */

                const contactMessages =
                    JSON.parse(
                        localStorage.getItem(
                            "jobNestMessages"
                        )
                    ) || [];


                const newMessage = {

                    id: Date.now(),

                    name: name,

                    email: email,

                    phone:
                        document
                            .getElementById("contactPhone")
                            .value
                            .trim(),

                    subject: subject,

                    message: message,

                    date:
                        new Date().toLocaleString()

                };


                contactMessages.push(
                    newMessage
                );


                localStorage.setItem(
                    "jobNestMessages",
                    JSON.stringify(contactMessages)
                );


                /* =====================================
                   SHOW SUCCESS MESSAGE
                ===================================== */

                const successMessage =
                    document.getElementById(
                        "contactSuccess"
                    );


                if (successMessage) {

                    successMessage.style.display =
                        "flex";

                }


                // Reset form
                contactForm.reset();


                // Hide success message after 6 seconds
                setTimeout(function () {

                    if (successMessage) {

                        successMessage.style.display =
                            "none";

                    }

                }, 6000);

            }
        );

    }


    /* =====================================
       FAQ ACCORDION
    ===================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(function (item) {

        const question =
            item.querySelector(
                ".faq-question"
            );


        const answer =
            item.querySelector(
                ".faq-answer"
            );


        question.addEventListener(
            "click",
            function () {


                const isActive =
                    item.classList.contains(
                        "active"
                    );


                // Close all FAQs
                faqItems.forEach(function (faq) {

                    faq.classList.remove(
                        "active"
                    );


                    const faqAnswer =
                        faq.querySelector(
                            ".faq-answer"
                        );


                    faqAnswer.style.maxHeight =
                        null;

                });


                // Open clicked FAQ
                if (!isActive) {

                    item.classList.add(
                        "active"
                    );


                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                }

            }
        );

    });


});


/* =========================================
   SHOW ERROR
========================================= */

function showError(
    inputId,
    errorId,
    message
) {

    const input =
        document.getElementById(inputId);


    const error =
        document.getElementById(errorId);


    if (input) {

        input.classList.add("error");

    }


    if (error) {

        error.textContent =
            message;

    }

}


/* =========================================
   CLEAR ERRORS
========================================= */

function clearErrors() {

    const errorInputs =
        document.querySelectorAll(
            ".form-group input, .form-group select, .form-group textarea"
        );


    errorInputs.forEach(function (input) {

        input.classList.remove("error");

    });


    const errorMessages =
        document.querySelectorAll(
            ".error-message"
        );


    errorMessages.forEach(function (error) {

        error.textContent = "";

    });

}