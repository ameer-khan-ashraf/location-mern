import express from 'express';
import bodyParser from  'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import postRoutes from './routes/posts.js';

const app = express();

app.use('/posts', postRoutes);

app.use(bodyParser.json({ limit:'30mb', extended:true }));
app.use(bodyParser.urlencoded({ limit:"30mb", extended:true }));
app.use(cors());


const PORT  = process.env.PORT||5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>app.listen(PORT,()=>console.log(`Server running on port:${PORT}`)))
    .catch(()=>console.log(error.message))
