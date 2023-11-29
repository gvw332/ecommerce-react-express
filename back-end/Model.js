const mysql = require('mysql');

class Model {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'ecommerce-react'
    });

    this.connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion à la base de données : ', err);
      } else {
        console.log('Connexion à la base de données réussie !');
      }
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  close() {
    this.connection.end();
  }
}

module.exports = Model;