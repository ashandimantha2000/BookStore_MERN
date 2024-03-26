import express from 'express';
import {PORT} from './config.js';

const app = express();

app.get('/', (req, res)=>{
    res.status(200).send('Hello Ashan')
});

app.listen(PORT, ()=>
console.log(`Server is running on ${PORT}`));