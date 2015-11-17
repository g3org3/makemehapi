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
    method: 'POST',
    path: '/login',
    config: {
        validate: {
            payload: Joi.object({
                isGuest: Joi.boolean().required(),
                username: Joi.string().when('isGuest', { is: false, then: Joi.required() }),
                password: Joi.string().alphanum(),
                accessToken: Joi.string().alphanum()
            }).options({ allowUnknown: true }).without('password', 'accessToken')
        }
    },
    handler: function(req, reply) {
        reply(`login successful`)
    }
})

server.start(err => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});
