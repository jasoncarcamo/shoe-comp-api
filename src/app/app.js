const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

app.use(morgan("tiny"))
app.use(cors());
app.use(helmet());

//Routers
const RegRouter = require("../registration/RegRouter");
const AuthRouter = require("../authorization/AuthRouter")
const UserRouter = require("../user/UserRouter");



app.use("/api", RegRouter);
app.use("/api", AuthRouter);
app.use("/user", UserRouter);

app.get("/", (req, res)=> {
    res.send("Hello");
});

module.exports = app;