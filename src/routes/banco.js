// const firebase = require("firebase/app");
// const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
// const { getFirestore } = require('firebase-admin/firestore');
const firebase = require('firebase/app');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');

const express = require('express');
const router = express.Router();

require('dotenv').config();

const serviceAccount = require("../data/serviceAccountKey");

const adminConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://randomfoodapp-c286c-default-rtdb.firebaseio.com/'
};

// Inicialize o Firebase Admin SDK apenas uma vez
const firebaseApp = admin.initializeApp(adminConfig);

module.exports = firebaseApp;

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);
console.log('Firebase inicializado');

// Referência para o Firestore


const db = getFirestore();
console.log('db:', db);


const collectionRef = db.collection('default');
collectionRef.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log("dado",doc.id, '=>', doc.data());
  });
}).catch((error) => {
  console.log('Erro ao recuperar documentos:', error);
});

// Obter dados das categorias, preços, localizações e nomes de restaurantes
router.get('/botoes', async (req, res) => {
  try {
    const categoriasSnapshot = await db.collection('Categoria').get(); 
    const categorias = categoriasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('categorias:', categorias);

    const precosSnapshot = await db.collection('Preço').get();
    const precos = precosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const localizacoesSnapshot = await db.collection('Localização').get();
    const localizacoes = localizacoesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const restaurantesSnapshot = await db.collection('NOME').get();
    const nome = restaurantesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const refeicao = await db.collection('Refeição').get();
    const refeicoes = refeicao.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // console.log('refeicoes:', refeicoes);

    // res.json({ categoria, preço, localizacão, nome, refeição });
    res.json({ 'Nome': nome, 'Categoria': categorias, 'Preço': precos, 'Localização': localizacoes, 'Refeição': refeicoes});
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    res.status(500).json({ error: 'Erro ao obter dados' });
  }
});

module.exports = router;




