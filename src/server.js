const express = require("express");
const app = express();
const cors = require("cors");

const authenticationRouter = require("./lib/routes/authRouter");
const storeRouter = require("./lib/routes/storeRouter");
const orderRouter = require("./lib/routes/orderRouter");


const corsOptions = {
  origin: "*", //for demo purposes only
  credentials: true,
  optionSuccessStatus: 200,
};
// ----- middlewares-----
app.use(cors(corsOptions));
app.use(express.json());

// ----- routes-------
app.use("/users", authenticationRouter);
app.use("/store", storeRouter);
app.use("/order", orderRouter);


module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  },
};
