const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../routes/');
const passport = require('passport');
const HttpError = require('http-errors');

// get app
const app = express();

//logger
if(config.env==='developement'){
    app.use(logger('dev'));
}

//get dist folder
const distDir = path.join(__dirname,'../../dist/ecart');

//use dist folder as hosting folder by express
app.use(express.static(distDir));

//parsing from api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//secure app http
app.use(helmet());

//allow cors
app.use(cors());

//authenticate
app.use(passport.initialize());

//api router
app.use('/api/', routes);

//serve the index.html
app.get('*',(req, res)=>res.sendFile(path.join(distDir,'index.html')));

// catch the 404 and forward to error handler
app.use((req, res, next)=>{
    const error = new HttpError(404);
    return next(error);
});

app.use((err, req, res, next)=>{
   res.status(err.status || 500).json({
       message:err.message 
   });
   next(err);
});



module.exports = app;