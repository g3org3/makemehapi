/**
 * Makemehapi tutorial
 */

/**
 * Dependencies
 */
const Hapi      = require('hapi');
const Inert     = require('inert');
const Path      = require('path')
const Vision    = require('vision');
const Rot13     = require('rot13-transform');

const server = new Hapi.Server();

server.connection({ 
    host: 'localhost', 
    port: Number(process.argv[2] || 8080) 
});


server.route({
    method: 'GET',
    path: '/',
    handler: function(req, reply) {
        var Readable = require('stream').Readable
        var s = new Readable;
        s.push("The Pursuit of Hapi-ness")
        s.push(null)
        reply(s.pipe(Rot13()))
        /*
        var thisfile = Fs.createReadStream(Path.join(__dirname, 'input.txt'));
        reply(thisfile.pipe(Rot13()));
        */
    }
})

server.start(err => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});
