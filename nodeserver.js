// nodejs server
// to run nodeJS server, do 'node nodeserver.js'

const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer(function (req, res) {
    // Serve index.html
    if (req.url === '/' || req.url === '/index.html') {
        const filePath = path.join(__dirname, 'public', 'index.html');
        const contentType = 'text/html';

        fs.readFile(filePath, function (error, content) {
            if (error) {
                console.error(`File Not Found: ${filePath}`, error);
                res.writeHead(404);
                res.end('Error: File Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
    // Serve static CSS and JavaScript files
    else if (req.url.match(/\.(css|js)$/)) {
        const filePath = path.join(__dirname, 'public', req.url);
        const contentType = req.url.endsWith('.css') ? 'text/css' : 'application/javascript';

        fs.readFile(filePath, function (error, content) {
            if (error) {
                console.error(`File Not Found: ${filePath}`, error);
                res.writeHead(404);
                res.end('Error: File Not Found');
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
        console.error('Something went wrong', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});
