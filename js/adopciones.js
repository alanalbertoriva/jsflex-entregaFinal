async function displayAnimalsAdopted() {
    let animals = [];
    animals = localStorage.getItem('dbAnimals') ? JSON.parse(localStorage.getItem('dbAnimals')) : await fetchAnimals();
    const container = document.getElementById('contenedorAnimalesAdoptados');

    animals.filter(animal => animal.adoptionStatus === "unavailable").forEach(animal => {
        const animalCard = document.createElement('div');
        animalCard.className = 'col-md-4 mb-4';

        let classBtn = animal.adoptionStatus === 'available' ? 'btn-primary' : 'btn-secondary disabled';
        let statusText = animal.adoptionStatus === 'available' ? 'Adoptar' : 'Adopción en curso';

        animalCard.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${animal.image}" class="card-img-top" alt="${animal.name}">
                <div class="card-body">
                    <h5 class="card-title">${animal.species}: ${animal.name} - ${animal.gender}</h5>
                    <p class="card-text">Edad: ${animal.age} años</p>
                    <p class="card-text textCardSize">${animal.description}</p>
                    <p class="card-text">Adoptado por: <span class="fw-bold">${animal.adopter.name}</span></p>
                </div>
            </div>
        `;
        container.appendChild(animalCard);
    });
}

displayAnimalsAdopted();