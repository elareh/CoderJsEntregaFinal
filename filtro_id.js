var page = "https://rickandmortyapi.com/api/character/?page=";
var CharactersList = [];
let currentPage = 1;
const charactersPerPage = 20;


function CreateObject (id, name, species, gender, image){
  const newCharacter = {
    id: id,
    nombre: name,
    especie: species,
    genero: gender,
    image: image
  }; 
  CharactersList.push(newCharacter);
}


function loopThroughApi(page) {
  fetch(page)
    .then(response => response.json())
    .then(data => {
      // Obtener el rango de personajes para la página actual
      const startIndex = (currentPage - 1) * charactersPerPage;
      const endIndex = currentPage * charactersPerPage;

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

      if (data.info.next) {
        page = data.info.next;
        loopThroughApi(page);
      } else {
        mostrarElementos();
      }

    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function mostrarElementos() {
  var container = document.getElementById('charactersFromApi');
  container.innerHTML = '';

  var startIndex = (currentPage - 1) * charactersPerPage;
  var endIndex = currentPage * charactersPerPage;

  for (var i = startIndex; i < endIndex && i < CharactersList.length; i++) {
    var personaje = CharactersList[i];


    // Crear el div que contendrá la información del personaje
    var characterDiv = document.createElement('div');
    characterDiv.classList.add('character');
    characterDiv.classList.add('character-card');
    characterDiv.classList.add('grid-container');

    // Crear la imagen del personaje
    var characterImage = document.createElement('img');
    characterImage.src = personaje.image;
    characterImage.alt = personaje.nombre;
    characterImage.classList.add("imagenCharacter");
    characterDiv.appendChild(characterImage);

    // Crear el párrafo con el nombre del personaje
    var characterName = document.createElement('p');
    characterName.textContent = 'Nombre: ' + personaje.nombre;
    characterName.classList.add('character-name');
    characterDiv.appendChild(characterName);

    // Crear el párrafo con la especie del personaje
    var characterSpecies = document.createElement('p');
    characterSpecies.classList.add('character-info');
    characterSpecies.textContent = 'Especie: ' + personaje.especie;
    characterDiv.appendChild(characterSpecies);

    var characterGender = document.createElement('p');
    characterGender.classList.add('character-info');
    characterGender.textContent = 'Género: ' + personaje.genero;
    characterDiv.appendChild(characterGender);

    // Agregar el div del personaje al contenedor
    container.appendChild(characterDiv);
  }
}
console.log(currentPage);



document.getElementById('previousPage').addEventListener('click', function() {
  if (currentPage > 1) {
    currentPage--;
    console.log(currentPage);
    mostrarElementos();
  }
});


document.getElementById('nextPage').addEventListener('click', function() {
  if (currentPage < Math.ceil(CharactersList.length / charactersPerPage)) {
    currentPage++;
    console.log(currentPage);
    mostrarElementos();
  }

  
});






loopThroughApi(page);
console.log(CharactersList);

