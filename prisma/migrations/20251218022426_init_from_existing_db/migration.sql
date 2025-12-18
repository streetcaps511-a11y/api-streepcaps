-- CreateTable
CREATE TABLE "Productos" (
    "IdProducto" SERIAL NOT NULL,
    "Nombre" VARCHAR(255) NOT NULL,
    "Descripcion" TEXT,
    "Stock" INTEGER NOT NULL DEFAULT 0,
    "Precio" DECIMAL(10,2) NOT NULL,
    "Estado" BOOLEAN NOT NULL DEFAULT true,
    "IdCategoria" INTEGER NOT NULL,
    "url" VARCHAR(500),
    "IdTallas" INTEGER NOT NULL,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("IdProducto")
);

-- CreateTable
CREATE TABLE "Proveedores" (
    "IdProveedor" SERIAL NOT NULL,
    "Nombre" VARCHAR(255) NOT NULL,
    "TipoDocumento" VARCHAR(50),
    "NumeroDocumento" VARCHAR(50),
    "Telefono" VARCHAR(20),
    "Direccion" TEXT,
    "Correo" VARCHAR(100),
    "Estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Proveedores_pkey" PRIMARY KEY ("IdProveedor")
);

-- CreateTable
CREATE TABLE "Categorias" (
    "IdCategoria" SERIAL NOT NULL,
    "Nombre" VARCHAR(255) NOT NULL,
    "Estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("IdCategoria")
);

-- CreateTable
CREATE TABLE "Compras" (
    "IdCompra" SERIAL NOT NULL,
    "IdProveedor" INTEGER NOT NULL,
    "Fecha" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Total" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "Estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Compras_pkey" PRIMARY KEY ("IdCompra")
);

-- CreateTable
CREATE TABLE "DetalleCompras" (
    "IdDetalleCompra" SERIAL NOT NULL,
    "IdCompra" INTEGER NOT NULL,
    "IdProducto" INTEGER NOT NULL,
    "Cantidad" INTEGER NOT NULL,
    "Precio" DECIMAL(10,2) NOT NULL,
    "Subtotal" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "DetalleCompras_pkey" PRIMARY KEY ("IdDetalleCompra")
);

-- CreateTable
CREATE TABLE "Devoluciones" (
    "IdDevolucion" SERIAL NOT NULL,
    "IdProducto" INTEGER NOT NULL,
    "IdVenta" INTEGER NOT NULL,
    "Cantidad" INTEGER NOT NULL,
    "Motivo" TEXT,
    "Fecha" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Monto" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Devoluciones_pkey" PRIMARY KEY ("IdDevolucion")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "IdCliente" SERIAL NOT NULL,
    "Nombre" VARCHAR(255) NOT NULL,
    "Telefono" VARCHAR(20),
    "Correo" VARCHAR(100),
    "Estado" BOOLEAN NOT NULL DEFAULT true,
    "Departamento" VARCHAR(100),
    "Ciudad" VARCHAR(100),
    "Direccion" TEXT,
    "SaldoaFavor" VARCHAR(50) DEFAULT '0',

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("IdCliente")
);

-- CreateTable
CREATE TABLE "Ventas" (
    "IdVenta" SERIAL NOT NULL,
    "IdCliente" INTEGER NOT NULL,
    "IdEstado" INTEGER NOT NULL,
    "Fecha" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Total" DECIMAL(10,2) NOT NULL DEFAULT 0,

    CONSTRAINT "Ventas_pkey" PRIMARY KEY ("IdVenta")
);

-- CreateTable
CREATE TABLE "DetalleVentas" (
    "IdDetalleVenta" SERIAL NOT NULL,
    "IdVenta" INTEGER NOT NULL,
    "IdProducto" INTEGER NOT NULL,
    "Cantidad" INTEGER NOT NULL,
    "Precio" DECIMAL(10,2) NOT NULL,
    "Subtotal" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "DetalleVentas_pkey" PRIMARY KEY ("IdDetalleVenta")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "IdUsuario" SERIAL NOT NULL,
    "Nombre" VARCHAR(255) NOT NULL,
    "Correo" VARCHAR(100) NOT NULL,
    "Clave" VARCHAR(255) NOT NULL,
    "Estado" BOOLEAN NOT NULL DEFAULT true,
    "IdRol" INTEGER NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("IdUsuario")
);

