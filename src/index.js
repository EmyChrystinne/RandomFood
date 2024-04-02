// app.js (ou index.js)

const express = require('express');
const app = express();
const routes = require('./src/routes/routes.js');

// Configuração do middleware para o parsing do corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração das rotas
app.use('/api', routes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
