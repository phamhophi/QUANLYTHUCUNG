"use strict";

// Selecting element
const firstNameInput = document.querySelector("#input-firstname");
const lastNameInput = document.querySelector("#input-lastname");
const usernameInput = document.querySelector("#input-username");
const passwordInput = document.querySelector("#input-password");
const passwordConfirmInput = document.querySelector("#input-password-confirm");
const btnSubmit = document.querySelector("#btn-submit");

// User array declaration
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];

// Validate input form
const validateData = (data) => {
  if (!data.firstName) {
    alert("Please input for First Name!");
    return false;
  }
  if (!data.lastName) {
    alert("Please input for Last Name");
    return false;
  }
  if (!data.username) {
    alert("Please input for Username!");
    return false;
  } else {
    const pIndex = userArr.findIndex((user) => data.username === user.username);
    if (pIndex !== -1) {
      alert("Username is already registered!");
      return false;
    }
  }
  if (!data.password) {
    alert("Please input for Password!");
    return false;
  } else if (data.password.length < 8) {
    alert("Password must be at least 8 characters!");
    return false;
  }
  if (passwordConfirmInput.value !== data.password) {
    alert("Passwords do not match!");
    return false;
  }
  return true;
};

// Submit button event
btnSubmit.addEventListener("click", function () {
  // Convert from JS Object to Class Instance
  const userData = new User(
    firstNameInput.value,
    lastNameInput.value,
    usernameInput.value,
    passwordInput.value
  );

  // Validate data
  const validate = validateData(userData);
  if (validate) {
    userArr.push(userData);
    saveToStorage(KEY, JSON.stringify(userArr));
    clearInput();
    window.location.href = "/pages/login.html"; // Change Login page
  }
});

// Clear input form
const clearInput = () => {
  firstNameInput.value = "";
  lastNameInput.value = "";
  usernameInput.value = "";
  passwordInput.value = "";
  passwordConfirmInput.value = "";
};
