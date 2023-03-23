import { productService } from '../service/product-service.js'

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

const showDetails = async () => {
  const url = new URL(window.location)
  const id = url.searchParams.get('id')

  if (id === null) return (window.alert('Hubo un error'))

  try {
    const product = await productService.productDetail(id)
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

showDetails()
