async function displayAnimals() {
    let animals = [];
    animals = localStorage.getItem('dbAnimals') ? JSON.parse(localStorage.getItem('dbAnimals')) : await fetchAnimals();
    const container = document.getElementById('contenedorAnimalesPreview');

    animals.filter(animal => animal.adoptionStatus !== "unavailable").slice(0, 3).forEach(animal => {
        const animalCard = document.createElement('div');
        animalCard.className = 'col-md-4 mb-4';

        let classBtn = animal.adoptionStatus === 'available' ? 'btn-primary' : 'btn-secondary disabled';
        let statusText = animal.adoptionStatus === 'available' ? 'Adoptar' : 'Adopción en curso';
        let imageSrc = animal.image.replace('../', './');

        animalCard.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${imageSrc}" class="card-img-top" alt="${animal.name}">
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
            if(localStorage.getItem('animalId')) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Solo puedes adoptar un animal a la vez. Completa el proceso de adopción actual antes de iniciar uno nuevo.",
                    footer: '<a href="./pages/adopcion.html">Completar formulario de adopción en curso.</a>'
                }).then(()=>{
                    window.location.href = './pages/adopcion.html';
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
                    window.location.href = './pages/adopcion.html';
                });
            } 
        });
    });
}

displayAnimals();

