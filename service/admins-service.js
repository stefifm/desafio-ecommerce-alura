// Obtener todos los administradores
const adminList = () => fetch('https://farmasalud3-api-alura.onrender.com/admins').then(res => res.json())

export const adminService = {
  adminList
}
