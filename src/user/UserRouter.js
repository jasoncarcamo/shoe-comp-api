const express = require("express");
const UserRouter = express.Router();
const CartRouter = require("./cart/CartRouter");
const OrderRouter = require("./order/OrderRouter");
const {requireAuth} = require("../middleware/jwt-auth");



UserRouter.use(requireAuth, CartRouter, OrderRouter);

UserRouter
    .route("/")
    .all(requireAuth)
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res, next)=>{
        res.status(200).json({ first_name: req.user.first_name, last_name: req.user.last_name})
    })


module.exports = UserRouter;