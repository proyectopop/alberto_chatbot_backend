require('./models/Frase');
require('./models/PalabrasClave');

const router = require('express').Router();

const wrapAsync = require('./middleware/wrapAsync');

const frases = require('./controllers/fraseController');
const palabrasClave = require('./controllers/palabrasClaveController');

// FRASES
router.get('/frases', wrapAsync(frases.todasLasFrases));
router.get('/frases/buscar', wrapAsync(frases.buscarUnaFrase));
router.post('/frases', wrapAsync(frases.agregarFrase));
router.patch('/frases/:id', wrapAsync(frases.editarFrase));
router.delete('/frases/:id', wrapAsync(frases.borrarFrase));

// PALABRAS CLAVE
router.get('/palabrasClave', wrapAsync(palabrasClave.procesarMensaje));

module.exports = router;
