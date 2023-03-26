import { createLineUserView, loadProducts } from '../utils/productsList.js'

const div = document.querySelector('[data-tipo="productCards"]')

const searchInput = document.querySelector('[data-tipo="search"]')

window.addEventListener('DOMContentLoaded', () => {
  renderProducts()
})

//  Función para mostrar todos los productos

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
    const productList = await loadProducts()
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

// Función para realizar el filtrado de datos

searchInput.addEventListener('keyup', async () => {
  const products = await loadProducts()
  const searchValue = searchInput.value.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase()
  try {
    if (searchValue !== '' && searchValue !== null) {
      div.replaceChildren()
      const newProducts = products.filter(product => product.nombre.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase().includes(searchValue))
      if (newProducts.length === 0) {
        Swal.fire({
          title: 'No se encontró el producto',
          text: 'El producto que busca no se encuentra',
          icon: 'error',
          confirmButtonText: 'Continuar'
        })
      }
      newProducts.forEach(data => {
        const line = createLineUserView(data.nombre, data.precio, data.id, data.imagen)
        div.appendChild(line)
      })
    } else {
      div.replaceChildren()
      renderProducts()
    }
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
})
