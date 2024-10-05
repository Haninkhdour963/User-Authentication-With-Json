document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        
        if (response.ok) {
            alert(result.message);
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('isAdmin', result.isAdmin);
            window.location.href = result.isAdmin ? 'admin.html' : 'index.html';
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('Error during login: ' + error.message);
        window.location.href ='register.html';
    }
});
