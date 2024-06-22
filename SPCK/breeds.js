window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-500px";
  }
}

const apiUrl = 'https://api.thecatapi.com/v1/breeds';
const apiKey = 'live_RvtlJIo5IQ3i0lSWi03bR7xWlHLTocWrDL5xyLbS5BKWX4KQ3RTou85IaMpjsFrn';  // Replace with your actual API key

let breeds = [];
let currentPage = 1;
const itemsPerPage = 8;

document.addEventListener('DOMContentLoaded', () => {
    fetchBreeds();
    document.getElementById('prev').addEventListener('click', () => changePage(-1));
    document.getElementById('next').addEventListener('click', () => changePage(1));
});

async function fetchBreeds() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            }
        });
        breeds = await response.json();
        displayPage(currentPage);
    } catch (error) {
        console.error('Error fetching cat breeds:', error);
    }
}

async function fetchCatImage(breedId) {
    const imageUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    try {
        const response = await fetch(imageUrl, {});
        const data = await response.json();
        return data.length > 0 ? data[0].url : '';
    } catch (error) {
        console.error('Error fetching cat image:', error);
        return '';
    }
}

async function displayPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedBreeds = breeds.slice(start, end);

    const catBreedsDiv = document.getElementById('cat-breeds');
    catBreedsDiv.innerHTML = '';

    for (const breed of paginatedBreeds) {
        const imgUrl = await fetchCatImage(breed.id);
        const breedDiv = document.createElement('div');
        breedDiv.innerHTML = `
            <img src="${imgUrl}" alt=""/>
            <h3>${breed.name}</h3>
            <p>${breed.description}</p>
            <p>temperament: ${breed.temperament}</p>
            <p>life span: ${breed.life_span}</p>
            <p>indoor: ${breed.indoor}</p>
            <p>adaptability: ${breed.adaptability}</p>
            <p>affection level: ${breed.affection_level}</p>
            <p>child friendly: ${breed.child_friendly}</p>
            <p>dog friendly: ${breed.dog_friendly}</p>
            <p>energy level: ${breed.energy_level}</p>
            <p>grooming: ${breed.grooming}</p>
            <p>health issues: ${breed.health_issues}</p>
            <p>intelligence: ${breed.intelligence}</p>
            <p>social needs: ${breed.social_needs}</p>

            <a href="${breed.wikipedia_url}">Detailed Information</a>
            
        `;
        catBreedsDiv.appendChild(breedDiv);
    }

    document.getElementById('page-info').innerText = `Page ${page} of ${Math.ceil(breeds.length / itemsPerPage)}`;
    document.getElementById('prev').disabled = page === 1;
    document.getElementById('next').disabled = page === Math.ceil(breeds.length / itemsPerPage);
}

function changePage(direction) {
    currentPage += direction;
    displayPage(currentPage);
}
