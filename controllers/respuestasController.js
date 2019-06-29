const mongoose = require('mongoose');

const Respuesta = mongoose.model('Frase');


// -------------------------------------------------------------------------- //
// * GET *
// -------------------------------------------------------------------------- //

async function todasLasRespuestas(req, res) {
  const frases = await Respuesta.find();

  res.status(200).json({ frases });
}

async function buscarUnaRespuesta(req, res) {
  if (!req.query) {
    res.status(400).json({ error: 'Petición mal formada' });
    return;
  }

  const { q } = req.query;

  const respuestas = await Respuesta.find({
    // eslint-disable-next-line quotes
    $text: { $search: `"'${q}'"`, $caseSensitive: false },
  },
  { score: { $meta: 'textScore' } });

  res.status(200).json(respuestas);
}

// -------------------------------------------------------------------------- //
// * POST *
// -------------------------------------------------------------------------- //

async function agregarRespuesta(req, res) {
  if (!req.body.texto || !req.body.palabrasClave) {
    res
      .status(400)
      .json({ error: 'Se debe incluir la frase y las palabras clave' });
    return;
  }

  const nuevaRespuesta = new Respuesta(req.body);

  await nuevaRespuesta.save();

  res.status(200).json();
}

// -------------------------------------------------------------------------- //
// * PATCH *
// -------------------------------------------------------------------------- //

async function editarRespuesta(req, res) {
  if (!req.params.id) {
    res.status(400).json({ error: 'Error en la petición' });
  }

  if (!req.body.texto && !req.body.disparador) {
    res.status(400).json({ error: 'Error en la petición' });
  }

  await Respuesta.updateOne(
    { _id: req.params.id },
    {
      $set: { texto: req.body.texto, disparador: req.body.disparador },
    },
  );

  res.status(400).json();
}

// -------------------------------------------------------------------------- //
// * DELETE *
// -------------------------------------------------------------------------- //

async function borrarRespuesta(req, res) {
  await Respuesta.deleteOne({ _id: req.params.id });

  res.status(200).json();
}

module.exports = {
  buscarUnaRespuesta,
  todasLasRespuestas,
  agregarRespuesta,
  editarRespuesta,
  borrarRespuesta,
};
