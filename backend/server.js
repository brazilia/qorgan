const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const pool = require('./db'); // ✅ Correct way to import db.js

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5500;

const casesRoutes = require("./routes/casesRoutes");
app.use("/cases", casesRoutes);
app.get("/cases", casesRoutes);


console.log("✅ Registered routes:");
console.log(app._router.stack.map((layer) => layer.route && layer.route.path));



const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});
