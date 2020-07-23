import axios from "axios"
import Swal from 'sweetalert2'

const tasks = document.querySelector('.listado-pendientes')

if (tasks) {
  tasks.addEventListener('click', e => {
    if (e.target.classList.contains('fa-check-circle')) {
      const taskId = e.target.parentElement.parentElement.dataset.task
      const url = `${location.origin}/tasks/${taskId}`
      axios.patch(url, {})
      .then(res => {
        if (res.status === 200) {
          e.target.classList.toggle('completo')
        }
      })
    }

    if (e.target.classList.contains('fa-trash')) {
      const parentLiHtml = e.target.parentElement.parentElement
      const taskId = parentLiHtml.dataset.task

      Swal.fire({
        title: 'Deseas borrar esta tarea?',
        text: 'Una tarea eliminada no se puede recuperar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar',
        cancelButtonText: 'No, Cancelar'
      })
      .then(result => {
        if (result.value) {
          const url = `${location.origin}/tasks/${taskId}`
          axios.delete(url)
          .then(result => {
            if (result.status === 200) {
              console.log(result);
              parentLiHtml.parentElement.removeChild(parentLiHtml)
            }
          })
        }
      })
    }
  })
}

export default tasks