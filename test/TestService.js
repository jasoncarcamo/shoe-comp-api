const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


function createJwt(subject, payload){
    return jwt.sign(payload, process.env.JWT_SECRET, {
        subject,
        algorithm: "HS256"
    });
};

function verifyJwt(token){
    return jwt.verify( token, 
        process.env.JWT_SECRET, {
            algorithms: ["HS256"]
        });
};


function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
          users,
          checkout,
          order_item,
          orders
        `
        )
    )
};

const user = {
    id: 1,
    first_name: "first_name",
    last_name: "last_name",
    email: "email@email.com",
    password: bcrypt.hash("Password11!", 12).then( hashedPassword => user.password = hashedPassword)
};

function seedUsers(db, user){
    return db.insert(user).into("users").returning("*").then(([user])=> user);
};

function seedOrders(db, order){
    return db.insert(order).into("orders").returning("*").then(([success]) => success);
}


module.exports = {
    createJwt,
    verifyJwt,
    cleanTables,
    user,
    seedUsers,
    seedOrders
};