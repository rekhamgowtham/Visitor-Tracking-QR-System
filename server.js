const express = require('express');
const QRCode = require('qrcode');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/visitor', (req, res) => {
    res.render('visitor');
});

app.post('/generate', async (req, res) => {
    const data = req.body.data;

    const qrImage = await QRCode.toDataURL(data);

    res.send(`
        <h1>Your QR Code</h1>
        <img src="${qrImage}">
        <br><br>
        <a href="/">Back</a>
    `);
});

app.post('/save', (req, res) => {
    const info = req.body.info + "\n";

    fs.appendFile("visitor_log.txt", info, (err) => {
        if (err) {
            res.send("Error saving data");
        } else {
            res.send("Data saved");
        }
    });
});

app.listen(3000, () => {
    console.log('server running on port 3000');
});
