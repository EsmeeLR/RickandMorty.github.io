const url = 'https://rickandmortyapi.com/api/character';
const container = document.querySelector('.container');
const details = document.querySelector('.details');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');

const createCard = (character) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <h2>${character.name}</h2>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <img src="${character.image}" alt="${character.name}">
        <button class="btn" data-id="${character.id}">ID</button>
    `;
    return div;
};

const renderCharacters = (characters) => {
    container.innerHTML = ''; // limpiar antes de renderizar
    characters.forEach(character => {
        container.appendChild(createCard(character));
    });
};

// 🔍 Función de búsqueda
const searchCharacters = () => {
    const query = searchInput.value.trim();
    if (query === '') return;

    fetch(`${url}/?name=${query}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                container.innerHTML = `<p>No se encontraron resultados</p>`;
            } else {
                renderCharacters(data.results);
            }
        })
        .catch(err => console.error(err));
};

searchBtn.addEventListener('click', searchCharacters);

// 🔄 Mostrar personajes iniciales
fetch(url)
    .then(response => response.json())
    .then(data => {
        renderCharacters(data.results);
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
                const html = `
                    <h2>${character.name}</h2>
                    <p>Status: ${character.status}</p>
                    <p>Species: ${character.species}</p>
                    <p>ID: ${character.id}</p>
                    <img src="${character.image}" alt="${character.name}">
                `;
                details.querySelector('div').innerHTML = html;
                switchDiv();
            });
    }
};

container.addEventListener('click', getId);