/* =========================================
   JOBNEST - SIGN IN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("signinForm");
    const emailInput = document.getElementById("signinEmail");
    const passwordInput = document.getElementById("signinPassword");
    const rememberMe = document.getElementById("rememberMe");
    const passwordToggle = document.getElementById("passwordToggle");
    const signinButton = document.getElementById("signinButton");
    const messageBox = document.getElementById("signinMessage");


    /* =====================================
       LOAD REMEMBERED EMAIL
    ===================================== */

    const savedEmail = localStorage.getItem("jobNestRememberEmail");

    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMe.checked = true;
    }


    /* =====================================
       SHOW / HIDE PASSWORD
    ===================================== */

    passwordToggle.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            passwordToggle.textContent = "🙈";
            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            passwordInput.type = "password";
            passwordToggle.textContent = "👁";
            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });


    /* =====================================
       FORM SUBMIT
    ===================================== */

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        let valid = true;


        clearErrors();
        hideMessage();


        /* EMAIL VALIDATION */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (email === "") {

            showError(
                emailInput,
                "signinEmailError",
                "Email address is required."
            );

            valid = false;

        } else if (!emailPattern.test(email)) {

            showError(
                emailInput,
                "signinEmailError",
                "Please enter a valid email address."
            );

            valid = false;

        }


        /* PASSWORD VALIDATION */

        if (password === "") {

            showError(
                passwordInput,
                "signinPasswordError",
                "Password is required."
            );

            valid = false;

        } else if (password.length < 6) {

            showError(
                passwordInput,
                "signinPasswordError",
                "Password must be at least 6 characters."
            );

            valid = false;

        }


        if (!valid) {
            return;
        }


        /* =====================================
           CHECK REGISTERED ACCOUNT
        ===================================== */

        const accounts =
            JSON.parse(
                localStorage.getItem("jobNestAccounts")
            ) || [];


        const user = accounts.find(function (account) {

            return (
                account.email.toLowerCase() ===
                email.toLowerCase()

                &&

                account.password === password
            );

        });


        if (!user) {

            showMessage(
                "Invalid email or password. Please try again or create a new account.",
                "error"
            );

            return;

        }


        /* =====================================
           REMEMBER EMAIL
        ===================================== */

        if (rememberMe.checked) {

            localStorage.setItem(
                "jobNestRememberEmail",
                email
            );

        } else {

            localStorage.removeItem(
                "jobNestRememberEmail"
            );

        }


        /* =====================================
           LOGIN USER
        ===================================== */

        const loggedInUser = {
            name: user.name,
            email: user.email,
            loginTime: new Date().toLocaleString()
        };


        localStorage.setItem(
            "jobNestCurrentUser",
            JSON.stringify(loggedInUser)
        );


        /* =====================================
           LOADING STATE
        ===================================== */

        signinButton.disabled = true;

        signinButton.classList.add("loading");


        showMessage(
            "Login successful! Redirecting you to JobNest...",
            "success"
        );


        /* =====================================
           REDIRECT
        ===================================== */

        setTimeout(function () {

            window.location.href = "index.html";

        }, 1200);

    });


    /* =====================================
       CLEAR ERROR ON TYPING
    ===================================== */

    emailInput.addEventListener("input", function () {

        clearSingleError(
            emailInput,
            "signinEmailError"
        );

    });


    passwordInput.addEventListener("input", function () {

        clearSingleError(
            passwordInput,
            "signinPasswordError"
        );

    });


    /* =====================================
       FUNCTIONS
    ===================================== */

    function showError(input, errorId, message) {

        input.classList.add("error");

        document.getElementById(errorId).textContent =
            message;

    }


    function clearSingleError(input, errorId) {

        input.classList.remove("error");

        document.getElementById(errorId).textContent =
            "";

    }


    function clearErrors() {

        clearSingleError(
            emailInput,
            "signinEmailError"
        );

        clearSingleError(
            passwordInput,
            "signinPasswordError"
        );

    }


    function showMessage(text, type) {

        messageBox.textContent = text;

        messageBox.className =
            "auth-message " + type;

    }


    function hideMessage() {

        messageBox.style.display = "none";

        messageBox.className =
            "auth-message";

        messageBox.textContent = "";

    }

});