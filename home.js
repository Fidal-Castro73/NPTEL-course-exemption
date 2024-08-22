document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "admin@example.com" && password === "admin") {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('admin-interface').classList.remove('hidden');
        loadAdminDashboard();
    } else if (email === "user@example.com" && password === "user") {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('user-interface').classList.remove('hidden');
        document.getElementById('user-dashboard').classList.remove('hidden');
    } else {
        alert("Invalid credentials");
    }
});

document.getElementById('show-password').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
});

document.getElementById('dashboard-btn').addEventListener('click', function() {
    document.getElementById('user-dashboard').classList.remove('hidden');
    document.getElementById('apply-page').classList.add('hidden');
});

document.getElementById('apply-btn').addEventListener('click', function() {
    document.getElementById('user-dashboard').classList.add('hidden');
    document.getElementById('apply-page').classList.remove('hidden');
});

document.getElementById('exemption-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form values
    const courseDuration = document.getElementById('course-duration').value;
    const rewardPoints = document.getElementById('reward-points').value;
    const courseRelevance = document.getElementById('course-relevance').value;
    const academicYear = document.getElementById('academic-year').value;
    const semester = document.getElementById('semester').value;
    const nptelCourseTitle = document.getElementById('nptel-course-title').value;
    const titleCourseToExempt = document.getElementById('title-course-to-exempt').value;
    const certificate = document.getElementById('certificate').files[0];

    // Eligibility Criteria Verification
    if (nptelCourseTitle && courseDuration != 12) {
        alert("The NPTEL course must be a 12-week course.");
        return;
    }

    if (rewardPoints === "yes") {
        alert("The student must not have claimed reward points for the course.");
        return;
    }

    if (courseRelevance === "yes") {
        alert("The registered course for exemption should not be relevant to their current academic course.");
        return;
    }

    if (!certificate) {
        alert("A certificate must be uploaded.");
        return;
    }

    // Example of displaying the submitted application details in the user dashboard
    document.getElementById('submitted-form').innerHTML = `
        <h3>Application Details</h3>
        <p>Course Duration: ${courseDuration} weeks</p>
        <p>Claimed Reward Points: ${rewardPoints}</p>
        <p>Relevant to Current Course: ${courseRelevance}</p>
        <p>Academic Year: ${academicYear}</p>
        <p>Semester: ${semester}</p>
        <p>NPTEL Course Title: ${nptelCourseTitle}</p>
        <p>Title of the Course to Exempt: ${titleCourseToExempt}</p>
        <p>Certificate: ${certificate ? certificate.name : 'No file selected'}</p>
    `;
    document.getElementById('application-status').innerText = "Pending";
    document.getElementById('admin-feedback').innerText = "None";
    alert("Application submitted successfully!");

    document.getElementById('user-dashboard').classList.remove('hidden');
    document.getElementById('apply-page').classList.add('hidden');
});

function loadAdminDashboard() {
    const applications = [
        {
            id: 1,
            user: "User 1",
            courseDuration: 12,
            rewardPoints: "no",
            courseRelevance: "no",
            academicYear: "2023-2024",
            semester: "4",
            nptelCourseTitle: "Introduction to Programming",
            titleCourseToExempt: "Programming Basics",
            status: "Pending",
            feedback: ""
        },
        {
            id: 2,
            user: "User 2",
            courseDuration: 12,
            rewardPoints: "No",
            courseRelevance: "no",
            academicYear: "2023-2024",
            semester: "6",
            nptelCourseTitle: "Data Science Basics",
            titleCourseToExempt: "Data Science Fundamentals",
            status: "Pending",
            feedback: ""
        }
    ];

    const adminApplicationsDiv = document.getElementById('admin-applications');
    adminApplicationsDiv.innerHTML = '';

    applications.forEach(application => {
        const appDiv = document.createElement('div');
        appDiv.classList.add('application');
        appDiv.innerHTML = `
            <h3>${application.user}</h3>
            <p>Course Duration: ${application.courseDuration} weeks</p>
            <p>Claimed Reward Points: ${application.rewardPoints}</p>
            <p>Relevant to Current Course: ${application.courseRelevance}</p>
            <p>Academic Year: ${application.academicYear}</p>
            <p>Semester: ${application.semester}</p>
            <p>NPTEL Course Title: ${application.nptelCourseTitle}</p>
            <p>Title of the Course to Exempt: ${application.titleCourseToExempt}</p>
            <p>Status: <span>${application.status}</span></p>
            <p>Feedback: <span>${application.feedback}</span></p>
            <button class="btn btn-success" onclick="approveApplication(${application.id})">Approve</button>
            <button class="btn btn-danger" onclick="rejectApplication(${application.id})">Reject</button>
        `;
        adminApplicationsDiv.appendChild(appDiv);
    });
}

function approveApplication(id) {
    alert("Application " + id + " approved.");
    // Logic to update application status and feedback
}

function rejectApplication(id) {
    alert("Application " + id + " rejected.");
    // Logic to update application status and feedback
}
