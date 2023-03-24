import { productService } from '../service/product-service.js'

// createDetails se encarga de crear un HTML para mostrar los detalles
// de un producto

const createDetails = (imagen, nombre, precio, descripcion) => {
  const line = document.createElement('div')
  line.classList.add('descripcion__container')
  const content = `
  
  <img
  src="${imagen}"
  alt="${nombre}"
  class="descripcion__img" />
<div class="descripcion__details">
  <h1 class="descripcion__details__title">${nombre}</h1>
  <p class="descripcion__details__price">$${precio}</p>
  <p class="descripcion__details__text">
  ${descripcion}
  </p>
</div>
  
  `

  line.innerHTML = content

  return line
}

const section = document.querySelector('[data-tipo="section"]')

window.addEventListener('DOMContentLoaded', () => {
  showDetails()
})

// Función para se muestre el producto en detalle

const showDetails = async () => {
  const url = new URL(window.location)
  const id = url.searchParams.get('id')

  if (id === null) return (window.alert('Hubo un error'))

  const newDiv = document.createElement('div')
  const loading = `

  <div class="loader">
  <div class="scanner">
    <h1 class="scanner__loading">Loading...</h1>
  </div>
</div>
  
  `
  newDiv.innerHTML = loading
  section.appendChild(newDiv)
  try {
    const product = await productService.productDetail(id)
    section.replaceChildren()
    if (product.nombre && product.precio && product.descripcion) {
      const newLine = createDetails(product.imagen, product.nombre, product.precio, product.descripcion)
      section.appendChild(newLine)
    } else {
      throw new Error()
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
}
