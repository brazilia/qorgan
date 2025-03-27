const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");

const router = express.Router();

// 📌 Admin Registration
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email is already registered
        const existingAdmin = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
        if (existingAdmin.rows.length > 0) {
            return res.status(400).json({ error: "Email already registered." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert into database (default: not approved)
        const newAdmin = await pool.query(
            "INSERT INTO admins (name, email, password, approved) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, hashedPassword, false]
        );

        res.status(201).json({ message: "Admin registered. Waiting for approval." });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error." });
    }
});

// 📌 Admin Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin exists
        const admin = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
        if (admin.rows.length === 0) {
            return res.status(400).json({ error: "Invalid credentials." });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, admin.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid credentials." });
        }

        // ✅ Check if admin is approved
        if (!admin.rows[0].approved) {
            return res.status(403).json({ error: "Admin approval pending." });
        }

        res.json({ message: "Login successful", admin: admin.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error." });
    }
});

// 📌 Get Pending Admins
router.get("/pending", async (req, res) => {
    try {
        const pendingAdmins = await pool.query("SELECT * FROM admins WHERE approved = FALSE");
        res.json(pendingAdmins.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error." });
    }
});

// 📌 Approve/Reject Admin
router.post("/approve/:id", async (req, res) => {
    try {
        const { approve } = req.body;
        const { id } = req.params;

        // Update approval status
        await pool.query("UPDATE admins SET approved = $1 WHERE id = $2", [approve, id]);

        res.json({ message: `Admin ${approve ? "approved" : "rejected"}.` });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error." });
    }
});

router.get("/cases", async (req, res) => {
    try {
        const allCases = await pool.query("SELECT * FROM cases ORDER BY createdat DESC");
        res.json(allCases.rows);
    } catch (err) {
        console.error("❌ Error fetching cases:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// 🟠 Route to update case status (Admin Only)
router.put("/cases/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedCase = await pool.query(
            "UPDATE cases SET status = $1 WHERE id = $2 RETURNING *",
            [status, id]
        );

        if (updatedCase.rows.length === 0) return res.status(404).json({ error: "Case not found" });

        res.json({ message: "Status updated", case: updatedCase.rows[0] });
    } catch (err) {
        console.error("❌ Error updating case status:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// 🟣 Route to assign a specialist to a case (Admin Only)
router.put("/cases/:id/assign", async (req, res) => {
    try {
        const { id } = req.params;
        const { specialistId } = req.body;

        const updatedCase = await pool.query(
            "UPDATE cases SET specialistid = $1 WHERE id = $2 RETURNING *",
            [specialistId, id]
        );

        if (updatedCase.rows.length === 0) return res.status(404).json({ error: "Case not found" });

        res.json({ message: "Specialist assigned", case: updatedCase.rows[0] });
    } catch (err) {
        console.error("❌ Error assigning specialist:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
