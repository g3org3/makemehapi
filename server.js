'use strict'
/**
 * Makemehapi tutorial
 */

/**
 * Dependencies
 */
const Hapi      = require('hapi')
const Boom      = require('boom')
const HapiAuthBasic = require('hapi-auth-basic');
// const Bcrypt    = require('bcrypt')

const server = new Hapi.Server()

server.connection({
   host: 'localhost', 
   port: Number(process.argv[2] || 8080) 
})

const users  = {
   hapi: {
      username: 'george',
      password: 'auth',
      name: 'George',
      id: '123456'
   }
}


const validate = function(req, username, password, cb){
   console.log(username, password)
   const user = users[username];
   if(!user){
      return cb(null, false)
   }

   if(user.password == password){
      cb(null, true, {id: user.id, name: user.name})
   } else {
      cb(null, false)
   }
   
}

server.register(HapiAuthBasic, err => {
   server.auth.strategy('simple', 'basic', {validateFunc: validate })
})


server.route({
   method: 'GET',
   path: '/',
   config: {
      auth: 'simple',
      handler: function(req, reply){
         reply({message: "logged in!"})
      }
   }
})

server.start(err => {
   if (err) {
      throw err
   }
   console.log('Server running at:', server.info.uri)
})
