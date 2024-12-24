import express from 'express';
import connectDB from './config/connect_db.mjs';
import router from './routes/index.mjs';

connectDB();
const app = express();

app.use(express.json());
app.use(router);


app.listen(process.env.PORT,(err)=> err ? console.log(err) : console.log(`The server started localhost ${process.env.PORT}`));