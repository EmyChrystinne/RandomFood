const express = require('express');
const router = express.Router();
const restaurantService = require('../services/restaurantServices.js');

let routeData = [];

// Rota para buscar uma seleção aleatória de restaurantes
router.get('/random', async (req, res) => {
  try {
    // Obtém o número total de restaurantes
    const totalRestaurants = (await restaurantService.getAllRestaurants()).length;

    // Gera um índice aleatório dentro do intervalo do número total de restaurantes
    const randomIndex = Math.floor(Math.random() * totalRestaurants);

    // Obtém o restaurante aleatório com base no índice gerado
    const randomRestaurant = (await restaurantService.getAllRestaurants())[randomIndex];

    // Retorna o restaurante aleatório como resposta
    res.json(randomRestaurant);
  } catch (error) {
    console.error('Erro ao buscar seleção aleatória de restaurantes:', error);
    res.status(500).json({ message: 'Erro ao buscar seleção aleatória de restaurantes' });
  }
});

// Rota para buscar todos os restaurantes
router.get('/restaurants', async (req, res) => {
  try {
    const allRestaurants = await restaurantService.getAllRestaurants();
    routeData = allRestaurants; // Atualiza routeData com todos os restaurantes
    res.json(allRestaurants);
  } catch (error) {
    console.error('Erro ao buscar todos os restaurantes:', error);
    res.status(500).json({ message: 'Erro ao buscar todos os restaurantes' });
  }
});
  
// Rota para filtrar restaurantes por vários filtros
router.get('/restaurants/filter', async (req, res) => {
  try {
    // Extrair os parâmetros de filtro da query string da URL
    const { Categoria, Refeição, Preço, Localização } = req.query;

    // Inicializar variável para armazenar os restaurantes filtrados
    let filteredRestaurants = await restaurantService.getAllRestaurants();

    // Aplicar filtro por categoria, se fornecido
    if (Categoria) {
      const categories = Categoria.split(','); // Se houver múltiplas categorias separadas por vírgula
      filteredRestaurants = filteredRestaurants.filter(restaurant => categories.includes(restaurant.Categoria));
    }

    // Aplicar filtro por refeição, se fornecido
    if (Refeição) {
      const meals = Refeição.split(','); // Se houver múltiplas refeições separadas por vírgula
      filteredRestaurants = filteredRestaurants.filter(restaurant => meals.includes(restaurant.Refeição));
    }

    // Aplicar filtro por PREÇO_MÉDIO, se fornecido
    if (Preço) {
      const Preços = Preço.split(','); // Se houver múltiplos preços separados por vírgula
      filteredRestaurants = filteredRestaurants.filter(restaurant => Preços.includes(restaurant.Preço)); // Verifique se o preço está incluído na lista de preços fornecida
    }

    // Aplicar filtro por localização, se fornecido
    if (Localização) {
      const Localizaçãos = Localização.split(','); // Se houver múltiplas localizações separadas por vírgula
      filteredRestaurants = filteredRestaurants.filter(restaurant => Localização.includes(restaurant.Localização));
    }

    // Atualiza routeData com os restaurantes filtrados
    routeData = filteredRestaurants;

    // Retornar os restaurantes filtrados
    res.json(filteredRestaurants);
  } catch (error) {
    console.error('Erro ao filtrar restaurantes:', error);
    res.status(500).json({ message: 'Erro ao filtrar restaurantes' });
  }
});

// Rota para obter um restaurante aleatório da rota atual
router.get('/restaurants/restaurantRoute', (req, res) => {
  try {
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
