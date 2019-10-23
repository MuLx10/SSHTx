'use strict'
var config = require('./server/app').config
var server = require('./server/app').server

const argv = require('yargs').argv;

var PORT = argv.port||config.listen.port ;

server.listen({ host: config.listen.ip, port: PORT
})

console.log('service listening on ' + config.listen.ip + ':' + PORT)

server.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    PORT++
    console.warn('Address in use, retrying on port ' + PORT)
    setTimeout(function () {
      server.listen(PORT)
    }, 250)
  } else {
    console.log('server.listen ERROR: ' + err.code)
  }
})
