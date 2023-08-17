//import all models
const Users = require('./users')
const Orders = require('./orders')
const Books = require('./books')
const BookAuthors = require('./booksAuthor')



//If you have a class you need to create an oject to import 
//Export all objects
module.exports ={
    users: new Users(), //creating a new object /instance of a class
    orders: new Orders(),  
    books: new Books(), 
    bookauthors: new BookAuthors()
}