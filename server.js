const express = require('express');
const app = express();
const config = require('./configs/index');
const cors = require('cors');
const apiRoutes = require('./routes/api.routes');
const path = require('path');

const db = require('./db');
const { PORT } = config;
app.use(cors());

require('./socket')(app);
//load middlewares
const aunthenticate = require('./middlewares/authenticate');

//serve locally within express
app.use(express.static('files'));
//server for external files
app.use('/files',express.static(path.join(__dirname,'files')));


//parse x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));
//parse json
app.use(express.json());

//path routes
app.use('/api',apiRoutes)



// if(process.env.NODE_ENV = 'production'){
//     app.use(express.static('client/build'))
//     app.get('*', (req,res) => {
//         res.sendFile(path.resolve(dirname,'client','build','index.html'))
//     })
// }

app.use(function(req,res,next){
    next({message:"not found",status:404});
})

//error handling middleware
app.use(function(err,req,res,next){
    if(err){
        res.status(err.status || 400).json({message:err.message || 'Not found',status:err.status || 400})
    }
})

app.listen(PORT, (err,done) => {
    if(err){
        return console.log('server not running');
    }
    console.log(`server running at port ${PORT}`);
})