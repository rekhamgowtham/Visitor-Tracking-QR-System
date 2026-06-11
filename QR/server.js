const express = require('express');
const QRCode = require('qrcode');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
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

app.listen(3000, () => {
    console.log('server running on port 3000');
});
