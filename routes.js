require('./models/Frase');

const router = require('express').Router();
const catchingAsyncErrors = require('./middleware/wrapAsync');

// FRASES
const frases = require('./controllers/fraseController');

router.get('/frases', catchingAsyncErrors(frases.todasLasFrases));
router.get('/frases/buscar', catchingAsyncErrors(frases.buscarUnaFrase));
router.post('/frases', catchingAsyncErrors(frases.agregarFrase));
router.patch('/frases/:id', catchingAsyncErrors(frases.editarFrase));
router.delete('/frases/:id', catchingAsyncErrors(frases.borrarFrase));

module.exports = router;
