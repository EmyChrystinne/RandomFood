const express = require('express');
const router = express.Router();
const restaurantService = require('../services/restaurantServices.js');

// Rota para retornar uma seleção aleatória de restaurantes
router.get('/restaurants/random', (req, res) => {
  try {
    const randomRestaurants = restaurantService.getRandomRestaurants();
    res.json(randomRestaurants);
  } catch (error) {
    console.error('Erro ao obter seleção aleatória de restaurantes:', error);
    res.status(500).json({ message: 'Erro ao obter seleção aleatória de restaurantes' });
  }
});

module.exports = router;
