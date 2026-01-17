const url = 'https://rickandmortyapi.com/api/character';
const container = document.querySelector('.container');
const details = document.querySelector('.details');
const searchInput = document.getElementById('search');

const createCard = (character, mode = "list") => {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <h2>${character.name}</h2>
    <p>Status: ${character.status}</p>
    <p>Species: ${character.species}</p>
    <p>ID: ${character.id}</p>
    <img src="${character.image}" alt="${character.name}">
    ${
      mode === "list"
        ? `<button class="btn" data-id="${character.id}">Ver detalles</button>`
        : `<button class="back-btn">Regresar</button>`
    }
  `;
  return div;
};

let allCharacters = [];

const renderCharacters = (characters) => {
    container.innerHTML = '';
    characters.forEach(character => {
        container.appendChild(createCard(character));
    });
};

searchInput.addEventListener('keyup', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = allCharacters.filter(character => {
        return (
            character.name.toLowerCase().includes(query) ||
            character.status.toLowerCase().includes(query) ||
            character.species.toLowerCase().includes(query) ||
            character.id.toString().includes(query)
        );
    });
    renderCharacters(filtered);
});

fetch(url)
    .then(response => response.json())
    .then(data => {
        allCharacters = data.results;
        renderCharacters(allCharacters);
    });

const switchDiv = () => {
    container.classList.toggle('invisible');
    details.classList.toggle('invisible');
};

const getId = (e) => {
  if (e.target.classList.contains('btn')) {
    const id = e.target.getAttribute('data-id');
    fetch(url + '/' + id)
      .then(response => response.json())
      .then(character => {
        const card = createCard(character, "detail");
        details.querySelector('div').innerHTML = '';
        details.querySelector('div').appendChild(card);
        switchDiv();
      });
  }
};

details.addEventListener('click', (e) => {
  if (e.target.classList.contains('back-btn')) {
    switchDiv();
  }
});

container.addEventListener('click', getId);