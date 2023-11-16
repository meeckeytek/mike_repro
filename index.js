import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';


const app = express();

app.get('/',(req,res) => {
    res.send('Welcome to the new app to the world!!!')
    console.log("running")
})

app.use(express.json());

app.use(bodyParser.json());

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`server running on port ${port}`));