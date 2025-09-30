//Toma los elementos de la pagina
const container = document.getElementById("container");
const searchInput = document.getElementById("search");

//crea el elemento que va a contener el dropdown
const dropdownContainer = document.createElement("div");

//funcion que renderiza los productos
function renderProducts(array){
    container.innerHTML = "";
    array.forEach(product => {
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
                    </div>
                    <div class="flex flex-col gap-2">
                        <button onclick="viewProduct(${product.id})" class="cursor-pointer border-2 text-xs mb-2 p-2 rounded-xl border-accent2-500 bg-accent2-300 hover:bg-accent2-500 transition duration-300"> Ver Detalles</button>
                    </div>
                </div>
            `;
        container.appendChild(productCard);
        });
}

function viewProduct(productId){
    window.location.href=`product.html?id=${productId}`;
}

//funcion que crea el dropdown de categorias
function createCategoryDropdown(categories, products) {
    dropdownContainer.classList.add("m-4");
    dropdownContainer.innerHTML = `
        <select id="categoryDropdown" class="border-2 border-accent2-700 p-2 rounded-2xl w-[200px] md:w-[300px]
         bg-background-300 text-text focus:outline-none focus:ring-2 focus:ring-accent2-500"> >
            <option value="all">Todas las categorías</option>
            ${categories.map(category => `<option value="${category}">${category}</option>`)}
        </select>
        `;

    const searchContainer = searchInput.parentElement;
    searchContainer.appendChild(dropdownContainer);

    const dropdown = document.getElementById("categoryDropdown");
    dropdown.addEventListener("change", (e)=>{
        const selectedCategory = e.target.value;
        const searchTerm = searchInput.value.toLowerCase();
        filterProducts(products, selectedCategory, searchTerm);    
    })
    }

function filterProducts(products, category, searchTerm) {
    let filteredProducts = products;
    //filtro por categoria o dropdown
    if(category !== "all"){
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    //filtro por busqueda
    if(searchTerm){
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    renderProducts(filteredProducts);
}

//como consumir una API
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())//devuelve un objeto json
  .then(data => {
        console.log(data);
        const categories = [...new Set(data.map(product => product.category))];

        renderProducts(data);

        createCategoryDropdown(categories, data);

        searchInput.addEventListener("input", () => {
            const selectedCategory = document.getElementById("categoryDropdown").value;
            const searchTerm = searchInput.value.toLowerCase();
            filterProducts(data, selectedCategory, searchTerm);
        });

  })//imprime el objeto json