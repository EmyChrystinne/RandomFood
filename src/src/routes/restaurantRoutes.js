const express = require('express');
const router = express.Router();
const restaurantService = require('../services/restaurantServices.js');

// Rota para buscar uma seleção aleatória de restaurantes
router.get('/restaurants/restaurantRoute', (req, res) => {
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

//const cors = require('cors');
// const express = require('express');
// const router = express.Router();
// const restaurantService = require('../services/restaurantServices.js');

// // Rota para buscar uma seleção aleatória de restaurantes
// router.get('/restaurants/restaurantRoute', (req, res) => {
//     try {
//       // Obtém o número total de restaurantes
//       const filteringdRestaurants = restaurantService.getAllRestaurants().length;
  
//       // Gera um índice aleatório dentro do intervalo do número total de restaurantes
//       const randomIndex = Math.floor(Math.random() * filteringdRestaurants);
  
//       // Obtém o restaurante aleatório com base no índice gerado
//       const  filteredRestaurants= restaurantService.getAllRestaurants()[randomIndex];
  
//       // Retorna o restaurante aleatório como resposta
//       res.json(filteredRestaurants);
//     } catch (error) {
//       console.error('Erro ao buscar seleção aleatória de restaurantes:', error);
//       res.status(500).json({ message: 'Erro ao buscar seleção aleatória de restaurantes' });
//     }
//   });

// module.exports = router;