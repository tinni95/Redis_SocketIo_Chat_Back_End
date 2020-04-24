const jwt = require('jsonwebtoken');
const config = require("../constants/config")

module.exports = (req,res,next) => {
    
    let token;
    try{
       token= req.get('Authorization').split(' ')[1];
    }
    catch(err){
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    let decodedToken;
    try{
        decodedToken= jwt.verify(token,config.jwt_secret );
    }
    catch(err){
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    if(!decodedToken.isOperator){
        const error = new Error('Access forbidden.');
        error.statusCode = 403;
        throw error;
    }
    req.email = decodedToken.email;
    next();
}