const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost', // Replace with your MySQL host
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'auto', // Replace with your MySQL database name
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/autocomplete', (req, res) => {
    const userInput = req.query.input.toLowerCase();

    // Query the MySQL database for suggestions
    db.query(
        'SELECT word FROM dictionary WHERE word LIKE ?',
        [`${userInput}%`],
        (err, results) => {
            if (err) {
                console.error('Error querying MySQL:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            const suggestionWords = results.map(row => row.word);
            res.json(suggestionWords);
        }
    );
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
