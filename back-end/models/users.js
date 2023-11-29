const Model = require('../Model');

class UsersModel {
  constructor() {
    this.model = new Model();
  }
/*   getAll, get, create, modif, delete  */

  getAll() {

    const sql = 'SELECT * FROM users';
    return this.model.query(sql);
  }

  get(id) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    return this.model.query(sql, id);
  }

  create(data) {
    //console.log(data, 20);
    const sql = 'INSERT INTO  users (id, nom, prenom, mail, niveau, pseudo, mdp) VALUES (null, ?, ?, ?, ?, ?, ?)';
    return this.model.query(sql, data);
  }

  modif(data) {
    const sql = 'UPDATE users SET nom = ?, prenom = ?, mail = ?, niveau = ?, pseudo = ?, mdp = ? WHERE id = ?';
    return this.model.query(sql, data);
  }

  delete(id) {
    const sql = 'DELETE FROM users WHERE id = ?';
    return this.model.query(sql, id);
  }
}

module.exports = UsersModel;