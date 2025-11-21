// src/routes/usuarios.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller'); // revisa la ruta exacta

// Rutas CRUD
router.get('/', usuariosController.getAll);
router.get('/:id', usuariosController.getById);
router.post('/', usuariosController.create);
router.put('/:id', usuariosController.update);
router.delete('/:id', usuariosController.delete);

// Ruta de login
router.post('/login', usuariosController.login);

module.exports = router;
