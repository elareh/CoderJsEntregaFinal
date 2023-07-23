        // Utilizando la función fetch para obtener la data de la API
        fetch('https://rickandmortyapi.com/api/character')
            .then(response => response.json()) // Transformar la respuesta en formato JSON
            .then(data => {
                // Aquí puedes trabajar con la data recibida de la API
                // Por ejemplo, mostrarla en el elemento con id "data-container"
                const dataContainer = document.getElementById('data-container');
                dataContainer.innerHTML = JSON.stringify(data);
                console.log("pude traer las cosas de la api con exito!")
            })
            .catch(error => {
                console.error('Error al obtener la data:', error);
            });