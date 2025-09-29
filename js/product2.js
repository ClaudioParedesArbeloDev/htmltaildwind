    const productDetail = document.getElementById("product-detail");
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id");

        async function fetchProductDetails() {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
                const product = await response.json();
                displayProductDetails(product);
            } catch (error) {
                console.error("Error al obtener detalles del producto:", error);
                productDetail.innerHTML = `<p class="text-red-500">Error al cargar el producto</p>`;
            }
        }

        function displayProductDetails(product) {
            productDetail.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="w-full max-w-xs object-contain h-auto mx-auto">
                <h2 class="text-xl font-bold mt-4 text-gray-800">${product.title}</h2>
                <p class="text-sm text-gray-600 mt-2">Categoría: ${product.category}</p>
                <p class="text-lg font-bold text-accent2-700 mt-2">$${product.price}</p>
                <p class="text-sm text-gray-600 mt-2">${product.description}</p>
                <button class="mt-4 border-2 text-sm p-2 rounded-xl border-accent2-500 bg-accent2-300 hover:bg-accent2-500 text-white transition duration-300">Agregar al carrito</button>
            `;
        }

        fetchProductDetails();
  