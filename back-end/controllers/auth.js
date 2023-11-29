const AuthModel = require('../models/auth');
const bcrypt = require('bcrypt');
const users = new UsersModel();

exports.getUser = async (req, res) => {
    try {
        const user = await users.getUser();
        res.json({ user: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
