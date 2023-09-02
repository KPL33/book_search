//Here, we import "mongoose" and utilize its methods for opening a "connect"ion to our database, which we've named "book-search".
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/book-search');

//Here, we export this code for use elsewhere in our app.
module.exports = mongoose.connection;
