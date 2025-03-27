const jwt = require("jsonwebtoken");
require("dotenv").config(); // Make sure your .env file has JWT_SECRET

module.exports = function (req, res, next) {
    console.log("Headers received:", req.headers);  // Add this
    
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

    console.log("🔍 Incoming Token:", token);
    
    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token." });
    }
};

