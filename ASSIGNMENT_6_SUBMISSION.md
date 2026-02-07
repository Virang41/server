# Assignment 6: Creating a Simple Web Server with Node.js

**Student Name:** [Your Name]  
**Date:** February 8, 2026

---

## Objective
Build a basic web server using the Node.js http module to handle different routes and serve corresponding HTML pages.

---

## Project Structure

```
assignment 6/
├── server.js              # Main server file
├── css/
│   └── styles.css         # CSS styling for all pages
└── pages/
    ├── home.html          # Home page (/home route)
    ├── about.html         # About page (/about route)
    ├── contact.html       # Contact page (/contact route)
    ├── services.html      # Services page (/services route)
    └── 404.html           # Custom 404 error page
```

---

## How the Server Works

### Server Overview
The server is built using Node.js built-in `http` module. It listens on port 3000 and serves different HTML pages based on the requested URL route.

### Key Components:

1. **HTTP Module** - Used to create the web server
2. **FS Module** - Used to read HTML files from the file system asynchronously
3. **Path Module** - Used to construct file paths properly

### Routing Logic:
- When a user visits `/` or `/home` → Home page is served
- When a user visits `/about` → About page is served
- When a user visits `/contact` → Contact page is served
- When a user visits `/services` → Services page is served
- When a user visits `/styles.css` → CSS file is served
- Any other route → Custom 404 error page is displayed

### Asynchronous File Reading:
The server uses `fs.readFile()` which is asynchronous. This means the server doesn't block while reading files and can handle multiple requests efficiently.

---

## Code Files

### 1. server.js (Main Server File)

```javascript
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
```

---

### 2. pages/home.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - Clean & Fresh Laundry</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <!-- navigation bar -->
    <nav class="navbar">
        <div class="logo">Clean & Fresh</div>
        <ul class="nav-links">
            <li><a href="/home" class="active">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </nav>

    <!-- hero section -->
    <section class="hero">
        <div class="hero-content">
            <h1>Welcome to Clean & Fresh Laundry</h1>
            <p>Your trusted partner for sparkling clean clothes. We make laundry easy!</p>
            <a href="/services" class="btn">View Our Services</a>
        </div>
    </section>

    <!-- features section -->
    <section class="features">
        <h2>Why Choose Us?</h2>
        <div class="feature-cards">
            <div class="card">
                <h3>Quick Service</h3>
                <p>Get your clothes cleaned and delivered within 24 hours. Fast and reliable!</p>
            </div>
            <div class="card">
                <h3>Affordable Prices</h3>
                <p>Quality cleaning at prices that won't break your budget. Best value in town.</p>
            </div>
            <div class="card">
                <h3>Expert Care</h3>
                <p>Our trained staff handles all types of fabrics with utmost care and attention.</p>
            </div>
        </div>
    </section>

    <!-- footer -->
    <footer>
        <p>&copy; 2024 Clean & Fresh Laundry. All rights reserved.</p>
    </footer>
</body>
</html>
```

---

### 3. pages/about.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - Clean & Fresh Laundry</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <!-- navigation bar -->
    <nav class="navbar">
        <div class="logo">Clean & Fresh</div>
        <ul class="nav-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/about" class="active">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </nav>

    <!-- about section -->
    <section class="about-section">
        <div class="about-content">
            <h1>About Our Laundry</h1>
            <p>Clean & Fresh Laundry has been serving the community for over 10 years. We started as a small family business and have grown into a trusted name in laundry services.</p>
            
            <h2>Our Story</h2>
            <p>Founded in 2014, we began with a simple mission - to provide the best laundry service at affordable prices. Today, we serve hundreds of happy customers every week.</p>
            
            <h2>Our Mission</h2>
            <p>To deliver spotless, fresh-smelling clothes with care and efficiency. We treat every garment as if it were our own.</p>
            
            <h2>Our Team</h2>
            <p>We have a dedicated team of 15 professionals who are trained in handling all types of fabrics. From delicate silks to tough denim, we know how to clean them all!</p>
        </div>
    </section>

    <!-- stats section -->
    <section class="stats">
        <div class="stat-item">
            <h3>10+</h3>
            <p>Years Experience</p>
        </div>
        <div class="stat-item">
            <h3>5000+</h3>
            <p>Happy Customers</p>
        </div>
        <div class="stat-item">
            <h3>15</h3>
            <p>Team Members</p>
        </div>
    </section>

    <!-- footer -->
    <footer>
        <p>&copy; 2024 Clean & Fresh Laundry. All rights reserved.</p>
    </footer>
</body>
</html>
```

---

