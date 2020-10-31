const mongoose = require('mongoose');
const dbConfig = require('./configs/dbconfig');
const { Client, connectionUrl, dbName } = dbConfig;

mongoose.connect(`${connectionUrl}/${dbName}`,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,})
.then(connected => 
        console.log('db connection successfull')
)
        
.catch(err => console.log(err))
