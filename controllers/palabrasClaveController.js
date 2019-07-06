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
    $or: [{ fase }, { fase: 'indistinta' }],
    // eslint-disable-next-line quotes
    $text: { $search: `"'${mensaje}'"`, $caseSensitive: false },
  },
  { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } });

  const indica = resultado[0] ? resultado[0].indican : null;

  return res.status(200).json({ indica });
}

module.exports = { procesarMensaje };
