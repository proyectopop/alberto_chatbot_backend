require('./models/Frase');

const router = require('express').Router();

const wrapAsync = require('./middleware/wrapAsync');

const frases = require('./controllers/fraseController');

// FRASES API
router.get('/frases', wrapAsync(frases.todasLasFrases));
router.get('/frases/buscar', wrapAsync(frases.buscarUnaFrase));
router.post('/frases', wrapAsync(frases.agregarFrase));
router.patch('/frases/:id', wrapAsync(frases.editarFrase));
router.delete('/frases/:id', wrapAsync(frases.borrarFrase));

module.exports = router;
