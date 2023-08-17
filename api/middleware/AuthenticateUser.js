//middleware allows us to 
//to authenticate user

//before we can send a response back to the user we need to create a token 
// the token is saved on cookies/localstorage

//Import JSON web token 
const {sign, verify} = require('jsonwebtoken')
//before we can access
require("dotenv")

function createToken(user){ //allows us to create a token, each user is assigned a token
    return sign(
    {
        //first argument is an object which is the payload which is the information the user gives
        emailAdd: user.emailAdd,
        userPass: user.userPass 
    },
    process.env.SECRET_KEY, // after the payload comes the secret key
    {
        expiresIn:'1h'//token only valid for an hour
    }
    )
}

function verifyAToken(req, res, next){
    /*
    To prevent undefined error, place ?. before your property.
    */
    try{
        // Retrieve token from req.headers
        console.log("Get token from req.headers['authorization']");
        const token = req.headers["authorization"]
        console.log(token);
        next()
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: e.message
        })
    }
}
module.exports = {
    createToken,
    verifyAToken //export create token and verifyToken
}