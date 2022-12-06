const mongoose = require('mongoose');

async function testDbConnection() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    // console.log('rows ===', rows);
    console.log('Connected to MongoDB'.bgCyan.bold);
  } catch (error) {
    console.log(`Error connecting to db ${error.message}`.bgRed.bold);
    // console.log('error ===', error);
    if (error.code === 'ECONNREFUSED') {
      console.log('is server running?'.yellow);
    }
  }
}

module.exports = testDbConnection;
