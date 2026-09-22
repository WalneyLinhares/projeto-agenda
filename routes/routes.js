const express = require('express');
const router = express.Router();
const homeController = require('../src/controllers/homeControler');
const loginController = require("../src/controllers/loginControler");
const registerController = require("../src/controllers/cadastroControler");
const contatoController = require("../src/controllers/contatoControler");
const { loginRequiredMiddleware } = require("../src/middlewares/middleware");
const { rateLimitRegister, rateLimitLogin,rateLimitContato } = require("../src/ratelimiters/rateLimit");

// Rotas da Home
router.get('/', homeController.index);

// Rotas de login
router.get('/login', loginController.index);
router.post('/login', express.json({ limit: '5kb' }), rateLimitLogin, loginController.login);

// Rotas de cadastro
router.get('/cadastro', registerController.index);
router.post('/cadastro', express.json({ limit: '5kb' }), rateLimitRegister, registerController.register)

// Rota de logout
router.get('/logout', loginController.logout)

// Rotas de contato
router.get('/contato', loginRequiredMiddleware, contatoController.index);
router.post('/contato', express.json({ limit: '5kb' }), loginRequiredMiddleware, rateLimitContato, contatoController.contato);
router.get('/contato/:id', loginRequiredMiddleware, contatoController.editIndex);
router.post('/contato/:id', express.json({ limit: '5kb' }), loginRequiredMiddleware, rateLimitContato, contatoController.edit);
router.get('/contato/delete/:id', loginRequiredMiddleware, contatoController.delete);

router.get('/ping', (req, res) => {
    res.status(200).send('pong');
})

module.exports = router;