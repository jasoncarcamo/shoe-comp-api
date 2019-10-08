require('dotenv').config()
const knex = require('knex');
const app = require('../src/app/app');
const TestService = require("./TestService");

describe("Order endpoint /user/order", ()=>{

    let db;    
    const user = TestService.user;
    let auth = `bearer ${TestService.createJwt(user.email, {user: user.last_name})}`;

    before("Make knex instance", ()=>{
        db = knex({
            client: "pg",
            connection: process.env.TEST_URL
        });

        app.set("db", db);
    });

    after("Disconnect from db", ()=> db.destroy());

    before("Cleanup", ()=>{
        return TestService.cleanTables(db);
    });

    afterEach("Cleanup", ()=>{
        return TestService.cleanTables(db);
    });

    describe("GET /user/order", ()=>{

        beforeEach("Insert user", ()=>{
            return TestService.cleanTables(db)
            .then( seed => TestService.seedUsers(db, user));
        });

        it("Should return 400 if the user does not have an order history", ()=>{
            
            return supertest(app)
                .get("/user/order")
                .set("authorization", auth)
                .send()
                .expect(200, { error: "No orders found."});
        });

        it("Should return 200 if the user has a order histroy", ()=>{
            const newShoe = {
                top: "black",
                middile: "grey",
                bottom: "white"
            };

            const order = {
                items: newShoe,
                user_id: user.id
            }

            TestService.seedOrders(db, order);
            
            return supertest(app)
                .get("/user/order")
                .set("authorization", auth)
                .send(order)
                .expect(200);
        });

    });

    describe("POST /user/order endpoint", ()=>{

        beforeEach("Insert user", ()=>{
            return TestService.cleanTables(db)
            .then( seed => TestService.seedUsers(db, user));
        });

        it("Responds 400 if bad body request", ()=>{
            const newShoe = {
                top: "black",
                middile: "grey",
                bottom: "white"
            };

            const order = {
                items: newShoe,
                user_id: user.id
            };

            const newOrder = {
                noItems: "No items",
                user_id: user.id
            };

            TestService.seedOrders(db, order);
            
            return supertest(app)
                .post("/user/order")
                .set("authorization", auth)
                .send(newOrder)
                .expect(400);
        });
    });
});