import { productService } from '../service/product-service.js'

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
        href=""
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
      window.alert('Se eliminó el producto')
    } catch (error) {
      window.alert('Se produjo un error')
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
    window.alert('hubo un error')
  }
}

render()
