// src/config/database.js
let prisma;

try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient({
    log: ['query'],       // Muestra las queries ejecutadas
    errorFormat: 'pretty', // Formato legible de errores
  });
  console.log('✅ Prisma Client inicializado correctamente');
} catch (error) {
  console.log('⚠️  Prisma Client no disponible, usando modo desarrollo...');
  console.log('💡 Ejecuta: npx prisma generate');

  // Mock temporal completo para desarrollo
  prisma = {
    $connect: () => Promise.resolve(),
    $disconnect: () => Promise.resolve(),
    $transaction: (fn) => fn(prisma),

    // Mocks para todas las tablas
    productos: createMockMethods('Productos'),
    categorias: createMockMethods('Categorias'),
    proveedores: createMockMethods('Proveedores'),
    usuarios: createMockMethods('Usuarios'),
    roles: createMockMethods('Roles'),
    compras: createMockMethods('Compras'),
    ventas: createMockMethods('Ventas'),
    clientes: createMockMethods('Clientes'),
    tallas: createMockMethods('Tallas'),
    estados: createMockMethods('Estados'),
    detalleCompras: createMockMethods('DetalleCompras'),
    detalleVentas: createMockMethods('DetalleVentas'),
    devoluciones: createMockMethods('Devoluciones'),
    permisos: createMockMethods('Permisos')
  };
}

// Función helper para crear mocks
function createMockMethods(modelName) {
  return {
    findMany: () =>
      Promise.resolve([{ id: 1, nombre: `${modelName} Demo`, estado: true }]),
    findUnique: () =>
      Promise.resolve({ id: 1, nombre: `${modelName} Demo`, estado: true }),
    create: (data) =>
      Promise.resolve({ id: Date.now(), ...data, estado: true }),
    update: () =>
      Promise.resolve({ id: 1, nombre: `${modelName} Actualizado`, estado: true }),
    delete: () =>
      Promise.resolve({ id: 1, nombre: `${modelName} Eliminado`, estado: false }),
    findFirst: () =>
      Promise.resolve({ id: 1, nombre: `${modelName} Encontrado`, estado: true })
  };
}

module.exports = prisma;
