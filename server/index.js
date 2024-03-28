import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

//middleware fot parsing request body
app.use(express.json());

//get request
app.get("/", (req, res) => {
  res.status(200).send("Hello Ashan");
});

//listeing in the port
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

//Route to save data to the database
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Please provide all the details");
    }
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    });

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get all book from the database
app.get('/books', async (req, res)=>{
    try {
        const books = await Book.find({} );
        return res.status(200).send({
            count: books.length,
            data: books
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
        
    }
});

// Route to get a single book from the database
app.get('/books/:id', async (req, res)=>{
  try {
    const id = req.params.id;

    const book = await Book.findById(id)

    return res.status(200).send(book);
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
    
  }
});

// Route to update a book in the database
app.put('/books/:id', async(req, res)=>{
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Please provide all the details");
    }

    const {id} = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body)

    if (!result){
      return res.status(404).send("Book not found");
    }

    return res.status(200).send("Book updated successfully");
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to delete a book from the database
app.delete('/books/:id', async(req, res)=>{
  try {
     const {id} = req.params;

     const result = await Book.findByIdAndDelete(id);

     if (!result){
       return res.status(404).send("Book not found");
     }

     return res.status(200).send("Book deleted successfully");
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
    
  }
});


//connect to mongoose
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
