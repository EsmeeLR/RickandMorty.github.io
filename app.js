const url = 'https://rickandmortyapi.com/api/character';
const container = document.querySelector('.container');
const details = document.querySelector('.details')

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

fetch(url)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(character => {
            container.appendChild(createCard(character));
        });
    });

const switchDiv = () => {
    container.classList.toggle('invisible')
    details.classList.toggle('invisible')
}

const getId = (e) => {
    if (e.target.classList.contains('btn')) {
        const id = e.target.getAttribute('data-id')
        fetch(url + '/' + id)
            .then(response => response.json())
            .then(character => {
                console.log(character)
                const html = `
                    <h2>${character.name}</h2>
                    <p>Status: ${character.status}</p>
                    <p>Species: ${character.species}</p>
                    <p>ID: ${character.id}</p>
                    <img src="${character.image}" alt="${character.name}">
                `
                details.querySelector('div')
                    .innerHTML = html
                switchDiv()
            })
    }
}

const page = Math.ceil(Math.random() * 42);

fetch(url + '?page=' + page)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(character => {
            container.appendChild(createCard(character));
        });
    });

container.addEventListener('click', getId);