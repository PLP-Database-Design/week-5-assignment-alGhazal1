const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mysql = require('mysql2');

//configure env variables
dotenv.config();

// create connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
   
db.connect((err) => {
    if(err) {
        return console.log("Error connecting to database", err)
    }
    else
        return console.log("SUCCESFULLY CONNECTED TO DATABASE:", db.threadId)
});





   // Question 1 goes here
   //retrieve all patients
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving patients:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});


   // Question 2 goes here
   //retrieve all providers
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving provider details:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});


   // Question 3 goes here
   //retrieve patients by first name
   app.get('/first_names', (req, res) => {
    const query = 'SELECT first_name FROM patients';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving first names:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});


   // Question 4 goes here
   //retrieve provider specialty
   app.get('/provider_specialty', (req, res) => {
    const query = 'SELECT provider_specialty FROM providers';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving specialties:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

   

   // listen to the server
   const PORT = 3000
   app.listen(PORT, () => {
     console.log(`server is running on http://localhost:${PORT}`)
   }) 