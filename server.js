'use strict'
/**
 * Makemehapi tutorial
 */

/**
 * Dependencies
 */
const Hapi      = require('hapi')
const Boom      = require('boom')

const server = new Hapi.Server()

server.connection({
   host: 'localhost', 
   port: Number(process.argv[2] || 8080) 
})

server.state('session', {
   path: '/',
   ttl: 10,
   domain: 'localhost',
   encoding: 'base64json'
})

server.route({
   method: 'GET',
   path: '/set-cookie',
   config: {
      state: {
         parse: true,
         failAction: 'log'
      }
   },
   handler: (req, reply) => {
      reply('success').state('session', { key: 'makemehapi' })
   }
})

server.route({
   method: 'GET',
   path: '/check-cookie',
   config: {
      state: {
         parse: true,
         failAction: 'log'
      }
   },
   handler: (req, reply) => {
      let session = req.state.session;
      if(session) {
         return reply({user: 'hapi'})
      }

      return reply(Boom.badRequest('Invalid cookie value'));
   }
})

server.start(err => {
   if (err) {
      throw err
   }
   console.log('Server running at:', server.info.uri)
})
