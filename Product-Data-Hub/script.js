const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const statusMessage = document.getElementById("statusMessage");
const resultsDiv = document.getElementById("results");


searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    return; 
  }

  searchForProducts(searchTerm);
});


function searchForProducts(searchTerm) {
  resultsDiv.innerHTML = "";
  statusMessage.textContent = "Loading...";

  fetch("https://fakestoreapi.com/products")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }
      return response.json(); 
    })
    .then(function (products) {
      const term = searchTerm.toLowerCase();
      const matches = [];

      for (const i = 0; i < products.length; i++) {
        const product = products[i];
        const title = product.title.toLowerCase();
        const category = product.category.toLowerCase();

        if (title.indexOf(term) !== -1 || category.indexOf(term) !== -1) {
          matches.push(product);
        }
      }

      if (matches.length === 0) {
        statusMessage.textContent = "No products found. Try a different search term.";
        return;
      }

      statusMessage.textContent = "";
      for (const j = 0; j < matches.length; j++) {
        displayProduct(matches[j]);
      }
    })
    .catch(function (error) {
      console.log("Something went wrong:", error);
      statusMessage.textContent = "Sorry, we could not fetch product information. Please try again.";
    });
}

function displayProduct(product) {
  const card = document.createElement("div");
  card.className = "product-card";

 
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.title;

 
  const name = document.createElement("h3");
  name.textContent = product.title;

  
  const description = document.createElement("p");
  const shortDescription = product.description;
  if (shortDescription.length > 100) {
    shortDescription = shortDescription.substring(0, 100) + "...";
  }
  description.textContent = shortDescription;

 
  const price = document.createElement("p");
  price.className = "price";
  price.textContent = "$" + product.price;

  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(description);
  card.appendChild(price);

  resultsDiv.appendChild(card);
}