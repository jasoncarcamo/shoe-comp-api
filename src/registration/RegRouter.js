const express = require("express");
const RegRouter = express.Router();
const RegService = require("./RegService");



RegRouter.use(express.json());
RegRouter.use(express.urlencoded({ extended: true}));


RegRouter
    .post("/register", (req, res, next)=>{
        const { first_name, last_name, email, password} = req.body;
        console.log(req.body)
        const newUser = { first_name, last_name, email, password};

        for(const [key, value] of Object.entries(newUser)){
            if(value == null){
                return res.status(400).json({ error: `Missing ${key} in body request`});
            }
        }

        const passwordError = RegService.validatePassword(newUser.password);

        if(passwordError){
            return res.status(400).json({ error: passwordError});
        };

        RegService.getUser( req.app.get("db"), newUser.email)
            .then( hasUser => {
                if (hasUser){
                    return res.status(400).json({ error: "You seem to have an account with us already. Log in here."});
                }

                return RegService.hashPassword(newUser.password)
                    .then( hashedPassword => {
                        newUser.password = hashedPassword

                        return RegService.insertUser( req.app.get("db"), newUser)
                            .then( user => {
                                const sub = newUser.email;

                                const payload = {
                                    user: newUser.last_name
                                };

                                return res.status(201).json(RegService.serializeUser(user));
                            });
                    });
            });

    });



module.exports = RegRouter;