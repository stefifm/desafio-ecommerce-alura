import { productService } from '../service/product-service.js'
import { createLineUserView } from '../utils/productsList.js'

const div = document.querySelector('[data-tipo="productCards"]')

const renderProducts = async () => {
  try {
    const productList = await productService.getLimitProduct()
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

renderProducts()
