const mysql = require('mysql');

const conexao = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '29121950',
  database: 'schedule-petshop'
})

module.exports = conexao;