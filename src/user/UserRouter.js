const express = require("express");
const UserRouter = express.Router();
const OrderRouter = require("./orders/OrderRouter");
const {requireAuth} = require("../middleware/jwt-auth");



UserRouter.use(requireAuth, OrderRouter);

UserRouter
    .route("/")
    .all(requireAuth)
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res, next)=>{
        res.json({ hello: req.user});
    })


module.exports = UserRouter;