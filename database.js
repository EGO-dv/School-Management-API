const mongoose = require("mongoose");

const dataBaseUri = process.env.dataBaseUri;

mongoose
  .connect(dataBaseUri)
  .then(() => {
    console.log("DataBase connection Established");
  })
  .catch((err) => {
    console.log("Failed to connect to database " + err);
  });