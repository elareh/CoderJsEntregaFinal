var page = "https://rickandmortyapi.com/api/character/?page=";
var CharactersList = [];

function CreateObject (id, name, species, gender, image){
  const newCharacter = {
    id: id,
    nombre: name,
    especie: species,
    genero: gender,
    image: image
  }; 
  console.log("Se crea un Object con este Id: " + id)
  CharactersList.push(newCharacter);
}


function loopThroughApi(page) {
  fetch(page)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(result => {
        var idResult = result.id;
        var nameResult = result.name;
        var speciesResult = result.species;
        var genderResult = result.gender;
        var imageResult = result.image;
        CreateObject(idResult, nameResult, speciesResult, genderResult, imageResult);
        
      });

      // Verificar si hay más páginas disponibles (si next no es null)
      if (data.info.next) {
        // Actualizar el parámetro page con la siguiente URL
        page = data.info.next;
        // Hacer una llamada recursiva para obtener los datos de la siguiente página
        loopThroughApi(page);
      } else {
        // Cuando no hay más páginas, puedes imprimir los resultados o hacer lo que necesites aquí
        console.log(CharactersList);
        mostrarElementos();
      }

    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function mostrarElementos() {
  var container = document.getElementById('charactersFromApi');

  // Limpiamos el contenido existente en el contenedor
  container.innerHTML = '';

  // Mostrar solo los primeros 20 personajes (IDs del 0 al 19)
  var numPersonajesAMostrar = 20;
  for (var i = 0; i < numPersonajesAMostrar; i++) {
    var personaje = CharactersList[i];

    // Crear el div que contendrá la información del personaje
    var characterDiv = document.createElement('div');
    characterDiv.classList.add('character');

    // Crear la imagen del personaje
    var characterImage = document.createElement('img');
    characterImage.src = personaje.image;
    characterImage.alt = personaje.nombre;
    characterDiv.appendChild(characterImage);

    // Crear el párrafo con el nombre del personaje
    var characterName = document.createElement('p');
    characterName.textContent = 'Nombre: ' + personaje.nombre;
    characterDiv.appendChild(characterName);

    // Crear el párrafo con la especie del personaje
    var characterSpecies = document.createElement('p');
    characterSpecies.textContent = 'Especie: ' + personaje.especie;
    characterDiv.appendChild(characterSpecies);

    var characterGender = document.createElement('p');
    characterGender.textContent = 'Género: ' + personaje.genero;
    characterDiv.appendChild(characterGender);

    // Agregar el div del personaje al contenedor
    container.appendChild(characterDiv);
  }
}

// function mostrarElementos() {
//   var container = document.getElementById('charactersFromApi');
//   var html = '';

//   // Iterar a través de los elementos del objeto JSON
//   for (var i = 0; i < CharactersList.length; i++) {
//       var elemento = CharactersList[i];
//       html += '<p>Nombre: ' + elemento.nombre;
//       // Modifica la estructura según los datos que tenga tu objeto JSON
//   }

//   // Mostrar los elementos en el contenedor
//   container.innerHTML = html;
// }

loopThroughApi(page);
console.log(CharactersList);

