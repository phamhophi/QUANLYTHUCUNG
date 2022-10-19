"use strict";

//Save data from userArr to LocalStorage
const saveToStorage = (key, value) => {
  localStorage.setItem(key, value);
};

// Get data  fromLocalStorage to userArr
const getFromStorage = (key) => {
  return localStorage.getItem(key);
};

// Delete user login from LocalStorage
const deleteToStorage = (key) => {
  return localStorage.removeItem(key);
};
