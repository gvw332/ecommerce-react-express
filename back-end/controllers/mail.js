const transporter = require('../confignodemailer');

const EnvoiMail = async (req, res) => {
    const to = 'gael.vanwymeersch@gmail.com';
    const subject = 'test envoi mail';
    const text = 'contenu du mail blablablablablab';

    let mailOptions = {
        from: 'yourgmail@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé: %s', info.messageId);
        res.send('Email envoyé avec succès');
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
        res.status(500).send('Erreur lors de l\'envoi de l\'email');
    }
};

module.exports = { EnvoiMail };
