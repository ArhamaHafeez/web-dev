/* =================================
   JOBNEST AUTHENTICATION SYSTEM
================================= */


/* ================================
   CREATE ACCOUNT
================================ */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const firstName =
            document.getElementById("firstName").value.trim();

        const lastName =
            document.getElementById("lastName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const accountType =
            document.getElementById("accountType").value;

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const alertBox =
            document.getElementById("registerAlert");


        if (password !== confirmPassword) {

            alertBox.className = "alert error";

            alertBox.innerHTML =
                "Passwords do not match.";

            return;

        }


        if (password.length < 6) {

            alertBox.className = "alert error";

            alertBox.innerHTML =
                "Password must be at least 6 characters.";

            return;

        }


        const user = {

            firstName: firstName,

            lastName: lastName,

            email: email,

            accountType: accountType,

            password: password

        };


        localStorage.setItem(
            "jobnestUser",
            JSON.stringify(user)
        );


        alertBox.className = "alert success";

        alertBox.innerHTML =
            "Account created successfully! Redirecting to Sign In...";


        setTimeout(function () {

            window.location.href =
                "login.html";

        }, 1500);

    });

}



/* ================================
   SIGN IN
================================ */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const alertBox =
            document.getElementById("loginAlert");


        const savedUser =
            JSON.parse(
                localStorage.getItem("jobnestUser")
            );


        if (!savedUser) {

            alertBox.className =
                "alert error";

            alertBox.innerHTML =
                "No account found. Please create an account first.";

            return;

        }


        if (
            savedUser.email === email &&
            savedUser.password === password
        ) {

            localStorage.setItem(
                "jobnestLoggedIn",
                "true"
            );


            alertBox.className =
                "alert success";

            alertBox.innerHTML =
                "Login successful! Redirecting...";


            setTimeout(function () {

                window.location.href =
                    "index.html";

            }, 1200);


        } else {

            alertBox.className =
                "alert error";

            alertBox.innerHTML =
                "Invalid email or password.";

        }

    });

}



/* ================================
   FORGOT PASSWORD
================================ */

const forgotForm =
    document.getElementById("forgotForm");


if (forgotForm) {

    forgotForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("forgotEmail").value.trim();

        const alertBox =
            document.getElementById("forgotAlert");


        const savedUser =
            JSON.parse(
                localStorage.getItem("jobnestUser")
            );


        if (!savedUser) {

            alertBox.className =
                "alert error";

            alertBox.innerHTML =
                "No account found with this email.";

            return;

        }


        if (savedUser.email !== email) {

            alertBox.className =
                "alert error";

            alertBox.innerHTML =
                "Email address not found.";

            return;

        }


        localStorage.setItem(
            "resetEmail",
            email
        );


        alertBox.className =
            "alert success";

        alertBox.innerHTML =
            "Email verified! Redirecting to password reset...";


        setTimeout(function () {

            window.location.href =
                "reset-password.html";

        }, 1200);

    });

}



/* ================================
   RESET PASSWORD
================================ */

const resetForm =
    document.getElementById("resetForm");


if (resetForm) {

    resetForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("newConfirmPassword").value;

        const alertBox =
            document.getElementById("resetAlert");


        if (newPassword !== confirmPassword) {

            alertBox.className =
                "alert error";

            alertBox.innerHTML =
                "Passwords do not match.";

            return;

        }


        if (newPassword.length < 6) {

            alertBox.className =
                "alert error";

            alertBox.innerHTML =
                "Password must be at least 6 characters.";

            return;

        }


        const savedUser =
            JSON.parse(
                localStorage.getItem("jobnestUser")
            );


        if (!savedUser) {

            alertBox.className =
                "alert error";

            alertBox.innerHTML =
                "User account not found.";

            return;

        }


        savedUser.password =
            newPassword;


        localStorage.setItem(
            "jobnestUser",
            JSON.stringify(savedUser)
        );


        alertBox.className =
            "alert success";

        alertBox.innerHTML =
            "Password reset successfully! Redirecting to Sign In...";


        setTimeout(function () {

            window.location.href =
                "login.html";

        }, 1500);

    });

}