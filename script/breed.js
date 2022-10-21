"use strict";

// Selecting element
const submitBtn = document.querySelector("#submit-btn");
const breedInput = document.querySelector("#input-breed");
const typeInput = document.querySelector("#input-type");
const tableBody = document.querySelector("#tbody");
const sidebar = document.querySelector("#sidebar");

// Display Pet from list Pet(petArr)
const breedArr = getBreedFromStorage("listBreed");
if (breedArr) {
  renderTable(breedArr);
}
// Submit button get event
submitBtn.addEventListener("click", function () {
  // Object get input form value
  const data = {
    name: breedInput.value,
    type: typeInput.value,
  };

  // Validate data input
  const validate = validateData(data);
  if (validate) {
    breedArr.push(data);
    saveBreedToStorage("listBreed", JSON.stringify(breedArr));
    clearInput();
    renderTable(breedArr);
  }
});

// Validate data input
const validateData = (data) => {
  if (!data.name) {
    alert("Please input for Name");
    return false;
  }
  if (!data.type) {
    alert("Please select Type!");
    return false;
  }

  return true;
};

// clear input form
const clearInput = () => {
  breedInput.value = "";
  typeInput.value = "";
};

//display data form breedArr
function renderTable(breedArr) {
  tableBody.innerHTML = "";

  breedArr.forEach((br, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th>${i + 1}</th>
    <th>${br.name}</th>
    <th>${br.type}</th>  
    <th>
    <button type="button" class="btn btn-danger" id="delete-btn" onclick="deleteBreed('${
      br.name
    }')">Delete</button>
    </th>`;
    tableBody.appendChild(row);
  });
}
// delete breed
const deleteBreed = (breedName) => {
  // Confirm before delete breed
  if (confirm("Are you sure?")) {
    const pIndex = breedArr.findIndex(function (breed) {
      return breedName === breed.name;
    });
    breedArr.splice(pIndex, 1);
    renderTable(breedArr);
    saveBreedToStorage("listBreed", JSON.stringify(breedArr));
  }
};

// Sidebar get event click
sidebar.onclick = () => {
  sidebar.classList.toggle("active");
};

// window.onscroll = () => {
//   sidebar.classList.remove("active");
// };
