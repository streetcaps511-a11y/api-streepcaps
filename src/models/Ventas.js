const prisma = require('../config/database');

const Ventas = {
  getAll: async () => {
    return await prisma.ventas.findMany({
      include: {
        Cliente: true,
        Estado: true,
        DetalleVentas: {
          include: {
            Producto: {
              include: {
                Categoria: true,
                Talla: true
              }
            }
          }
        },
        Devoluciones: true
      },
      orderBy: { Fecha: 'desc' }
    });
  },

  getById: async (id) => {
    return await prisma.ventas.findUnique({
      where: { IdVenta: parseInt(id) },
      include: {
        Cliente: true,
        Estado: true,
        DetalleVentas: {
          include: {
            Producto: {
              include: {
                Categoria: true,
                Talla: true
              }
            }
          }
        },
        Devoluciones: true
      }
    });
  },

  create: async (ventaData) => {
    const { IdCliente, IdEstado, productos } = ventaData;
    return await prisma.$transaction(async (prisma) => {
      const venta = await prisma.ventas.create({
        data: { IdCliente: parseInt(IdCliente), IdEstado: parseInt(IdEstado), Total: 0 }
      });

      let totalVenta = 0;

      for (const producto of productos) {
        const subtotal = producto.Precio * producto.Cantidad;
        totalVenta += subtotal;

        await prisma.detalleVentas.create({
          data: {
            IdVenta: venta.IdVenta,
            IdProducto: parseInt(producto.IdProducto),
            Cantidad: producto.Cantidad,
            Precio: producto.Precio,
            Subtotal: subtotal
          }
        });

        await prisma.productos.update({
          where: { IdProducto: parseInt(producto.IdProducto) },
          data: {
            Stock: { decrement: producto.Cantidad }
          }
        });
      }

      return await prisma.ventas.update({
        where: { IdVenta: venta.IdVenta },
        data: { Total: totalVenta },
        include: {
          Cliente: true,
          Estado: true,
          DetalleVentas: {
            include: { Producto: { include: { Categoria: true, Talla: true } } }
          }
        }
      });
    });
  }
};

module.exports = Ventas;
