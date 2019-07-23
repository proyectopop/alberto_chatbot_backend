const Images = require('./services/images');
const router = require('express').Router();
const catchingAsyncErrors = require('./middleware/wrapAsync');
const Alberto = require('./services/chatbot');
const frases = require('./controllers/fraseController');

// CHAT BOT
router.post('/alberto/evento', catchingAsyncErrors(Alberto.enviaEvento));
router.post('/alberto/mensaje', catchingAsyncErrors(Alberto.recibeMensaje));

//IMAGES
router.post('/alberto/image', Images.multerUploads, Images.processUpload);

// FRASES
router.get('/frases', catchingAsyncErrors(frases.todasLasFrases));
router.get('/frases/buscar', catchingAsyncErrors(frases.buscarUnaFrase));
router.post('/frases', catchingAsyncErrors(frases.agregarFrase));
router.patch('/frases/:id', catchingAsyncErrors(frases.editarFrase));
router.delete('/frases/:id', catchingAsyncErrors(frases.borrarFrase));

module.exports = router;
