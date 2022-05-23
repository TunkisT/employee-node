const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');
const { failResponse } = require('../utils/dbHelpers');

async function addUserToDb(data) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    const { username, email, password } = data;
    const [result] = await connection.execute(sql, [username, email, password]);
    await connection.close();
    return result;
  } catch (error) {
    return false;
  }
}

module.exports = {
  addUserToDb,
};
