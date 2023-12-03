const nodemailer = require('nodemailer');

// Créer un transporteur SMTP
let transporter = nodemailer.createTransport({
    host: 'gvw-tech.be', // Nom du serveur SMTP
    port: 465, // Port SMTP
    secure: true, // STARTTLS 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        
    }
});

module.exports = transporter;



