const jwt = require('jsonwebtoken');
const config = require("./constants/config")

module.exports = (req,res,next) => {
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try{
        decodedToken= jwt.verify(token,config.jwt_secret );
    }
    catch(err){
        err.statusCode = 500;
        throw err;
    }
}