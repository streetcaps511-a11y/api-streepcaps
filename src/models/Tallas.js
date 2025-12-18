const prisma = require('../config/database');

const Tallas = {
  // Obtener todas las tallas
  getAll: async () => {
    return await prisma.tallas.findMany({
      orderBy: { IdTalla: 'asc' }
    });
  },

  // Obtener talla por ID
  getById: async (id) => {
    return await prisma.tallas.findUnique({
      where: { IdTalla: Number(id) }
    });
  },

  // Crear talla
  create: async (tallaData) => {
    return await prisma.tallas.create({
      data: {
        Nombre: tallaData.Nombre
      }
    });
  },

  // Actualizar talla
  update: async (id, tallaData) => {
    return await prisma.tallas.update({
      where: { IdTalla: Number(id) },
      data: {
        Nombre: tallaData.Nombre
      }
    });
  },

  // 🟢 Contar productos asociados a una talla (CLAVE)
  countProductosByTalla: async (idTalla) => {
    return await prisma.productos.count({
      where: { IdTalla: Number(idTalla) }
    });
  },

  // Eliminar talla (solo si no tiene productos)
  delete: async (id) => {
    return await prisma.tallas.delete({
      where: { IdTalla: Number(id) }
    });
  }
};

module.exports = Tallas;
