import { createLineUserView, loadProducts } from '../utils/productsList.js'

const searchInput = document.querySelector('[data-tipo="search"]')

const div = document.querySelector('[data-tipo="productCards"]')

// Función que devuelve una nueva lista con productos filtrados por categoría

const loadProductsFilter = async () => {
  const productList = await loadProducts()
  const category = productList.filter(data => data.categoria === 'belleza')
  return category
}

window.addEventListener('DOMContentLoaded', () => {
  renderProducts()
})

// Función para mostrar los productos filtrados

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
    const belleza = await loadProductsFilter()
    div.replaceChildren()
    belleza.forEach(data => {
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

// Función para filtrar y mostrar la búsqueda dentro de una categoría

searchInput.addEventListener('keyup', async () => {
  const searchValue = searchInput.value.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase()
  const category = await loadProductsFilter()

  try {
    if (searchValue !== '' && searchValue !== null) {
      div.replaceChildren()
      const filterCategories = category.filter(item => item.nombre.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase().includes(searchValue))
      filterCategories.forEach(data => {
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
