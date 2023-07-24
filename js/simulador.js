var CharactersList = CharactersList;



document.getElementById('displayButton').addEventListener('click', function() {
    var randomIndex = Math.floor(Math.random() * CharactersList.length);
    var randomCharacter = CharactersList[randomIndex];
    console.log(randomIndex);
    console.log(CharactersList[randomIndex]);
    
    var characterDiv = document.createElement('div');
    characterDiv.classList.add('character');
    characterDiv.classList.add('character-card');
    
    var characterImage = document.createElement('img');
    characterImage.src = randomCharacter.image;
    characterImage.alt = randomCharacter.nombre;
    characterImage.classList.add('imagenCharacter');
    characterDiv.appendChild(characterImage);
  
    console.log(randomCharacter.image, randomCharacter.nombre );
  
    var characterName = document.createElement('p');
    characterName.textContent = 'Nombre: ' + randomCharacter.nombre;
    characterName.classList.add('character-name');
    characterDiv.appendChild(characterName);
    
    var resultContainer = document.querySelector('.result-container');
    resultContainer.innerHTML = '';
    resultContainer.appendChild(characterDiv);
  });
  