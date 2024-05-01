const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "Database Connected : ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    res.status(200).json("Internal server error");
  }
};

module.exports = ConnectDB;
