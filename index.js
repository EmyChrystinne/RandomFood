const express = require('express');
const app = express();
const routes = require('./src/routes/routes.js');
const bancoRouter = require('./src/routes/banco.js'); // Corrigido para atribuir diretamente o router
require('dotenv').config();

// Configuração do middleware para o parsing do corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para configuração dos headers CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite acesso de qualquer origem
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Headers permitidos
  next();
});

// Configuração das rotas
app.use('/api/routes', routes); // Prefixo para outras rotas
app.use('/api/categorias', bancoRouter); // Prefixo para rotas relacionadas a banco

// Inicialização do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
