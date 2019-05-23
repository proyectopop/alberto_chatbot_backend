const mongoose = require('mongoose');

const Frase = mongoose.model('Frase');

// -------------------------------------------------------------------------- //
// * GET *
// -------------------------------------------------------------------------- //

async function todasLasFrases(req, res) {
  const frases = await Frase.find();

  res.status(200).json({ frases });
}

async function buscarUnaFrase(req, res) {
  if (!req.query) {
    res.status(400).json({ error: 'Petición mal formada' });
    return;
  }

  const { q } = req.query;

  const frases = await Frase.find({
    $text: { $search: q, $caseSensitive: false },
  });

  res.status(200).json(frases);
}

// -------------------------------------------------------------------------- //
// * POST *
// -------------------------------------------------------------------------- //

async function agregarFrase(req, res) {
  if (!req.body.texto || !req.body.palabrasClave) {
    res
      .status(400)
      .json({ error: 'Se debe incluir la frase y las palabras clave' });
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
  if (!req.params.id) {
    res.status(400).json({ error: 'Error en la petición' });
  }

  if (!req.body.texto && !req.body.palabrasClave) {
    res.status(400).json({ error: 'Error en la petición' });
  }

  await Frase.updateOne(
    { _id: req.params.id },
    {
      $set: { texto: req.body.texto, palabrasClave: req.body.palabrasClave },
    },
  );

  res.status(400).json();
}

// -------------------------------------------------------------------------- //
// * DELETE *
// -------------------------------------------------------------------------- //

async function borrarFrase(req, res) {
  await Frase.deleteOne({ _id: req.params.id });

  res.status(200).json();
}

module.exports = {
  buscarUnaFrase,
  todasLasFrases,
  agregarFrase,
  editarFrase,
  borrarFrase,
};
