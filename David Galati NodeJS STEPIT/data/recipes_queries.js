// documentatie modul mysql: https://github.com/mysqljs/mysql

const mysql = require('mysql');

/* Aici trebuie sa va configurati datele de contact daca folositi o bd remote */
const db_config = {
  host     : 'eu-cdbr-west-02.cleardb.net',
  user     : 'b4bb930a159244',
  password : '9b66f659',
  database : 'heroku_88ea205d633f742',
};
// mysql://b4bb930a159244:9b66f659@eu-cdbr-west-02.cleardb.net/heroku_88ea205d633f742?reconnect=true
// /* Daca folositi serverul local */
// const db_config = {
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'stepjs',
// };

const pool = mysql.createPool(db_config);

module.exports = {
  /**
   * Obtine toate inregistrarile din recipes; 
   * @returns o Promise care se rezolva cu rezultatele
   */
  all_recipes: () => {
    return new Promise((resolve, reject)=>{
      pool.query('SELECT * FROM recipes ORDER BY created_at DESC', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },  
  
  /** 
   * Creeaza o noua inregistrare
   * @returns o Promise  
   */
  createRecipe: (title, ingredients, directions) => {
    return new Promise((resolve, reject) => { 
      const sql = 'INSERT INTO recipes (title, ingredients, directions) VALUES (?, ?, ?)';
      pool.query( sql, [title, ingredients, directions], (error, results) => {
        if(error) return reject(error);
        resolve(results);        
      }); 
    })
  },

  deleteRecipe: (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM recipes WHERE recipe_id = ?';
      pool.query(sql, id, (err, result)=>{
        if(err) return reject(err);
        resolve(result);
      })
    });
  },

  updateRecipe: (id, title, ingredients, directions) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE recipes
        SET title = ?,
        directions = ?, 
        ingredients = ?
        WHERE recipe_id = ? 
      `;
      pool.query(sql, [title, directions, ingredients, id], (err, result)=>{
        if(err) return reject(err);
        resolve(result);
      });
      
    });
  }

}


 