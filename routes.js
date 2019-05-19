require('./models/Frase');

const router = require('express').Router();

const wrapAsync = require('./middleware/wrapAsync');

const frases = require('./controllers/fraseController');

// FRASES API
router.get('/frases', wrapAsync(frases.todasLasFrases));
router.post('/frases', wrapAsync(frases.agregarFrase));

// TODO --> agregar rutas para editar y borrar

module.exports = router;
