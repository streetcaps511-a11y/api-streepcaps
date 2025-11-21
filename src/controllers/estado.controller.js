// src/controllers/estados.controller.js
const Estados = require('../models/Estado'); // Importa tu model correctamente

const estadoController = {
  getAll: async (req, res) => {
    try {
      const estados = await Estados.getAll();
      res.json({ success: true, data: estados });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener estados', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const estado = await Estados.getById(id);
      if (!estado) return res.status(404).json({ success: false, message: 'Estado no encontrado' });
      res.json({ success: true, data: estado });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener estado', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const estado = await Estados.create(req.body);
      res.status(201).json({ success: true, message: 'Estado creado exitosamente', data: estado });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear estado', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const estado = await Estados.update(id, req.body);
      if (!estado) return res.status(404).json({ success: false, message: 'Estado no encontrado' });
      res.json({ success: true, message: 'Estado actualizado exitosamente', data: estado });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar estado', error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const estado = await Estados.delete(id);
      if (!estado) return res.status(404).json({ success: false, message: 'Estado no encontrado' });
      res.json({ success: true, message: 'Estado eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar estado', error: error.message });
    }
  }
};

module.exports = estadoController;
