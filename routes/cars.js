const express = require('express');
const passport = require('passport');
const CarsService = require('../services/cars');

const {
  carIdSchema,
  createCarSchema,
  updateCarSchema
} = require('../utils/schemas/cars');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

// JWT strategy
require('../utils/auth/strategies/jwt');

function carsApi(app) {
  const router = express.Router();
  app.use('/api/cars', router);

  const carsService = new CarsService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:cars']),
    async function(req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tags } = req.query;

      try {
        const cars = await carsService.getCars({ tags });

        res.status(200).json({
          data: cars,
          message: 'cars listed'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:carId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:cars']),
    validationHandler({ carId: carIdSchema }, 'params'),
    async function(req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { carId } = req.params;

      try {
        const cars = await carsService.getCar({ carId });

        res.status(200).json({
          data: cars,
          message: 'car retrieved'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:cars']),
    validationHandler(createCarSchema),
    async function(req, res, next) {
      const { body: car } = req;
      try {
        const createdCarId = await carsService.createCar({ car });

        res.status(201).json({
          data: createdCarId,
          message: 'car created'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:carId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:cars']),
    validationHandler({ carId: carIdSchema }, 'params'),
    validationHandler(updateCarSchema),
    async function(req, res, next) {
      const { carId } = req.params;
      const { body: car } = req;

      try {
        const updatedCarId = await carsService.updateCar({
          carId,
          car
        });

        res.status(200).json({
          data: updatedCarId,
          message: 'car updated'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:carId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['deleted:cars']),
    validationHandler({ carId: carIdSchema }, 'params'),
    async function(req, res, next) {
      const { carId } = req.params;

      try {
        const deletedCarId = await carsService.deleteCar({ carId });

        res.status(200).json({
          data: deletedCarId,
          message: 'car deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = carsApi;
