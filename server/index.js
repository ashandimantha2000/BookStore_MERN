import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//middleware fot parsing request body
app.use(express.json());

//middleware for handling CORS policy (Option 1)
app.use(cors());

//middleware for handling CORS policy (Option 2)
/*app.use(cors(
  {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],

  }
))
*/

//get request
app.get("/", (req, res) => {
  res.status(200).send("Hello from NodeJs");
});

//listeing in the port
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

//route for books
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
