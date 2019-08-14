const router = require('express').Router();
const Imagen = require('./controllers/ImagenController');
const catchingAsyncErrors = require('./middleware/wrapAsync');

const Alberto = require('./services/chatbot');

// TEST
router.get('/alberto/prueba', (req, res) => res.status(200).json());

// CHAT BOT
router.post('/alberto/evento', catchingAsyncErrors(Alberto.enviaEvento));
router.post('/alberto/mensaje', catchingAsyncErrors(Alberto.recibeMensaje));

// IMAGEN
router.post('/alberto/imagenes', catchingAsyncErrors(Imagen.buscarImagen));

module.exports = router;
