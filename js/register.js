let users = JSON.parse(sessionStorage.getItem('users')) || [];
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

      // Check for existing username
      if (users.some(user => user.username === username)) {
        alert('Username already exists. Please choose another.');
        return;
    }
 

    // Encrypt user data
    const encryptedUsername = CryptoJS.AES.encrypt(username, 'secret-key').toString();
    const encryptedEmail = CryptoJS.AES.encrypt(email, 'secret-key').toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret-key').toString();


    users.push({ encryptedUsername, encryptedEmail, encryptedPassword });
    sessionStorage.setItem('users', JSON.stringify(users));
    sessionStorage.setItem('users', JSON.stringify(users));
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('isAdmin', 'false');

    alert('Registration successful!');
    window.location.href = 'index.html';


    /*
    // Store encrypted user data in sessionStorage
    sessionStorage.setItem('username', encryptedUsername);
    sessionStorage.setItem('email', encryptedEmail);
    sessionStorage.setItem('password', encryptedPassword);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('isAdmin', 'false');

    alert('Registration successful!');
    window.location.href = 'index.html';   */


});
