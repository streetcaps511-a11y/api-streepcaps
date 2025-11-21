// src/controllers/roles.controller.js
const { Roles } = require('../models');

const rolesController = {
  getAll: async (req, res) => {
    try {
      const roles = await Roles.getAll();
      res.json({ success: true, data: roles });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener roles', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const rol = await Roles.getById(id);
      if (!rol) return res.status(404).json({ success: false, message: 'Rol no encontrado' });
      res.json({ success: true, data: rol });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener rol', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const rol = await Roles.create(req.body);
      res.status(201).json({ success: true, message: 'Rol creado exitosamente', data: rol });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear rol', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const rol = await Roles.update(id, req.body);
      if (!rol) return res.status(404).json({ success: false, message: 'Rol no encontrado' });
      res.json({ success: true, message: 'Rol actualizado exitosamente', data: rol });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar rol', error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const rol = await Roles.delete(id);
      if (!rol) return res.status(404).json({ success: false, message: 'Rol no encontrado' });
      res.json({ success: true, message: 'Rol eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar rol', error: error.message });
    }
  }
};

module.exports = rolesController;
