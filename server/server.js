var https = require('https');
var fs = require('fs');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("./");

var options = {
    key: fs.readFileSync('server/key.pem'),
    cert: fs.readFileSync('server/cert.pem')
};

var server = https.createServer(options, function(req, res) {
    var done = finalhandler(req, res);
    serve(req, res, done);
});

server.listen(4443);