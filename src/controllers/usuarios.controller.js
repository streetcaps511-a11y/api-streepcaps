// src/controllers/usuariosController.js
const { Usuarios } = require('../models');

const usuariosController = {
  // Obtener todos los usuarios activos
  getAll: async (req, res) => {
    try {
      const usuarios = await Usuarios.getAll();
      res.json({ success: true, data: usuarios });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: error.message });
    }
  },

  // Obtener un usuario por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuarios.getById(id);
      if (!usuario) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }
      res.json({ success: true, data: usuario });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener usuario', error: error.message });
    }
  },

  // Crear un usuario
  create: async (req, res) => {
    try {
      const { Nombre, Correo, Clave, RolId } = req.body;
      if (!Nombre || !Correo || !Clave || !RolId) {
        return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
      }

      const usuario = await Usuarios.create(req.body);
      res.status(201).json({ success: true, message: 'Usuario creado exitosamente', data: usuario });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear usuario', error: error.message });
    }
  },

  // Actualizar usuario por ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuarios.update(id, req.body);
      if (!usuario) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }
      res.json({ success: true, message: 'Usuario actualizado exitosamente', data: usuario });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar usuario', error: error.message });
    }
  },

  // Eliminar usuario (lógica) por ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuarios.delete(id);
      if (!usuario) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }
      res.json({ success: true, message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar usuario', error: error.message });
    }
  },

  // Login de usuario
  login: async (req, res) => {
    try {
      const { Correo, Clave } = req.body;
      if (!Correo || !Clave) {
        return res.status(400).json({ success: false, message: 'Correo y clave son obligatorios' });
      }

      const usuario = await Usuarios.login(Correo, Clave);
      if (!usuario) {
        return res.status(401).json({ success: false, message: 'Correo o clave incorrectos' });
      }

      // Aquí podrías generar un token JWT si lo deseas
      res.json({
        success: true,
        message: 'Login exitoso',
        data: {
          usuario: { id: usuario.IdUsuario, nombre: usuario.Nombre, correo: usuario.Correo, rol: usuario.Rol.Nombre }
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error en el login', error: error.message });
    }
  }
};

module.exports = usuariosController;
