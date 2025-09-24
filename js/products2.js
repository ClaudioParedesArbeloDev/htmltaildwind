const container = document.getElementById("container");
const searchInput = document.getElementById("search");
const dropdownContainer = document.createElement("div"); 


function renderProducts(products) {
  container.innerHTML = ""; 
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("producto");
    productCard.innerHTML = `
      <div class="border-2 border-accent2-700 w-36 m-4 h-96 grid grid-rows-[1fr_1fr] rounded-2xl md:w-44">
        <div class="w-36 flex justify-center">            
          <img src="${product.image}" alt="${product.title}" class="w-28 object-contain h-auto">
        </div>
        <div class="p-2 text-center flex flex-col justify-between">
          <h4 class="text-xs">${product.category}</h4>
          <h3 class="text-sm overflow-hidden">${product.title}</h3>
          <h3 class="font-bold">$${product.price}</h3>
          <button class="border-2 text-xs p-2 rounded-xl border-accent2-500 bg-accent2-300 hover:bg-accent2-500 transition duration-300">Agregar al carrito</button>
        </div>
      </div>
    `;
    container.appendChild(productCard);
  });
}


function createCategoryDropdown(categories, products) {
  dropdownContainer.classList.add("m-4");
  dropdownContainer.innerHTML = `
    <select id="categoryDropdown" class="border-2 border-accent2-700 p-2 rounded-2xl w-[200px] md:w-[300px] bg-background-300 text-text focus:outline-none focus:ring-2 focus:ring-accent2-500">
      <option value="all">Todas las categorías</option>
      ${categories.map(category => `<option value="${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</option>`).join('')}
    </select>
  `;
  
  const searchContainer = searchInput.parentElement;
  searchContainer.appendChild(dropdownContainer);

  
  const dropdown = document.getElementById("categoryDropdown");
  dropdown.addEventListener("change", (e) => {
    const selectedCategory = e.target.value;
    const searchTerm = searchInput.value.toLowerCase();
    filterProducts(products, selectedCategory, searchTerm);
  });
}


function filterProducts(products, category, searchTerm) {
  let filteredProducts = products;

  
  if (category !== "all") {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }

  
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  renderProducts(filteredProducts);
}


fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    
    const categories = [...new Set(data.map(product => product.category))];
    
    
    renderProducts(data);
    
    
    createCategoryDropdown(categories, data);

    
    searchInput.addEventListener("input", () => {
      const selectedCategory = document.getElementById("categoryDropdown").value;
      const searchTerm = searchInput.value.toLowerCase();
      filterProducts(data, selectedCategory, searchTerm);
    });
  })
  .catch(error => console.error("Error al obtener los productos:", error));