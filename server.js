

const http = require('http');
const fs = require('fs');
const path = require('path');


const PORT = 3000;


function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {

            serve404Page(res);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}


function serve404Page(res) {
    const errorPage = path.join(__dirname, 'pages', '404.html');
    fs.readFile(errorPage, (err, data) => {
        if (err) {

            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - Page Not Found!');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}


const server = http.createServer((req, res) => {
    let url = req.url;


    if (url === '/' || url === '/home') {

        const filePath = path.join(__dirname, 'pages', 'home.html');
        serveFile(filePath, 'text/html', res);
    }
    else if (url === '/about') {

        const filePath = path.join(__dirname, 'pages', 'about.html');
        serveFile(filePath, 'text/html', res);
    }
    else if (url === '/contact') {

        const filePath = path.join(__dirname, 'pages', 'contact.html');
        serveFile(filePath, 'text/html', res);
    }
    else if (url === '/services') {

        const filePath = path.join(__dirname, 'pages', 'services.html');
        serveFile(filePath, 'text/html', res);
    }
    else if (url === '/styles.css') {

        const filePath = path.join(__dirname, 'css', 'styles.css');
        serveFile(filePath, 'text/css', res);
    }
    else {

        serve404Page(res);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('  - /home (or /)');
    console.log('  - /about');
    console.log('  - /contact');
    console.log('  - /services');
});
