// controllers/authController.js

const admin = require('../config/firebaseConfig');

// Registro de usuário
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({ email, password });
    res.status(200).json({ message: 'Usuário registrado com sucesso', uid: userRecord.uid });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

// Login de usuário
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().getUserByEmail(email);
    // Aqui você pode adicionar verificação adicional, como validação de senha
    res.status(200).json({ message: 'Login bem-sucedido', uid: userRecord.uid });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
};

module.exports = { registerUser, loginUser };
