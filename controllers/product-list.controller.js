import { productService } from '../service/product-service.js'

const searchInput = document.querySelector('[data-tipo="search"]')

const createLine = (nombre, precio, id, imagen) => {
  const line = document.createElement('article')
  line.classList.add('lista-productos__card')
  const content = `

  <img
    src="${imagen}"
    alt="${nombre}"
    class="lista-productos__card__img" />
  <div class="lista-productos__card__details">
    <h2 class="lista-productos__card__name">${nombre}</h2>
    <p class="lista-productos__card__price">$${precio}</p>
    <p class="lista-productos__card__id">#${id}</p>
    <div class="lista-productos__card_details__btn">
      <a
        class="lista-productos__card__edit btn"
        href="../screens/editar-producto.html?id=${id}"
        >Editar</a
      >
      <button class="lista-productos__card__delete btn" id=${id}>Eliminar</button>
    </div>
  </div>

  
  `

  line.innerHTML = content

  const btn = line.querySelector('button')

  btn.addEventListener('click', async () => {
    const id = btn.id

    try {
      await productService.deleteProduct(id)
      Swal.fire({
        title: 'Se eliminó el producto con éxito!!!',
        text: 'El producto fue eliminado con éxito',
        icon: 'success',
        confirmButtonText: 'Continuar'
      }).then(() => {
        window.location.href = '../screens/lista-productos-admin.html'
      })
    } catch (error) {
      Swal.fire({
        title: 'Hubo un error!!!',
        text: 'Se produjo un error. Intente más tarde',
        icon: 'error',
        confirmButtonText: 'Continuar'
      }).then(() => {
        window.location.href = '../screens/lista-productos-admin.html'
      })
    }
  })

  return line
}

const div = document.querySelector('[data-tipo="tarjetas"]')

const render = async () => {
  try {
    const productList = await productService.productList()
    productList.forEach(data => {
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
      window.location.href = '../screens/lista-productos-admin.html'
    })
  }
}

render()

searchInput.addEventListener('keyup', async () => {
  const products = await productService.productList()

  try {
    if (searchInput.value.toLowerCase() !== '' && searchInput.value.toLowerCase() !== null) {
      div.replaceChildren()
      const newProducts = products.filter(product => product.nombre.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').includes(searchInput.value.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')))
      newProducts.forEach(data => {
        const line = createLine(data.nombre, data.precio, data.id, data.imagen)

        div.appendChild(line)
      })
    } else {
      div.replaceChildren()
      render()
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
