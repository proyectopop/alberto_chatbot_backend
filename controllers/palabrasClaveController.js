const mongoose = require('mongoose');

const PalabrasClave = mongoose.model('palabrasClave');


// -------------------------------------------------------------------------- //
// * GET *
// -------------------------------------------------------------------------- //

async function procesarMensaje(req, res) {
  if (!req.query.fase || !req.query.mensaje) {
    return res.status(400).json({ error: 'Petición mal formada' });
  }
  const { fase, mensaje } = req.query;

  const resultado = await PalabrasClave.find({
    // eslint-disable-next-line quotes
    $text: { $search: `"'${mensaje}'"`, $caseSensitive: false },
  },
  { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } });

  return res.status(200).json({ indican: resultado[0].indican });
}

module.exports = { procesarMensaje };
