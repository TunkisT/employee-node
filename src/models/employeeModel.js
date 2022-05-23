const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function getEmployeeFromDb(user_id) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `SELECT * FROM employes WHERE user_id = ?`;
    const [result] = await connection.execute(sql, [user_id]);
    await connection.close();
    return result;
  } catch (error) {
    return false;
  }
}

async function putEmployeeToDb(data) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO employes (name, surname, email, address, phone, user_id) 
    VALUES (?, ?, ?, ?, ?, ?)`;
    const { name, surname, email, address, phone, user_id } = data;
    const [result] = await connection.execute(sql, [
      name,
      surname,
      email,
      address,
      phone,
      user_id,
    ]);
    await connection.close();
    return result;
  } catch (error) {
    return false;
  }
}

module.exports = {
  getEmployeeFromDb,
  putEmployeeToDb,
};
