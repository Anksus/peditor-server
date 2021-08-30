const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection with the database is established");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", () => {
  console.log(error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoose is disconnected from db");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
