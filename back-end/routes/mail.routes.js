const express = require('express');
const router = express.Router();
const { EnvoiMail } = require('../controllers/mail');

router.get('/', EnvoiMail);

module.exports = router;