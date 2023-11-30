const ProduitsModel = require('../models/produits');

const produits = new ProduitsModel();

exports.getAllProduits = async (req, res) => {
    try {
        const allProduits = await produits.getAll();
        res.json({ produits: allProduits });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProduitById = async (req, res) => {
    try {
        const id = req.params.id;
        const produit = await produits.get(id);
        // console.log(produit, 18);
        if(!produit[0]){
            res.status(400).json({ message: "Le produit " + req.params.id +" n'existe pas" }); 
        }
        res.json(produit[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProduit = async (req, res) => {
    try {
        const  image  = req.file; 
        if(!req.file){
            res.status(400).json({ message: "Vous devez envoyer une image" }); 
        }
        const { title, price, details} = req.body;
        const data = [title, price, details, image.filename];
        const response = await produits.create(data); 
        //console.log('produit ajouté :' + req.file.filename,  34);
        res.status(200).json({ message: "Nouveau produit bien ajouté", status: 1 });
    } catch (error) {
        res.status(500).json({ error: error.message, status: 0 });
    }
};


exports.modifProduit = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = [req.body.title, req.body.price, req.body.details, id];
    //console.log('req:', data);
    try {
        const produit = await produits.modif(data);
        res.json({ message: 'Modification réussie' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduit = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const id = req.params.id;
        const produit = await produits.delete(id);
        if(!produit){
            res.status(400).json({ message: "Cet enregistrement n'existe pas" });     
        }
        res.json({ 
            message: 'Suppression réussie', 
            status : 1 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};