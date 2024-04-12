// routes.js
const cors = require('cors');
const express = require('express');
const router = express.Router();
const restaurantService = require('../services/restaurantServices.js');


// Rota para buscar uma seleção aleatória de restaurantes
router.get('/restaurants/random', (req, res) => {
  try {
    // Obtém o número total de restaurantes
    const totalRestaurants = restaurantService.getAllRestaurants().length;

    // Gera um índice aleatório dentro do intervalo do número total de restaurantes
    const randomIndex = Math.floor(Math.random() * totalRestaurants);

    // Obtém o restaurante aleatório com base no índice gerado
    const randomRestaurant = restaurantService.getAllRestaurants()[randomIndex];

    // Retorna o restaurante aleatório como resposta
    res.json(randomRestaurant);
  } catch (error) {
    console.error('Erro ao buscar seleção aleatória de restaurantes:', error);
    res.status(500).json({ message: 'Erro ao buscar seleção aleatória de restaurantes' });
  }
});

// Rota para buscar todos os restaurantes
router.get('/restaurants', (req, res) => {
    try {
      const allRestaurants = restaurantService.getAllRestaurants();
      res.json(allRestaurants);
    } catch (error) {
      console.error('Erro ao buscar todos os restaurantes:', error);
      res.status(500).json({ message: 'Erro ao buscar todos os restaurantes' });
    }
  });
  
  // Rota para filtrar restaurantes por vários filtros
  router.get('/restaurants/filter', (req, res) => {
    try {
      // Extrair os parâmetros de filtro da query string da URL
      const { category, meal, price, location } = req.query;
  
      // Inicializar variável para armazenar os restaurantes filtrados
      let filteredRestaurants = restaurantService.getAllRestaurants();
  
      // Aplicar filtro por categoria, se fornecido
      if (category) {
        const categories = category.split(','); // Se houver múltiplas categorias separadas por vírgula
        filteredRestaurants = filteredRestaurants.filter(restaurant => categories.includes(restaurant.CATEGORIA));
      }
  
      // Aplicar filtro por refeição, se fornecido
      if (meal) {
        const meals = meal.split(','); // Se houver múltiplas refeições separadas por vírgula
        filteredRestaurants = filteredRestaurants.filter(restaurant => meals.includes(restaurant.REFEIÇÃO));
      }
  
      // Aplicar filtro por PREÇO_MÉDIO, se fornecido
      if (price) {
        const prices = price.split(','); // Se houver múltiplos preços separados por vírgula
        filteredRestaurants = filteredRestaurants.filter(restaurant => prices.includes(restaurant.PREÇO_MEDIO)); // Verifique se o preço está incluído na lista de preços fornecida
      }
  
      // Aplicar filtro por localização, se fornecido
      if (location) {
        const locations = location.split(','); // Se houver múltiplas localizações separadas por vírgula
        filteredRestaurants = filteredRestaurants.filter(restaurant => locations.includes(restaurant.LOCALIZAÇÃO));
      }
  
      // Retornar os restaurantes filtrados
      res.json(filteredRestaurants);
    } catch (error) {
      console.error('Erro ao filtrar restaurantes:', error);
      res.status(500).json({ message: 'Erro ao filtrar restaurantes' });
    }
  });

// routes.js


router.get('/restaurants/restaurantRoute', (req, res) => {
    try {
      const { route } = req.query; // Obtenha os dados da rota da query
      console.log('Rota1:', route);

      

      // Selecione aleatoriamente um objeto da rota
      const randomIndex = Math.floor(Math.random() * routeData.length);
      const randomRestaurant = routeData[randomIndex];

      // Retorna o restaurante aleatório como resposta
      res.json(randomRestaurant);
    } catch (error) {
      console.error('Erro ao buscar seleção 6aleatória de restaurantes:', error);
      res.status(500).json({ message: 'Erro ao buscar seleção aleatória de restaurantes1' });
    }
});

module.exports = router;

  
