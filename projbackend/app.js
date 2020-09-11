//this file contains database connection, middleware(body-parser, cookie-parser, cors)
require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const catagoryRoutes = require("./routes/catagory");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
//const paymentBRoutes = require("./routes/paymentBRoutes");
const stripeRoutes = require("./routes/stripepayment");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    //process is used to attach all new dependencies from .env file
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected");
  });

//these are middlewares used
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", catagoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
//app.use("/api", paymentBRoutes);
app.use("/api", stripeRoutes);

//This is PORT
const port = process.env.port || 8000; // to take variables from .env file because these variables we are not gonna show to other users
//Sarting Server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
