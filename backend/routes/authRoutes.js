const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config();

const router = express.Router();

// ✅ REGISTER A USER
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, iin } = req.body;

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user into DB
        const newUser = await pool.query(
            "INSERT INTO users (name, email, password, iin) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, hashedPassword, iin]
        );

        res.status(201).json({ message: "User registered successfully!", user: newUser.rows[0] });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ LOGIN A USER
router.post('/login', async (req, res) => {
    try {
        const { iin, password } = req.body;

        // Check if user exists
        const user = await pool.query("SELECT * FROM users WHERE iin = $1", [iin]);
        if (user.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful!", token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
