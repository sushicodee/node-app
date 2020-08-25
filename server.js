const express = require('express');
const app = express();
const dotenv = require('dotenv');
const config = require('./configs/index');
// const multer = require('multer');
const cors = require('cors');
const authRoutes = require('./routes/auth/auth.route');
const userRoutes = require('./routes/user/user.route');
const commentRoutes = require('./routes/comments/comments.route');

const path = require('path');
const { PORT } = config;

const db = require('./db');
//load middlewares
const aunthenticate = require('./middlewares/authenticate');

//serve locally within express
app.use(express.static('files'));
//server for external files
app.use('./file',express.static(path.join(__dirname,'files')));

app.use(cors());

//parse x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));
//parse json
app.use(express.json());

//path routes
app.use('/auth',authRoutes);
app.use('/user',aunthenticate, userRoutes);
app.use('/comment',aunthenticate,commentRoutes);
//setup .env
dotenv.config({
    path:'./.env'
})

app.use(function(req,res,next){
    next({msg:"not found",status:404});
})

//error handling middleware
app.use(function(err,req,res,next){
    if(err){
        res.status(err.status || 400).send({message:err.message || 'Not found',status:err.status || 400})
    }
})

app.listen(PORT, (err,done) => {
    if(err){
        return console.log('server not running');
    }
    console.log(`server running at port ${PORT}`);
})