"use strict";
// Selecting elements
const submitBtn = document.querySelector("#submit-btn");
const idInput = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const ageInput = document.querySelector("#input-age");
const typeInput = document.querySelector("#input-type");
const weightInput = document.querySelector("#input-weight");
const lengthInput = document.querySelector("#input-length");
const colorInput = document.querySelector("#input-color-1");
const breedInput = document.querySelector("#input-breed");
const vaccinatedInput = document.querySelector("#input-vaccinated");
const dewormedInput = document.querySelector("#input-dewormed");
const sterilizedInput = document.querySelector("#input-sterilized");
const healthyBtn = document.querySelector("#healthy-btn");
const tableBody = document.querySelector("#tbody");
const bmiBtn = document.querySelector("#bmi-btn");
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

// Validate data
const validateData = (data) => {
  if (!data.id) {
    alert("Please input for ID");
    return false;
  } else {
    const pIndex = petArr.findIndex(function (pet) {
      return data.id === pet.id;
    });

    if (pIndex !== -1) {
      alert("ID must unique!");
      return false;
    }
  }
  if (!data.name) {
    alert("Please input for Name");
    return false;
  }
  if (!data.age) {
    alert("Please input for Age");
    return false;
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }
  if (!data.type) {
    alert("Please select Type!");
    return false;
  }
  if (!data.weight) {
    alert("Please input for Weight");
    return false;
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }
  if (!data.length) {
    alert("Please input for Length");
    return false;
  } else if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }
  if (!data.breed) {
    alert("Please select Breed!");
    return false;
  }

  return true;
};

// Submit button event
submitBtn.addEventListener("click", function () {
  // Object get input form value
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  // Validate data
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    saveToStorage("listPet", JSON.stringify(petArr));
    clearInput();
    renderTable(petArr);
  }
});

// Clear input form
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Display data from petArr
function renderTable(petArr) {
  tableBody.innerHTML = "";

  petArr.forEach((p) => {
    const row = document.createElement("tr");

    // Set format date
    let pDate = new Date(p.date);
    const d = pDate.getUTCDate();
    const m = pDate.getUTCMonth() + 1;
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
    <th>${pDate}</th>
    <th>
    <button type="button" class="btn btn-danger" id="delete-btn" onclick="deletePet('${
      p.id
    }')">Delete</button>
    </th>`;
    tableBody.appendChild(row);
  });
}

// Delete button event
const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    const pIndex = petArr.findIndex((pet) => petId === pet.id);
    petArr.splice(pIndex, 1);
    renderTable(petArr);
    saveToStorage("listPet", JSON.stringify(petArr));
  }
};

//  Healthy button event
let healthyCheck = false;
let healthyPetArr = [];
healthyBtn.addEventListener("click", function () {
  healthyCheck = !healthyCheck;
  if (healthyCheck) {
    healthyBtn.textContent = "Show All Pet";
    healthyPetArr = petArr.filter(
      (p) => p.vaccinated && p.dewormed && p.sterilized
    );
    renderTable(healthyPetArr);
  } else {
    healthyBtn.textContent = "Show Healthy Pet";
    renderTable(petArr);
  }
});

// Sidebar get event click
sidebar.onclick = () => {
  sidebar.classList.toggle("active");
};
