document.getElementById('submit').addEventListener('click', function() {
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    
    if (name && phone && email && message) {
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado con éxito',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      }).then(function() {
        document.getElementById('contact-form').reset();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor complete todos los campos',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    }
  });