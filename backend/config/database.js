const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('db connect');
  } catch (error) {
    console.log(error);
  }
};
