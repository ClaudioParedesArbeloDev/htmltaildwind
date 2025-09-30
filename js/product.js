//capturamos el nodo con el id productDetail
const productDetail = document.getElementById("productDetail");
//capturamos el url
const urlParams = new URLSearchParams(window.location.search);
//capturamos el id del producto
const productId = urlParams.get("id");
//capturar el boton de carrito
const cart = document.getElementById("cart");


//funcion que renderiza los productos
function displayProductDetails(product){
    productDetail.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="w-full max-w-xs object-contain h-auto mx-auto">
        <h2 class="text-xl font-bold mt-4 text-gray-800">${product.title}</h2>
        <p class="text-sm text-gray-600 mt-2">Categoría: ${product.category}</p>
        <p class="text-lg font-bold text-accent2-700 mt-2">$${product.price}</p>
        <p class="text-sm text-gray-600 mt-2">${product.description}</p>
        <button onclick= addCart(${product.id}) class="mt-4 border-2 text-sm p-2 rounded-xl border-accent2-500 bg-accent2-300 hover:bg-accent2-500 transition duration-300">Agregar al carrito</button>
        `;//El boton llama a la funcion addCart y le pasa el id del producto
}


//funcion que agrega el producto al carrito primero se comprueba si el carrito esta en localStorage
//si no esta se crea un array vacio y se agrega el id del producto
function addCart(productId){
    const cart = JSON.parse(localStorage.getItem("cart"))
    if(cart){
        cart.push(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
    }else{
        localStorage.setItem("cart", JSON.stringify([productId]));
    }
}

// si el carrito esta en localStorage se muestra el numero de productos en el carrito
cart.innerHTML = `
    <span>${JSON.parse(localStorage.getItem("cart")).length}</span>
    `;

    
cart.onclick = () => {
    window.location.href = `/pages/cart.html`;
}


// como consumir una API
fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(response => response.json())
  .then(data => displayProductDetails(data));//Le enviamos el objeto que es el producto a la funcion displayProductDetails
