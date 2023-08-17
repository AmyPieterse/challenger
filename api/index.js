//first we need to install the express package
// then we need to import it
const path = require('path')
const {express, routes} =require('./controller')

//create express app
const app = express()

const cors = require('cors')
const cookieParser = require("cookie-parser")

// Importing error handling middleware
const errorHandling = require('./middleware/errorHandling')
const port = +process.env.PORT || 3000

// Middleware - Application level
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");// allow anyone to access api deploy vue.js and put in place of * or leave as *
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
});

//middleware is something between request and response, restricts the user 
//middleware is just a function

app.use( //is where we mount the middleware functions at the path which is being specified. 
    express.static('./static'),
    express.urlencoded({ 
    extended:false 
    }),
    cookieParser(),
    cors(),//stands for Cross Origin Resource
    routes
)

routes.get('^/$|/challenger',(req,res)=>{
res.sendFile(path.resolve(__dirname,'./static/HTML/index.html'))
})
// Handling all errors
app.use(errorHandling);

app.listen(port,()=>{
    console.log(`The server is running on port ${port}`)
})

// cookieParser & Router
// cookieParser should be set before router

// Server