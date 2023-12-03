const transporter = require('../confignodemailer');

const EnvoiMail = async (to, subject, text) => {

    let mailOptions = {
        from: 'g.vw@hotmail.com',
        to: to,
        subject: subject,
        html: text === 'OK' ?
            `
            <html>
                <body style="font-family: Arial, sans-serif;">
                    <h1 style="color: #3498db;">Réinitialisation de mot de passe terminée</h1>
                    <p>Votre mot de passe a bien été réinitialisé.</p><br /><br /><br />                
                </body>
            </html>

            `
            :

            `
            <html>
                <body style="font-family: Arial, sans-serif;">
                    <h1 style="color: #3498db;">Réinitialisation de mot de passe</h1>
                    <p>Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous :</p>
                        
                    <a href="${text}">Lien de réinitialisation</a>
                    <br />
                    
                </body>
            </html>

            `

    };


    try {
        let info = await transporter.sendMail(mailOptions);

        return 'Email envoyé avec succès';
    } catch (error) {
        /* console.error("Erreur lors de l'envoi de l'email:", error); */
        throw new Error(`Erreur lors de l'envoi de l'email`);
    }
};

module.exports = { EnvoiMail };


