require('./models/Frase');

const router = require('express').Router();
const catchingAsyncErrors = require('./middleware/wrapAsync');

// CHAT BOT
const Alberto = require('./services/chatbot');

router.post('/alberto/evento', catchingAsyncErrors(Alberto.enviaEvento));
router.post('/alberto/mensaje', catchingAsyncErrors(Alberto.recibeMensaje));

// FRASES
const frases = require('./controllers/fraseController');

router.get('/frases', catchingAsyncErrors(frases.todasLasFrases));
router.get('/frases/buscar', catchingAsyncErrors(frases.buscarUnaFrase));
router.post('/frases', catchingAsyncErrors(frases.agregarFrase));
router.patch('/frases/:id', catchingAsyncErrors(frases.editarFrase));
router.delete('/frases/:id', catchingAsyncErrors(frases.borrarFrase));

module.exports = router;
