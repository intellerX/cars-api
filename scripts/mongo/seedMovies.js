// DEBUG=app:* node scripts/mongo/seedCars.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:cars');
const MongoLib = require('../../lib/mongo');
const { carsMock } = require('../../utils/mocks/cars');

async function seedCars() {
  try {
    const mongoDB = new MongoLib();

    const promises = carsMock.map(async car => {
      await mongoDB.create('cars', car);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} cars have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedCars();
