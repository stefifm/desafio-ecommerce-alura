import { createLineUserView, loadProducts } from '../utils/productsList.js'

const div = document.querySelector('[data-tipo="productCards"]')

const searchInput = document.querySelector('[data-tipo="search"]')

const loadProductsFilter = async () => {
  const productList = await loadProducts()
  const category = productList.filter(data => data.categoria === 'nutricion-deportes')
  return category
}

const renderProducts = async () => {
  try {
    const nutricionDeportes = await loadProductsFilter()
    nutricionDeportes.forEach(data => {
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
