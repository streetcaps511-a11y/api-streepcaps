const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categorias.controller");

// ================================
// 📌 CATEGORÍAS
// ================================

// Obtener todas las categorías
// GET /api/categorias
router.get("/", categoriasController.getAll);

// Obtener categoría por ID
// GET /api/categorias/:id
router.get("/:id", categoriasController.getById);

// Crear nueva categoría
// POST /api/categorias
// ✔ imagenUrl (string)
// ✔ activo (boolean)
router.post("/", categoriasController.create);

// Actualizar categoría
// PUT /api/categorias/:id
router.put("/:id", categoriasController.update);

// Eliminar categoría (soft delete)
// DELETE /api/categorias/:id
router.delete("/:id", categoriasController.delete);

module.exports = router;
