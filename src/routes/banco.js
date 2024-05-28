const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
require('dotenv').config();

// Inicialize o Firebase Admin SDK com as credenciais de serviço
const serviceAccount = require("../data/serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://randomfoodapp-c286c-default-rtdb.firebaseio.com/'
});

// Referência para o Realtime Database
const db = admin.database();

// Função para ler dados do Realtime Database no caminho especificado
async function getDataFromPath(path) {
  const ref = db.ref(path);
  const snapshot = await ref.once('value');
  return snapshot.val();
}

// Rota para obter dados do Realtime Database
router.get('/botoes', async (req, res) => {
  try {
    const data = await getDataFromPath('/');
    if (data) {
      // Transformar os dados em um array de objetos
      const formattedData = Object.entries(data).map(([id, item]) => ({
        id,
        Categoria: item.Categoria,
        Localização: item.Localização,
        NOME: item.NOME,
        Preço: item.Preço,
        Refeição: item.Refeição
      }));

      res.json(formattedData);
    } else {
      res.status(404).json({ error: 'No data available' });
    }
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    res.status(500).json({ error: 'Erro ao obter dados' });
  }
});

module.exports = router;
