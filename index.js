import express from 'express';
import {connectDB} from './db.js'
import routesForApp from './Routes.js';
import 'dotenv/config';
import bodyParser from 'body-parser';


const app = express();

app.get('/',(req,res) => {
    res.send('Welcome to Node Babel')
    console.log("running")
})

app.use(express.json());

app.use(bodyParser.json());

routesForApp(app);

connectDB();

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port:" ${process.env.PORT}`);
   
   });