// Vérification des emails
function validateEmail(email) {
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
}

// Vérification des noms et prénoms
function validateNames(firstname) {
    var regex = /^[a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ'-\s]+$/; // Ajout d'un espace dans le regex pour autoriser les espaces
    return regex.test(firstname); // Utilisation de la méthode test() pour vérifier des prénoms et noms saisis
}

document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    // Réinitialise les messages d'erreur
    var errorMessages = '';

    // Validation de l'email
    var emailInput = document.getElementById('email');
    var emailValue = emailInput.value.trim(); //fonction trim retire les espaces initiaux et finaux
    if (!validateEmail(emailValue)) {
        errorMessages += 'Email is not valid\n';
    } else if (emailValue.length > 254) {
        errorMessages += 'You exceeded the max length for an email address. Please enter a valid email adress! \n';
    }

    // Validation de la longueur du message
    var messageInput = document.getElementById('message');
    var messageValue = messageInput.value;
    if (messageValue.length > 1000) {
        errorMessages += 'Your message exceeds 1000 characters.\n';
    }

    // Vérification de saisi de prénom
    var firstNameInput = document.getElementById('first-name');
    var firstNameValue = firstNameInput.value.trim(); // pour enlever les espaces devant et après
    if (firstNameValue.length === 0) {
        errorMessages += 'Please enter a first name\n';
    } else if (!validateNames(firstNameValue)) {
        errorMessages += "The format of your first name isn't correct, please use only letters, dashes, apostrophes and spaces.\n";
    } else if (firstNameValue.length > 100) {
        errorMessages += 'Your first name exceeds 100 characters.\n';
    }

    // Vérification de saisi de nom
    var lastNameInput = document.getElementById('last-name');
    var lastNameValue = lastNameInput.value.trim();
    if (lastNameValue.length === 0) {
        errorMessages += 'Please enter a last name\n';
    } else if (!validateNames(lastNameValue)) {
        errorMessages += "The format of your last name isn't correct, please use only letters, dashes, apostrophes and spaces.\n";
    } else if (lastNameValue.length > 100) {
        errorMessages += 'Your last name exceeds 100 characters.\n';
    }

    // Affiche les messages d'erreur ou soumet le formulaire si tout est correct
    if (errorMessages) {
        alert(errorMessages);
        return; // Arrête l'exécution de la fonction si des erreurs ont été trouvées
    }

    const data = {
        firstname: firstNameValue,
        lastname: lastNameValue,
        email: emailValue,
        comments: messageValue
    }

    // Je convertis les données du formulaire en chaîne JSON
    const dataJSON = JSON.stringify(data);
    console.log(dataJSON);

    await sendToAPI(dataJSON); // Appel à la fonction d'envoi à l'API
});

async function sendToAPI(dataJSON) {
    try {
        // j'envoie les données à l'API
        const response = await fetch('https://gateway.readresolve.tech:9443/sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataJSON
        });

        // Vérification du statut de la réponse
        if (response.status === 202) {
            console.log(`${response.status}: Message sent successfully`);
            document.getElementById('contact-form').reset(); // Réinitialise le formulaire
            alert("Successful! Your message has arrived!");
        } else {
            // Si le statut de réponse n'est pas 202, affiche une alerte spécifique
            const errorMessage = await response.json();
            alert(`Le serveur a répondu avec le statut ${response.status}: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert(error.message);
    }
}

