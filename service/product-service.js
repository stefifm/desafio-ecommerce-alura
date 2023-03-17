const productList = () => fetch('https://farmasalud3-api-alura.onrender.com/productos').then(res => res.json())

const createProduct = (imagen, nombre, precio, categoria, descripcion) => {
  return fetch('https://farmasalud3-api-alura.onrender.com/productos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ imagen, nombre, precio, categoria, descripcion, id: uuid.v4() })
  })
}

const deleteProduct = (id) => {
  return fetch(`https://farmasalud3-api-alura.onrender.com/productos/${id}`, {
    method: 'DELETE'
  })
}

const productDetail = (id) => {
  return fetch(`https://farmasalud3-api-alura.onrender.com/productos/${id}`).then(res => res.json())
}

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

export const productService = {
  productList,
  createProduct,
  deleteProduct,
  productDetail,
  updateProduct
}
