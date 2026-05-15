const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "loginDB"
});

db.connect(err => {
    if (err) {
        console.log("DB ERROR:", err);
    } else {
        console.log("Connected to DB");
    }
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.send("Enter username and password");
    }

    const sql = "SELECT * FROM users WHERE username=? AND password=?";

    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Server Error");
        }

        if (result.length > 0) {
            res.send("Login Successful");
        } else {
            res.send("Login Failed");
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});