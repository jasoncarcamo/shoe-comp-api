const OrderService = {
    getOrders(db, id){
        return db.select("*").from("orders").where({ user_id: id});
    },
    newOrder(db, order){
        return db.insert(order).into("orders").returning("*").then(([success]) => success);
    }
}


module.exports = OrderService;