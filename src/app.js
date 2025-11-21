const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api', require('./routes'));

// Ruta principal con links simples clickeables
app.get('/', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}/api`;
  const endpoints = {
    productos: `${baseUrl}/productos`,
    categorias: `${baseUrl}/categorias`,
    proveedores: `${baseUrl}/proveedores`,
    compras: `${baseUrl}/compras`,
    detalleCompras: `${baseUrl}/detallecompras`,
    ventas: `${baseUrl}/ventas`,
    detalleVentas: `${baseUrl}/detalleventas`,
    clientes: `${baseUrl}/clientes`,
    usuarios: `${baseUrl}/usuarios`,
    roles: `${baseUrl}/roles`,
    permisos: `${baseUrl}/permisos`,
    estados: `${baseUrl}/estados`,
    tallas: `${baseUrl}/tallas`,
    devoluciones: `${baseUrl}/devoluciones`
  };

  let html = '<html><body><h1>API Gestión de Productos</h1><ul>';
  for (const key in endpoints) {
    html += `<li><a href="${endpoints[key]}" target="_blank">${key}</a></li>`;
  }
  html += '</ul></body></html>';

  res.send(html);
});

// Ruta de salud simple
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API funcionando correctamente', timestamp: new Date() });
});

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Manejo de errores global
app.use((error, req, res, next) => {
  console.error('Error global:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'production' ? {} : error.message
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`🌐 Abre en tu navegador: http://localhost:${PORT}`);
});

module.exports = app;
