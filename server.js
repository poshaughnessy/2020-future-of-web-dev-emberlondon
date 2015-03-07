var express = require('express'),
    app = express(),
    PORT = process.env.PORT || 8000;

var Server = function() {

    this.startExpress = function() {

        app.use(express.static(__dirname));

        app.get('/', function(req, res) {
            res.sendFile(__dirname + '/index.html');
        });

        app.listen(PORT);

        console.log('Started server on port', PORT);

    }

};

var server = new Server();
module.exports = server;

// Command line usage: node server run
if( process.argv[2] === 'run' ) {
    server.startExpress();
}
