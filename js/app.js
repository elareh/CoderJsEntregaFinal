var page = "https://rickandmortyapi.com/api/character/?page="; //Variable con URL de Api
var CharactersList = [];  // Array con personajes
let currentPage = 1;  //Variable para paginacion
const charactersPerPage = 20; //Variable para paginacion


//Funcion para agregar personajes al array CharactersList

function CreateObject(id, name, species, gender, image) {
  const newCharacter = {
    id: id,
    nombre: name,
    especie: species,
    genero: gender,
    image: image
  };
  CharactersList.push(newCharacter);
}

//Funcion para recorrer la API y obtener los datos.

function loopThroughApi(page) {
  fetch(page)
    .then(response => response.json())
    .then(data => {
      const startIndex = (currentPage - 1) * charactersPerPage;
      const endIndex = currentPage * charactersPerPage;
      //Llamo funcion para agregar personajes al array
      data.results.forEach((result, index) => {
        if (index >= startIndex && index < endIndex) {
          var idResult = result.id;
          var nameResult = result.name;
          var speciesResult = result.species;
          var genderResult = result.gender;
          var imageResult = result.image;
          CreateObject(idResult, nameResult, speciesResult, genderResult, imageResult);
        }
      });
      //Busca entre las distintas paginas de la API para el buscador
      if (data.info.next) {
        page = data.info.next;
        loopThroughApi(page);
      } else {
        mostrarElementos();
      }

      if (document.getElementById('buscador').value.trim() !== '') {
        buscarElementos();
        return;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Display error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while fetching data from the API',
      });
    });
}
//Funcion para mostrar por front los datos de cada personaje
function mostrarElementos() {
  var container = document.getElementById('charactersFromApi');
  container.innerHTML = '';

  var startIndex = (currentPage - 1) * charactersPerPage;
  var endIndex = currentPage * charactersPerPage;

  for (var i = startIndex; i < endIndex && i < CharactersList.length; i++) {
    var personaje = CharactersList[i];
    //Creo los elementos del front y sus clases
    var characterDiv = document.createElement('div');
    characterDiv.classList.add('character');
    characterDiv.classList.add('character-card');

    var characterImage = document.createElement('img');
    characterImage.src = personaje.image;
    characterImage.alt = personaje.nombre;
    characterImage.classList.add("imagenCharacter");
    characterDiv.appendChild(characterImage);

    var characterName = document.createElement('p');
    characterName.textContent = 'Nombre: ' + personaje.nombre;
    characterName.classList.add('character-name');
    characterDiv.appendChild(characterName);

    var characterSpecies = document.createElement('p');
    characterSpecies.classList.add('character-info');
    characterSpecies.textContent = 'Especie: ' + personaje.especie;
    characterDiv.appendChild(characterSpecies);

    var characterGender = document.createElement('p');
    characterGender.classList.add('character-info');
    characterGender.textContent = 'Género: ' + personaje.genero;
    characterDiv.appendChild(characterGender);

    container.appendChild(characterDiv);
  }
}
//Evento de botones siguiente y anterior
document.getElementById('previousPage').addEventListener('click', function() {
  if (currentPage > 1) {
    currentPage--;
    mostrarElementos();
  }
});

document.getElementById('nextPage').addEventListener('click', function() {
  if (currentPage < Math.ceil(CharactersList.length / charactersPerPage)) {
    currentPage++;
    mostrarElementos();
  }
});

//Funcionalidad buscador
document.getElementById('buscador').addEventListener('input', function() {
  buscarElementos();
});
//Llamo al array original para que siempre busque por el total de objetos
var originalCharactersList = CharactersList;

function buscarElementos() {
  var searchTerm = document.getElementById('buscador').value.toLowerCase();

  if (searchTerm === '') {
    currentPage = 1;
    CharactersList = originalCharactersList; // Restore original values
    mostrarElementos();
    return;
  }

  var resultados = originalCharactersList.filter(function(personaje) {
    return personaje.nombre.toLowerCase().includes(searchTerm) || personaje.especie.toLowerCase().includes(searchTerm) || personaje.genero.toLowerCase().includes(searchTerm);
  });

  currentPage = 1;
  CharactersList = resultados;
  mostrarElementos();
}


//Llamo a funcion
loopThroughApi(page);

