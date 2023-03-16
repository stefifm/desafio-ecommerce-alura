import { productService } from '../service/product-service.js'

const imgFile = document.querySelector('#file')

const previewFile = () => {
  const preview = document.querySelector('#img__preview')
  const file = document.querySelector('#file').files[0]
  const reader = new FileReader()

  reader.addEventListener('load', () => {
    preview.src = reader.result
  })

  if (file) {
    reader.readAsDataURL(file)
  }
}

imgFile.addEventListener('change', previewFile)

// Para agregar un producto
const form = document.querySelector('[data-tipo="form"]')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const imagen = document.querySelector('#img__preview').getAttribute('src')
  const nombre = document.querySelector('[data-tipo="nombreProducto"]').value
  const precio = document.querySelector('[data-tipo="precio"]').value
  const categoria = document.querySelector('[data-tipo=categoria]').value
  const descripcion = document.querySelector('[data-tipo=descripcion]').value
  try {
    await productService.createProduct(imagen, nombre, precio, categoria.toLowerCase(), descripcion)
    window.alert('Se agrego el producto')
  } catch (error) {
    window.alert('Hubo un error')
  }
})
