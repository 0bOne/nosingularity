//startup.js is the entry point for the service
//super light weight content service, compatible with local dev and serverless
const Service = require("./service.js");
const service = new Service();
service.Start();
