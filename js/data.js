let url = '';

if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    url = "./js/data.json";
} else {
    url = "../js/data.json";
}

async function fetchAnimals() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ocurrió un error inesperado al obtener los animales: ' + response.statusText);
        }
        const animals = await response.json();
        return animals;
    } catch (error) {
        console.error('Error de lectura: ', error);
    }
}
