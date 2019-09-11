require('dotenv').config()
const knex = require('knex');
const app = require('../src/app/app');
const TestService = require("./TestService");


describe("Register endpoint /api/register", ()=>{

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

    before("Cleanup", ()=> TestService.cleanTables(db)
    );

    afterEach("Cleanup", ()=> TestService.cleanTables(db));

    describe("POST /api/register", ()=>{

        it("Should return 400 if bad body request", ()=>{

            const badRequest = {
                noName: "Wrong",
                noLast: "Wrong",
                email: "Wrong",
                password: "Wrong"
            };

            return supertest(app)
                .post("/api/register")
                .send(badRequest)
                .expect(400);
        });

        it("Should return 400 if an account already exists", ()=>{

            TestService.seedUsers(db, user);

            return supertest(app)
                .post("/api/register")
                .send(user)
                .expect(400);
        });

        it("Should return 201 if successful request", ()=>{
            return supertest(app)
                .post("/api/register")
                .send(user)
                .expect(201);
        })
    })
})