const express = require('express');
const router = express.Router();
const detalleComprasController = require('../controllers/detalleCompras.controller');

router.get('/', detalleComprasController.getAll);
router.get('/:id', detalleComprasController.getById);
router.get('/compra/:compraId', detalleComprasController.getByCompraId);
router.post('/', detalleComprasController.create);
router.put('/:id', detalleComprasController.update);
router.delete('/:id', detalleComprasController.delete);

module.exports = router;
