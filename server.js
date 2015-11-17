/**
 * Makemehapi tutorial
 */

/**
 * Dependencies
 */
const Hapi      = require('hapi');
const Joi       = require('joi');

const server = new Hapi.Server();

server.connection({ 
    host: 'localhost', 
    port: Number(process.argv[2] || 8080) 
});


server.route({
    method: 'GET',
    path: '/chickens/{breed}',
    config: {
        validate: {
            params: {
                breed: Joi.string().required()
            }
        }
    },
    handler: function(req, reply) {
        reply(`breed: ${req.params.breed}`)
    }
})

server.start(err => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});
