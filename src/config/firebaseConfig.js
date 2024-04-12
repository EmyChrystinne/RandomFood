// config/firebaseConfig.js

const admin = require('firebase-admin');

// Configure o SDK do Firebase
const serviceAccount = require('../path/to/serviceAccountKey.json'); // Substitua pelo caminho do seu arquivo de credenciais
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Outras configurações, se necessário
});

module.exports = admin;
