
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


const app = express();




app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 3600
})); // Enable CORS


app.use(express.json());




const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_table',
    timeout: 10000
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});


// Nodemailer configuration
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'himanshucodeinweb@gmail.com',
//         pass: 'codein@123'
//     }
// });

// Signup
app.post('/signup', (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const query = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
        db.query(query, [name, email, hash, phone], (err, results) => {
            if (err) {
                console.error('Error inserting user into database:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            console.log('User inserted:', results);
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});


// // for email signup
// app.post('/signup', (req, res) => {
//     const { name, email, password, phone } = req.body;

//     if (!name || !email || !password || !phone) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Validate email address
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailRegex.test(email)) {
//         return res.status(400).json({ message: 'Invalid email address' });
//     }

//     // Validate phone number
//     const phoneRegex = /^\d{10}$/;
//     if (!phoneRegex.test(phone)) {
//         return res.status(400).json({ message: 'Invalid phone number' });
//     }

//     // Check if email already exists
//     const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
//     db.query(checkEmailQuery, [email], (err, results) => {
//         if (err) {
//             console.error('Error checking email:', err);
//             return res.status(500).json({ message: 'Database error' });
//         }

//         if (results.length > 0) {
//             return res.status(400).json({ message: 'Email already registered' });
//         }

//         // Hash password and insert new user
//         bcrypt.hash(password, 10, (err, hash) => {
//             if (err) {
//                 console.error('Error hashing password:', err);
//                 return res.status(500).json({ message: 'Internal server error' });
//             }

//             const otp = crypto.randomBytes(6).toString('hex');
//             const query = 'INSERT INTO users (name, email, password, phone,otp) VALUES (?, ?, ?, ? ,?)';
//             db.query(query, [name, email, hash, phone, otp], (err, results) => {
//                 if (err) {
//                     console.error('Error inserting user into database:', err);
//                     return res.status(500).json({ message: 'Database error' });
//                 }


//                 // Send email
//                 const mailOptions = {
//                     from: 'Process.env.EMAIL_USERNAME',
//                     to: email,
//                     subject: 'Email Verification',
//                     text: `Your OTP is ${otp}`
//                 };

//                 transporter.sendMail(mailOptions, (error, info) => {
//                     if (error) {
//                         console.error('Error sending email:', error);
//                         return res.status(500).json({ message: 'Email sending failed' });
//                     }

//                     console.log('Email sent:', info.response);
//                     res.status(201).json({ message: 'User registered successfully, verification email sent', otp });
//                 });
//             });
//         });
//     });
// });


// // Verify OTP
// app.post('/verify-otp', (req, res) => {
//     const { email, enteredOtp } = req.body;

//     const checkOtpQuery = 'SELECT otp FROM users Where email = ?';
//     db.query(checkOtpQuery, [email], (err, results) => {
//         if (err) {
//             console.error('Error checking OTP:', err);
//             return res.status(500).json({ message: 'Database error' });
//         }

//         if (results.length === 0) {
//             console.log('Error: Email not found');
//             return res.status(400).json({ message: 'Email not found' });
//         }

//         const { otp } = results[0];
//         console.log('Stored OTP : ${otp}, Entered OTP : ${enteredOtp}');

//         if (otp === enteredOtp) {
//             const updateQuery = 'UPDATE users SET verified = 1 WHERE email = ?';
//             db.query(updateQuery, [email], (err, updateResults) => {
//                 if (err) {
//                     console.error('Error updating user', err);
//                     return res.status(500).json({ message: 'Database error' });
//                 }

//                 res.status(200).json({ message: 'OTP verified successfully' });
//             });
//         } else {
//             res.status(400).json({ message: 'Invalid OTP' });
//         }
//     });
// });


// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length > 0) {
            const user = results[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                if (isMatch) {
                    res.status(200).json({ message: 'Login successful', user });
                } else {
                    res.status(401).json({ message: 'Invalid password' });
                }
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});


// from here user



app.get('/user/:id', (req, res) => {
    const userId = req.params.id;

    console.log("Received request for user ID:", userId);

    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});

// Update User Data
app.patch('/user/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email, password, phone } = req.body;

    const query = 'UPDATE users SET name = ?, email = ?, password = ?, phone = ? WHERE id = ?';
    db.query(query, [name, email, password, phone, userId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});



