// Logic
// interpoller la valeur de chaque pays
function template(country) {

    // const caseArea = country.area.toLocaleString("en-US");

    //Verify if there is a undefined in a cell
    const caseArea = country.area ? country.area.toLocaleString("en-US") : '<i class="bi bi-question-circle-fill text-danger"></i>';
    const flag = country.flags.png ? `<img src="${country.flags.png}" class="img-fluid p-1 col-sm-4">` : '<i class="bi bi-question-circle text-danger"></i>';
    const coatOfArms = country.coatOfArms.png ? `<img src="${country.coatOfArms.png}" class="img-fluid p-1 col-sm-4">` : '<i class="bi bi-question-circle text-danger"></i>';
    const cca2 = country.cca2 ? country.cca2 : '<i class="bi bi-question-circle-fill text-danger"></i>';
    const tld = country.tld && country.tld.length > 0 ? country.tld[0] : '<i class="bi bi-question-circle-fill text-danger"></i>';
    //country.tld && country.tld.length > 0 vérifie d'abord si country.tld existe et n'est pas undefined, puis s'il contient au moins un élément.
    const countryName = country.name.official ? country.name.official : '<i class="bi bi-question-circle-fill text-danger"></i>';

    return `
    <tbody>
    <tr>
      <td class="text-center col-1"><a href="${country.maps.googleMaps}">${flag}</a></td>
      <td class="text-center col-1">${coatOfArms}</td>
      <td class="text-center">${cca2}</td>
      <td class="text-center">${tld}</td>
      <td class="text-nowrap text-start">${countryName}</td>
      <td class="text-end">${caseArea}</td>
    </tr>
  </tbody>
    `;
}



async function loadCountries() {
    const url = 'https://restcountries.com/v3.1/region/europe?fields=flags,coatOfArms,tld,cca2,name,area,maps';
    const response = await fetch(url);
    const data = await response.json();
    let countries = '';
    for (let index = 0; index < data.length; index++) {
        const country = data[index];
        const row = template(country);
        countries += row;
        //Récuperer l'élément parent  qui contient notre modèle et le clonner pour ajouter un nouveau pays à notre page
        // à chaque itération, il va parser notre contenu .innerHTML

    }
    const countryTable = document.querySelector('#country-table');
    countryTable.innerHTML = countries;

}

//even listener 'load'
window.addEventListener('load', (event) => {
    loadCountries();
})