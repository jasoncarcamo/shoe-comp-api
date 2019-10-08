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
                    return res.status(200).json({ error: `No orders found.`})
                };
                
                return res.status(200).json(orders)
            })
    })
    .post((req, res)=>{

        const {items} = req.body;
        const newOrder = {items, user_id: req.user.id}

        for(const [key, value] of Object.entries(newOrder)){
            if(value == null){
                return res.status(400).json({ error: `Missing ${key} in body request`});
            };
        };

        OrderService.newOrder(req.app.get("db"), newOrder)
            .then( data => {
                return res.status(201).json(data)
            })
    })

module.exports = OrderRouter