function completeIDAnimal() {
    const idAnimalInput = document.getElementById('idAnimal');
    const animalId = localStorage.getItem('animalId');
    if(animalId && idAnimalInput) {
        idAnimalInput.value = animalId;
    }
}

async function updateAnimalAdoptionStatus(animalId, status, adopter) {
    let animals = localStorage.getItem('dbAnimals') ? JSON.parse(localStorage.getItem('dbAnimals')) : await fetchAnimals();
    let animal = animals.find(animal => animal.id == animalId);
    if(animal) {
        animal.adoptionStatus = status;
        animal.adopter = adopter || null;
        localStorage.setItem('dbAnimals', JSON.stringify(animals));
    }
}

let btnSubmit = document.getElementById('btnSubmit');
if(btnSubmit) {
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const animalId = localStorage.getItem('animalId');
        const adopterName = document.getElementById('adopterName').value;
        const adopterEmail = document.getElementById('adopterEmail').value;
        const adopterPhone = document.getElementById('adopterPhone').value;

        if(!adopterName || !adopterEmail || !adopterPhone) {
            Swal.fire({
                icon: "error",
                title: "Campos incompletos",
                text: "Por favor, completa todos los campos del formulario.",
            });
            return;
        }

        Swal.fire({
        title: `Confirmas la adopción de ${localStorage.getItem('animalIdName')}?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Confirmar adopción",
            denyButtonText: "Me arrepentí"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(`Gracias ${adopterName}, tu adopción ha sido registrada exitosamente. Te estaremos contactando.`, "", "success")
                .then(() => {
                    localStorage.removeItem('animalId');
                    localStorage.removeItem('animalIdName');
                    let adopter = {
                        name: adopterName,
                        email: adopterEmail,
                        phone: adopterPhone
                    };
                    updateAnimalAdoptionStatus(animalId, "unavailable", adopter);
                    window.location.href = '../index.html';
                });
            } else if (result.isDenied) {
                Swal.fire("Cancelamos tu solicitud.", "", "info");
                localStorage.removeItem('animalId');
                localStorage.removeItem('animalIdName');
                updateAnimalAdoptionStatus(animalId, "available");
                window.location.href = '../index.html';
            }
        });
    });
}

completeIDAnimal();