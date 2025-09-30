//capturar el boton de carrito
const cart = document.getElementById("cart");
const cartDetail = document.getElementById("cartDetail");


// si el carrito esta en localStorage se muestra el numero de productos en el carrito
cart.innerHTML = `
    <span>${JSON.parse(localStorage.getItem("cart")).length}</span>
    `;

//parseando el localStorage, traemos el array de productos
const productsCart = JSON.parse(localStorage.getItem("cart"));
//recorremos el array de productos
productsCart.forEach(product => {
    //como consumir una API
    fetch(`https://fakestoreapi.com/products/${product}`)
        .then(response => response.json())
        .then(product => {
            cartDetail.innerHTML += `
                <div class = "flex  items-center  justify-around" >
                    <p class="text-sm justify-end">${product.title}</p>
                    <p class="text-sm m-4 justify-end">${product.price}</p>
                    <button onclick= "removeProduct(${product.id})" class="m-4 border-2 text-sm p-2 rounded-xl border-accent2-500 bg-accent2-300 hover:bg-accent2-500 transition duration-300">Eliminar</button>
                </div>
                `
        });
});

// funcion que elimina un producto del carrito
function removeProduct(productId){
    //recuperamos el array de productos del localStorage
    let recuperarCarrito = JSON.parse(localStorage.getItem("cart"));
    //buscamos el indice del producto en el array
    let index = recuperarCarrito.indexOf(productId);
    //eliminamos el producto del array
    //el metodo splice elimina el producto en el indice especificado y el segundo valor es que cantidad de elementos va a eliminar
    //y devuelve un nuevo array
    recuperarCarrito.splice(index, 1);
    //guardamos el nuevo array en el localStorage
    localStorage.setItem("cart", JSON.stringify(recuperarCarrito));
}



