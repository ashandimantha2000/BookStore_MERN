import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/booksRoute.js";

const app = express();

//middleware fot parsing request body
app.use(express.json());

//get request
app.get("/", (req, res) => {
  res.status(200).send("Hello from NodeJs");
});

//listeing in the port
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.use("/books", bookRoute);

//connect to mongoose
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
