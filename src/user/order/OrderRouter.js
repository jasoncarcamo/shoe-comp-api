const express = require("express");
const OrderRouter = express.Router();
const OrderService = require("./OrderService");


OrderRouter
    .route("/order")    
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=> {
        OrderService.getOrders(req.app.get("db"), req.user.id)
            .then( orders => {
                if( orders.length == 0){
                    return res.status(400).json({ error: `No orders found.`})
                };
                
                res.status(200).json(orders)
            })
    })
    .post((req, res)=>{

        const {items} = req.body;
        const newOrder = {items, user_id: req.user.id}

        OrderService.newOrder(req.app.get("db"), newOrder)
            .then( data => {
                console.log( data );
                return res.status(204).json(data)
            })
    })

module.exports = OrderRouter