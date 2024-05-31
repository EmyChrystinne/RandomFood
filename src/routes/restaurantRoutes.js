const express = require('express');
const router = express.Router();
const restaurantService = require('../services/restaurantServices.js');

// Rota para buscar uma seleção aleatória de restaurantes
router.get('/restaurantRoute', (req, res) => {
    try {
      const { route } = req.query; // Obtenha os dados da rota da query
      console.log('Rota:', route);

      // Converta a string JSON em um array de objetos
      const routeData = JSON.parse(route);

      // Verifique se há dados na rota
      if (!routeData || routeData.length === 0) {
        throw new Error('Nenhum restaurante encontrado com os critérios fornecidos.');
      }

      // Selecione aleatoriamente um objeto da rota
      const randomIndex = Math.floor(Math.random() * routeData.length);
      const randomRestaurant = routeData[randomIndex];

      // Retorna o restaurante aleatório como resposta
      res.json(randomRestaurant);
    } catch (error) {
      console.error('Erro ao buscar seleção aleatória de restaurantes:', error);
      res.status(500).json({ message: 'Erro ao buscar seleção aleatória de restaurantes' });
    }
});

module.exports = router;
