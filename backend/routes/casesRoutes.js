const express = require("express");
const router = express.Router();
const pool = require("../db");
require("dotenv").config();
const authenticate = require("../middleware/authenticate"); // Ensure user is logged in

router.get("/", authenticate, async (req, res) => {
  console.log("🔍 Received request to /cases");
  console.log("🛑 User ID from token:", req.user.id);

  try {
    const userId = req.user.id;
    const userCases = await pool.query(
      "SELECT * FROM cases WHERE userid = $1",
      [userId]
    );

    console.log("✅ Retrieved cases:", userCases.rows);
    res.json(userCases.rows);
  } catch (err) {
    console.error("❌ Error fetching cases:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// 📌 Route to submit a fraud case
router.post("/", authenticate, async (req, res) => {
  try {
    const { description } = req.body;
    const user_id = req.user.id; // Get user ID from token
    const status = "Pending"; // Default status

    // Insert into DB
    const newCase = await pool.query(
      "INSERT INTO cases (userid, description, status, createdat) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [user_id, description, status]
    );

    res
      .status(201)
      .json({ message: "Case submitted successfully", case: newCase.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
