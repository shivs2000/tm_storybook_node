const mongoose = require("mongoose");
const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb connected ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
module.exports = ConnectDB;
