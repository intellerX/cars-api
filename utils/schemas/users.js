const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const userSchema = {
  email: joi
    .string()
    .email()
    .required(),
  password: joi.string().required(),
  name: joi
    .string()
    .max(100)
    .required(),
  cc: joi.string().required(),
  cel: joi.string().required(),
  type: joi.string().required()
};

const createUserSchema = {
  ...userSchema,
  type: joi.string()
}

const createProviderUserSchema = {
  ...userSchema,
  apiKeyToken: joi.string().required()
};

module.exports = {
  userIdSchema,
  userSchema,
  createProviderUserSchema,
  createUserSchema
};
