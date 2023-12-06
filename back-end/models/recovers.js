const Model = require('../Model');

class RecoversModel {
  constructor() {
    this.model = new Model();
  }
/*   getAll, get, create, modif, delete  */

  getAll() {

    const sql = 'SELECT * FROM recover';
    return this.model.query(sql);
  }
  getId(id) {
    const sql = 'SELECT * FROM recover WHERE id = ?';
    return this.model.query(sql, id);
  }
  get(mail) {
    const sql = 'SELECT * FROM recover WHERE mail = ?';
    return this.model.query(sql, mail);
  }
  create(data) {
      
    const sql = 'INSERT INTO  recover (id, token, mail ) VALUES (null, ?, ?)';
    return this.model.query(sql, data);
  }
  modif(data) {
    const sql = 'UPDATE recover SET token = ? WHERE mail = ?';
    return this.model.query(sql, data);
  }
  delete(mail) {
    const sql = 'DELETE FROM recover WHERE mail = ?';
    return this.model.query(sql, mail);
  }
}

module.exports = RecoversModel;