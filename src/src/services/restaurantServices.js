
const restaurantData = require('../data/restaurantData.json');



// Função para buscar todos os restaurantes
const getAllRestaurants = () => {
  console.log('getAllRestaurants');
  return restaurantData;
};

// Função para filtrar restaurantes por categoria
const filterRestaurantsByCategory = (category) => {
  console.log('filterRestaurantsByCategory');
  return restaurantData.filter(restaurant => restaurant.CATEGORIA === category);
};

// Função para filtrar restaurantes por PREÇO_MÉDIO
const filterRestaurantsByPrice = (price) => {
  console.log('filterRestaurantsByPrice');
  return restaurantData.filter(restaurant => restaurant.PREÇO_MEDIO === price);
};

// Função para filtrar restaurantes por refeição
const filterRestaurantsByMeal = (meal) => {
  console.log('filterRestaurantsByMeal');
  return restaurantData.filter(restaurant => restaurant.REFEIÇÃO === meal);
};

// Rota para filtrar restaurantes por localização
const filterRestaurantsByLocation = (location) => {
      
      // Verifica se a localização selecionada é "BAIXA" ou "ALTA"
      if (location === 'BAIXA') {
        console.log('BAIXA');
        // Filtra os restaurantes que têm localização "BAIXA" ou "TODAS"
        const restaurantsByLocation = restaurantService.filterRestaurantsByLocation('BAIXA');
        const restaurantsByLocationAll = restaurantService.filterRestaurantsByLocation('TODAS');
        const filteredRestaurants = [...restaurantsByLocation, ...restaurantsByLocationAll];
        res.json(filteredRestaurants);
      } else if (location === 'ALTA') {
        console.log('ALTA');
        // Filtra os restaurantes que têm localização "ALTA" ou "TODAS"
        const restaurantsByLocation = restaurantService.filterRestaurantsByLocation('ALTA');
        const restaurantsByLocationAll = restaurantService.filterRestaurantsByLocation('TODAS');
        const filteredRestaurants = [...restaurantsByLocation, ...restaurantsByLocationAll];
        res.json(filteredRestaurants);
      } else {
        // Filtra os restaurantes apenas pela localização selecionada
        const restaurantsByLocation = restaurantService.filterRestaurantsByLocation(location);
        res.json(restaurantsByLocation);
      }
    } 
 

// Função para filtrar restaurantes por múltiplos filtros
const filterRestaurants = (filters) => {
    console.log('filterRestaurants');
    return restaurantData.filter(restaurant => {
      // Itera sobre cada filtro selecionado
      for (const key in filters) {
        // Verifica se o filtro não é "TODAS" e se o restaurante não corresponde ao filtro
        if (filters[key] !== 'TODAS' && restaurant[key] !== filters[key]) {
          // Se o restaurante não corresponder a um filtro, retorna falso para excluir da lista filtrada
          return false;
        }
      }
      // Se o restaurante corresponder a todos os filtros, retorna true para incluir na lista filtrada
      return true;
    });
  };
  
  module.exports = {
  filterRestaurants,
  getAllRestaurants,
  filterRestaurantsByCategory,
  filterRestaurantsByPrice,
  filterRestaurantsByMeal,
  filterRestaurantsByLocation
};

