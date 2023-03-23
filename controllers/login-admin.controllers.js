import { adminService } from '../service/admins-service.js'

const formLogin = document.querySelector('[data-tipo="formLogin"]')

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.querySelector('[data-tipo="email"]').value
  const password = document.querySelector('[data-tipo="password"]').value

  try {
    const admins = await adminService.adminList()
    admins.forEach(admin => {
      if (admin.email === email && admin.password === password) {
        window.location.href = '../screens/lista-productos-admin.html'
      } else {
        Swal.fire({
          title: 'No es administrador',
          text: 'Debe usar el formulario de Contacto para comunicarse con el administrador de la página',
          icon: 'error',
          confirmButtonText: 'Continuar'
        }).then(() => {
          window.location.href = '../screens/login.html'
        })
      }
    })
  } catch (error) {
    Swal.fire({
      title: 'Hubo un error!!!',
      text: 'Se produjo un error. Intente más tarde',
      icon: 'error',
      confirmButtonText: 'Continuar'
    }).then(() => {
      window.location.href = '../index.html'
    })
  }
})
