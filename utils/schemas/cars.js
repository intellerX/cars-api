const joi = require('@hapi/joi');

const carIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const carPlacaSchema = joi.string().max(8);
const carLatSchema = joi.number();
const carLngSchema = joi.number();
const carPesoSchema = joi.string();
const carCubicajeSchema = joi.string();


const createcarSchema = {
  placa: carPlacaSchema.required(),
  lat: carLatSchema.required(),
  lng: carLngSchema.required(),
  peso: carPesoSchema.required(),
  cubicaje: carCubicajeSchema.required()
  
};

const updatecarSchema = {
  placa: carPlacaSchema,
  lat: carLatSchema,
  lng: carLngSchema,
  peso: carPesoSchema,
  cubicaje: carCubicajeSchema
};

module.exports = {
  carIdSchema,
  createcarSchema,
  updatecarSchema
};
