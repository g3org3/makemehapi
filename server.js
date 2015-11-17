/**
 * Makemehapi tutorial
 */

const Hapi = require('hapi');
const server = new Hapi.Server();
const H2o2 = require('h2o2');
const Inert = require('inert')

server.connection({ 
    host: 'localhost', 
    port: Number(process.argv[2] || 8080) 
});

server.register(Inert, err => {
    if(err) throw err
})

server.register(H2o2, err => {
    if(err) throw err
});

server.route({
    method: 'GET',
    path:'/',
    handler: {
        file: 'public/file.html'
    }
})

server.route({
    method:'GET',
    path: '/proxy',
    handler: {
        proxy: {
            mapUri: (req, cb) => {
                console.log('doing some aditional stuff before redirecting');
                console.log(req.query)
                cb(null, req.query.name || "https://github.com")
            },
            onResponse: (err, res, req, reply, settings, ttl) => {
                console.log('receiving the response from the upstream.');
                reply(res).header('X-Frame-Options', 'ALLOW-FROM http://localhost:8080/')
            }
        }
    }
})

server.start(err => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});
