const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* MySQL connection */
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",   // your mysql password
    database: "foodshop"
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

app.listen(5000, () => {
    console.log("Server running on port 5000");
});