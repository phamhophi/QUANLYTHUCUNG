"use strict";

// List pet
//Save data from petArr to LocalStorage
const saveToStorage = (key, value) => {
  localStorage.setItem("listPet", value);
};

// Get data  fromLocalStorage to petArr
const getFromStorage = (key) => {
  return localStorage.getItem("listPet")
    ? JSON.parse(localStorage.getItem("listPet"))
    : [];
};

// List breed
//Save data from breedArr to LocalStorage
const saveBreedToStorage = (key, value) => {
  localStorage.setItem("listBreed", value);
};

// Get data from LocalStorage to breedArr
const getBreedFromStorage = (key) => {
  return localStorage.getItem("listBreed")
    ? JSON.parse(localStorage.getItem("listBreed"))
    : [];
};
