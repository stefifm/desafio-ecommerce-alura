import { productService } from '../service/product-service.js'
import { createLineUserView } from '../utils/productsList.js'

const div = document.querySelector('[data-tipo="productCards"]')

// Función para mostrar los productos más vistos

window.addEventListener('DOMContentLoaded', async () => {
  renderProducts()
})

const renderProducts = async () => {
  const newDiv = document.createElement('div')
  const loading = `

  <div class="loader">
  <div class="scanner">
    <h1 class="scanner__loading">Loading...</h1>
  </div>
</div>
  
  `
  newDiv.innerHTML = loading
  div.appendChild(newDiv)
  try {
    const productList = await productService.getLimitProduct()
    div.replaceChildren()
    productList.forEach(data => {
      const newLine = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
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
