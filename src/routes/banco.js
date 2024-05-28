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
      // Transformar os dados para o formato desejado
      const categorias = Object.entries(data).map(([id, item]) => ({
        id,
        Categoria: item.Categoria
      }));
      const precos = Object.entries(data).map(([id, item]) => ({
        id,
        Preço: item.Preço
      }));
      const localizacoes = Object.entries(data).map(([id, item]) => ({
        id,
        Localização: item.Localização
      }));
      const nomes = Object.entries(data).map(([id, item]) => ({
        id,
        NOME: item.NOME
      }));
      const refeicoes = Object.entries(data).map(([id, item]) => ({
        id,
        Refeição: item.Refeição
      }));

      res.json({ 
        'Nome': nomes, 
        'Categoria': categorias, 
        'Preço': precos, 
        'Localização': localizacoes, 
        'Refeição': refeicoes 
      });
    } else {
      res.status(404).json({ error: 'No data available' });
    }
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    res.status(500).json({ error: 'Erro ao obter dados' });
  }
});

module.exports = router;
