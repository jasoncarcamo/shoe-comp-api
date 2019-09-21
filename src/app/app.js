const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const RegRouter = require("../registration/RegRouter");
const AuthRouter = require("../authorization/AuthRouter")
const UserRouter = require("../user/UserRouter");

app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());

app.use("/api", RegRouter);
app.use("/api", AuthRouter);
app.use("/user", UserRouter);

app.use(function errorHandler(error, req, res, next) {

    let response;

    if (NODE_ENV === 'production') {
      response = { error: 'Server error' }
    } else {
      
      response = { error: error.message, object: error }
    };

    console.error(error);

    return res.status(500).json(response);
  });

app.get("/", (req, res)=> {
    res.send("Hello");
});

module.exports = app;