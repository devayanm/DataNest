const Joi = require('joi');

const validateData = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    dataFields: Joi.array().items(Joi.string()).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = { validateData };
