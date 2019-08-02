const router = require('express').Router();
const catchingAsyncErrors = require('./middleware/wrapAsync');

const Imagenes = require('./services/images');
const Alberto = require('./services/chatbot');

// TEST
router.get('/alberto/prueba', (req, res) => res.status(200).json());

// CHAT BOT
router.post('/alberto/evento', catchingAsyncErrors(Alberto.enviaEvento));
router.post('/alberto/mensaje', catchingAsyncErrors(Alberto.recibeMensaje));

// IMAGENES
router.post('/alberto/imagenes', Imagenes.multerUploads, Imagenes.processUpload);

module.exports = router;
