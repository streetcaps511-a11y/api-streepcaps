const Compras = require('../models/Compras');

const comprasController = {
  // Obtener todas las compras
  getAll: async (req, res) => {
    try {
      const compras = await Compras.getAll();
      res.json({ success: true, data: compras });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener compras', error: error.message });
    }
  },

  // Obtener compra por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const compra = await Compras.getById(id);
      if (!compra) return res.status(404).json({ success: false, message: 'Compra no encontrada' });
      res.json({ success: true, data: compra });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener compra', error: error.message });
    }
  },

  // Crear nueva compra
  create: async (req, res) => {
    try {
      const compra = await Compras.create(req.body);
      res.status(201).json({ success: true, message: 'Compra registrada exitosamente', data: compra });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al registrar compra', error: error.message });
    }
  },

  // Obtener compras por proveedor
  getByProveedor: async (req, res) => {
    try {
      const { proveedorId } = req.params;
      const compras = await Compras.getByProveedor(proveedorId);
      res.json({ success: true, data: compras });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener compras por proveedor', error: error.message });
    }
  },

  // Actualizar estado de compra
  updateEstado: async (req, res) => {
    try {
      const { id } = req.params;
      const { Estado } = req.body;
      const compra = await Compras.updateEstado(id, Estado);
      if (!compra) return res.status(404).json({ success: false, message: 'Compra no encontrada' });
      res.json({ success: true, message: 'Estado de compra actualizado', data: compra });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar estado', error: error.message });
    }
  }
};

module.exports = comprasController;
