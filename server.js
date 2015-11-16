/**
 * Makemehapi tutorial
 */

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({ 
    host: 'localhost', 
    port: Number(process.argv[2] || 8080) 
});

server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
        return reply("Hello hapi")
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (req , reply) => {
        return reply(`Hello ${req.params.name}`)
    }
})

server.start(err => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
