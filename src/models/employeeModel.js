const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function getEmployeeFromDb(user_id) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `SELECT * FROM employes WHERE user_id = ?`;
    const [userFound] = await connection.execute(sql, [user_id]);
    await connection.close();
    return userFound;
  } catch (error) {
    return false;
  }
}

module.exports = {
  getEmployeeFromDb,
};
