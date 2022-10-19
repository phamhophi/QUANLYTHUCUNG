"use strict";

// Selecting element
const usernameInput = document.querySelector("#input-username");
const passwordInput = document.querySelector("#input-password");
const btnSubmit = document.querySelector("#btn-submit");
let currentUser = "";

// Get data from LocalStorage
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];

// Validate input form
const validateData = (data) => {
  let check = 0;
  if (!data.username) {
    alert("Please input for Username!");
    return false;
  }
  if (!data.password) {
    alert("Please input for Password!");
    return false;
  }
  // Search index username and password click from user array
  const pIndex = userArr.findIndex((user) => user.username === data.username);
  const pIndex2 = userArr.findIndex((user) => user.password === data.password);
  if (pIndex === -1 || pIndex2 === -1) {
    alert("Password or username is not correct. Please try again!");
    return false;
  }

  return true;
};

// Submit button event
btnSubmit.addEventListener("click", function () {
  const data = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  // Validate data
  const validate = validateData(data);
  if (validate) {
    currentUser = data.username;
    saveToStorage("currentUser", currentUser);
    window.location.href = "../index.html"; // Change home page
  }
});
