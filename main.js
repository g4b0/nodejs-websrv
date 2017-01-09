var http = require('http');
var static = require('node-static');
var file = new static.Server('public');
var url = require('url');

var test_node = require('./test_node.js');


http.createServer(function (req, res) {
    if (url.parse(req.url).pathname == '/test_node') {
        test_node.serve(req, res);
    } else {
        file.serve(req, res);
    }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');


