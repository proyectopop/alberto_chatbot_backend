const mongoose = require('mongoose');

const PalabrasClave = new mongoose.Schema({
  fase: { type: String, trim: true },
  indican: { type: String, trim: true },
  disparadores: { type: [String], trim: true },
});

PalabrasClave.index({ disparadores: 'text' });

module.exports = mongoose.model('palabrasClave', PalabrasClave, 'palabrasClave');
