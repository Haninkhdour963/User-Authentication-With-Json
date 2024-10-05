// admin.js
document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

    if (!isLoggedIn || !isAdmin) {
        alert('Access denied. You are not an admin.');
        window.location.href = 'login.html'; // Redirect to login
    } else {
        // Load admin features
        document.getElementById('adminContent').style.display = 'block'; // Show admin content
    }
});
