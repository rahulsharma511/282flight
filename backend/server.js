const express = require('express');
const app = express();


// Json input from the frontend
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ['GET', "POST"],
    credentials:true
}));
app.use(express.json());



// All the routes
app.use(require('./routes/register'));
app.use(require('./routes/admin'));
app.use(require('./routes/user'));

app.listen(3001, ()=>{
    console.log("Connection at 3001 port has been established.");
});