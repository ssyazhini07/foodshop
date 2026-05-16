const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "customer_tracker"
});

db.connect((err) => {
    if (err) {
        console.log("Database error:", err.message);
    } else {
        console.log("Connected");
    }
});

// add customer
app.post("/add", (req, res) => {
    const { customer_name, service, amount, due_date } = req.body;

    const sql =
        "INSERT INTO customers (customer_name, service, amount, due_date) VALUES (?, ?, ?, ?)";

    db.query(sql,
        [customer_name, service, amount, due_date],
        (err, result) => {
            if (err) return res.send(err);
            res.send("Data inserted successfully");
        });
});

// get all customers
app.get("/customers", (req, res) => {
    db.query("SELECT * FROM customers", (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});