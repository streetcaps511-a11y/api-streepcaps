const express = require('express');
const router = express.Router();
const estadosController = require('../controllers/estado.controller');

// GET /api/estados - Obtener todos los estados
router.get('/', estadosController.getAll);

// GET /api/estados/:id - Obtener estado por ID
router.get('/:id', estadosController.getById);

// POST /api/estados - Crear nuevo estado
router.post('/', estadosController.create);

// PUT /api/estados/:id - Actualizar estado
router.put('/:id', estadosController.update);

// DELETE /api/estados/:id - Eliminar estado (soft delete)
router.delete('/:id', estadosController.delete);

module.exports = router;