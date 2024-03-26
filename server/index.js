import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import {Book} from './models/bookModel.js';

const app = express();

//middleware fot parsing request body
app.use(express.json());

//get request
app.get('/', (req, res)=>{
    res.status(200).send('Hello Ashan')
});

//listeing in the port
app.listen(PORT, ()=>
console.log(`Server is running on ${PORT}`));

//save data to the database
app.post('/books', async (req, res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send('Please provide all the details');
        };
        const newBook = new Book(
            {
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear
            }
        );

        const book = await Book.create(newBook);

        return res.status(201).send(book);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


//connect to mongoose
mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('MongoDB Connected');
})
.catch((err)=>{
    console.log(err);
})
