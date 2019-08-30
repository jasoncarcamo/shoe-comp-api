const express = require("express");
const OrderRouter = express.Router();
const OrderService = require("./OrderService");


OrderRouter 
    .route("/order")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=>{
        OrderService.getOrdersByUser(req.app.get("db"), req.user.id)
            .then( data => res.json({data}))
    })
    .post((req, res)=>{

        const {items} = req.body;
        const newCheckout = {items, user_id: req.user.id}


        for(const [key, value] of Object.entries(newCheckout)){
            if(!value){
                return res.status(400).json({ error: `Missing ${key} in body request.`})
            }
        }

        OrderService.addToCheckout(req.app.get("db"), req.user.id, req.body.items)
            .then( data => {
                if(!data){
                    return;
                }
                return res.json({ items: data.items})
            });
    })
    .patch((req, res)=>{
        OrderService.updateCheckout(req.app.get("db"), req.user.id, req.body.items)
            .then( data => {
                console.log(data);
                if(!data){
                    return;
                }
                return res.json({ items: data.items})
            });
    })
    .delete((req, res)=>{
        OrderService.deleteCheckout(req.app.get("db"), req.user.id)
            .then( data => {
                return res.status(200).json({ sucess: "Deleted"})
            })
    })


module.exports = OrderRouter;