const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');
const { failResponse } = require('../utils/dbHelpers');

async function addUserToDb(username, email, password) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    const [result] = await connection.execute(sql, [username, email, password]);
    await connection.close();
    return result;
  } catch (error) {
    return false;
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
