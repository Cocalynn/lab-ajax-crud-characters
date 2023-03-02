const charactersAPI = new APIHandler('http://localhost:8000');
const charactersContainer = document.querySelector('.characters-container')

function generateCharacterDOM(character){
  const characterDOM = document.createElement('div')
  characterDOM.classList.add('character-info')
  characterDOM.innerHTML = `
    <div class="name">${character.name}</div>
    <div class="occupation">${character.occupation}</div>
    <div class="cartoon">${character.isCartoon}</div>
    <div class="weapon">${character.weapon}</div>
  `
  return characterDOM 
}

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI.getFullList()
    .then(response => {
      const characters = response.data

      charactersContainer.innerHTML = ''

      characters.forEach(character => {
        charactersContainer.appendChild(generateCharacterDOM(character))
      });
    }
    )
    .catch(err => console.log(err))


  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    
    const characterId = document.querySelector('input[name="character-id"]').value
    
    charactersAPI.getOneRegister(characterId)
    .then(response => {
      const character = response.data
      charactersContainer.innerHTML = ''
      charactersContainer.appendChild(generateCharacterDOM(character))
    }
    )
    .catch(err => console.log(err))


  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const characterId = document.querySelector('input[name="character-id-delete"]').value

    charactersAPI.deleteOneRegister(characterId)
    .then(response => {
      const character = response.data
      charactersContainer.innerHTML = ''
      charactersContainer.appendChild(generateCharacterDOM(character))
    }
    )
    .catch(err => console.log(err))


  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    const characterId = document.querySelector('#edit-character-form input[name="chr-id"]').value
    const name = document.querySelector('#edit-character-form input[name="name"]').value
    const occupation = document.querySelector('#edit-character-form input[name="occupation"]').value
    const weapon = document.querySelector('#edit-character-form input[name="weapon"]').value
    const isCartoon = document.querySelector('input[name="cartoon"]').checked

    const characterInfo = {name, occupation, weapon, isCartoon}
    console.log(characterInfo)

    charactersAPI.updateOneRegister(characterId, characterInfo)
    .then(response => {
      const character = response.data
      charactersContainer.innerHTML = ''
      charactersContainer.appendChild(generateCharacterDOM(character))
    }
    )
    .catch(err => console.log(err))

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    const name = document.querySelector('input[name="name"]').value
    const occupation = document.querySelector('input[name="occupation"]').value
    const weapon = document.querySelector('input[name="weapon"]').value
    const isCartoon = document.querySelector('input[name="cartoon"]').checked

    const characterInfo = {name, occupation, weapon, isCartoon}

    console.log(characterInfo)

    charactersAPI.createOneRegister(characterInfo)
    .then(response => {
      const character = response.data
      charactersContainer.innerHTML = ''
      charactersContainer.appendChild(generateCharacterDOM(character))
    }
    )
    .catch(err => console.log(err))

  });
});
