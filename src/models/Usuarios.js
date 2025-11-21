const prisma = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuarios = {
  getAll: async () => {
    return await prisma.usuarios.findMany({
      where: { Estado: true },
      include: { Rol: true }
    });
  },

  getById: async (id) => {
    const idInt = parseInt(id, 10);
    if (isNaN(idInt)) return null;

    return await prisma.usuarios.findUnique({
      where: { IdUsuario: idInt },
      include: { Rol: true }
    });
  },

  create: async (usuarioData) => {
    const hashedPassword = await bcrypt.hash(usuarioData.Clave, 10);

    return await prisma.usuarios.create({
      data: {
        ...usuarioData,
        Clave: hashedPassword,
        Estado: true
      },
      include: { Rol: true }
    });
  },

  update: async (id, usuarioData) => {
    const idInt = parseInt(id, 10);
    if (isNaN(idInt)) return null;

    if (usuarioData.Clave) {
      usuarioData.Clave = await bcrypt.hash(usuarioData.Clave, 10);
    }

    return await prisma.usuarios.update({
      where: { IdUsuario: idInt },
      data: usuarioData,
      include: { Rol: true }
    });
  },

  delete: async (id) => {
    const idInt = parseInt(id, 10);
    if (isNaN(idInt)) return null;

    return await prisma.usuarios.update({
      where: { IdUsuario: idInt },
      data: { Estado: false }
    });
  },

  login: async (Correo, Clave) => {
    const usuario = await prisma.usuarios.findUnique({
      where: { Correo },
      include: { Rol: true }
    });

    if (!usuario || !usuario.Estado) return null;

    const isValid = await bcrypt.compare(Clave, usuario.Clave);
    return isValid ? usuario : null;
  }
};

module.exports = Usuarios;
