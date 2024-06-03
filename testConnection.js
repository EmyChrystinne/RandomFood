const admin = require("firebase-admin");
require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env

// Inicializa o Firebase Admin SDK com as credenciais de serviço
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// Referência para o Cloud Firestore
const db = admin.firestore();

// Função para testar a conexão ao Firestore
async function testConnection() {
  try {
    const snapshot = await db.collection("RandomFood").get();
    if (snapshot.empty) {
      console.log("Nenhum documento encontrado na coleção RandomFood.");
    } else {
      snapshot.docs.forEach(doc => {
        console.log("Documento encontrado:", doc.data());
      });
    }
    console.log("Conexão ao Firestore bem-sucedida!");
  } catch (error) {
    console.error("Erro ao conectar ao Firestore:", error);
  }
}

// Executa o teste de conexão
testConnection();
