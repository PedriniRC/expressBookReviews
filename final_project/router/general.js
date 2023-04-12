const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
  return res.status(300).json({message: "This book is available"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn
  const book = books[isbn];
  if (book) {
    res.send(book);
    return res.status(200).json({message: "Book information retrieved successfully"});
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
  
  // Step 1: Obtain all the keys for the 'books' object
  const bookKeys = Object.keys(books);
  
  // Step 2: Iterate through the 'books' array & check the author matches the one provided in the request parameters
  const authorBooks = bookKeys.filter(key => books[key].author === author);
  
  if (authorBooks.length > 0) {
    const bookList = authorBooks.map(key => books[key]);
    res.send(bookList);
  } else {
    // If no books are found for the author, send an error message
    return res.status(404).json({message: "No books found for author"});
  }
});

// Get all books based on title
public_users.get('/title/:title', function(req, res) {
    const title = req.params.title;
    
    const bookKeys = Object.keys(books);
    const bookKey = bookKeys.find(key => books[key].title === title);
    
    if (bookKey) {
      // If the book is found, send its details
      const book = books[bookKey];
      res.send(book);
    } else {
      // If the book is not found, send an error message
      return res.status(404).json({message: "Book not found"});
    }
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
