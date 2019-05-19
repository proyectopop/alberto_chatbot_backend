const mongoose = require('mongoose');

const Frase = new mongoose.Schema(
  {
    texto: String,
    palabrasClave: [String],
  },
);

module.exports = mongoose.model('Frase', Frase);
