import Swal from 'sweetalert2';

export const makeAlert = () => {
  Swal.fire(
    'Good job!',
    'You clicked the button!',
    'success'
  )
}