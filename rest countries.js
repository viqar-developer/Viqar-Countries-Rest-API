
const themeSwitcher = document.getElementById('theme-switcher');
const countriesContainer = document.getElementById('countries-container');
const searchInput = document.getElementById('search-input');
const dropDown = document.querySelector('.dropDown');
const drop = document.querySelector('.drop');
let allCountries = [];

themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

dropDown.addEventListener('click', () => {
    drop.classList.toggle('show');
});

async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        allCountries = await response.json();
        displayCountries(allCountries);
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

function displayCountries(countries) {
    countriesContainer.innerHTML = '';
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        countryCard.innerHTML = `
            <img class="country-flag" src="${country.flags.png}" alt="${country.name.common} flag">
            <h2>${country.name.common}</h2>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital?.[0] || 'N/A'}</p>
        `;
        countriesContainer.appendChild(countryCard);
    });
}

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCountries = allCountries.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm)
    );
    displayCountries(filteredCountries);
});

drop.addEventListener('click', (e) => {
    if (e.target.tagName === 'P') {
        const region = e.target.dataset.region;
        if (region === 'all') {
            displayCountries(allCountries);
        } else {
            const filteredCountries = allCountries.filter(country => 
                country.region === region
            );
            displayCountries(filteredCountries);
        }
        drop.classList.remove('show');
    }
});

fetchCountries();