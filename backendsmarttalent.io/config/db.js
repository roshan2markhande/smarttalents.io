const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('Error while connecting to MongoDB:', err.message);
    process.exit(1); 
  }
};

module.exports = { connectDB };
