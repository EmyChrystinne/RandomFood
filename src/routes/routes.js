const express = require("express");

const router = express.Router();
require("dotenv").config();
const {
  getAllRestaurants,
  filterRestaurants,
  getDataFromCollection,
  getRandomRestaurant,
} = require("../services/restaurantServices");

// Rota para obter todos os restaurantes da coleção "Random Food"
router.get("/restaurants", async (req, res) => {
  try {
    const data = await getDataFromCollection("RandomFood");
    if (data.length > 0) {
      res.json(data);
    } else {
      res
        .status(404)
        .json({ error: "Não há dados disponíveis na coleção Random Food" });
    }
  } catch (error) {
    console.error("Erro ao obter dados da coleção Random Food:", error);
    res.status(500).json({ error: "Erro ao obter dados" });
  }
});

// Rota para buscar uma seleção aleatória de restaurantes
router.get("/random", async (req, res) => {
  try {
    // Obtém todos os restaurantes da coleção "RandomFood"
    const restaurants = await getDataFromCollection("RandomFood");

    // Seleciona aleatoriamente um restaurante da lista
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    const randomRestaurant = restaurants[randomIndex];

    // Retorna o restaurante selecionado como resposta
    res.json(randomRestaurant);
  } catch (error) {
    console.error("Erro ao buscar restaurantes aleatórios:", error);
    res.status(500).json({ error: "Erro ao buscar restaurantes aleatórios" });
  }
});

// Rota para filtrar um restaurante aleatório por vários filtros
// router.get("/restaurants/filter", async (req, res) => {
//   try {
//     const { categoria, localizacao, preco, refeicao } = req.query; // Recebe os filtros da consulta

//     // Cria um objeto contendo apenas os filtros definidos
//     const filters = {};
//     if (categoria) filters.categoria = categoria;
//     if (localizacao) filters.localizacao = localizacao;
//     if (preco) filters.preco = preco;
//     if (refeicao) filters.refeicao = refeicao;

//     // Obtém um restaurante aleatório com base nos filtros fornecidos
//     const randomRestaurant = await getRandomRestaurant(filters);

//     // Retorna o restaurante aleatório como resposta
//     res.json(randomRestaurant);
//   } catch (error) {
//     console.error("Erro ao buscar restaurante aleatório:", error);
//     res.status(500).json({ error: "Erro ao buscar restaurante aleatório" });
//   }
// });

// Rota para filtrar um restaurante aleatório por vários filtros
router.get("/restaurants/filter", async (req, res) => {
  try {
    const { categoria, localizacao, preco, refeicao } = req.query; // Recebe os filtros da consulta

    // Cria um objeto contendo apenas os filtros definidos
    const filters = {};
    if (categoria) filters.categoria = categoria;
    if (localizacao) filters.localizacao = localizacao;
    if (preco) filters.preco = preco;
    if (refeicao) filters.refeicao = refeicao;

    // Obtém um restaurante aleatório com base nos filtros fornecidos
    const randomRestaurant = await getRandomRestaurant(filters);

    // Retorna o restaurante aleatório como resposta
    res.json(randomRestaurant);
  } catch (error) {
    console.error("Erro ao buscar restaurante aleatório:", error);
    res.status(500).json({ error: "Erro ao buscar restaurante aleatório" });
  }
});

// Rota para obter um restaurante aleatório da rota atual
router.get("/restaurants/restaurantRoute", async (req, res) => {});

module.exports = router;
