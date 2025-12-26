const { Categorias } = require("../models");

const categoriasController = {
  // ===============================
  // 📌 OBTENER TODAS LAS CATEGORÍAS
  // ===============================
  getAll: async (req, res) => {
    try {
      const categorias = await Categorias.getAll();

      res.json({
        success: true,
        data: categorias,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener categorías",
        error: error.message,
      });
    }
  },

  // ===============================
  // 📌 OBTENER CATEGORÍA POR ID
  // ===============================
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const categoria = await Categorias.getById(id);

      if (!categoria) {
        return res.status(404).json({
          success: false,
          message: "Categoría no encontrada",
        });
      }

      res.json({
        success: true,
        data: categoria,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener categoría",
        error: error.message,
      });
    }
  },

  // ===============================
  // 📌 CREAR CATEGORÍA
  // ===============================
  create: async (req, res) => {
    try {
      const categoria = await Categorias.create({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagenUrl: req.body.imagenUrl || null,
        activo: req.body.activo ?? true,
      });

      res.status(201).json({
        success: true,
        message: "Categoría creada exitosamente",
        data: categoria,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al crear categoría",
        error: error.message,
      });
    }
  },

  // ===============================
  // 📌 ACTUALIZAR CATEGORÍA
  // ===============================
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const categoria = await Categorias.update(id, {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagenUrl: req.body.imagenUrl,
        activo: req.body.activo,
      });

      if (!categoria) {
        return res.status(404).json({
          success: false,
          message: "Categoría no encontrada",
        });
      }

      res.json({
        success: true,
        message: "Categoría actualizada exitosamente",
        data: categoria,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al actualizar categoría",
        error: error.message,
      });
    }
  },

  // ===============================
  // 📌 ELIMINAR CATEGORÍA (SOFT)
  // ===============================
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const categoria = await Categorias.delete(id);

      if (!categoria) {
        return res.status(404).json({
          success: false,
          message: "Categoría no encontrada",
        });
      }

      res.json({
        success: true,
        message: "Categoría eliminada exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar categoría",
        error: error.message,
      });
    }
  },
};

module.exports = categoriasController;
