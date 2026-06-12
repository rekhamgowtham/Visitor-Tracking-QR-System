const QRCode = require('qrcode');

QRCode.toFile(
  'qr.png',
  'https://decipher-radar-grudging.ngrok-free.dev',
  function (err) {
    if (err) throw err;
    console.log('QR code saved as qr.png');
  }
);
