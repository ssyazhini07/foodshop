const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* MySQL connection */
const db = mysql.createConnection(process.env.MYSQL_URL || {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",   // your mysql password
    database: process.env.DB_NAME || "foodshop"
});

db.connect((err) => {
    if (err) {
        console.log("DB connection failed:", err);
    } else {
        console.log("MySQL Connected");
    }
});

app.post("/save-details", (req, res) => {
    const { name, phone, address } = req.body;

    const sql =
        "INSERT INTO details (name, phone, address) VALUES (?, ?, ?)";

    db.query(
        sql,
        [name, phone, address],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: true,
                    message: "Details saved successfully"
                });
            }

            res.json({
                success: false,
                message: "Failed to save"
            });
        }
    );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});