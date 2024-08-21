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

    const courseDuration = document.getElementById('course-duration').value;
    const rewardPoints = document.getElementById('reward-points').value;
    const courseRelevance = document.getElementById('course-relevance').value;
    const academicYear = document.getElementById('academic-year').value;
    const semester = document.getElementById('semester').value;
    const courseTitle = document.getElementById('course-title').value;

    if (courseDuration == 12 && rewardPoints == 'no' && courseRelevance == 'no') {
        alert("Application submitted successfully");
        document.getElementById('application-status').innerText = "Initiated";
        document.getElementById('apply-page').classList.add('hidden');
        document.getElementById('user-dashboard').classList.remove('hidden');
    } else {
        alert('Application does not meet the eligibility criteria.');
    }
});

function loadAdminDashboard() {
    const applications = [
        {
            id: 1,
            email: 'user@example.com',
            courseDuration: 12,
            rewardPoints: 'no',
            courseRelevance: 'no',
            academicYear: '2023-2024',
            semester: 'Semester 1',
            courseTitle: 'Data Structures',
            status: 'Initiated'
        }
    ];

    const adminApplications = document.getElementById('admin-applications');
    applications.forEach(application => {
        const applicationElement = document.createElement('div');
        applicationElement.classList.add('application');

        applicationElement.innerHTML = `
            <h3>${application.courseTitle} - ${application.email}</h3>
            <p>Duration: ${application.courseDuration} weeks</p>
            <p>Reward Points Claimed: ${application.rewardPoints}</p>
            <p>Relevant to Current Course: ${application.courseRelevance}</p>
            <p>Academic Year: ${application.academicYear}</p>
            <p>Semester: ${application.semester}</p>
            <p>Status: ${application.status}</p>
            <button onclick="approveApplication(${application.id})">Approve</button>
            <button onclick="rejectApplication(${application.id})">Reject</button>
        `;

        adminApplications.appendChild(applicationElement);
    });
}

function approveApplication(applicationId) {
    alert(`Application ${applicationId} approved`);
    document.getElementById('application-status').innerText = "Approved";
    document.getElementById('admin-feedback').innerText = "Your application has been approved.";
}

function rejectApplication(applicationId) {
    alert(`Application ${applicationId} rejected`);
    document.getElementById('application-status').innerText = "Rejected";
    document.getElementById('admin-feedback').innerText = "Your application has been rejected.";
}
