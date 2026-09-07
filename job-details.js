/* =========================================
   JOBNEST - JOB DETAILS JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       JOB DATA
    ===================================== */

    const jobs = {

        1: {
            title: "Senior Frontend Developer",
            company: "TechVision Solutions",
            location: "San Francisco, USA",
            type: "Full Time",
            salary: "$80k - $120k",
            category: "Technology",
            experience: "Senior Level",
            posted: "2 days ago",
            logo: "TV",

            description:
                "We are looking for an experienced Frontend Developer to build modern, responsive and high-performing web applications for our growing technology team.",

            responsibilities: [
                "Build responsive and user-friendly web applications.",
                "Collaborate with designers, product managers and developers.",
                "Write clean, maintainable and scalable code.",
                "Improve website performance and accessibility."
            ],

            requirements: [
                "3+ years of professional frontend development experience.",
                "Strong knowledge of HTML, CSS and JavaScript.",
                "Experience with React or similar frameworks.",
                "Excellent communication and problem-solving skills."
            ],

            skills: [
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "Git"
            ],

            companyDescription:
                "TechVision Solutions is an innovative technology company focused on building modern digital products and scalable software solutions."
        },


        2: {
            title: "UI/UX Designer",
            company: "Creative Studio",
            location: "New York, USA",
            type: "Full Time",
            salary: "$70k - $100k",
            category: "Design",
            experience: "Mid Level",
            posted: "1 day ago",
            logo: "CS",

            description:
                "We are searching for a creative UI/UX Designer who can create beautiful and intuitive digital experiences.",

            responsibilities: [
                "Design modern and user-friendly interfaces.",
                "Create wireframes and interactive prototypes.",
                "Collaborate with developers and product managers.",
                "Conduct user research and usability testing."
            ],

            requirements: [
                "2+ years of UI/UX design experience.",
                "Strong knowledge of Figma.",
                "Understanding of user-centered design.",
                "Strong portfolio of design projects."
            ],

            skills: [
                "Figma",
                "UI Design",
                "UX Research",
                "Prototyping",
                "Wireframing"
            ],

            companyDescription:
                "Creative Studio is a design-focused company helping businesses create exceptional digital experiences."
        },


        3: {
            title: "Backend Developer",
            company: "CodeSphere",
            location: "Remote",
            type: "Remote",
            salary: "$75k - $115k",
            category: "Technology",
            experience: "Mid Level",
            posted: "3 days ago",
            logo: "CS",

            description:
                "Join our engineering team and help us build secure, scalable and reliable backend systems.",

            responsibilities: [
                "Develop scalable backend services.",
                "Design APIs and databases.",
                "Improve application performance.",
                "Collaborate with frontend developers."
            ],

            requirements: [
                "Strong knowledge of Node.js or Python.",
                "Experience with databases.",
                "Understanding of REST APIs.",
                "Knowledge of cloud platforms."
            ],

            skills: [
                "Node.js",
                "Python",
                "MongoDB",
                "APIs",
                "AWS"
            ],

            companyDescription:
                "CodeSphere develops scalable software solutions for modern businesses around the world."
        },


        4: {
            title: "Digital Marketing Manager",
            company: "GrowthHub",
            location: "London, UK",
            type: "Full Time",
            salary: "$65k - $90k",
            category: "Marketing",
            experience: "Senior Level",
            posted: "4 days ago",
            logo: "GH",

            description:
                "We are looking for a strategic Digital Marketing Manager to lead campaigns and grow our digital presence.",

            responsibilities: [
                "Develop marketing strategies.",
                "Manage social media campaigns.",
                "Analyze campaign performance.",
                "Lead marketing initiatives."
            ],

            requirements: [
                "3+ years of marketing experience.",
                "Experience with SEO and social media.",
                "Strong analytical skills.",
                "Excellent communication skills."
            ],

            skills: [
                "SEO",
                "Google Ads",
                "Analytics",
                "Social Media",
                "Content Strategy"
            ],

            companyDescription:
                "GrowthHub helps companies grow their digital presence through modern marketing strategies."
        }

    };


    /* =====================================
       GET JOB ID FROM URL
    ===================================== */

    const urlParams = new URLSearchParams(
        window.location.search
    );

    const jobId =
        urlParams.get("id") || "1";


    const job =
        jobs[jobId] || jobs[1];


    /* =====================================
       DISPLAY JOB
    ===================================== */

    document.title =
        job.title + " | JobNest";


    document.getElementById(
        "companyLogo"
    ).textContent =
        job.logo;


    document.getElementById(
        "jobTitle"
    ).textContent =
        job.title;


    document.getElementById(
        "companyName"
    ).textContent =
        job.company;


    document.getElementById(
        "jobLocation"
    ).textContent =
        "📍 " + job.location;


    document.getElementById(
        "jobType"
    ).textContent =
        "💼 " + job.type;


    document.getElementById(
        "jobSalary"
    ).textContent =
        "💰 " + job.salary;


    document.getElementById(
        "jobCategory"
    ).textContent =
        job.category;


    document.getElementById(
        "jobExperience"
    ).textContent =
        job.experience;


    document.getElementById(
        "jobDescription"
    ).textContent =
        job.description;


    document.getElementById(
        "companyDescription"
    ).textContent =
        job.companyDescription;


    document.getElementById(
        "overviewType"
    ).textContent =
        job.type;


    document.getElementById(
        "overviewLocation"
    ).textContent =
        job.location;


    document.getElementById(
        "overviewExperience"
    ).textContent =
        job.experience;


    document.getElementById(
        "overviewSalary"
    ).textContent =
        job.salary;


    document.getElementById(
        "overviewPosted"
    ).textContent =
        job.posted;


    document.getElementById(
        "applyJobTitle"
    ).textContent =
        job.title + " at " + job.company;


    /* =====================================
       RESPONSIBILITIES
    ===================================== */

    const responsibilitiesList =
        document.getElementById(
            "responsibilitiesList"
        );


    responsibilitiesList.innerHTML = "";


    job.responsibilities.forEach(
        function (item) {

            const li =
                document.createElement("li");

            li.textContent =
                item;

            responsibilitiesList.appendChild(
                li
            );

        }
    );


    /* =====================================
       REQUIREMENTS
    ===================================== */

    const requirementsList =
        document.getElementById(
            "requirementsList"
        );


    requirementsList.innerHTML = "";


    job.requirements.forEach(
        function (item) {

            const li =
                document.createElement("li");

            li.textContent =
                item;

            requirementsList.appendChild(
                li
            );

        }
    );


    /* =====================================
       SKILLS
    ===================================== */

    const skillsList =
        document.getElementById(
            "skillsList"
        );


    skillsList.innerHTML = "";


    job.skills.forEach(
        function (skill) {

            const span =
                document.createElement("span");

            span.textContent =
                skill;

            skillsList.appendChild(
                span
            );

        }
    );


    /* =====================================
       SAVE JOB
    ===================================== */

    const saveJobButton =
        document.getElementById(
            "saveJobButton"
        );


    let savedJobs =
        JSON.parse(
            localStorage.getItem(
                "jobNestSavedJobs"
            )
        ) || [];


    function updateSaveButton() {

        if (
            savedJobs.includes(
                String(jobId)
            )
        ) {

            saveJobButton.classList.add(
                "saved"
            );

            saveJobButton.textContent =
                "♥";

        } else {

            saveJobButton.classList.remove(
                "saved"
            );

            saveJobButton.textContent =
                "♡";

        }

    }


    updateSaveButton();


    saveJobButton.addEventListener(
        "click",
        function () {

            const id =
                String(jobId);


            if (
                savedJobs.includes(id)
            ) {

                savedJobs =
                    savedJobs.filter(
                        function (savedId) {

                            return savedId !== id;

                        }
                    );

            }

            else {

                savedJobs.push(id);

            }


            localStorage.setItem(
                "jobNestSavedJobs",
                JSON.stringify(savedJobs)
            );


            updateSaveButton();

        }
    );


    /* =====================================
       APPLY MODAL
    ===================================== */

    const applyModal =
        document.getElementById(
            "applyModal"
        );

    const applyNowButton =
        document.getElementById(
            "applyNowButton"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );


    applyNowButton.addEventListener(
        "click",
        function () {

            applyModal.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";


            /* PREFILL LOGGED IN USER */

            const currentUser =
                JSON.parse(
                    localStorage.getItem(
                        "jobNestCurrentUser"
                    )
                );


            if (currentUser) {

                document.getElementById(
                    "applicantName"
                ).value =
                    currentUser.name || "";


                document.getElementById(
                    "applicantEmail"
                ).value =
                    currentUser.email || "";

            }

        }
    );


    function closeModal() {

        applyModal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    applyModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === applyModal
            ) {

                closeModal();

            }

        }
    );


    /* =====================================
       SHARE JOB
    ===================================== */

    document.getElementById(
        "shareJobButton"
    ).addEventListener(
        "click",
        async function () {

            const shareData = {

                title:
                    job.title + " | JobNest",

                text:
                    "Check out this job: " +
                    job.title +
                    " at " +
                    job.company,

                url:
                    window.location.href

            };


            try {

                if (
                    navigator.share
                ) {

                    await navigator.share(
                        shareData
                    );

                }

                else {

                    await navigator.clipboard.writeText(
                        window.location.href
                    );

                    alert(
                        "Job link copied to clipboard!"
                    );

                }

            }

            catch (error) {

                console.log(
                    "Share cancelled"
                );

            }

        }
    );


    /* =====================================
       APPLICATION FORM
    ===================================== */

    const applicationForm =
        document.getElementById(
            "applicationForm"
        );


    applicationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "applicantName"
                );

            const email =
                document.getElementById(
                    "applicantEmail"
                );

            const phone =
                document.getElementById(
                    "applicantPhone"
                );

            const coverLetter =
                document.getElementById(
                    "coverLetter"
                );


            let valid =
                true;


            clearApplicationErrors();


            /* NAME */

            if (
                name.value.trim().length < 2
            ) {

                showApplicationError(
                    name,
                    "applicantNameError",
                    "Please enter your full name."
                );

                valid = false;

            }


            /* EMAIL */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email.value.trim()
                )
            ) {

                showApplicationError(
                    email,
                    "applicantEmailError",
                    "Please enter a valid email address."
                );

                valid = false;

            }


            /* PHONE */

            if (
                phone.value.trim().length < 7
            ) {

                showApplicationError(
                    phone,
                    "applicantPhoneError",
                    "Please enter a valid phone number."
                );

                valid = false;

            }


            /* COVER LETTER */

            if (
                coverLetter.value.trim().length < 20
            ) {

                showApplicationError(
                    coverLetter,
                    "coverLetterError",
                    "Cover letter must be at least 20 characters."
                );

                valid = false;

            }


            if (!valid) {
                return;
            }


            /* =====================================
               SAVE APPLICATION
            ===================================== */

            const applications =
                JSON.parse(
                    localStorage.getItem(
                        "jobNestApplications"
                    )
                ) || [];


            const application = {

                id:
                    Date.now(),

                jobId:
                    jobId,

                jobTitle:
                    job.title,

                company:
                    job.company,

                name:
                    name.value.trim(),

                email:
                    email.value.trim(),

                phone:
                    phone.value.trim(),

                coverLetter:
                    coverLetter.value.trim(),

                appliedAt:
                    new Date().toLocaleString()

            };


            applications.push(
                application
            );


            localStorage.setItem(
                "jobNestApplications",
                JSON.stringify(applications)
            );


            /* =====================================
               LOADING
            ===================================== */

            const submitButton =
                document.getElementById(
                    "applicationSubmit"
                );


            submitButton.disabled =
                true;


            submitButton.classList.add(
                "loading"
            );


            /* SUCCESS */

            const message =
                document.getElementById(
                    "applicationMessage"
                );


            message.textContent =
                "Application submitted successfully! Good luck with your career journey.";

            message.className =
                "application-message success";


            /* RESET */

            setTimeout(
                function () {

                    applicationForm.reset();

                    submitButton.disabled =
                        false;

                    submitButton.classList.remove(
                        "loading"
                    );

                    closeModal();

                    message.className =
                        "application-message";

                },
                1800
            );

        }
    );


    /* =====================================
       ERROR FUNCTIONS
    ===================================== */

    function showApplicationError(
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


    function clearApplicationErrors() {

        const fields = [

            [
                "applicantName",
                "applicantNameError"
            ],

            [
                "applicantEmail",
                "applicantEmailError"
            ],

            [
                "applicantPhone",
                "applicantPhoneError"
            ],

            [
                "coverLetter",
                "coverLetterError"
            ]

        ];


        fields.forEach(
            function (field) {

                document.getElementById(
                    field[0]
                ).classList.remove(
                    "error"
                );


                document.getElementById(
                    field[1]
                ).textContent =
                    "";

            }
        );

    }


    /* =====================================
       SIMILAR JOBS
    ===================================== */

    const similarJobsContainer =
        document.getElementById(
            "similarJobs"
        );


    const similarJobs =
        Object.entries(jobs)
            .filter(
                function ([id, item]) {

                    return (
                        id !== String(jobId) &&
                        (
                            item.category ===
                            job.category
                        )
                    );

                }
            )
            .slice(0, 3);


    /* IF NOT ENOUGH SAME CATEGORY */

    if (
        similarJobs.length < 3
    ) {

        Object.entries(jobs).forEach(
            function ([id, item]) {

                const alreadyExists =
                    similarJobs.some(
                        function (
                            [similarId]
                        ) {

                            return (
                                similarId === id
                            );

                        }
                    );


                if (
                    id !== String(jobId) &&
                    !alreadyExists &&
                    similarJobs.length < 3
                ) {

                    similarJobs.push(
                        [id, item]
                    );

                }

            }
        );

    }


    similarJobs.forEach(
        function ([id, item]) {

            const card =
                document.createElement("div");


            card.className =
                "similar-job-card";


            card.innerHTML = `

                <p class="similar-company">
                    ${item.company}
                </p>

                <h3>
                    ${item.title}
                </h3>

                <p>
                    📍 ${item.location}
                    <br>
                    💼 ${item.type}
                </p>

                <a
                    href="job-details.html?id=${id}"
                    class="similar-job-link"
                >
                    View Details →
                </a>

            `;


            similarJobsContainer.appendChild(
                card
            );

        }
    );


});