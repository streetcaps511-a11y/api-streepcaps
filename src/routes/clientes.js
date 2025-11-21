// src/routes/clientes.js
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller'); // Asegúrate que este archivo exista y se llame exactamente así

// Rutas
router.get('/', clientesController.getAll);        // Obtener todos los clientes
router.get('/:id', clientesController.getById);    // Obtener cliente por ID
router.post('/', clientesController.create);       // Crear cliente
router.put('/:id', clientesController.update);     // Actualizar cliente
router.delete('/:id', clientesController.delete);  // Eliminar cliente (soft delete)

module.exports = router;
