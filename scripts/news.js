"use strict";

// Selecting element
const list = document.querySelector("#news-container");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const pageNumber = document.querySelector("#page-num");

// Page default
let page = 1;

// Get data from LocalStorage
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
const currentUser = getFromStorage("currentUser") || "";

// Get index setting page size and category
let category, pageSize;
const gIndex = userArr.findIndex((user) => currentUser === user.username);

if (gIndex !== -1) {
  category = userArr[gIndex].category;
  pageSize = userArr[gIndex].pageSize;
} else {
  category = "General";
  pageSize = 5;
}

// Get Web API
const dataAPI = async (page) => {
  // Set param form URL
  const searchParams = new URLSearchParams({
    // apiKey: "b45f738b9170486698bd716ab3a8d56e",
    apiKey: "19718e50b69a4717ae10de68286cfb0d",
    country: "us",
    category: category,
    pageSize: pageSize,
    page: page,
  });

  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?${searchParams}`
  );
  return response.json();
};

// Display data webAPI
const renderData = (data) => {
  list.innerHTML = "";

  // Total page show web api data
  const pageResults = Math.ceil(data.totalResults / pageSize);

  // Control hide button Next
  if (page === pageResults) {
    btnNext.classList.add("hide");
  }

  // Show data from web api to HTML
  if (page <= pageResults) {
    // Set page number
    pageNumber.textContent = page;

    data.articles.forEach((d) => {
      const div = document.createElement("div");
      // Add class div tag
      div.classList.add(["card", "flex-row", "flex-wrap"]);

      div.innerHTML = `<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src="${d.urlToImage}"
									class="card-img"
									alt="${d.title}">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${d.title}</h5>
									<p class="card-text">${d.description}</p>
									<a href="${d.url}"
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>`;
      list.appendChild(div);
    });
  }
};

// The first News page load data from web api
if (page === 1) {
  btnPrev.classList.add("hide");
  dataAPI(1).then((data) => {
    renderData(data);
  });
}

// Prev button event
btnPrev.addEventListener("click", function () {
  page--;

  // Control show/hide button Next, Prev
  btnNext.classList.remove("hide");
  if (page === 1) {
    btnPrev.classList.add("hide");
  }

  // Call function get data web api
  dataAPI(page).then((data) => {
    renderData(data);
  });
});

// Next button event
btnNext.addEventListener("click", function () {
  page++;

  // Control show button Prev
  btnPrev.classList.remove("hide");

  // Call function get data web api
  dataAPI(page).then((data) => {
    renderData(data);
  });
});
