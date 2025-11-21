const express = require('express');
const router = express.Router();

// Importar todas las rutas
router.use('/productos', require('./productos'));
router.use('/categorias', require('./categorias'));
router.use('/proveedores', require('./proveedores'));
router.use('/compras', require('./compras'));
router.use('/detallecompras', require('./detalleCompras'));
router.use('/ventas', require('./ventas'));
router.use('/detalleventas', require('./detalleVentas'));
router.use('/clientes', require('./clientes'));
router.use('/usuarios', require('./usuarios'));
router.use('/roles', require('./roles'));
router.use('/permisos', require('./permisos'));
router.use('/detalle-permisos', require('./detallePermisos'));
router.use('/estados', require('./estados'));
router.use('/tallas', require('./tallas'));
router.use('/devoluciones', require('./devoluciones'));

module.exports = router;