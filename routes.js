require('./models/Frase');
require('./models/PalabrasClave');
require('./models/Respuestas');

const router = require('express').Router();

const catchingAsyncErrors = require('./middleware/wrapAsync');

const frases = require('./controllers/fraseController');
const palabrasClave = require('./controllers/palabrasClaveController');
const respuestas = require('./controllers/respuestasController');

// FRASES
router.get('/frases', catchingAsyncErrors(frases.todasLasFrases));
router.get('/frases/buscar', catchingAsyncErrors(frases.buscarUnaFrase));
router.post('/frases', catchingAsyncErrors(frases.agregarFrase));
router.patch('/frases/:id', catchingAsyncErrors(frases.editarFrase));
router.delete('/frases/:id', catchingAsyncErrors(frases.borrarFrase));

// PALABRAS CLAVE
router.get('/palabrasClave', catchingAsyncErrors(palabrasClave.procesarMensaje));

// RESPUESTA
router.get('/respuestas', catchingAsyncErrors(respuestas.todasLasRespuestas));
router.get('/respuestas/buscar', catchingAsyncErrors(respuestas.buscarUnaRespuesta));
router.post('/respuestas', catchingAsyncErrors(respuestas.agregarRespuesta));
router.patch('/respuestas/:id', catchingAsyncErrors(respuestas.editarRespuesta));
router.delete('/respuestas/:id', catchingAsyncErrors(respuestas.borrarRespuesta));

module.exports = router;
