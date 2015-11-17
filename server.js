/**
 * Makemehapi tutorial
 */

const Hapi = require('hapi');
const server = new Hapi.Server();
const Inert = require('inert');
const Path = require('path')
const Vision = require('vision');

server.connection({ 
    host: 'localhost', 
    port: Number(process.argv[2] || 8080) 
});


server.register(Vision, err => {
    if(err) throw err;
})
server.register(Inert, err=>{
    if(err) throw err;
})

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'templates'),
    helpersPath: 'helpers'
})

server.route({
    method: 'GET',
    path:'/',
    handler: {
        view: 'index.html'
    }
});

server.start(err => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});
