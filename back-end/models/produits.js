const Model = require('../Model');

class ProduitsModel {
  constructor() {
    this.model = new Model();
  }
/*   getAll, get, create, modif, delete  */

  getAll() {

    const sql = 'SELECT * FROM produits';
    return this.model.query(sql);
  }

  get(id) {
    const sql = 'SELECT * FROM produits WHERE title = ?';
    return this.model.query(sql, id);
  }

  create(data) {
    //console.log(data, 20);
    const sql = 'INSERT INTO  produits (id, title, price, details, image) VALUES (null, ?, ?, ?, ?)';
    return this.model.query(sql, data);
  }

  modif(data) {
    const sql = 'UPDATE produits SET title = ?, price = ?, details = ? WHERE id = ?';
    return this.model.query(sql, data);
  }

  delete(id) {
    const sql = 'DELETE FROM produits WHERE id = ?';
    return this.model.query(sql, id);
  }
}

module.exports = ProduitsModel;