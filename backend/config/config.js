const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://thelawsofnature94:1234qazwsx@cluster0.dqjym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting DB: ", error.message);
  }
};

module.exports = connectDb;