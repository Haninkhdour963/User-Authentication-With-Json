

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const logoutItem = document.getElementById('logoutItem');
    const registerButton = document.getElementById('registerButton');

    // Update button visibility based on login status
    if (isLoggedIn) {
        logoutItem.style.display = 'block';
        registerButton.style.display = 'none';
    } else {
        logoutItem.style.display = 'none';
        registerButton.style.display = 'block';
    }

    // Event listener for logout button
    document.getElementById('logoutButton').addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('isAdmin');
        window.location.href = 'index.html'; // Redirect to index or login page
    });
});

