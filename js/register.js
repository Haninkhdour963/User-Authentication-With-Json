document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
  }

  try {
      const response = await fetch('/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();
      
      if (response.ok) {
          alert(result.message);
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('isAdmin', 'false');
          window.location.href = 'index.html';
      } else {
          alert(result.message);
      }
  } catch (error) {
      alert('Error during registration: ' + error.message);
  }
});
