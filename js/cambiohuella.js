async function statusToggle(animalId) {
    let animals = localStorage.getItem('dbAnimals') ? JSON.parse(localStorage.getItem('dbAnimals')) : await fetchAnimals();
    console.log(animals);
    const animalIndex = animals.findIndex(animal => animal.id === Number(animalId));
    console.log(animalIndex);

    if (animalIndex !== -1) {
        animals[animalIndex].adoptionStatus = animals[animalIndex].adoptionStatus === 'available' ? 'unavailable' : 'available';
        let statusText = animals[animalIndex].adoptionStatus === 'available' ? 'Disponible' : 'Adoptado';
        localStorage.setItem('dbAnimals', JSON.stringify(animals));
        Swal.fire({
            icon: "success",
            title: "Estado actualizado",
            text: `El estado de la huellita ha sido cambiado a ${statusText}.`,
        }).then(() => {
            displayOwnAnimals(animals[animalIndex].author.name, animals[animalIndex].author.email, animals[animalIndex].author.phone);
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se encontró la huellita.",
        });
    }
}

async function displayOwnAnimals(authorName, authorEmail, authorPhone) {
    let animals = [];
    animals = localStorage.getItem('dbAnimals') ? JSON.parse(localStorage.getItem('dbAnimals')) : await fetchAnimals();
    const container = document.getElementById('huellasCambioContainer');
    container.innerHTML = '';
    let count = 0;

    animals.filter(animal => animal.author.name === authorName && animal.author.email === authorEmail && animal.author.phone === authorPhone)
    .forEach(animal => {
        count++;
        const animalCard = document.createElement('div');
        animalCard.className = 'col-md-4 mb-4';
        let classBtn = animal.adoptionStatus === 'available' ? 'btn-secondary' : 'btn-success';
        let statusText = animal.adoptionStatus === 'available' ? 'Deshabilitar' : 'Habilitar';

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

    document.querySelectorAll('.btnAdopt').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const animalId = e.target.getAttribute('data-id');
            statusToggle(animalId);
        });
    });

    if (count === 0) {
        container.innerHTML = '<p class="text-center text-danger">No tienes huellitas registradas.</p>';
    }
}

document.getElementById('btnSubmit').addEventListener('click', async (e) => {
    e.preventDefault();
    const authorName = document.getElementById('authorName').value;
    const authorEmail = document.getElementById('authorEmail').value;
    const authorPhone = document.getElementById('authorPhone').value;

    if(authorName === '' || authorEmail === '' || authorPhone === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, completa todos los campos del formulario.",
        });
        return;
    }

    Swal.fire({
        icon: "success",
        title: "Gracias!",
        text: "A continuación te mostrares los animales que has registrado. Desliza hacia abajo para verlos.",
    }).then(()=>{
        displayOwnAnimals(authorName, authorEmail, authorPhone);
        window.location.href = '#huellasCambioContainer';
    });
});