const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Car = require('./models/carModel');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const seedCars = [
  {
    company: 'Toyota',
    model: 'Corolla',
    year: 2020,
    price: 20000,
    color: 'Blue',
  },
  {
    company: 'Honda',
    model: 'Civic',
    year: 2019,
    price: 18000,
    color: 'Black',
  },
  {
    company: 'Ford',
    model: 'Mustang',
    year: 2021,
    price: 30000,
    color: 'Red',
  },
];

const seedDB = async () => {
  try {
    await Car.deleteMany({});
    await Car.insertMany(seedCars);
    console.log('Database seeded!');
  } catch (err) {
    console.error('Error seeding database', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();