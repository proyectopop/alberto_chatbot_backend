const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');
const { uploader } = require('../../config/cloudinaryConfig');

const dUri = new Datauri();

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single('image');

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

const processUpload = (req, res) => {
  const file = dataUri(req).content;
  return uploader.upload(file, {transformation: [
    {width: 300, crop: "fill"}]}).then((result) => {
    const image = result.url;
    return res.status(200).json({
      messge: 'Your image has been uploded successfully to cloudinary',
      data: {
        image
      }
    })
  }).catch((err) => res.status(400).json({
    messge: 'someting went wrong while processing your request',
    data: {
      err
    }
  }))
};

module.exports = { multerUploads, processUpload };