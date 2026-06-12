const express = require("express");
const QRCode = require("qrcode");
const fs = require("fs");
const axios = require("axios");

const app = express();

// Home page
app.get("/", (req, res) => {
    res.send("QR System Running");
});

// Visitor page
app.get("/visitor", async (req, res) => {

    const accessTime = new Date().toString();
    const ipAddress =
        req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const deviceInfo = req.headers["user-agent"];

    let latitude = "Unknown";
    let longitude = "Unknown";

    try {
        const response = await axios.get(
            `http://ip-api.com/json/${ipAddress}`
        );

        latitude = response.data.lat;
        longitude = response.data.lon;

    } catch (error) {
        console.log("Location fetch failed");
    }

    const logData = `

====== New Visitor ======
Access Time: ${accessTime}
IP Address: ${ipAddress}
Device Info: ${deviceInfo}
Latitude: ${latitude}
Longitude: ${longitude}
========================

`;

    fs.appendFileSync("visitor_log.txt", logData);

    console.log(logData);

    res.send("Visitor information recorded successfully!");
});

// Create QR code
QRCode.toFile(
    "QR.png",
    "https://decipher-radar-grudging.ngrok-free.dev/visitor",
    function (err) {
        if (err) throw err;
        console.log("QR Code created successfully!");
    }
);

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
