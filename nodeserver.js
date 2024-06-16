const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer(function (req, res) {
    // Serve index.html
    if (req.url === '/' || req.url === '/index.html') {
        let filePath = path.join(__dirname, 'public', 'index.html');
        let contentType = 'text/html';

        fs.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    res.writeHead(404);
                    res.end('Error: File Not Found');
                } else {
                    res.writeHead(500);
                    res.end('Server Error');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
    // Serve static CSS and JavaScript files
    else if (req.url.match(/\.(css|js)$/)) {
        let filePath = path.join(__dirname, 'public', req.url);
        let contentType = req.url.endsWith('.css') ? 'text/css' : 'application/javascript';

        fs.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    res.writeHead(404);
                    res.end('Error: File Not Found');
                } else {
                    res.writeHead(500);
                    res.end('Server Error');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
    // Handle 404 Not Found
    else {
        res.writeHead(404);
        res.end('Error: File Not Found');
    }
});

server.listen(port, function (error) {
    if (error) {
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});
