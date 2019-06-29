const mongoose = require('mongoose');

const Frase = new mongoose.Schema({
  texto: { type: String, trim: true },
  disparador: { type: String, trim: true },
  imagenAdjuntaUrl: { type: String, trim: true },
  genero: { type: String, trim: true },
  animo: { type: Number },
});

Frase.index({ palabrasClave: 'text' });

module.exports = mongoose.model('Frase', Frase);
