import { productService } from '../service/product-service.js'

// Para que se muestre una imagen previa
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

// Mostrar un modal de advertencia sobre el campo Categorías

window.addEventListener('DOMContentLoaded', () => {
  Swal.fire({
    title: 'ATENCIÓN',
    text: 'Las opciones en el campo Categoría: "accesorios, belleza, nutricion-deportes, cuidado personal". Todo en minúscula, sin acentos y guión medio solo en "nutricion-deportes". "cuidado personal" tiene un espacio',
    icon: 'warning',
    confirmButtonText: 'Continuar'
  })
})

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
    Swal.fire({
      title: 'Producto agregado!!!',
      text: 'El producto fue agregado con éxito',
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
