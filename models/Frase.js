const mongoose = require('mongoose');

const Frase = new mongoose.Schema({
  texto: { type: String, trim: true },
  palabrasClave: { type: String, trim: true },
  imagenAdjuntaUrl: { type: String, trim: true },
  genero: { type: String, trim: true },
  animo: { type: String },
});

Frase.index({ texto: 'text' });

module.exports = mongoose.model('Frase', Frase);
