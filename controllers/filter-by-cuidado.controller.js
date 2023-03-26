import { createLineUserView, loadProducts } from '../utils/productsList.js'

const searchInput = document.querySelector('[data-tipo="search"]')

const div = document.querySelector('[data-tipo="productCards"]')

// Función que devuelve una nueva lista con productos filtrados por categoría

const loadProductsFilter = async () => {
  const productList = await loadProducts()
  const category = productList.filter(data => data.categoria === 'cuidado personal')
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
    const cuidadosPersonales = await loadProductsFilter()
    div.replaceChildren()
    cuidadosPersonales.forEach(data => {
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
      if (filterCategories.length === 0) {
        Swal.fire({
          title: 'No se encontró el producto',
          text: 'El producto que busca no se encuentra',
          icon: 'error',
          confirmButtonText: 'Continuar'
        })
      }
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
