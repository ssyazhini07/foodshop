const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const path = require("path");
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.hml"));
});

const db = mysql.createConnection(process.env.MYSQL_URL || {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "yourpassword[password]",
    database: process.env.DB_NAME || "userDB"
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
            console.log(err);
            res.send("Error: " + err.message);
        } else {
            res.send("Registration Successful!");
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});