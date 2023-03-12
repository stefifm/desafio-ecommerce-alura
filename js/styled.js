const openMenuBtn = document.querySelector('.menu__open')
const closeMenuBtn = document.querySelector('.menu__close')
const navList = document.querySelector('.menu__list')

// Función para abrir el menú

const openMenu = () => {
  navList.style.display = 'flex'
  closeMenuBtn.style.display = 'inline-block'
  openMenuBtn.style.display = 'none'
}

// Función para cerrar el menú

const closeMenu = () => {
  navList.style.display = 'none'
  closeMenuBtn.style.display = 'none'
  openMenuBtn.style.display = 'inline-block'
}

// Capturando el evento click para aplicar las funciones
// de abrir y cerrar menú

openMenuBtn.addEventListener('click', openMenu)
closeMenuBtn.addEventListener('click', closeMenu)

// Cerrar el menú después de que se haya elegido una sección

if (window.innerWidth < 1024) {
  document.querySelectorAll('.menu__list', 'menu__item').forEach(navItem => {
    navItem.addEventListener('click', closeMenu)
  })
}
