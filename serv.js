const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json())
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/loginDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB Error:", err));

const User = mongoose.model("User", {
    username: String,
    password: String
});
app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    console.log("Received:", username, password);

    const user = await User.findOne({
        username,
        password
    });

    console.log("User found:", user);

    if (user) {
        res.json({ status: "success" });
    } else {
        res.json({ status: "invalid" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});