-- CreateTable
CREATE TABLE "Roles" (
    "IdRol" SERIAL NOT NULL,
    "Nombre" VARCHAR(255) NOT NULL,
    "Estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("IdRol")
);

-- CreateTable
CREATE TABLE "Permisos" (
    "IdPermiso" VARCHAR(50) NOT NULL,
    "Nombre" TEXT NOT NULL,

    CONSTRAINT "Permisos_pkey" PRIMARY KEY ("IdPermiso")
);

-- CreateTable
CREATE TABLE "DetallePermisos" (
    "IdDetalle" SERIAL NOT NULL,
    "IdRol" INTEGER NOT NULL,
    "IdPermiso" VARCHAR(50) NOT NULL,

    CONSTRAINT "DetallePermisos_pkey" PRIMARY KEY ("IdDetalle")
);

-- CreateTable
CREATE TABLE "Estado" (
    "IdEstado" SERIAL NOT NULL,
    "Nombre" VARCHAR(255) NOT NULL,
    "Estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("IdEstado")
);

-- CreateTable
CREATE TABLE "Tallas" (
    "IdTalla" SERIAL NOT NULL,
    "Nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "Tallas_pkey" PRIMARY KEY ("IdTalla")
);

-- CreateIndex
CREATE UNIQUE INDEX "Proveedores_NumeroDocumento_key" ON "Proveedores"("NumeroDocumento");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_Correo_key" ON "Usuarios"("Correo");

-- CreateIndex
CREATE UNIQUE INDEX "DetallePermisos_IdRol_IdPermiso_key" ON "DetallePermisos"("IdRol", "IdPermiso");

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_IdCategoria_fkey" FOREIGN KEY ("IdCategoria") REFERENCES "Categorias"("IdCategoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_IdTallas_fkey" FOREIGN KEY ("IdTallas") REFERENCES "Tallas"("IdTalla") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compras" ADD CONSTRAINT "Compras_IdProveedor_fkey" FOREIGN KEY ("IdProveedor") REFERENCES "Proveedores"("IdProveedor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleCompras" ADD CONSTRAINT "DetalleCompras_IdCompra_fkey" FOREIGN KEY ("IdCompra") REFERENCES "Compras"("IdCompra") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleCompras" ADD CONSTRAINT "DetalleCompras_IdProducto_fkey" FOREIGN KEY ("IdProducto") REFERENCES "Productos"("IdProducto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devoluciones" ADD CONSTRAINT "Devoluciones_IdProducto_fkey" FOREIGN KEY ("IdProducto") REFERENCES "Productos"("IdProducto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devoluciones" ADD CONSTRAINT "Devoluciones_IdVenta_fkey" FOREIGN KEY ("IdVenta") REFERENCES "Ventas"("IdVenta") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_IdCliente_fkey" FOREIGN KEY ("IdCliente") REFERENCES "Clientes"("IdCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_IdEstado_fkey" FOREIGN KEY ("IdEstado") REFERENCES "Estado"("IdEstado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVentas" ADD CONSTRAINT "DetalleVentas_IdVenta_fkey" FOREIGN KEY ("IdVenta") REFERENCES "Ventas"("IdVenta") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVentas" ADD CONSTRAINT "DetalleVentas_IdProducto_fkey" FOREIGN KEY ("IdProducto") REFERENCES "Productos"("IdProducto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_IdRol_fkey" FOREIGN KEY ("IdRol") REFERENCES "Roles"("IdRol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallePermisos" ADD CONSTRAINT "DetallePermisos_IdRol_fkey" FOREIGN KEY ("IdRol") REFERENCES "Roles"("IdRol") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallePermisos" ADD CONSTRAINT "DetallePermisos_IdPermiso_fkey" FOREIGN KEY ("IdPermiso") REFERENCES "Permisos"("IdPermiso") ON DELETE CASCADE ON UPDATE CASCADE;
