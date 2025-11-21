const express = require('express');
const router = express.Router();
const detalleVentasController = require('../controllers/detalleVentas.controller');

router.get('/', detalleVentasController.getAll);
router.get('/:id', detalleVentasController.getById);
router.get('/venta/:ventaId', detalleVentasController.getByVentaId);
router.post('/', detalleVentasController.create);
router.put('/:id', detalleVentasController.update);
router.delete('/:id', detalleVentasController.delete);

module.exports = router;
