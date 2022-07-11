//service js validates settings and instantiates web server

const path = require('path');
const fs = require('fs');
const http = require('http');

const Resolver = require('./file-resolver');
const settings = require("./settings.json");
const FileResolver = require('./file-resolver');

module.exports = class Service
{
    async Start()
    {
        console.log(`initializing ${settings.serviceName}`);
        
        settings.documentRoot = path.resolve(__dirname, settings.documentRoot);
        settings.port = 80;

        const resolver = new FileResolver(settings);
        
        const server = http.createServer( 
            (request, response) => {
                resolver.Resolve(request, response);
            });

        server.listen(settings.port);

        console.log("HTTP server is running on port " + settings.port); 
    }
}



