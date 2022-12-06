const Joi = require('joi');
const UserSchema = require('../schemas/userSchema');

const schema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().regex(/[&]/, { invert: true }),
  password: Joi.string().min(3).max(30).required(),

  gender: Joi.string().valid('man', 'woman').required(),

  date: Joi.date().greater('1922-12-06').less('2000-01-01'),

  city: Joi.string().min(3).max(30).required(),
});

async function regValidator(req, res, next) {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    if (error.details[0].type === 'date.less' || error.details[0].type === 'date.greater')
      return res.status(400).json({ error: true, message: 'Your age must be between 18 and 100' });
    res.status(400).json({ error: true, message: error.details[0].message });
  }
}

async function userValidator(req, res, next) {
  try {
    const { secret } = req.body;
    const user = await UserSchema.findOne({ secret });
    if (!user) throw new Error();
    next();
  } catch (error) {
    console.log('error on JOI validator ===', error);
    res.status(401).json({ error: true, message: 'login for posting', data: [] });
  }
}

module.exports = { regValidator, userValidator };
