require("dotenv").config();
const express = require("express")
const AuthRouter = express.Router();
const AuthService = require("./AuthService");


AuthRouter.use(express.json());
AuthRouter.use(express.urlencoded({ extended: true}));


AuthRouter
    .post("/login", (req, res, next)=>{

        const {email, password} = req.body;

        const user = {
            email,
            password
        };

        for(const [key, value] of Object.entries(user)){
            if(value == null){
                return res.status(400).json({ error: `Missing ${key} in body request`});
            };
        };

        AuthService.getUserByEmail(req.app.get("db"), user.email)
            .then( dbUser =>{
                
                if(!dbUser){
                    return  res.status(400).json({ error: `No account found. You can sign up here.`})
                };

                AuthService.comparePassword(user.password, dbUser.password)
                    .then( matches =>{
                        
                        if(!matches){
                            return res.status(400).json({ error: "Incorrect password"});
                        };

                        const sub = dbUser.email;
                        const payload = { user: dbUser.id};

                        return res.status(200).json({ authToken: AuthService.createJwt(sub, payload)
                        });
                    })                
            })
            .catch(next)
    });

module.exports = AuthRouter;