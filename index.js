const express = require('express');
/* Cargar Variables de entorno */
require('dotenv').config();

// Inicializar conexión a Base de Datos
require('./db/connection');

// Crear Servidor HTTP
const app = express();
const { PORT = 7333 } = process.env;

// Middleware
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const enforce = require('express-sslify');
const helmet = require('helmet');
const { cloudinaryConfig } = require('./config/cloudinaryConfig');

/* Implementar manejo de CORS */
const corsOptions = {
  origin: ['http://localhost:3000', 'https://charlaconalberto.now.sh/'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


/* Implementar Body Parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Implementar seguridad en encabezados */
app.use(helmet());

/* Implementar servicio Cloudinary */
app.use('*', cloudinaryConfig);

/* Forzar HTTPS */
if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

/* Implementar Compresión */
app.use(compression());


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
