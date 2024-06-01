const express = require("express");
const app = express();
const router = require("./src/routes/routes");

// Middleware para parsing do corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração das rotas
app.use("/api/", router); // Use o router, não o routes diretamente

// Inicialização do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
