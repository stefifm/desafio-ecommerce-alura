import { productService } from '../service/product-service.js'

// Función para tomar todos los productos
export const loadProducts = async () => {
  const products = await productService.productList()
  return products
}

// Función para crear una estructura article para mostrar los productos
export const createLineUserView = (nombre, precio, id, imagen) => {
  const line = document.createElement('article')
  line.classList.add('mas-vistos__card')

  const content = `

  <img
  src="${imagen}"
  alt="${nombre}"
  class="mas-vistos__card__img" />
<div class="mas-vistos__card__details">
  <h2 class="mas-vistos__card__name">${nombre}</h2>
  <p class="mas-vistos__card__price">$${precio}</p>
  <a
    class="mas-vistos__card__link"
    href="../screens/descripcion-producto.html?id=${id}"
    >Ver Producto</a
  >
</div>
  
  `

  line.innerHTML = content

  return line
}
