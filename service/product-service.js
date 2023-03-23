// Obtener todos los productos
const productList = () => fetch('https://farmasalud3-api-alura.onrender.com/productos').then(res => res.json())

// Crear un producto
const createProduct = (imagen, nombre, precio, categoria, descripcion) => {
  return fetch('https://farmasalud3-api-alura.onrender.com/productos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ imagen, nombre, precio, categoria, descripcion, id: uuid.v4() })
  })
}

// Eliminar un producto
const deleteProduct = (id) => {
  return fetch(`https://farmasalud3-api-alura.onrender.com/productos/${id}`, {
    method: 'DELETE'
  })
}

// Obtener el detalle de un producto
const productDetail = (id) => {
  return fetch(`https://farmasalud3-api-alura.onrender.com/productos/${id}`).then(res => res.json())
}

// Actualizar un producto
const updateProduct = (imagen, nombre, precio, categoria, descripcion, id) => {
  return fetch(`https://farmasalud3-api-alura.onrender.com/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ imagen, nombre, precio, categoria, descripcion })
  }).then(res => res)
    .catch(error => console.log(error))
}

// Obtener una cantidad limitada de productos

const getLimitProduct = () => {
  return fetch('https://farmasalud3-api-alura.onrender.com/productos?_limit=4').then(res => res.json())
}

export const productService = {
  productList,
  createProduct,
  deleteProduct,
  productDetail,
  updateProduct,
  getLimitProduct
}
