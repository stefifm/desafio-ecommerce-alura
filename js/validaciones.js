export function validaInput (input) {
  const tipoInput = input.dataset.tipo
  if (validadores[tipoInput]) {
    validadores[tipoInput](input)
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove('input-container--invalid')
    input.parentElement.querySelector('.input-message-error').innerHTML = ''
  } else {
    input.parentElement.classList.add('input-container--invalid')
    input.parentElement.querySelector('.input-message-error').innerHTML = mostrarError(tipoInput, input)
  }
}

export function validaText (textarea) {
  const tipoInput = textarea.dataset.tipo
  if (validadores[tipoInput]) {
    validadores[tipoInput](textarea)
  }

  if (textarea.validity.valid) {
    textarea.parentElement.classList.remove('textarea-container--invalid')
    textarea.parentElement.querySelector('.textarea-message-error').innerHTML = ''
  } else {
    textarea.parentElement.classList.add('textarea-container--invalid')
    textarea.parentElement.querySelector('.textarea-message-error').innerHTML = mostrarError(tipoInput, textarea)
  }
}

function mostrarError (tipoInput, input) {
  let mensaje = ''
  tipoErrores.forEach(error => {
    if (input.validity[error]) {
      mensaje = mensajeError[tipoInput][error]
    }
  })

  return mensaje
}

const validadores = {
  // Se le asigna al data-tipo (atributo HTML)
  // la validación sobre el input o textarea
  mensaje: (textarea) => validarTextareaContacto(textarea),
  descripcion: (textarea) => validarTextareaDescripcion(textarea)
}

const tipoErrores = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError'
]

const mensajeError = {
  nombre: {
    valueMissing: 'El campo Nombre no puede estar vacío',
    patternMismatch: 'No debe superar los 50 caracteres'
  },
  email: {
    valueMissing: 'El campo email no puede estar vacío',
    typeMismatch: 'El correo no es válido'
  },
  password: {
    valueMissing: 'El campo contraseña no puede estar vacío'
  },
  mensaje: {
    valueMissing: 'El campo Mensaje no puede estar vacío',
    customError: 'No debe superar los 120 caracteres'
  },
  nombreProducto: {
    valueMissing: 'El campo Nombre del producto no puede estar vacío',
    patternMismatch: 'No debe superar los 20 caracteres'
  },
  precio: {
    valueMissing: 'El campo Precio no puede estar vacío',
    typeMismatch: 'El campo Precio solo acepta números'
  },
  categoria: {
    valueMissing: 'El campo Categoría no puede estar vacío. Las opciones y forma de escribir: accesorios, belleza, nutricion-deportes, cuidado personal'
  },
  descripcion: {
    valueMissing: 'El campo Descripcion no puede estar vacío',
    customError: 'No debe superar los 150 caracteres'
  }
}

function validarTextareaContacto (textarea) {
  const textLength = textarea.parentElement.querySelector('.textarea-input').value.length
  let msgError = ''
  if (textLength > 120) {
    msgError = 'No debe superar los 120 caracteres'
  }
  textarea.setCustomValidity(msgError)
}

function validarTextareaDescripcion (textarea) {
  const textLength = textarea.parentElement.querySelector('.textarea__input').value.length
  let msgError = ''
  if (textLength > 150) {
    msgError = 'No debe superar los 150 caracteres'
  }
  textarea.setCustomValidity(msgError)
}
