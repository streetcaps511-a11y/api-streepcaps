const { Ventas } = require('../models');

const ventasController = {
  getAll: async (req, res) => {
    try {
      const ventas = await Ventas.getAll();
      res.json({ success: true, data: ventas });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener ventas', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const venta = await Ventas.getById(id);
      if (!venta) return res.status(404).json({ success: false, message: 'Venta no encontrada' });
      res.json({ success: true, data: venta });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener venta', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const venta = await Ventas.create(req.body);
      res.status(201).json({ success: true, message: 'Venta registrada exitosamente', data: venta });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al registrar venta', error: error.message });
    }
  }
};

module.exports = ventasController;
