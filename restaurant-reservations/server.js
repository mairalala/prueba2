const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto a tu usuario de MySQL
    password: '', // Cambia esto a tu contraseña de MySQL
    database: 'restaurant_reservations'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received data:', req.body);

    if (!username || !email || !password) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting user into database:', err);
            return res.status(500).send({ message: 'Error registering user' });
        }
        res.status(200).send({ message: 'User registered successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
