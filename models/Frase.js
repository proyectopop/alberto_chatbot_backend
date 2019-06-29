const mongoose = require('mongoose');

const Frase = new mongoose.Schema({
  tema: { type: String, trim: true },
  texto: { type: String, trim: true },
  palabrasClave: { type: String, trim: true },
  imagenAdjuntaUrl: { type: String, trim: true },
  genero: { type: String, trim: true },
  animo: { type: Number },
});

Frase.index({ texto: 'text' });
Frase.index({ palabrasClave: 'text' });

module.exports = mongoose.model('Frase', Frase);
