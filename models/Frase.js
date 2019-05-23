const mongoose = require('mongoose');

const Frase = new mongoose.Schema({
  texto: String,
  palabrasClave: [String],
});

Frase.index({ texto: 'text' });

module.exports = mongoose.model('Frase', Frase);
