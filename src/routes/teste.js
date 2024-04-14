

// Configurações de conexão com o banco de dados Oracle
const dbConfig = {
  user: '****',
  password: '***',
  connectString: '***'
};

// Rota para obter todas as categorias
router.get('/categorias', async (req, res) => {
  try {
    // Conecte-se ao banco de dados
    const connection = await oracleDB.getConnection(dbConfig);

    // Consulta SQL para obter todas as categorias
    const query= 'SELECT * FROM categorias';
    const query1 = 'SELECT * FROM preco';
    const query2 = 'SELECT * FROM refeicao';
    const query3 = 'SELECT * FROM localizacao';

    // Executar a consulta
    const result = await connection.execute(query);
    const result1 = await connection.execute(query1);
    const result2 = await connection.execute(query2);
    const result3 = await connection.execute(query3);

    // Fechar a conexão com o banco de dados
    await connection.close();

    // Extrair as categorias do resultado da consulta
    const categorias = result.rows.map(row => row[0]); // Supondo que o nome da coluna da categoria seja a primeira coluna
    const preco = result1.rows.map(row => row[0]);
    const refeicao = result2.rows.map(row => row[0]);
    const localizacao = result3.rows.map(row => row[0]);

    // Enviar as categorias como resposta
    res.json(categorias);
  } catch (error) {
    console.error('Erro ao obter categorias:', error);
    res.status(500).json({ error: 'Erro ao obter categorias' });
  }
});

module.exports = router;
