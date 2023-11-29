const Model = require('../Model');

class AuthModel {
  constructor() {
    this.model = new Model();
  }
/*   getAll, get, create, modif, delete  */

  getUser() {

    const sql = 'SELECT * FROM users WHERE mail=?, mdp=?';
    return this.model.query(sql);
  }

}

module.exports = UsersModel;