const openMenuBtn = document.querySelector('.menu__open')
const closeMenuBtn = document.querySelector('.menu__close')
const navList = document.querySelector('.menu__list')
const openSearchBtn = document.querySelector('.search__btn')
const searchBox = document.querySelector('.header__search__details')

// Función para abrir el menú

const openMenu = () => {
  navList.style.display = 'flex'
  closeMenuBtn.style.display = 'inline-block'
  openMenuBtn.style.display = 'none'
  searchBox.style.display = 'none'
}

// Función para abrir la búsqueda

const toggleSearch = () => {
  if (searchBox.style.display === 'none') {
    searchBox.style.display = 'flex'
  } else {
    searchBox.style.display = 'none'
  }
  navList.style.display = 'none'
}

openSearchBtn.addEventListener('click', toggleSearch)

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
