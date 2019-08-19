const express = require('express');
/* Cargar Variables de entorno */
require('dotenv').config();

// Inicializar conexión a Base de Datos
require('./db/connection');

// Crear Servidor HTTP
const app = express();
const { PORT = 7333 } = process.env;

// Implementar middleware
require('./middleware/loader')(app);

// Logger
const logger = require('./services/logger');

// Rutas de la API
const routes = require('./routes');

app.use('/api', routes);

// Escuchar errores no atrapados o manejados
process.on('uncaughtException', (e) => {
  logger.error(e);
  process.exit(1);
});
process.on('unhandledRejection', (e) => {
  logger.error(e);
  process.exit(1);
});

app.listen(PORT, () => {
  logger.info(`escuchando en el puerto ${PORT}`);
});
