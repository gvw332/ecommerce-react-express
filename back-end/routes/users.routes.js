const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { getAllUsers, 
        getUserById, 
        modifUser, 
        createUser, 
        deleteUser,
        getUserAuth,
        setLink, 
        setNewMdp
        
    } = require('../controllers/users');
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

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', modifUser);
router.delete('/:id', deleteUser);
router.post('/', createUser);
router.post('/auth', getUserAuth); 
router.post('/reset-mdp', setLink); 
router.post('/new-mdp', setNewMdp);
module.exports = router;