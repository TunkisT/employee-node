const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function addUserToDb(email, password) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
    const [result] = await connection.execute(sql, [email, password]);
    await connection.close();
    return result;
  } catch (error) {
    return { success: false, message: error.sqlMessage };
  }
}

async function getUserFromDb(email) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `SELECT * FROM users WHERE email = ?`;
    const [userFound] = await connection.execute(sql, [email]);
    await connection.close();
    return userFound;
  } catch (error) {
    return false;
  }
}

module.exports = {
  addUserToDb,
  getUserFromDb,
};
