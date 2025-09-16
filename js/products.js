const container = document.getElementById("container");

fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
        const productCard = document.createElement("div"); //crear un elemento div por cada producto que encontramos en la api
        productCard.classList.add("producto"); //agregar la clase producto a cada elemento
        productCard.innerHTML = `
            <div class="border-2 border-accent2-700 w-36 m-4 h-96 grid grid-rows-[1fr_1fr] rounded-2xl md:w-44">
                <div class="w-36 flex justify-center">            
                    <img src="${product.image}" alt="${product.name}" class="w-28 object-contain h-auto" >
                </div>
                <div class="p-2 text-center flex flex-col justify-between">
                    <h4 class="text-xs">${product.category}</h4>
                    <h3 class="text-sm overflow-hidden">${product.title}</h3>
                    <h3 class="font-bold">$${product.price}</h3>
                    <button class="border-2 text-xs p-2 rounded-xl border-accent2-500 bg-accent2-300">Agregar al carrito</button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
  });