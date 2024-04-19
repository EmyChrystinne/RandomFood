// Importar a biblioteca de cliente Oracle
const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
require('dotenv').config();

// Configurações de conexão com o banco de dados Oracle Autonomous Database
const dbConfig = {
  user: process.env.USERDB,
  password: process.env.PASSWORDDB,
  connectString: process.env.CONNECTSTRINGDB
};
let consulta=[];
async function closeOpenConnections() {
 // Conectar ao banco de dados
 let connection = await oracledb.getConnection(dbConfig);
 openConnections.push(connection);
 if (connection)
 console.log('Conexão ao banco de dados estabelecida');
 else
 console.log('Conexão ao banco de dados falhou');

 // Consultas SQL para obter todas as categorias, preços, refeições e localizações
 let queryCategorias = 'SELECT * FROM categorias';
 let queryPreco = 'SELECT * FROM preco';
 let queryRefeicao = 'SELECT * FROM refeicao';
 let queryLocalizacao = 'SELECT * FROM localizacao';

 // Executar as consultas
 const resultCategorias = await connection.execute(queryCategorias);
 const resultPreco = await connection.execute(queryPreco);
 const resultRefeicao = await connection.execute(queryRefeicao);
 const resultLocalizacao = await connection.execute(queryLocalizacao);

 // Fechar a conexão com o banco de dados
 await connection.close();

 // Extrair os dados dos resultados das consultas
 const categorias = resultCategorias.rows;
 const preco = resultPreco.rows;
 const refeicao = resultRefeicao.rows;
 const localizacao = resultLocalizacao.rows;
 console.log('Categorias:', categorias);
 console.log('preco:', preco); 
 console.log('refeicao:', refeicao);
 console.log('localizacao:', localizacao);
 
}
// Rota para obter todas as categorias
router.get('/categorias', async (req, res) => {
  try {
    console.log('==',consulta)
    console.log(closeOpenConnections)
    // Enviar os dados como respostares.json({ categorias, preco, refeicao, localizacao });
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    res.status(500).json({ error: 'Erro ao obter dados' });
  }
});

module.exports = router;
