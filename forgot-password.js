/* =========================================
   JOBNEST - FORGOT PASSWORD JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       ELEMENTS
    ===================================== */

    const emailStep =
        document.getElementById("emailStep");

    const resetStep =
        document.getElementById("resetStep");

    const forgotEmailForm =
        document.getElementById("forgotEmailForm");

    const resetPasswordForm =
        document.getElementById("resetPasswordForm");

    const forgotEmail =
        document.getElementById("forgotEmail");

    const newPassword =
        document.getElementById("newPassword");

    const confirmPassword =
        document.getElementById(
            "resetConfirmPassword"
        );

    const resetButton =
        document.getElementById(
            "resetPasswordButton"
        );

    const emailMessage =
        document.getElementById(
            "forgotEmailMessage"
        );

    const resetMessage =
        document.getElementById(
            "resetPasswordMessage"
        );

    const strengthProgress =
        document.getElementById(
            "resetStrengthProgress"
        );

    const strengthText =
        document.getElementById(
            "resetStrengthText"
        );


    /* =====================================
       VERIFIED EMAIL
    ===================================== */

    let verifiedEmail = "";


    /* =====================================
       STEP 1 - CHECK EMAIL
    ===================================== */

    forgotEmailForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                forgotEmail.value.trim();


            const emailError =
                document.getElementById(
                    "forgotEmailError"
                );


            emailError.textContent = "";

            forgotEmail.classList.remove(
                "error"
            );


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            /* EMAIL EMPTY */

            if (email === "") {

                showInputError(
                    forgotEmail,
                    "forgotEmailError",
                    "Please enter your email address."
                );

                return;

            }


            /* EMAIL FORMAT */

            if (!emailPattern.test(email)) {

                showInputError(
                    forgotEmail,
                    "forgotEmailError",
                    "Please enter a valid email address."
                );

                return;

            }


            /* =====================================
               CHECK ACCOUNT
            ===================================== */

            const accounts =
                JSON.parse(
                    localStorage.getItem(
                        "jobNestAccounts"
                    )
                ) || [];


            const user =
                accounts.find(
                    function (account) {

                        return (
                            account.email.toLowerCase() ===
                            email.toLowerCase()
                        );

                    }
                );


            /* ACCOUNT NOT FOUND */

            if (!user) {

                showMessage(
                    emailMessage,
                    "No JobNest account was found with this email address.",
                    "error"
                );

                return;

            }


            /* ACCOUNT FOUND */

            verifiedEmail =
                user.email;


            showMessage(
                emailMessage,
                "Account verified successfully! You can now create a new password.",
                "success"
            );


            /* CHANGE STEP */

            setTimeout(
                function () {

                    emailStep.style.display =
                        "none";


                    resetStep.style.display =
                        "block";


                    newPassword.focus();

                },
                700
            );

        }
    );


    /* =====================================
       SHOW / HIDE PASSWORD
    ===================================== */

    const newPasswordToggle =
        document.getElementById(
            "newPasswordToggle"
        );

    const confirmPasswordToggle =
        document.getElementById(
            "resetConfirmPasswordToggle"
        );


    newPasswordToggle.addEventListener(
        "click",
        function () {

            togglePassword(
                newPassword,
                newPasswordToggle
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


    function togglePassword(
        input,
        button
    ) {

        if (input.type === "password") {

            input.type = "text";

            button.textContent =
                "🙈";

        }

        else {

            input.type = "password";

            button.textContent =
                "👁";

        }

    }


    /* =====================================
       PASSWORD STRENGTH
    ===================================== */

    newPassword.addEventListener(
        "input",
        function () {

            checkPasswordStrength(
                newPassword.value
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
       STEP 2 - RESET PASSWORD
    ===================================== */

    resetPasswordForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const password =
                newPassword.value;

            const confirm =
                confirmPassword.value;


            let isValid = true;


            /* CLEAR ERRORS */

            clearInputError(
                newPassword,
                "newPasswordError"
            );

            clearInputError(
                confirmPassword,
                "resetConfirmPasswordError"
            );


            /* PASSWORD */

            if (password.length < 6) {

                showInputError(
                    newPassword,
                    "newPasswordError",
                    "Password must be at least 6 characters."
                );

                isValid = false;

            }


            /* CONFIRM PASSWORD */

            if (confirm === "") {

                showInputError(
                    confirmPassword,
                    "resetConfirmPasswordError",
                    "Please confirm your password."
                );

                isValid = false;

            }

            else if (password !== confirm) {

                showInputError(
                    confirmPassword,
                    "resetConfirmPasswordError",
                    "Passwords do not match."
                );

                isValid = false;

            }


            if (!isValid) {
                return;
            }


            /* =====================================
               GET ACCOUNTS
            ===================================== */

            const accounts =
                JSON.parse(
                    localStorage.getItem(
                        "jobNestAccounts"
                    )
                ) || [];


            /* =====================================
               UPDATE PASSWORD
            ===================================== */

            const updatedAccounts =
                accounts.map(
                    function (account) {

                        if (
                            account.email.toLowerCase() ===
                            verifiedEmail.toLowerCase()
                        ) {

                            account.password =
                                password;

                        }

                        return account;

                    }
                );


            /* SAVE UPDATED ACCOUNTS */

            localStorage.setItem(
                "jobNestAccounts",
                JSON.stringify(updatedAccounts)
            );


            /* =====================================
               BUTTON LOADING
            ===================================== */

            resetButton.disabled =
                true;


            resetButton.classList.add(
                "loading"
            );


            /* SUCCESS MESSAGE */

            showMessage(
                resetMessage,
                "Password reset successfully! Redirecting to Sign In...",
                "success"
            );


            /* =====================================
               REDIRECT TO SIGN IN
            ===================================== */

            setTimeout(
                function () {

                    window.location.href =
                        "signin.html";

                },
                1500
            );

        }
    );


    /* =====================================
       CLEAR ERRORS ON INPUT
    ===================================== */

    forgotEmail.addEventListener(
        "input",
        function () {

            clearInputError(
                forgotEmail,
                "forgotEmailError"
            );

        }
    );


    newPassword.addEventListener(
        "input",
        function () {

            clearInputError(
                newPassword,
                "newPasswordError"
            );

        }
    );


    confirmPassword.addEventListener(
        "input",
        function () {

            clearInputError(
                confirmPassword,
                "resetConfirmPasswordError"
            );

        }
    );


    /* =====================================
       HELPER FUNCTIONS
    ===================================== */

    function showInputError(
        input,
        errorId,
        message
    ) {

        input.classList.add(
            "error"
        );


        document.getElementById(
            errorId
        ).textContent =
            message;

    }


    function clearInputError(
        input,
        errorId
    ) {

        input.classList.remove(
            "error"
        );


        document.getElementById(
            errorId
        ).textContent = "";

    }


    function showMessage(
        element,
        message,
        type
    ) {

        element.textContent =
            message;


        element.className =
            "auth-message " + type;

    }


});