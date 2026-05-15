const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "userDB"
});

db.connect(err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connected to MySQL!");
});

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.log("Database connection error:", err);
            return;
        }
        else {
            res.send("Registration Successful!");
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});