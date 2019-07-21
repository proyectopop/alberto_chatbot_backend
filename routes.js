require('./models/Frase');

const router = require('express').Router();
const catchingAsyncErrors = require('./middleware/wrapAsync');

const Images = require('./services/images');

// CHAT BOT
const Alberto = require('./services/chatbot');


router.post('/alberto/evento', catchingAsyncErrors(Alberto.enviaEvento));
router.post('/alberto/mensaje', catchingAsyncErrors(Alberto.recibeMensaje));
router.post('/alberto/image', Images.upload.single('file'), function(req, res, next) {
    console.log(req.file);
    if(!req.file) {
      res.status(500);
      return next(err);
    }
    res.json({ fileUrl: 'http://192.168.0.7:3000/images/' + req.file.filename });
  });

// FRASES
const frases = require('./controllers/fraseController');

router.get('/frases', catchingAsyncErrors(frases.todasLasFrases));
router.get('/frases/buscar', catchingAsyncErrors(frases.buscarUnaFrase));
router.post('/frases', catchingAsyncErrors(frases.agregarFrase));
router.patch('/frases/:id', catchingAsyncErrors(frases.editarFrase));
router.delete('/frases/:id', catchingAsyncErrors(frases.borrarFrase));

module.exports = router;
