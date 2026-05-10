const express = require('express');
const app = express();

app.use(express.json());

// Data store
let books = [];
let id = 1;

// GET all books
app.get('/', (req, res) => {
  res.json(books);
});

// GET single book
app.get('/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.send("Book not found");
  res.json(book);
});

// POST add book
app.post('/', (req, res) => {
  const { bookname, bookauthor } = req.body;

  const newBook = {
    id: id++,
    bookname,
    bookauthor
  };

  books.push(newBook);
  res.json(newBook);
});

// PUT update book
app.put('/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.send("Book not found");

  book.bookname = req.body.bookname;
  book.bookauthor = req.body.bookauthor;

  res.json(book);
});

// DELETE book
app.delete('/:id', (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.send("Deleted");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});