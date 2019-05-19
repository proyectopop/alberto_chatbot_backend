const mongoose = require('mongoose');

const Frase = mongoose.model('Frase');


// -------------------------------------------------------------------------- //
// * GET *
// -------------------------------------------------------------------------- //

async function todasLasFrases(req, res) {

  const frases = await Frase.find();

  res.status(200).json({ frases });
}

// -------------------------------------------------------------------------- //
// * POST *
// -------------------------------------------------------------------------- //

async function agregarFrase(req, res) {

  if (!req.body.texto || !req.body.palabrasClave) {
    res.status(400).json({ error: 'Se debe incluir la frase y las palabras clave' });
    return;
  }

  const nuevaFrase = new Frase(req.body);

  await nuevaFrase.save();

  res.status(200).json();
}


// -------------------------------------------------------------------------- //
// * PATCH *
// -------------------------------------------------------------------------- //

async function editarFrase(req, res) {

  if (!req.params) {
    res.status(400).json({ error: 'Error en la petición' });
  }

  if (!req.body.texto && !(req.body.palabrasClave)) {
    res.status(400).json({ error: 'Error en la petición' });
  }

  const { id } = req.params;

  await Frase.update(id, { frase: req.body.texto, palabrasClave: req.body.palabrasClave });

  res.status(400).json();
}


// -------------------------------------------------------------------------- //
// * DELETE *
// -------------------------------------------------------------------------- //


async function borrarFrase(req, res) {

  Frase.deleteOne({ id: req.params.id });

  res.status(200).json();
}

module.exports = {
  todasLasFrases, agregarFrase, editarFrase, borrarFrase,
};
