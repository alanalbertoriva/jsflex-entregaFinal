document.getElementById('btnSubmit').addEventListener('click', async (e) => {
    e.preventDefault();
    const authorName = document.getElementById('authorName').value;
    const authorEmail = document.getElementById('authorEmail').value;
    const authorPhone = document.getElementById('authorPhone').value;
    const animalName = document.getElementById('animalName').value;
    const animalAge = document.getElementById('animalAge').value;
    const animalSpecies = document.getElementById('animalSpecies').value;
    const animalDescription = document.getElementById('animalDescription').value;
    const animalImage = document.getElementById('animalImage').value;
    const animalGender = document.getElementById('animalGender').value;

    if(authorName === '' || authorEmail === '' || authorPhone === '' || animalName === '' || animalAge === '' || animalSpecies === '' || animalDescription === '' || animalImage === '' || animalGender === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, completa todos los campos del formulario.",
        });
        return;
    }

    const author = {
        name: authorName,
        email: authorEmail,
        phone: authorPhone
    };

    const adopter = {
        name: authorName,
        email: authorEmail,
        phone: authorPhone
    };

    const newAnimal = {
        id: Date.now(),
        name: animalName,
        age: animalAge,
        gender: animalGender,
        species: animalSpecies,
        description: animalDescription,
        image: animalImage,
        author: author,
        adopter: adopter,
        adoptionStatus: 'available'
    };

    let animals = [];
    animals = localStorage.getItem('dbAnimals') ? JSON.parse(localStorage.getItem('dbAnimals')) : await fetchAnimals();
    animals.push(newAnimal);
    localStorage.setItem('dbAnimals', JSON.stringify(animals));

    Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "La nueva huella ha sido registrada correctamente.",
    }).then(() => {
        window.location.href = './animales.html';
    });
});