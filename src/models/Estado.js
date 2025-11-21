// src/models/Estados.js
const prisma = require('../config/database');

const Estado = {
  getAll: async () => prisma.estado.findMany({ where: { Estado: true } }),
  getById: async (id) => prisma.estado.findUnique({ where: { IdEstado: parseInt(id) } }),
  create: async (data) => prisma.estado.create({ data: { ...data, Estado: true } }),
  update: async (id, data) => prisma.estado.update({ where: { IdEstado: parseInt(id) }, data }),
  delete: async (id) => prisma.estado.update({ where: { IdEstado: parseInt(id) }, data: { Estado: false } })
};

module.exports = Estado;
