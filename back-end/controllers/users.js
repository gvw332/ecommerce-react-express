const UsersModel = require('../models/users');
const RecoversModel = require('../models/recovers');
const { EnvoiMail } = require('./mail');
const bcrypt = require('bcrypt');
const users = new UsersModel();
const recovers = new RecoversModel();
const crypto = require('crypto');

// Générer un token sécurisé
const generateToken = () => {
    return crypto.randomBytes(24).toString('hex');
};
exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.getAll();
        res.json({ users: allUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await users.getId(id);
        console.log(user, 18);
        if (!user[0]) {
            res.status(400).json({ message: "Le user " + req.params.id + " n'existe pas" });
        }
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
};

exports.createUser = async (req, res) => {
    try {
        const { nom, prenom, mail, pseudo, mdp, mdpbis } = req.body;
        console.log(mdp, 32)
        console.log(mdpbis, 33)
        if (mdp !== mdpbis) {

            res.status(400).json({ message: "Les mdp ne concordent pas", status: 0 });
        }
        // Hacher le mot de passe
        const salt = await bcrypt.genSalt(10); // Générer un sel
        const hashedPassword = await bcrypt.hash(mdp, salt); // Hacher le mot de passe avec le sel

        // Préparer les données pour la création de l'utilisateur
        const data = [nom, prenom, mail, pseudo, hashedPassword];

        // Créer l'utilisateur avec le mot de passe haché
        const response = await users.create(data);
        res.json({ message: "Nouvel utilisateur bien créé", status: 1 });
    } catch (error) {
        res.status(500).json({ error: error.message, status: 0 });
    }
};

exports.modifUser = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = [
        req.body.nom,
        req.body.prenom,
        req.body.mail,
        req.body.niveau,
        req.body.pseudo,
        req.body.mdp,
        id
    ];

    try {
        const user = await users.modif(data);
        res.json({ message: 'Modification réussie' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const id = req.params.id;
        const user = await users.delete(id);
        if (!user) {
            res.status(400).json({ message: "Cet enregistrement n'existe pas" });
        }
        res.json({ message: 'Suppression réussie' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserAuth = async (req, res) => {
    try {
        const { mail, mdp } = req.body;
        const user = await users.get(mail);
        //  console.log(req.body, 89);
        if (!user || user.length === 0) {
            return res.status(400).json({ message: "Erreur d'email ou de mot de passe 1 " });
        }

        const hashedPassword = user[0].mdp;
        const match = await bcrypt.compare(mdp, hashedPassword);
        if (!match) {
            return res.status(400).json({ message: "Erreur d'email ou de mot de passe 2" });
        }

        res.status(200).json({
            message: 'ok',
            user: {
                mail: user[0].mail,
                niveau: user[0].niveau,
                pseudo: user[0].pseudo
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.setLink = async (req, res) => {
    try {
        const { mail } = req.body;

        // Vérification de l'existance de l'email
        const user = await users.get(mail);

        if (!user || user.length === 0) {
            return res.status(400).json({ status: 0, message: "Cet e-mail n'existe pas" });
        }

        // Génération token
        const token = generateToken();
        const resetLink = `http://localhost:5173/new-mdp?mail=${mail}&token=${token}`;
        const data = [token, mail];

        // Vérification si email existe dans recover
        const recover = await recovers.get(mail);
                
        if (!recover[0] || recover[0].length === 0) {
            // Création recover
            const result = await recovers.create(data);
        } else {
            // Mise à jour de l'enregistrement
            const result = await recovers.modif(data);
        }
        // Envoi du mail
        try {
            const result = await EnvoiMail(mail, 'Réinitialisation de mot de passe', resetLink);
            res.status(200).json({ status: 1, message: 'Email envoyé avec succès' });
        } catch (error) {
            console.error(error); // Gérer les erreurs d'envoi de l'e-mail
            res.status(500).json({ status: 0, message: 'Erreur lors de l\'envoi de l\'email' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.setNewMdp = async (req, res) => {
    try {
        const { mail, token, mdp, mdpbis } = req.body;

        if (!mail || mail.length === 0 || !token || token.length === 0) {
            return res.status(400).json({ status: 0, message: "Sécurité compromise niveau 1" });
        }
        // Vérification de l'existance de l'email et token dans Recover
        const record = await recovers.get(mail);
        if (!record[0] || record[0].length === 0) {
            return res.status(400).json({ status: 0, message: "Sécurité compromise niveau 2" });
        }
        const hiddenToken = token;
        if (record[0].token !== hiddenToken) {
            return res.status(400).json({ status: 0, message: "Sécurité compromise niveau 3" });
        }
        if (mdp !== mdpbis) {
            return res.status(400).json({ status: 2, message: "Les mots de passe ne correspondent pas" });
        }
        const salt = await bcrypt.genSalt(10); // Générer un sel
        const hashedPassword = await bcrypt.hash(mdp, salt)
        const data = [hashedPassword, mail];
        
        const user = await users.newMdp(data);
        
        const recover = await recovers.delete(mail);

        // Envoi du mail de confirmation : Tutto bene
        try {
            const result = await EnvoiMail(mail, 'Réinitialisation de mot de passe (fin)', 'OK');
            /* console.log(result); // Afficher le résultat de l'envoi du mail */
            res.status(200).json({ status: 1, message: 'Email envoyé avec succès' });
        } catch (error) {
            console.error(error); // Gérer les erreurs d'envoi de l'e-mail
            res.status(500).json({ status: 0, message: 'Erreur lors de l\'envoi de l\'email' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};