### 4. pages/contact.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Clean & Fresh Laundry</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <!-- navigation bar -->
    <nav class="navbar">
        <div class="logo">Clean & Fresh</div>
        <ul class="nav-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact" class="active">Contact</a></li>
        </ul>
    </nav>

    <!-- contact section -->
    <section class="contact-section">
        <h1>Get In Touch</h1>
        <p>Have questions? We'd love to hear from you. Send us a message!</p>
        
        <div class="contact-container">
            <!-- contact form -->
            <div class="contact-form">
                <h2>Send us a Message</h2>
                <form>
                    <div class="form-group">
                        <label for="name">Your Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" placeholder="Enter phone number">
                    </div>
                    <div class="form-group">
                        <label for="message">Your Message</label>
                        <textarea id="message" name="message" rows="5" placeholder="Write your message here..." required></textarea>
                    </div>
                    <button type="submit" class="btn">Send Message</button>
                </form>
            </div>
            
            <!-- contact info -->
            <div class="contact-info">
                <h2>Contact Information</h2>
                <div class="info-item">
                    <h4>Address</h4>
                    <p>123 Laundry Street, Clean City, CC 12345</p>
                </div>
                <div class="info-item">
                    <h4>Phone</h4>
                    <p>+91 9876543210</p>
                </div>
                <div class="info-item">
                    <h4>Email</h4>
                    <p>info@cleanfresh.com</p>
                </div>
                <div class="info-item">
                    <h4>Working Hours</h4>
                    <p>Monday - Saturday: 8:00 AM - 8:00 PM</p>
                    <p>Sunday: 10:00 AM - 6:00 PM</p>
                </div>
            </div>
        </div>
    </section>

    <!-- footer -->
    <footer>
        <p>&copy; 2024 Clean & Fresh Laundry. All rights reserved.</p>
    </footer>
</body>
</html>
```

---

### 5. pages/services.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Services - Clean & Fresh Laundry</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <!-- navigation bar -->
    <nav class="navbar">
        <div class="logo">Clean & Fresh</div>
        <ul class="nav-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services" class="active">Services</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </nav>

    <!-- services section -->
    <section class="services-section">
        <h1>Our Services</h1>
        <p>We offer a wide range of laundry and cleaning services to meet all your needs.</p>
        
        <div class="services-grid">
            <div class="service-card">
                <h3>Wash & Fold</h3>
                <p class="price">Rs. 50 per kg</p>
                <p>Regular washing and folding service for everyday clothes. Fresh and clean guaranteed!</p>
            </div>
            
            <div class="service-card">
                <h3>Dry Cleaning</h3>
                <p class="price">Rs. 150 per piece</p>
                <p>Professional dry cleaning for suits, sarees, and delicate fabrics that need special care.</p>
            </div>
            
            <div class="service-card">
                <h3>Ironing Service</h3>
                <p class="price">Rs. 20 per piece</p>
                <p>Crisp, wrinkle-free clothes with our professional ironing service.</p>
            </div>
            
            <div class="service-card">
                <h3>Curtain Cleaning</h3>
                <p class="price">Rs. 200 per pair</p>
                <p>Deep cleaning for curtains and drapes. We handle heavy fabrics with care.</p>
            </div>
            
            <div class="service-card">
                <h3>Blanket & Comforter</h3>
                <p class="price">Rs. 300 per piece</p>
                <p>Thorough cleaning for blankets, comforters and heavy bedding items.</p>
            </div>
            
            <div class="service-card">
                <h3>Express Service</h3>
                <p class="price">+50% extra</p>
                <p>Need it fast? Get your laundry done in just 4 hours with express service.</p>
            </div>
        </div>
    </section>

    <!-- footer -->
    <footer>
        <p>&copy; 2024 Clean & Fresh Laundry. All rights reserved.</p>
    </footer>
</body>
</html>
```

---

### 6. pages/404.html (Error Page)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <!-- navigation bar -->
    <nav class="navbar">
        <div class="logo">Clean & Fresh</div>
        <ul class="nav-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </nav>

    <!-- 404 error section -->
    <section class="error-section">
        <div class="error-content">
            <h1>404</h1>
            <h2>Oops! Page Not Found</h2>
            <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <a href="/home" class="btn">Go Back Home</a>
        </div>
    </section>

    <!-- footer -->
    <footer>
        <p>&copy; 2024 Clean & Fresh Laundry. All rights reserved.</p>
    </footer>
</body>
</html>
```

---

### 7. css/styles.css

```css
/* Main Styles for Clean & Fresh Laundry Website */
/* CSS by Student */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
}

/* navbar styles */
.navbar {
    background-color: #2c3e50;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
}

.logo {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 30px;
}

.nav-links a {
    color: #ecf0f1;
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s;
}

.nav-links a:hover,
.nav-links a.active {
    color: #3498db;
}

/* button style */
.btn {
    display: inline-block;
    background-color: #3498db;
    color: white;
    padding: 12px 30px;
    text-decoration: none;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #2980b9;
}

