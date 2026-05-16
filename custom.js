const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",   // your mysql password
    database: "customer_db"
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to MySQL");
    }
});

// CREATE
app.post("/save", (req, res) => {
    const { customer_name, service, payment, due_date } = req.body;

    const sql =
        "INSERT INTO customers (customer_name, service, payment, due_date) VALUES (?, ?, ?, ?)";

    db.query(sql, [customer_name, service, payment, due_date], (err) => {
        if (err) return res.send("Error");
        res.send("Saved Successfully");
    });
});

// READ
app.get("/customers", (req, res) => {
    db.query("SELECT * FROM customers", (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
});

// UPDATE
app.put("/update/:id", (req, res) => {
    const { customer_name, service, payment, due_date } = req.body;
    const id = req.params.id;

    const sql = `
        UPDATE customers
        SET customer_name=?, service=?, payment=?, due_date=?
        WHERE id=?
    `;

    db.query(
        sql,
        [customer_name, service, payment, due_date, id],
        (err) => {
            if (err) return res.send("Update failed");
            res.send("Updated Successfully");
        }
    );
});

// DELETE
app.delete("/delete/:id", (req, res) => {
    db.query(
        "DELETE FROM customers WHERE id=?",
        [req.params.id],
        (err) => {
            if (err) return res.send("Delete failed");
            res.send("Deleted Successfully");
        }
    );
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});