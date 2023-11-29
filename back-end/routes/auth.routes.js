const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { getUser} = require('../controllers/auth');
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

router.post('/', getUser);


module.exports = router;