const express = require("express");
const app = express();
const router = require("./src/routes/routes");
const cors = require('cors');


// Configuração do middleware para o parsing do corpo das requisições
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite acesso de qualquer origem
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Headers permitidos
  next();
})

// Configuração das rotas
app.use("/api/", router); // Use o router, não o routes diretamente

// Inicialização do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
