const createProduct = (imagen, nombre, precio, categoria, descripcion) => {
  return fetch('https://farmasalud3-api-alura.onrender.com/productos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ imagen, nombre, precio, categoria, descripcion, id: uuid.v4() })
  })
}

export const productService = {
  createProduct
}
