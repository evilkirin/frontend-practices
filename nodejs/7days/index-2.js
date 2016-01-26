'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var dirname = path.dirname(process.argv[1]);

var MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};

function main(argv) {
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
        root = config.root || ".",
        port = config.port || 80;

    root = path.join(dirname,root);
    http.createServer(function(request, response) {
        var urlInfo = parseUrl(root, request.url);

        validateFiles(urlInfo.pathnames, function(err, pathnames) {
            if (err) {
                response.writeHead(404);
                response.end(err.message);
            } else {
                response.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                outputFiles(pathnames, response);
            };
        });
    }).listen(port);
}

function outputFiles(pathnames, writer) {
    (function next(i, len) {
        if (i < len) {
            var reader = fs.createReadStream(pathnames[i]);

            reader.pipe(writer, {
                end: false
            });
            reader.on('end', function () {
            	next(i + 1, len);
            });
        } else {
        	writer.end();
        }
    }(0, pathnames.length));
}

function parseUrl(root, url) {
    var base, pathnames, parts;

    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??');
    }

    parts = url.split('??');
    base = parts[0];
    pathnames = parts[1].split(',').map(function(value) {
        return path.join(root, base, value);
    });

    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    };
}

function validateFiles(pathnames, cb) {
    (function next(i, len) {
        if (i < len) {
            fs.stat(pathnames[i], function(err, stats) {
                if (err) {
                    cb(err);
                } else if (!stats.isFile()) {
                    cb(new Error());
                } else {
                    next(i + 1, len);
                }
            })
        } else {
            cb(null, pathnames);
        }
    }(0, pathnames.length));
}

main(process.argv.slice(2));