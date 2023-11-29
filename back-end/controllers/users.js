const UsersModel = require('../models/users');
const bcrypt = require('bcrypt');
const users = new UsersModel();

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
        const user = await users.get(id);
        console.log(user, 18);
        if(!user[0]){
            res.status(400).json({ message: "Le user " + req.params.id +" n'existe pas" }); 
        }
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
};

exports.createUser = async (req, res) => {
    try {
        const { nom, prenom, mail, niveau, pseudo, mdp } = req.body;

        // Hacher le mot de passe
        const salt = await bcrypt.genSalt(10); // Générer un sel
        const hashedPassword = await bcrypt.hash(mdp, salt); // Hacher le mot de passe avec le sel

        // Préparer les données pour la création de l'utilisateur
        const data = [nom, prenom, mail, niveau, pseudo, hashedPassword]; 

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

    //console.log('req:', data);
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
        if(!user){
            res.status(400).json({ message: "Cet enregistrement n'existe pas" });     
        }
        res.json({ message: 'Suppression réussie' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};