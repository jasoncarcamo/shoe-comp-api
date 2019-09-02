
const CartService = {
    getCartByUser(db, id){
        return db.select("*").from("checkout").where({user_id: id}).returning("*").then(([orders]) => orders)
    },
    addToCheckout(db, id, items){
        return db.insert({items, user_id: id}).into("checkout").returning("*").then(([newItems])=> newItems);
    },
    updateCheckout(db, id, items){
        return db.update({items}).from("checkout").where({user_id: id}).returning("*").then(([updatedItems])=>updatedItems);
    },
    deleteCheckout(db, id){
        return db.delete().from("checkout").where({user_id: id});
    }
}

module.exports = CartService;