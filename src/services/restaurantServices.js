const NodeCache = require("node-cache");
const { getDataFromPath } = require("../routes/banco.js");

const cache = new NodeCache({ stdTTL: 300 }); // TTL padrão de 300 segundos (5 minutos)

// Função para buscar todos os restaurantes com cache
const getAllRestaurants = async () => {
  try {
    const cacheKey = "allRestaurants";
    let restaurants = cache.get(cacheKey);

    if (!restaurants) {
      const data = await getDataFromPath("/");
      if (data) {
        restaurants = formatData(data);
        cache.set(cacheKey, restaurants); // Armazena no cache
      } else {
        throw new Error("No data available");
      }
    }

    return restaurants;
  } catch (error) {
    console.error("Erro ao buscar todos os restaurantes:", error);
    throw error;
  }
};

// Função para formatar os dados obtidos
function formatData(data) {
  return Object.entries(data).map(([id, item]) => ({
    id,
    Categoria: item.Categoria,
    Localização: item.Localização,
    NOME: item.NOME,
    Preço: item.Preço,
    Refeição: item.Refeição,
  }));
}

// Função para filtrar restaurantes por categoria
const filterRestaurantsByCategory = async (category) => {
  try {
    const restaurants = await getAllRestaurants();
    return restaurants.filter(
      (restaurant) => restaurant.Categoria === category
    );
  } catch (error) {
    console.error("Erro ao filtrar restaurantes por categoria:", error);
    throw error;
  }
};

// Função para filtrar restaurantes por preço
const filterRestaurantsByPrice = async (price) => {
  try {
    const restaurants = await getAllRestaurants();
    return restaurants.filter((restaurant) => restaurant.Preço === price);
  } catch (error) {
    console.error("Erro ao filtrar restaurantes por preço:", error);
    throw error;
  }
};

// Função para filtrar restaurantes por refeição
const filterRestaurantsByMeal = async (meal) => {
  try {
    const restaurants = await getAllRestaurants();
    return restaurants.filter((restaurant) => restaurant.Refeição === meal);
  } catch (error) {
    console.error("Erro ao filtrar restaurantes por refeição:", error);
    throw error;
  }
};

// Função para filtrar restaurantes por localização
const filterRestaurantsByLocation = async (location) => {
  try {
    const restaurants = await getAllRestaurants();
    if (location === "BAIXA" || location === "ALTA") {
      return restaurants.filter(
        (restaurant) =>
          restaurant.Localização === location ||
          restaurant.Localização === "TODAS"
      );
    } else {
      return restaurants.filter(
        (restaurant) => restaurant.Localização === location
      );
    }
  } catch (error) {
    console.error("Erro ao filtrar restaurantes por localização:", error);
    throw error;
  }
};

// Função para filtrar restaurantes por múltiplos filtros
const filterRestaurants = async (filters) => {
  try {
    const restaurants = await getAllRestaurants();
    return restaurants.filter((restaurant) => {
      for (const key in filters) {
        if (filters[key] !== "TODAS" && restaurant[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });
  } catch (error) {
    console.error("Erro ao filtrar restaurantes por múltiplos filtros:", error);
    throw error;
  }
};

module.exports = {
  getAllRestaurants,
  filterRestaurantsByCategory,
  filterRestaurantsByPrice,
  filterRestaurantsByMeal,
  filterRestaurantsByLocation,
  filterRestaurants,
};
