const db = require ('../config')//inorder for us to use query
const {hash, compare, hashSync} = require('bcrypt')//to import hash method, hash allows to generate an encypted password
//hash function allows us to
//compare function
//after creating a user we need to encrypt password and then send the encrypted password to the database

const {createToken} = require ('../middleware/AuthenticateUser')
const bodyParser = require('body-parser')
class Users{  //contains all the methods that you have in database
    fetchUsers(req,res){
        const query =`
        SELECT userID, firstName,lastName, gender, userDOB, emailAdd, profileUrl
        FROM Users;
        `
        db.query(query,(err,results)=>{
            if(err) throw err
            res.json({
                status:res.statusCode,
                results
            })
        })
    }
    fetchUser(req,res){
        const query =`
        SELECT userID, firstName,lastName, gender, userDOB, emailAdd, profileUrl
        FROM Users
        WHERE userID = ${req.params.id};
        `
        db.query(query,(err,result)=>{
            if(err) throw err
            res.json({
                status:res.statusCode,
                result
            })
        })
    }
    login(req,res){
        const {emailAdd, userPass} = req.body
        // query
        const query = `
        SELECT firstName, lastName,
        gender, userDOB, emailAdd, userPass,
        profileUrl
        FROM Users
        WHERE emailAdd = '${emailAdd}';
        `
        db.query(query,[userPass], async (err, result)=>{
            console.log(result,userPass);
            if(err) throw err
            if(!result?.length){
                res.json({
                    status: res.statusCode,
                    msg: "You provided a wrong email."
                })
            }else {
                await compare(userPass,
                    result[0].userPass,
                    (cErr, cResult)=>{
                        if(cErr) throw cErr
                        // Create a token
                        let token =
                        createToken({
                            emailAdd,
                            userPass
                        })
                        // Save a token
                        res.cookie("LegitUser",
                        token, {
                            maxAge: 3600000,
                            httpOnly: true
                        })
                        if(cResult) {
                            res.json({
                                msg: "Logged in",
                                token,
                                result: result[0]
                            })
                        }else {
                            res.json({
                                status: res.statusCode,
                                msg:
                                "Invalid password or you have not registered"
                            })
                        }
                    })
                }
        })
    }
    async register(req,res){
        const data =req.body //saving req.body in object
        //before we can register a user we need to make sure we encrypt the password
        data.userPass = await hash(data.userPass,15)
        
        //payload
        const user ={
            //Payload is data that comes from user
            // all data that comes from req.body we save in a new object data
            emailAdd : data.emailAdd,
            userPass : data.userPass
        }
        const query =`
        INSERT INTO Users
        SET ?
        `
        db.query(query,[data],(err)=>{
            if (err) throw err
            let token = createToken(user)
            res.cookie('UserCookie',token,
            {
                maxAge:3600000,
                httpOnly:true
            })
            res.json({
                status:res.statusCode,
                msg:"You are now registered."
            })
        })
    }
    updateUser(req,res){
        const data = req.body
        if(data.userPass){
            data.userPass = hashSync(data.userPass,15)
        }
        const query =`
        UPDATE Users
        SET ?
        WHERE userID = ${req.params.id};
        `
        db.query(query,[req.body],(err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "The user record has been updated "
            })
        })
    }
    deleteUser(req,res){
        const query =`
        DELET FROM Users
        WHERE userID = ${req.params.id};
        `
        db.query(query,(err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "The user record has been deleted."
            })
        })
    }
}
module.exports = Users







