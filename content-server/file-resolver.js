//router.js locates and streams files, and serves the default document
const path = require("path");
const fs = require('fs');
const mime = require('mime-types')

module.exports = class FileResolver 
{
    defaultDocument;
    documentRoot;

    constructor(settings )
    {
        this.documentRoot = settings.documentRoot;
        this.defaultDocument = settings.defaultDocument;
    }

    async Resolve(request, response)
    {
        try
        {
            console.log("original request: " + request.url);
            if (request.url.length === 0 || request.url === "/") 
            {
                request.url = this.defaultDocument;
            }
            
            await this.serveFile(request, response);  
        }
        catch (e)
        {
            console.error("server error: " + e);
            console.error("stack:", e.stack);
            response.writeHead(500);
            response.end("Internal Server Error");
        }    
    }

    async safeGetFileStats(fileSpec)
    {
        try
        {
            const stats = await fs.promises.lstat(fileSpec);
            if (stats.isFile())
            {
                return stats;
            }
        }
        catch (e)
        {
            //do nothing. assume file does not exist.
        }
        return false;
    }
    
    async serveFile(request, response)
    {
        const fileSpec = path.join(this.documentRoot, request.url);

        console.log("\trequest looking for: " + fileSpec);
        const fileStats = await this.safeGetFileStats(fileSpec);
        if (fileStats)
        {
            this.streamResponse(request, response, fileSpec, fileStats.size);
        }
        else
        {
            console.log("\tReturning 404 not found")
            response.writeHead(404);
            response.end("File Not Found: " + request.url);
        }
        
    }

    streamResponse(request, response, file, size, isCompressed)
    {
        console.log("\tfound compressed file: " + file);
        const contentType = mime.lookup(request.url);

        const headers = {
            'Content-Type': contentType,
            'Content-Length': size           
        };
        
        response.writeHead(200, headers);
        console.log("\tReturning " + size + " bytes of type " + contentType);

        const readStream = fs.createReadStream(file);
        readStream.pipe(response);
    }
}