'use strict';
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
    path: '/upload',
    config: {
        payload: {
            output: 'stream',
            parse: true
        }
    },
    handler: (req, reply) => {
        console.log(Object.keys(req.payload))
        let body = "";

        if(!req.payload.file){
            return reply("no payload")
        }

        req.payload.file.on('data', data => {
            body += data 
        })
        req.payload.file.on('end', () => {
            reply({
                description: req.payload.description,
                file: {
                    data: body,
                    filename: req.payload.file.hapi.filename,
                    headers: req.payload.file.hapi.headers
                }
            })
        })
        
    }  
})

server.start(err => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});
