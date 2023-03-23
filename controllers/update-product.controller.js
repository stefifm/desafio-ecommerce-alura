import { productService } from '../service/product-service.js'

const form = document.querySelector('[data-tipo="form"]')

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

// Para obtener los datos de un producto y mostrarlo en cada campo del formulario

const getProductDetail = async () => {
  const url = new URL(window.location)
  const id = url.searchParams.get('id')

  if (id === null) return (window.alert('Hubo un error'))

  const nombre = document.querySelector('[data-tipo="nombreProducto"]')
  const precio = document.querySelector('[data-tipo="precio"]')
  const categoria = document.querySelector('[data-tipo="categoria"]')
  const descripcion = document.querySelector('[data-tipo="descripcion"]')

  try {
    const product = await productService.productDetail(id)

    if (product.nombre && product.precio && product.categoria && product.descripcion) {
      nombre.value = product.nombre
      precio.value = product.precio
      categoria.value = product.categoria
      descripcion.value = product.descripcion
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
      window.location.href = '../screens/lista-productos-admin.html'
    })
  }
}

getProductDetail()

// Para poder actualizar los datos de un producto

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const imagen = document.querySelector('#img__preview').getAttribute('src')
  const nombre = document.querySelector('[data-tipo="nombreProducto"]').value
  const precio = document.querySelector('[data-tipo="precio"]').value
  const categoria = document.querySelector('[data-tipo=categoria]').value
  const descripcion = document.querySelector('[data-tipo=descripcion]').value

  const url = new URL(window.location)
  const id = url.searchParams.get('id')
  try {
    await productService.updateProduct(imagen, nombre, precio, categoria.toLowerCase(), descripcion, id)
    Swal.fire({
      title: 'Edición con éxito!!!',
      text: 'El producto fue editado con éxito',
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
