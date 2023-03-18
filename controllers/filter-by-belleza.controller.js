import { productService } from '../service/product-service.js'

const createLine = (nombre, precio, id, imagen) => {
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

const div = document.querySelector('[data-tipo="productCards"]')

const renderProducts = async () => {
  try {
    const productList = await productService.productList()
    const categorie = productList.filter(data => data.categoria === 'belleza')
    categorie.forEach(data => {
      const newLine = createLine(data.nombre, data.precio, data.id, data.imagen)
      div.appendChild(newLine)
    })
  } catch (error) {
    Swal.fire({
      title: 'Hubo un error!!!',
      text: 'Se produjo un error. Intente más tarde',
      icon: 'error',
      confirmButtonText: 'Continuar'
    }).then(() => {
      window.location.href = '../index.html'
    })
  }
}

renderProducts()
