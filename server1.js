const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/loginDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB Error:", err));

const User = mongoose.model("User", {
    username: String,
    password: String
});

app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    const user = await User.findOne({
        username,
        password
    });

    if (user) {
        res.json({
            status: "success",
            message: "Login Successful"
        });
    } else {
        res.json({
            status: "invalid",
            message: "Invalid Username or Password"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});