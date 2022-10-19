"use strict";

// Get data from LocalStorage
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
const currentUser = getFromStorage("currentUser") || "";

// Selecting element
const categoryInput = document.querySelector("#input-category");
const pageSizeInput = document.querySelector("#input-page-size");
const btnSubmit = document.querySelector("#btn-submit");

// Validate page size input
const validateData = (data) => {
  if (!data.pageSize) {
    alert("Please input for Page size!");
    return false;
  }
  return true;
};

// Submit button event click
btnSubmit.addEventListener("click", function () {
  const data = {
    pageSize: pageSizeInput.value,
    category: categoryInput.value,
  };

  // Validate page size input
  const validate = validateData(data);
  if (validate && currentUser) {
    // Search logged in user from User array
    const pIndex = userArr.findIndex((user) => currentUser === user.username);

    // Save page size, category to LocalStorage
    userArr[pIndex].pageSize = data.pageSize;
    userArr[pIndex].category = data.category;
    saveToStorage(KEY, JSON.stringify(userArr));

    // Init value input
    pageSizeInput.value = "";
    categoryInput.value = "General";
  }
});
