// Logic
// interpoller la valeur de chaque pays
function template(country) {

    const population = country.population.toLocaleString("en-US");

    return `
    <div class="col">
    <div class="card shadow-sm h-100">
        <img src="${country.flags.png}" class="card-img-top">
        <div class="card-body">
            <h3 class="card-title">${country.name.common}</h3>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${country.capital}</li>
            <li class="list-group-item text-nowrap"><i class="bi bi-person-vcard"></i> ${population}</li>
        </ul>
    </div>
</div>  
    `;
}



async function loadCountries() {
    const url = 'https://restcountries.com/v3.1/region/europe?fields=name,flags,capital,population';
    const response = await fetch(url);
    const data = await response.json();
    let countries = '';
    for (let index = 0; index < data.length; index++) {
        const country = data[index];
        const card = template(country);
        countries += card;
        //Récuperer l'élément parent  qui contient notre modèle et le clonner pour ajouter un nouveau pays à notre page
        // à chaque itération, il va parser notre contenu .innerHTML

    }

    const countryCards = document.querySelector('#country-cards');
    countryCards.innerHTML = countries
    //console.log(data); //array of countries
    //Display data in index.html
    // const template= document.querySelector('#country-card').innerHTML;
}

//even listener 'load'
window.addEventListener('load', (event) => {
    loadCountries();
})