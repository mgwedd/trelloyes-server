require( 'dotenv' ).config();
const express = require( 'express' );
const morgan = require( 'morgan');
const cors = require( 'cors' );
const helmet = require( 'helmet' );
const { NODE_ENV } = require('./config');
const winston = require('winston');

const app = express();

app.use( cors() );
app.use( helmet() );

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log' })
  ]
});

if (NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// DATA 
// In mem temp store 
const cards = [
  {
    id: 1,
    title: 'Task One',
    content: 'This is card one'
  }, 
  {
    id: 2,
    title: 'Task Two',
    content: 'This is card two'
  },  {
    id: 3,
    title: 'Task Three',
    content: 'This is card three'
  }
];
const lists = [
  {
    id: 1,
    header: 'List One',
    cardIds: [1]
  }, 
  {
    id: 2,
    header: 'List Two',
    cardIds: [2]
  },  
  {
    id: 3,
    header: 'List Three',
    cardIds: [3]
  }
];
// =========


// ENDPOINTS
app.get( '/', ( req, res ) => {
  res.send( 'Hello, Boilerplate!' );
});
// =========


// ERROR HANDLER
app.use(function errorHandler( error, req, res, next ) {
  let response;
  if ( NODE_ENV === 'production' ) {
    response = { error: { message: 'Server Error' } };
  } else {
    console.error( error );
    response = { message: error.message, error };
  }
  res.status( 500 ).json( response )
});

module.exports = app;