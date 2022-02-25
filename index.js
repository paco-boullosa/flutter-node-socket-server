const express = require('express');
const path = require('path');
require('dotenv').config();  // lee el archivo .env

// App de express
const app = express();

// Servidor de sockets
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/sockets');

// path publico
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static(publicPath) ); 


// app.listen(process.env.PORT, (err) =>{
server.listen(process.env.PORT, (err) =>{
    
    if ( err ) throw new Error(err);
    console.log('Servidor ejecutandose en puerto ', process.env.PORT);

});
