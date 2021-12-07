const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.render("login.html");
});

router.get("/login.html", (req, res) => {
    res.render("login.html");
});

router.get("/cadastro.html", (req, res) => {
    res.render("cadastro.html");
});

module.exports = router;