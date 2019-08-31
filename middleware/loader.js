
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const enforce = require('express-sslify');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const { cloudinaryConfig } = require('../config/cloudinaryConfig');

module.exports = (app) => {
  /* Implementar límite de peticiones */
  const limiter = new RateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);

  /* Implementar manejo de CORS */
  const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:7333', 'https://charlaconalberto.now.sh'],
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

};
