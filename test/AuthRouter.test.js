require('dotenv').config()
const knex = require('knex');
const app = require('../src/app/app');
const TestService = require("./TestService");


describe("Auth end point /api/login", ()=>{

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

    before("Cleanup", ()=> TestService.cleanTables(db));

    afterEach("Cleanup", ()=> TestService.cleanTables(db));

    describe("POST /api/login", ()=>{

        const incorrectUser = {
            email: "wrong@email.com",
            password: "Wrong11!"
        };

        const badRequest = {
            noEmail: "No email",
            noPassword: "No password"
        };

       beforeEach("Insert user", ()=>{
           return TestService.cleanTables(db).then( seed=> TestService.seedUsers(db, user))
       });

       it("Should return 400 when bad body request", ()=>{
            return supertest(app)
                .post("/api/login")
                .send(badRequest)
                .expect(400)
       });

       it("Should return 400 if no user found by email", ()=>{
            return supertest(app)
                .post("/api/login")
                .send(incorrectUser)
                .expect(400);
       });

       it("Should return 400 if user inputs incorrect password", ()=>{
            return supertest(app)
                .post("/api/login")
                .send(incorrectUser)
                .expect(400);
       });

       it("should return 200 if correct user input", ()=>{
            const correctUser = {
                email: "email@email.com",
                password: "Password11!"
            };

            return supertest(app)
                .post("/api/login")
                .send(correctUser)
                .expect(200);
       });
       
    })
})