/* hero section */
.hero {
    background: linear-gradient(135deg, #3498db, #2c3e50);
    color: white;
    padding: 100px 20px;
    text-align: center;
}

.hero h1 {
    font-size: 42px;
    margin-bottom: 20px;
}

.hero p {
    font-size: 18px;
    margin-bottom: 30px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

/* features section */
.features {
    padding: 60px 20px;
    text-align: center;
    background: white;
}

.features h2 {
    font-size: 32px;
    margin-bottom: 40px;
    color: #2c3e50;
}

.feature-cards {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
}

.card {
    background: #f8f9fa;
    padding: 30px;
    border-radius: 10px;
    width: 300px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.card h3 {
    color: #3498db;
    margin-bottom: 15px;
}

/* about section */
.about-section {
    padding: 60px 20px;
    max-width: 900px;
    margin: 0 auto;
}

.about-content h1 {
    color: #2c3e50;
    font-size: 36px;
    margin-bottom: 20px;
}

.about-content h2 {
    color: #3498db;
    font-size: 24px;
    margin-top: 30px;
    margin-bottom: 10px;
}

.about-content p {
    color: #555;
    margin-bottom: 15px;
    font-size: 16px;
}

/* stats section */
.stats {
    background: #2c3e50;
    padding: 50px 20px;
    display: flex;
    justify-content: center;
    gap: 60px;
    flex-wrap: wrap;
}

.stat-item {
    text-align: center;
    color: white;
}

.stat-item h3 {
    font-size: 48px;
    color: #3498db;
}

.stat-item p {
    font-size: 16px;
}

/* contact section */
.contact-section {
    padding: 60px 20px;
    max-width: 1100px;
    margin: 0 auto;
}

.contact-section h1 {
    text-align: center;
    color: #2c3e50;
    font-size: 36px;
    margin-bottom: 10px;
}

.contact-section > p {
    text-align: center;
    color: #666;
    margin-bottom: 40px;
}

.contact-container {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
}

.contact-form {
    flex: 1;
    min-width: 300px;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.contact-form h2 {
    color: #2c3e50;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #555;
    font-weight: 500;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #3498db;
}

.contact-info {
    flex: 1;
    min-width: 300px;
}

.contact-info h2 {
    color: #2c3e50;
    margin-bottom: 20px;
}

.info-item {
    margin-bottom: 25px;
}

.info-item h4 {
    color: #3498db;
    margin-bottom: 5px;
}

.info-item p {
    color: #555;
}

/* services section */
.services-section {
    padding: 60px 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.services-section h1 {
    text-align: center;
    color: #2c3e50;
    font-size: 36px;
    margin-bottom: 10px;
}

.services-section > p {
    text-align: center;
    color: #666;
    margin-bottom: 40px;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

.service-card {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.service-card:hover {
    transform: translateY(-5px);
}

.service-card h3 {
    color: #2c3e50;
    margin-bottom: 10px;
}

.service-card .price {
    color: #3498db;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.service-card p {
    color: #666;
}

/* 404 error section */
.error-section {
    padding: 100px 20px;
    text-align: center;
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.error-content h1 {
    font-size: 120px;
    color: #3498db;
    margin-bottom: 10px;
}

.error-content h2 {
    color: #2c3e50;
    font-size: 32px;
    margin-bottom: 15px;
}

.error-content p {
    color: #666;
    margin-bottom: 30px;
    max-width: 500px;
}

/* footer */
footer {
    background: #2c3e50;
    color: #ecf0f1;
    text-align: center;
    padding: 20px;
    margin-top: 40px;
}

/* responsive design */
@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        gap: 15px;
    }
    
    .nav-links {
        gap: 15px;
    }
    
    .hero h1 {
        font-size: 28px;
    }
    
    .stats {
        gap: 30px;
    }
    
    .contact-container {
        flex-direction: column;
    }
}
```

---

## Server Console Log (Screenshot)

```
PS C:\Users\LENOVO\Desktop\code\assignment 6> node server.js
Server is running on http://localhost:3000
Available routes:
  - /home (or /)
  - /about
  - /contact
  - /services
```

---

## Testing Results

| Route | URL | Status Code | Result |
|-------|-----|-------------|--------|
| Home | http://localhost:3000/home | 200 OK | ✅ Page loads successfully |
| About | http://localhost:3000/about | 200 OK | ✅ Page loads successfully |
| Contact | http://localhost:3000/contact | 200 OK | ✅ Page loads successfully |
| Services | http://localhost:3000/services | 200 OK | ✅ Page loads successfully |
| CSS | http://localhost:3000/styles.css | 200 OK | ✅ Styles applied |
| Invalid Route | http://localhost:3000/xyz | 404 Not Found | ✅ 404 page displayed |

---

## Features Implemented

✅ Server listens on port 3000  
✅ Routes for /home, /about, /contact implemented  
✅ Additional /services route added  
✅ Proper HTTP status codes (200, 404)  
✅ Asynchronous file reading with fs.readFile()  
✅ Modular code with separate functions  
✅ Custom 404 error page  
✅ CSS styling with responsive design  
✅ Navigation between all pages  
✅ Clean & Fresh Laundry theme  

---

## How to Run

1. Open terminal in project folder
2. Run command: `node server.js`
3. Open browser and go to: http://localhost:3000
4. Test different routes

---

**End of Assignment 6 Submission**
