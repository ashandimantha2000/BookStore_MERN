import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route to save data to the database
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).send({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to get a single book from the database
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const book = await Book.findById(id);

        return res.status(200).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to update a book in the database
router.put("/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send("Please provide all the details");
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).send("Book not found");
        }

        return res.status(200).send("Book updated successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to delete a book from the database
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send("Book not found");
        }

        return res.status(200).send("Book deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});


export default router;