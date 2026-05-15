const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "loginDB"
});
db.connect(err => {
    if (err) throw err;
    console.log("Connected to database!");
});
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username=? AND password=?";
    db.query(sql, [username, password], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.send("Login Successful!");
        } else {
            res.send("Invalid Username or Password");
        }
    });
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});