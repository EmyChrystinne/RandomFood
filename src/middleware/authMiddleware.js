// middleware/authMiddleware.js

const admin = require('../config/firebaseConfig');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token de autenticação não fornecido' });
    }

    // Verificar o token JWT usando o Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Adicionar informações do usuário decodificado ao objeto de solicitação
    next();
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return res.status(401).json({ message: 'Falha na autenticação do usuário' });
  }
};

module.exports = authenticateUser;
