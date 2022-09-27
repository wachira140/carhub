const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");

// conect db
const connectDb = require("./dB/connectDb");

// middlewares
const erroHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");

// built-in middlewares
app.use(express.json());

// routes
const productRoute = require("./routes/productsRoute");
const authenticationRoute = require("./routes/authRoute");
const followers = require('./routes/followersRoute')

app.use("/api/v1/products", productRoute);
app.use("/api/v1/authentication", authenticationRoute);
app.use('/api/v1/followers', followers)

app.use(erroHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // connect db the connect the server
    await connectDb(process.env.MongoUri);
    app.listen(port, () => console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
