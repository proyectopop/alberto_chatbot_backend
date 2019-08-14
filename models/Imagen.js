const mongoose = require('mongoose');

const Imagen = new mongoose.Schema({
  frase: { type: String, trim: true },
  src: { type: String, trim: true },
});


module.exports = mongoose.model('imagen', Imagen);
