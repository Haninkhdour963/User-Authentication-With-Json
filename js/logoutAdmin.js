

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const logoutItem = document.getElementById('logoutItem');

    if (isLoggedIn) {
        logoutItem.style.display = 'block';
    }

    document.getElementById('logoutButton').addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('isAdmin');
        window.location.href = 'index.html'; // Redirect to index or login page
    });
});