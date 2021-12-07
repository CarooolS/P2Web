const express = require('express');
const authController = require('../controladores/autenticacao');
const router = express.Router();

router.post("/cadastro.html", authController.cadastro )

module.exports = router;