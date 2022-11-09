// server/index.js

const path = require('path');
const express = require("express");

const app = express();
const port = process.env.PORT || "8080";

app.use(express.static(path.resolve(__dirname, '../clinet/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});