const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.set('trust proxy', true);
app.get('/tracking-pixel', (req, res) => {
    const pixelPath = path.join('/test.png');
    
    const userEmail = req.query.email || 'unknown email';
    
    // Retrieve additional data
    const ip = req.ip; // Get IP address
    const userAgent = req.headers['user-agent']; // Get User-Agent (browser and device info)
    const timestamp = new Date(); // Get current timestamp

    // Log all the data
    console.log({
        email: userEmail,
        ipAddress: ip,
        userAgent: userAgent,
        timestamp: timestamp,
        // headers: req.headers
    });

    // Serve the tracking pixel image
    fs.readFile(pixelPath, (err, data) => {
        if (err) {
            res.status(500).send('Error loading tracking pixel');
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': data.length
        });
        res.end(data);
    });
});

app.listen(3000, () => console.log('Tracking server is running'));
