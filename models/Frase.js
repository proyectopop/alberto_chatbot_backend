const mongoose = require('mongoose');

const Frase = new mongoose.Schema({
  texto: { type: String, trim: true },
  palabrasClave: { type: String, trim: true },
});

Frase.index({ texto: 'text' });

module.exports = mongoose.model('Frase', Frase);
