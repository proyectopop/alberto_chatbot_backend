// eslint-disable-next-line func-names
module.exports = fn => function (req, res, next) {
  return fn(req, res, next).catch(next);
};
