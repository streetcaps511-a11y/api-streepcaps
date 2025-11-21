const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');

// GET /api/clientes - Obtener todos los clientes
router.get('/', clientesController.getAll);

// GET /api/clientes/:id - Obtener cliente por ID
router.get('/:id', clientesController.getById);

// POST /api/clientes - Crear nuevo cliente
router.post('/', clientesController.create);

// PUT /api/clientes/:id - Actualizar cliente
router.put('/:id', clientesController.update);

// DELETE /api/clientes/:id - Eliminar cliente
router.delete('/:id', clientesController.delete);

module.exports = router;
