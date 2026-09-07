/* =========================================
   JOBNEST - CREATE ACCOUNT JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("createAccountForm");

    const nameInput =
        document.getElementById("createName");

    const emailInput =
        document.getElementById("createEmail");

    const accountType =
        document.getElementById("accountType");

    const passwordInput =
        document.getElementById("createPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const termsCheck =
        document.getElementById("termsCheck");

    const createButton =
        document.getElementById("createAccountButton");

    const messageBox =
        document.getElementById("createAccountMessage");

    const strengthProgress =
        document.getElementById("strengthProgress");

    const strengthText =
        document.getElementById("strengthText");


    /* =====================================
       PASSWORD SHOW / HIDE
    ===================================== */

    const createPasswordToggle =
        document.getElementById(
            "createPasswordToggle"
        );

    const confirmPasswordToggle =
        document.getElementById(
            "confirmPasswordToggle"
        );


    createPasswordToggle.addEventListener(
        "click",
        function () {

            togglePassword(
                passwordInput,
                createPasswordToggle
            );

        }
    );


    confirmPasswordToggle.addEventListener(
        "click",
        function () {

            togglePassword(
                confirmPassword,
                confirmPasswordToggle
            );

        }
    );


    function togglePassword(input, button) {

        if (input.type === "password") {

            input.type = "text";

            button.textContent = "🙈";

            button.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            input.type = "password";

            button.textContent = "👁";

            button.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    }


    /* =====================================
       PASSWORD STRENGTH
    ===================================== */

    passwordInput.addEventListener(
        "input",
        function () {

            checkPasswordStrength(
                passwordInput.value
            );

        }
    );


    function checkPasswordStrength(password) {

        let strength = 0;


        if (password.length >= 6) {
            strength++;
        }


        if (password.length >= 10) {
            strength++;
        }


        if (/[A-Z]/.test(password)) {
            strength++;
        }


        if (/[0-9]/.test(password)) {
            strength++;
        }


        if (/[^A-Za-z0-9]/.test(password)) {
            strength++;
        }


        if (password.length === 0) {

            strengthProgress.style.width =
                "0%";

            strengthText.textContent =
                "Password must be at least 6 characters";

            return;

        }


        if (strength <= 1) {

            strengthProgress.style.width =
                "25%";

            strengthProgress.style.background =
                "#dc2626";

            strengthText.textContent =
                "Weak password";

        }

        else if (strength === 2) {

            strengthProgress.style.width =
                "50%";

            strengthProgress.style.background =
                "#f59e0b";

            strengthText.textContent =
                "Fair password";

        }

        else if (strength === 3) {

            strengthProgress.style.width =
                "75%";

            strengthProgress.style.background =
                "#3b82f6";

            strengthText.textContent =
                "Good password";

        }

        else {

            strengthProgress.style.width =
                "100%";

            strengthProgress.style.background =
                "#10b981";

            strengthText.textContent =
                "Strong password";

        }

    }


    /* =====================================
       FORM SUBMIT
    ===================================== */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const type =
                accountType.value;

            const password =
                passwordInput.value;

            const confirm =
                confirmPassword.value;


            let isValid = true;


            clearErrors();
            hideMessage();


            /* NAME */

            if (name.length < 2) {

                showError(
                    nameInput,
                    "createNameError",
                    "Please enter your full name."
                );

                isValid = false;

            }


            /* EMAIL */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (email === "") {

                showError(
                    emailInput,
                    "createEmailError",
                    "Email address is required."
                );

                isValid = false;

            }

            else if (!emailPattern.test(email)) {

                showError(
                    emailInput,
                    "createEmailError",
                    "Please enter a valid email address."
                );

                isValid = false;

            }


            /* ACCOUNT TYPE */

            if (type === "") {

                showError(
                    accountType,
                    "accountTypeError",
                    "Please select an account type."
                );

                isValid = false;

            }


            /* PASSWORD */

            if (password.length < 6) {

                showError(
                    passwordInput,
                    "createPasswordError",
                    "Password must be at least 6 characters."
                );

                isValid = false;

            }


            /* CONFIRM PASSWORD */

            if (confirm === "") {

                showError(
                    confirmPassword,
                    "confirmPasswordError",
                    "Please confirm your password."
                );

                isValid = false;

            }

            else if (password !== confirm) {

                showError(
                    confirmPassword,
                    "confirmPasswordError",
                    "Passwords do not match."
                );

                isValid = false;

            }


            /* TERMS */

            if (!termsCheck.checked) {

                document.getElementById(
                    "termsError"
                ).textContent =
                    "Please accept the Terms & Privacy Policy.";

                isValid = false;

            }


            /* STOP IF INVALID */

            if (!isValid) {
                return;
            }


            /* =====================================
               GET EXISTING ACCOUNTS
            ===================================== */

            const accounts =
                JSON.parse(
                    localStorage.getItem(
                        "jobNestAccounts"
                    )
                ) || [];


            /* =====================================
               CHECK DUPLICATE EMAIL
            ===================================== */

            const existingUser =
                accounts.find(
                    function (account) {

                        return (
                            account.email.toLowerCase() ===
                            email.toLowerCase()
                        );

                    }
                );


            if (existingUser) {

                showError(
                    emailInput,
                    "createEmailError",
                    "An account with this email already exists."
                );

                return;

            }


            /* =====================================
               CREATE NEW USER
            ===================================== */

            const newUser = {

                id: Date.now(),

                name: name,

                email: email,

                accountType: type,

                password: password,

                createdAt:
                    new Date().toLocaleString()

            };


            /* SAVE USER */

            accounts.push(newUser);


            localStorage.setItem(
                "jobNestAccounts",
                JSON.stringify(accounts)
            );


            /* =====================================
               SAVE CURRENT USER
            ===================================== */

            const currentUser = {

                id: newUser.id,

                name: newUser.name,

                email: newUser.email,

                accountType: newUser.accountType,

                loginTime:
                    new Date().toLocaleString()

            };


            localStorage.setItem(
                "jobNestCurrentUser",
                JSON.stringify(currentUser)
            );


            /* =====================================
               LOADING
            ===================================== */

            createButton.disabled = true;

            createButton.classList.add(
                "loading"
            );


            /* SUCCESS MESSAGE */

            showMessage(
                "Account created successfully! Redirecting to JobNest...",
                "success"
            );


            /* REDIRECT */

            setTimeout(
                function () {

                    window.location.href =
                        "index.html";

                },
                1500
            );

        }
    );


    /* =====================================
       CLEAR ERROR WHILE TYPING
    ===================================== */

    nameInput.addEventListener(
        "input",
        function () {

            clearSingleError(
                nameInput,
                "createNameError"
            );

        }
    );


    emailInput.addEventListener(
        "input",
        function () {

            clearSingleError(
                emailInput,
                "createEmailError"
            );

        }
    );


    accountType.addEventListener(
        "change",
        function () {

            clearSingleError(
                accountType,
                "accountTypeError"
            );

        }
    );


    passwordInput.addEventListener(
        "input",
        function () {

            clearSingleError(
                passwordInput,
                "createPasswordError"
            );

        }
    );


    confirmPassword.addEventListener(
        "input",
        function () {

            clearSingleError(
                confirmPassword,
                "confirmPasswordError"
            );

        }
    );


    termsCheck.addEventListener(
        "change",
        function () {

            document.getElementById(
                "termsError"
            ).textContent = "";

        }
    );


    /* =====================================
       FUNCTIONS
    ===================================== */

    function showError(
        input,
        errorId,
        message
    ) {

        input.classList.add("error");

        document.getElementById(
            errorId
        ).textContent = message;

    }


    function clearSingleError(
        input,
        errorId
    ) {

        input.classList.remove("error");

        document.getElementById(
            errorId
        ).textContent = "";

    }


    function clearErrors() {

        clearSingleError(
            nameInput,
            "createNameError"
        );

        clearSingleError(
            emailInput,
            "createEmailError"
        );

        clearSingleError(
            accountType,
            "accountTypeError"
        );

        clearSingleError(
            passwordInput,
            "createPasswordError"
        );

        clearSingleError(
            confirmPassword,
            "confirmPasswordError"
        );

        document.getElementById(
            "termsError"
        ).textContent = "";

    }


    function showMessage(
        text,
        type
    ) {

        messageBox.textContent = text;

        messageBox.className =
            "auth-message " + type;

    }


    function hideMessage() {

        messageBox.className =
            "auth-message";

        messageBox.textContent = "";

    }

});