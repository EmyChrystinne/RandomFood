const NodeCache = require("node-cache");
const admin = require("firebase-admin");

const cache = new NodeCache({ stdTTL: 300 });

// Configurações
const COLLECTION_NAME = "RandomFood";
const CACHE_KEY = "allRestaurants";

// Inicializa o Firebase Admin SDK
const serviceAccount = require("../firebase/randomfoodapp-c286c-firebase-adminsdk-bxzl3-a5e235572b.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://randomfoodapp-c286c-default-rtdb.firebaseio.com",
});
const db = admin.firestore();

// Função para ler dados do Cloud Firestore na coleção especificada
async function getDataFromCollection(collectionName) {
  try {
    const snapshot = await db.collection(collectionName).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Erro ao acessar a coleção ${collectionName}:`, error);
    throw new Error("Erro ao obter dados do banco de dados");
  }
}

// Função para obter todos os restaurantes
async function getAllRestaurants() {
  try {
    let restaurants = cache.get(CACHE_KEY);
    if (!restaurants) {
      const data = await getDataFromCollection(COLLECTION_NAME);
      restaurants = formatData(data);
      cache.set(CACHE_KEY, restaurants);
    }
    return restaurants;
  } catch (error) {
    console.error("Erro ao buscar todos os restaurantes:", error);
    throw error;
  }
}

// Função para formatar os dados dos restaurantes
function formatData(data) {
  return data.map((item) => ({
    id: item.id,
    categoria: item.categoria,
    localizacao: item.localização,
    nome: item.nome,
    preco: item.preço,
    refeicao: item.refeição,
  }));
}

//Tratativa de padronização de nome de campo
function standardizeFieldNames(data) {
  return data.map((item) => ({
    ...item,
    preço: item.preco,
    categoria: item.categoria,
    localização: item.localizacao,
    refeição: item.refeicao,
  }));
}

// Função para filtrar restaurantes
async function filterRestaurants(filters) {
  try {
    const restaurants = await getAllRestaurants();
    return restaurants.filter((restaurant) =>
      matchesFilters(restaurant, filters)
    );
  } catch (error) {
    console.error("Erro ao filtrar restaurantes:", error);
    throw error;
  }
}
// Verifica se um restaurante atende a todos os filtros
function matchesFilters(restaurant, filters) {
  // Padroniza os nomes dos campos no objeto restaurant
  restaurant = standardizeFieldNames([restaurant])[0];

  for (const key in filters) {
    const filterValue = filters[key];
    if (filterValue !== "TODAS") {
      if (key === "categoria" || key === "preco") {
        if (restaurant[key] !== filterValue) {
          return false;
        }
      } else if (Array.isArray(restaurant[key])) {
        if (!restaurant[key].includes(filterValue)) {
          return false;
        }
      } else {
        if (restaurant[key] !== filterValue) {
          return false;
        }
      }
    }
  }
  return true;
}

// Função para obter um restaurante aleatório com base nos filtros
async function getRandomRestaurant(filters) {
  try {
    const filteredRestaurants = await filterRestaurants(filters);

    if (filteredRestaurants.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * filteredRestaurants.length
      );
      return filteredRestaurants[randomIndex];
    } else {
      throw new Error(
        "Nenhum restaurante encontrado com base nos filtros fornecidos"
      );
    }
  } catch (error) {
    console.error("Erro ao buscar restaurante aleatório:", error);
    throw error;
  }
}

module.exports = {
  getAllRestaurants,
  filterRestaurants,
  getDataFromCollection,
  getRandomRestaurant,
};
