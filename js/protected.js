
const isLoggedIn = sessionStorage.getItem('isLoggedIn');
console.log(isLoggedIn)

    if (isLoggedIn === 'true') {
        console.log(isLoggedIn)
        document.getElementById('protectedSection').style.display = 'none';
    }