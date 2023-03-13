import { validaInput, validaText } from './validaciones.js'

// Seleccionando los inputs y el textarea

const input = document.querySelector('input')
const textarea = document.querySelector('textarea')

// Capturando el evento blur para cada input
// Validando lo que entra en cada input

input.addEventListener('blur', (input) => {
  validaInput(input.target)
})

// Capturando el evento blur para el textarea
// Validando lo que entra en el textarea

textarea.addEventListener('blur', (text) => {
  validaText(text.target)
})
