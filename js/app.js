import { validaInput, validaText } from './validaciones.js'

// Seleccionando los inputs y el textarea

const inputs = document.querySelectorAll('.input, .input__inicio, .input__agregar')
const textareaContacto = document.querySelector('.textarea-input')
const textareaDescripcion = document.querySelector('.textarea__input')

// Capturando el evento blur para cada input
// Validando lo que entra en cada input

inputs.forEach(input => {
  input.addEventListener('blur', (input) => {
    validaInput(input.target)
  })
})

// Capturando el evento blur para el textarea
// Validando lo que entra en el textarea

textareaContacto.addEventListener('blur', (text) => {
  validaText(text.target)
})

if (textareaDescripcion) {
  textareaDescripcion.addEventListener('blur', (text) => {
    validaText(text.target)
  })
}
