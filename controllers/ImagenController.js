const Imagen = require('../models/Imagen');

exports.buscarImagen = async (req, res) => {

  if (!req.body.frase) {
    return res.status(400).json({ error: 'Se require la frase correspondiente a la imágen' });
  }

  const { frase } = req.body;

  const respuesta = await Imagen.findOne({ frase });

  if (respuesta && respuesta.src) {
    return res.status(200).json({ src: respuesta.src });
  }

  return res.status(200).json({});
};

exports.traerUnaImagenCualquiera = async () => Imagen.findOne();
