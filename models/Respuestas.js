const mongoose = require('mongoose');

const Respuestas = new mongoose.Schema({
  texto: { type: String, trim: true },
  disparador: { type: String, trim: true },
  imagenAdjuntaUrl: { type: String, trim: true },
  genero: { type: String, trim: true },
  animo: { type: Number },
});

Respuestas.index({ disparador: 'text' });

module.exports = mongoose.model('respuestas', Respuestas);
