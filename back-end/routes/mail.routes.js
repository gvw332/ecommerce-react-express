const express = require('express');
const router = express.Router();
const { EnvoiMail } = require('../controllers/mail');

router.post('/', EnvoiMail);

module.exports = router;