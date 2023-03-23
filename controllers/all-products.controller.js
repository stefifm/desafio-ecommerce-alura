import { createLineUserView, loadProducts } from '../utils/productsList.js'

const div = document.querySelector('[data-tipo="productCards"]')

const searchInput = document.querySelector('[data-tipo="search"]')

//  Función para mostrar todos los productos

const renderProducts = async () => {
  try {
    const productList = await loadProducts()
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

// Función para realizar el filtrado de datos

searchInput.addEventListener('keyup', async () => {
  const products = await loadProducts()
  const searchValue = searchInput.value.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase()
  try {
    if (searchValue !== '' && searchValue !== null) {
      div.replaceChildren()
      const newProducts = products.filter(product => product.nombre.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase().includes(searchValue))
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
