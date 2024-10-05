const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const CryptoJS = require('crypto-js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

const usersFilePath = 'users.json';

const readUsersFromFile = () => {
    if (fs.existsSync(usersFilePath)) {
        const data = fs.readFileSync(usersFilePath);
        return JSON.parse(data);
    }
    return { users: [], admins: [] }; // Default structure
};

const writeUsersToFile = (data) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
};

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const encryptedUsername = CryptoJS.AES.encrypt(username, 'secret-key').toString();
    const encryptedEmail = CryptoJS.AES.encrypt(email, 'secret-key').toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret-key').toString();

    const usersData = readUsersFromFile();

    if (usersData.users.some(user => CryptoJS.AES.decrypt(user.encryptedUsername, 'secret-key').toString(CryptoJS.enc.Utf8) === username)) {
        return res.status(400).json({ message: 'Username already exists. Please choose another.' });
    }

    if (usersData.users.some(user => CryptoJS.AES.decrypt(user.encryptedEmail, 'secret-key').toString(CryptoJS.enc.Utf8) === email)) {
        return res.status(400).json({ message: 'Email already exists. Please choose another.' });
    }

    usersData.users.push({ encryptedUsername, encryptedEmail, encryptedPassword });
    writeUsersToFile(usersData);

    res.json({ message: 'Registration successful!' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const usersData = readUsersFromFile();

    const user = usersData.users.find(user => {
        const decryptedUsername = CryptoJS.AES.decrypt(user.encryptedUsername, 'secret-key').toString(CryptoJS.enc.Utf8);
        const decryptedPassword = CryptoJS.AES.decrypt(user.encryptedPassword, 'secret-key').toString(CryptoJS.enc.Utf8);
        return decryptedUsername === username && decryptedPassword === password;
    });

    if (user) {
        res.json({ message: 'Login successful!', isAdmin: username === 'admin' });
    } else {
        res.status(400).json({ message: 'Invalid credentials.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





//this is my methods work with server to post data from session to users.json

//http://localhost:3000/register

//http://localhost:3000/login