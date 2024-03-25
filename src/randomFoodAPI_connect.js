// const express = require('express');
// const foodName = document.querySelector('.food__name');
// const foodDescription = document.querySelector('.food__description');
// const foodImage = document.querySelector('.food__image');

// const form = document.querySelector('.form');
// const input = document.querySelector('.input__search');
// const buttonPrev = document.querySelector('.btn-prev');
// const buttonNext = document.querySelector('.btn-next');
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// router.get ('/restaurante', {scope ["idrefeicao", "idhorario", "idvalor"]}) 

// router.post ('/restaurante', {scope ["idrefeicao", "idhorario", "idvalor"]})



// router.get('/google', // esse é o endpoint que o usuário acessa para fazer login
//   passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }),// aqui é onde a autenticação é feita
// );

// router.get('/google/callback/',   // esse é o endpoint que o google chama após a autenticação
//   passport.authenticate('google', { // aqui é onde a autenticação é feita
//     failureRedirect: '/v1/failed', // caso a autenticação falhe, o usuário é redirecionado para a rota /v1/failed
//   }), userController.googleLogin // caso a autenticação seja bem sucedida, o usuário é redirecionado para a função googleLogin do userController
// );

// router.get('/success/:auth', (req, res) => {
//   res.send(`Welcome ${req.params.auth}`);
// });

// router.get('/faild/:name', (req, res) => {
//   res.send(`Welcome ${req.params.name}`);
// });


// router.get('/logout', (req, res) => {
//   req.session = null;
//   req.logout();
//   res.redirect('/v1/');
// })

// let searchFood = 1;

// const fetchFood = async (foodId) => {
//  // Import the functions you need from the SDKs you need


// const firebaseConfig = {
//   apiKey: "AIzaSyC1oJl2EQWePEol-YgB8WG0VjDKQ_HqTU8",
//   authDomain: "randomfoods-9cb44.firebaseapp.com",
//   projectId: "randomfoods-9cb44",
//   storageBucket: "randomfoods-9cb44.appspot.com",
//   messagingSenderId: "594099679723",
//   appId: "1:594099679723:web:f1d5cedc85509fc8dd69ae",
//   measurementId: "G-YL32Z9XJ6P"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//   try {
//     const doc = await foodRef.get();
//     if (doc.exists) {
//       return doc.data();
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching food:", error);
//     return null;
//   }
// }

// const renderFood = async (foodId) => {
//   foodName.innerHTML = 'Loading...';
//   foodDescription.innerHTML = '';

//   const data = await fetchFood(foodId);

//   if (data) {
//     foodName.innerHTML = data.name;
//     foodDescription.innerHTML = data.description;
//     foodImage.style.display = 'block';
//     foodImage.src = data.image;
//     input.value = '';
//     searchFood = foodId;
//   } else {
//     foodName.innerHTML = 'Not found :c';
//     foodImage.style.display = 'none';
//   }
// }

// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   renderFood(input.value.toLowerCase());
// });

// buttonPrev.addEventListener('click', () => {
//   if (searchFood > 1) {
//     searchFood -= 1;
//     renderFood(searchFood);
//   }
// });

// buttonNext.addEventListener('click', () => {
//   searchFood += 1;
//   renderFood(searchFood);
// });

// renderFood(searchFood);
