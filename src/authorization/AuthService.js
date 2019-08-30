require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




const AuthService = {
    getUserByEmail(db , email){
        return db.select("*").from('users').where({email}).first();
    },
    comparePassword(password, hash){
        return bcrypt.compare(password, hash);
    },
    createJwt(subject, payload){
        return jwt.sign(payload, process.env.JWT_SECRET, {
            subject,
            algorithm: "HS256"
        });
    },
    verifyJwt(token){
        return jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS256"]
        });
    },
    parseBasicToken(token){
        return Buffer.from(token, "base64").toString().split(":");
    }
}

module.exports = AuthService;