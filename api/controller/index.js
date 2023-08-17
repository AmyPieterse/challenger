const express = require('express')
const bodyParser = require('body-parser')
const routes = express.Router()

//Import all model's objects
const {users} = require('../model')

//========User's router ========= set up routes for user
routes.get('^/$|/challenger', 
(req,res,next)=>{
    console.log("Welcome back"); 
},
(req,res)=>{//RegEx
    res.sendFile(path.resolve(__dirname,"../static/HTML/index.html")) //going to need it on index
})

routes.get('/users',(req,res)=>{
    users.fetchUsers(req, res)
})

routes.get('/user/:id',(req,res)=>{
    users.fetchUsers(req,res)
    }
)
routes.post('/register',bodyParser.json(),
    (req,res)=>{
        users.register(req,res)
    }
)
routes.put('/user/:id',bodyParser.json(),
    (req,res)=>{
        users.updateUser(req,res)
})
routes.patch('/user/:id',bodyParser.json(),
    (req,res)=>{
    users.updateUser(req,res)
})
routes.delete('/user/:id',(req,res)=>{
    users.deleteUser(req,res)
})
routes.post('/login',
bodyParser.json(), (req, res)=>{
    users.login(req, res)
})
//======= Book's router ======
module.exports = {
    express,
    routes
}