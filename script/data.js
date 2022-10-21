"use strict";

// Selecting element
const fileInput = document.getElementById("input-file");
const btnImport = document.querySelector("#import-btn");
const btnExport = document.querySelector("#export-btn");
const dataPet = getFromStorage("listPet");
const sidebar = document.querySelector("#sidebar");

// Save file
function saveStaticDataToFile() {
  if (dataPet) {
    const blob = new Blob([JSON.stringify(dataPet)], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "listPet.json");
  }
}

// Export button event
btnExport.addEventListener("click", saveStaticDataToFile);

// Import button event
btnImport.addEventListener("click", function () {
  const file = fileInput.files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      const newPet = JSON.parse(evt.target.result);
      newPet.forEach((p) => {
        const pIndex = dataPet.findIndex((pet) => p.id === pet.id);
        if (pIndex != -1) {
          dataPet[pIndex] = p;
        } else {
          dataPet.push(p);
        }
      });
      saveToStorage("listPet", JSON.stringify(dataPet));
    };
  }
});

// Sidebar get event click
sidebar.onclick = () => {
  sidebar.classList.toggle("active");
};
