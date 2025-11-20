const Productos = require('../models/Productos');

const productosController = {
  getAll: async (req, res) => {
    try {
      const productos = await Productos.getAll();
      res.json({ success: true, data: productos });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener productos', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Productos.getById(id);
      if (!producto) return res.status(404).json({ success: false, message: 'Producto no encontrado' });
      res.json({ success: true, data: producto });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener producto', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const producto = await Productos.create(req.body);
      res.status(201).json({ success: true, message: 'Producto creado exitosamente', data: producto });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear producto', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Productos.update(id, req.body);
      if (!producto) return res.status(404).json({ success: false, message: 'Producto no encontrado' });
      res.json({ success: true, message: 'Producto actualizado exitosamente', data: producto });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar producto', error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Productos.delete(id);
      if (!producto) return res.status(404).json({ success: false, message: 'Producto no encontrado' });
      res.json({ success: true, message: 'Producto eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar producto', error: error.message });
    }
  },

  getByCategoria: async (req, res) => {
    try {
      const { categoriaId } = req.params;
      const productos = await Productos.getByCategoria(categoriaId);
      res.json({ success: true, data: productos });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener productos por categoría', error: error.message });
    }
  },

  getByTalla: async (req, res) => {
    try {
      const { tallaId } = req.params;
      const productos = await Productos.getByTalla(tallaId);
      res.json({ success: true, data: productos });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener productos por talla', error: error.message });
    }
  }
};

module.exports = productosController;
