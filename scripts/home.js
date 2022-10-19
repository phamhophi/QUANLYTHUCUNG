"use strict";

// Selecting element
const btnLogout = document.querySelector("#btn-logout");
const loginModal = document.querySelector("#login-modal");
const logoutModal = document.querySelector("#main-content");
const contentText = document.querySelector("#welcome-message");

// Get data from LocalStorage
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
const currentUser = getFromStorage("currentUser") || "";

// Control show or hide screen home page
if (currentUser) {
  userArr.forEach((user) => {
    if (currentUser === user.username) {
      contentText.textContent = `Welcome ${user.firstName}`;
    }
  });

  loginModal.classList.add("hide");
  btnLogout.classList.remove("hide");
} else {
  btnLogout.classList.add("hide");
  loginModal.classList.remove("hide");
}

// Logout button event
btnLogout.addEventListener("click", function () {
  deleteToStorage("currentUser");
  window.location.href = "./pages/login.html"; // Change login page
});
