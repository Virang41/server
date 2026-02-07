// Assignment 6 - Simple Web Server with Node.js
// Main server file

const http = require('http');
const fs = require('fs');
const path = require('path');

// port number for server
const PORT = 3000;

// function to read file and send response
function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // if file not found, serve 404 page
            serve404Page(res);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

// serve 404 error page
function serve404Page(res) {
    const errorPage = path.join(__dirname, 'pages', '404.html');
    fs.readFile(errorPage, (err, data) => {
        if (err) {
            // if even 404 page not found, send plain text
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - Page Not Found!');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}

// create server
const server = http.createServer((req, res) => {
    let url = req.url;
    
    // handle routes
    if (url === '/' || url === '/home') {
        // home page route
        const filePath = path.join(__dirname, 'pages', 'home.html');
        serveFile(filePath, 'text/html', res);
    }
    else if (url === '/about') {
        // about page route
        const filePath = path.join(__dirname, 'pages', 'about.html');
        serveFile(filePath, 'text/html', res);
    }
    else if (url === '/contact') {
        // contact page route  
        const filePath = path.join(__dirname, 'pages', 'contact.html');
        serveFile(filePath, 'text/html', res);
    }
    else if (url === '/services') {
        // services page route (extra route)
        const filePath = path.join(__dirname, 'pages', 'services.html');
        serveFile(filePath, 'text/html', res);
    }
    else if (url === '/styles.css') {
        // serve css file
        const filePath = path.join(__dirname, 'css', 'styles.css');
        serveFile(filePath, 'text/css', res);
    }
    else {
        // invalid route - show 404 page
        serve404Page(res);
    }
});

// start listening on port
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('  - /home (or /)');
    console.log('  - /about');
    console.log('  - /contact');
    console.log('  - /services');
});
