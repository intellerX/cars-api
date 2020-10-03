const MongoLib = require('../lib/mongo');

class CarsService {
  constructor() {
    this.collection = 'cars';
    this.mongoDB = new MongoLib();
  }

  async getCars({tags} = {}){
    const query = tags && {tags: {$in: tags}};
    const movies = await this.mongoDB.getAll(this.collection, query);
    return movies || [];
}

  async getCar({ carId }) {
    const car = await this.mongoDB.get(this.collection, carId);
    return car || {};
  }

  async createCar({ car }) {
    const createCarId = await this.mongoDB.create(this.collection, car);
    return createCarId;
  }

  async updateCar({ carId, car } = {}) {
    const updatedCarId = await this.mongoDB.update(
      this.collection,
      carId,
      car
    );
    return updatedCarId;
  }

  async deleteCar({ carId }) {
    const deletedCarId = await this.mongoDB.delete(this.collection, carId);
    return deletedCarId;
  }
}

module.exports = CarsService;
