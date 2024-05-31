const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();
require("dotenv").config();

// Inicialize o Firebase Admin SDK com as credenciais de serviço
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

// Referência para o Realtime Database
const db = admin.database();

// Função para ler dados do Realtime Database no caminho especificado
async function getDataFromPath(path) {
  try {
    const ref = db.ref(path);
    const snapshot = await ref.once("value");
    return snapshot.val();
  } catch (error) {
    console.error(`Erro ao acessar o caminho ${path}:`, error);
    throw new Error("Erro ao obter dados do banco de dados");
  }
}

// Função para formatar os dados obtidos
function formatData(data) {
  return Object.entries(data).map(([id, item]) => ({
    id,
    Categoria: item.Categoria,
    Localização: item.Localização,
    NOME: item.NOME,
    Preço: item.Preço,
    Refeição: item.Refeição,
  }));
}

// Rota para obter dados do Realtime Database
router.get("/botoes", async (req, res) => {
  try {
    const data = await getDataFromPath("/");
    if (data) {
      const formattedData = formatData(data);
      res.json(formattedData);
    } else {
      res.status(404).json({ error: "No data available" });
    }
  } catch (error) {
    console.error("Erro ao obter dados:", error);
    res.status(500).json({ error: "Erro ao obter dados" });
  }
});

module.exports = router;
