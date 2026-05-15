const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question("Enter your country:", function (name) {
    console.log("Welcome to our " + name);
    rl.close();
});