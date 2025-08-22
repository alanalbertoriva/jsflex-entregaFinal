document.getElementById('btnSearch').addEventListener('click', async (e) => {
    e.preventDefault();
    const valueSearch = document.getElementById('valueSearch').value;

    if(valueSearch === '') {
        Swal.fire({
            icon: "warning",
            title: "Búsqueda vacía",
            text: "Por favor, completa el valor de búsqueda.",
        });
        return;
    }

    localStorage.setItem('valueSearch', valueSearch);
    let url = '';
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        url = "./pages/busqueda.html";
    } else {
        url = "../pages/busqueda.html";
    }
    window.location.href = url;
});

async function displaySearchResults(valueSearch) {
    let animals = localStorage.getItem('dbAnimals') ? JSON.parse(localStorage.getItem('dbAnimals')) : await fetchAnimals();
    const container = document.getElementById('huellasBusquedaContainer');
    container.innerHTML = '';
    localStorage.removeItem('valueSearch');
    let count = 0;

    animals.filter(animal => animal.name.toLowerCase().includes(valueSearch.toLowerCase()) || animal.species.toLowerCase().includes(valueSearch.toLowerCase()) || animal.description.toLowerCase().includes(valueSearch.toLowerCase()) || animal.gender.toLowerCase().includes(valueSearch.toLowerCase()))
    .forEach(animal => {
        const animalCard = document.createElement('div');
        animalCard.className = 'col-md-4 mb-4';
        count++;

        let classBtn = animal.adoptionStatus === 'available' ? 'btn-primary' : 'btn-secondary disabled';
        let statusText = animal.adoptionStatus === 'available' ? 'Adoptar' : 'Adopción en curso';

        animalCard.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${animal.image}" class="card-img-top" alt="${animal.name}">
                <div class="card-body">
                    <h5 class="card-title">${animal.species}: ${animal.name} - ${animal.gender}</h5>
                    <p class="card-text">Edad: ${animal.age} años</p>
                    <p class="card-text textCardSize">${animal.description}</p>
                    <a href="#" class="btn ${classBtn} btnAdopt" data-id=${animal.id}>${statusText}</a>
                </div>
            </div>
        `;
        container.appendChild(animalCard);
    });

    if(count === 0) {
        Swal.fire({
            icon: "warning",
            title: "Busqueda sin resultados",
            text: "No encontramos resultados a tu búsqueda.",
        }).then(() => {
            let url = '';
            if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
                url = "./index.html";
            } else {
                url = "../index.html";
            }
            window.location.href = url;
        });

        return;
    }
    
    document.querySelectorAll('.btnAdopt').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const animalId = e.target.getAttribute('data-id');
            if(localStorage.getItem('animalId')) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Solo puedes adoptar un animal a la vez. Completa el proceso de adopción actual antes de iniciar uno nuevo.",
                    footer: '<a href="./adopcion.html">Completar formulario de adopción en curso.</a>'
                }).then(()=>{
                    window.location.href = './adopcion.html';
                });
            } else {
                let animal = animals.find(animal => animal.id == animalId);
                animal.adoptionStatus = "inprogress";
                localStorage.setItem('animalId', animalId);
                localStorage.setItem('animalIdName', animal.name);
                localStorage.setItem('dbAnimals', JSON.stringify(animals));
                Swal.fire({
                    icon: "success",
                    title: "Gracias!",
                    text: "La adopción ha sido iniciada correctamente. Por favor, completa el formulario de adopción.",
                }).then(()=>{
                    window.location.href = './adopcion.html';
                });
            } 
        });
    });
}

if (localStorage.getItem('valueSearch')) {
    displaySearchResults(localStorage.getItem('valueSearch'));
}

