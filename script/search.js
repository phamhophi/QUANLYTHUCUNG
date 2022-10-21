"use strict";
// Selecting elements
const findBtn = document.querySelector("#find-btn");
const idInput = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const typeInput = document.querySelector("#input-type");
const breedInput = document.querySelector("#input-breed");
const vaccinatedInput = document.querySelector("#input-vaccinated");
const dewormedInput = document.querySelector("#input-dewormed");
const sterilizedInput = document.querySelector("#input-sterilized");
const tableBody = document.querySelector("#tbody");
const sidebar = document.querySelector("#sidebar");

// Display Pet from list Pet(petArr)
const petArr = getFromStorage("listPet");
if (petArr) {
  renderTable(petArr);
}

// Display breed from list breed(breedArr)
const renderBreed = (breedArr) => {
  breedInput.innerHTML = "<option value=''>Select Breed</option>";
  breedArr.forEach((breed) => {
    const option = document.createElement("option");
    option.innerHTML = `<option>${breed.name}</option>`;
    breedInput.appendChild(option);
  });
};

const displayBreed = getBreedFromStorage("listBreed");
if (displayBreed) {
  renderBreed(displayBreed);
}

// Event input type
typeInput.addEventListener("change", function (event) {
  if (event.target.value) {
    const newBreed = displayBreed.filter(
      (breed) => breed.type === event.target.value
    );
    renderBreed(newBreed);
  } else {
    renderBreed(displayBreed);
  }
});

// Find button event
findBtn.addEventListener("click", function () {
  // Object get input form value
  const data = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };

  // Search pets by condition from input form
  const findPet = petArr.filter((p) => {
    let flg = true;
    if (data.id && !p.id.toLowerCase().includes(data.id.toLowerCase())) {
      flg = flg && false;
    }
    if (data.name && !p.name.toLowerCase().includes(data.name.toLowerCase())) {
      flg = flg && false;
    }
    if (data.type && !p.type.includes(data.type)) {
      flg = flg && false;
    }
    if (data.breed && !p.breed.includes(data.breed)) {
      flg = flg && false;
    }
    if (data.vaccinated && p.vaccinated !== data.vaccinated) {
      flg = flg && false;
    }
    if (data.dewormed && p.dewormed !== data.dewormed) {
      flg = flg && false;
    }
    if (data.sterilized && p.sterilized !== data.sterilized) {
      flg = flg && false;
    }
    return flg;
  });
  renderTable(findPet);
});

// Display data from petArr
function renderTable(petArr) {
  tableBody.innerHTML = "";

  petArr.forEach((p) => {
    const row = document.createElement("tr");
    // Set format date
    let pDate = new Date(p.date);
    const d = pDate.getUTCDate();
    const m = pDate.getMonth() + 1;
    const y = pDate.getFullYear();
    pDate = d + "/" + m + "/" + y;

    row.innerHTML = `<th>${p.id}</th>
    <th>${p.name}</th>
    <th>${p.age}</th>
    <th>${p.type}</th>
    <th>${p.weight} kg</th>
    <th>${p.length} cm</th>
    <th>${p.breed}</th>
    <th style= "text-align:center;">
    <i class="fas fa-square" style= "color:${p.color};"></i>
    </th>
    <th style= "text-align:center;">${
      p.vaccinated
        ? '<i class="fas fa-check-circle" style="color:green;"></i>'
        : '<i class="fas fa-times-circle" style="color: red;"></i>'
    }</th>
    <th style= "text-align:center;">${
      p.dewormed
        ? '<i class="fas fa-check-circle" style="color:green;"></i>'
        : '<i class="fas fa-times-circle" style="color: red;"></i>'
    }</th>
    <th style= "text-align:center;">${
      p.sterilized
        ? '<i class="fas fa-check-circle" style="color:green;"></i>'
        : '<i class="fas fa-times-circle" style="color: red;"></i>'
    }</th>
    <th>${pDate}</th>`;
    tableBody.appendChild(row);
  });
}

// Sidebar get event click
sidebar.onclick = () => {
  sidebar.classList.toggle("active");
};
