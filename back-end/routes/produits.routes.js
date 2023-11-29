const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { getAllProduits, 
        getProduitById, 
        modifProduit, 
        createProduit, 
        deleteProduit
    } = require('../controllers/produits');
//
// Destination sur ce serveur du répertoire de sauvegarde
//
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, '..', 'public', 'images');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: fileStorageEngine
});

router.get('/', getAllProduits);
router.get('/:id', getProduitById);
router.put('/:id', modifProduit);
router.delete('/:id', deleteProduit);
router.post('/', upload.single('image'), createProduit); 

module.exports = router;