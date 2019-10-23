'use strict'
/* jshint esversion: 6, asi: true, node: true */
/*
 * index.js
 *
 * WebSSH2 - Web to SSH2 gateway
 * Bill Church - https://github.com/billchurch/WebSSH2 - May 2017
 *
 */

var config = require('./server/app').config
var server = require('./server/app').server

const argv = require('yargs').argv;

var PORT = argv.port||config.listen.port ;

server.listen({ host: config.listen.ip, port: PORT
})

console.log('WebSSH2 service listening on ' + config.listen.ip + ':' + PORT)

server.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    PORT++
    console.warn('WebSSH2 Address in use, retrying on port ' + PORT)
    setTimeout(function () {
      server.listen(PORT)
    }, 250)
  } else {
    console.log('WebSSH2 server.listen ERROR: ' + err.code)
  }
})
