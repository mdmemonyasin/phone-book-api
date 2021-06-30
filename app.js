const express = require('express');
const mongoose = require('mongoose');
const cors  = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');

const app = express();

app.use(cors());

app.use(bodyParser.json());
console.log("hello");
app.use(userRoutes);

mongoose.connect('mongodb+srv://user1:Yasin@123@1-kthvn.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(result =>{
    console.log('Connected');
    app.listen(process.env.PORT || 8000);
}).catch(err =>{
    console.log(err);
})