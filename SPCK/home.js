window.onscroll = function () { scrollFunction() };

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
const itemsPerPage = 1;

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
        breedDiv.classList.add('classbreedDiv')
        breedDiv.innerHTML = `
            <img src="${imgUrl}" alt=""/>
            <div>
            <p>name: ${breed.name}</p>
            <p >${breed.description}</p>
            <div>

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




document.addEventListener('DOMContentLoaded', function () {
    const factsBtn = document.getElementById('facts-btn');
    const factDiv = document.getElementById('fact');

    factsBtn.addEventListener('click', function () {
        fetch('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=20')
            .then(response => response.json())
            .then(data => {
                // Lọc các facts có ít nhất 10 từ
                const filteredFacts = data.filter(fact => fact.text.split(' ').length >= 10);

                if (filteredFacts.length > 0) {
                    // Chọn ngẫu nhiên một fact từ các facts đã lọc
                    const randomIndex = Math.floor(Math.random() * filteredFacts.length);
                    const selectedFact = filteredFacts[randomIndex];

                    // Hiển thị fact được chọn
                    factDiv.textContent = selectedFact.text;
                } else {
                    factDiv.textContent = 'Không tìm thấy fact nào có ít nhất 10 từ.';
                }
            })
            .catch(error => console.error('Error fetching cat facts:', error));
    });
});






document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.thecatapi.com/v1/images/search?limit=10&api_key=live_RvtlJIo5IQ3i0lSWi03bR7xWlHLTocWrDL5xyLbS5BKWX4KQ3RTou85IaMpjsFrn')
        .then(response => response.json())
        .then(data => {
            const carouselInner = document.querySelector('.carousel-inner');
            const carouselIndicators = document.querySelector('.carousel-indicators');
            data.forEach((item, index) => {
                // Create carousel item
                const carouselItem = document.createElement('div');
                carouselItem.className = 'carousel-item';
                if (index === 0) carouselItem.classList.add('active');

                // Create image element
                const img = document.createElement('img');
                img.src = item.url;
                img.className = 'd-block';
                carouselItem.appendChild(img);

                // Append to carousel inner
                carouselInner.appendChild(carouselItem);

                // Create indicator button
                const indicatorButton = document.createElement('button');
                indicatorButton.type = 'button';
                indicatorButton.setAttribute('data-bs-target', '#carouselExampleIndicators');
                indicatorButton.setAttribute('data-bs-slide-to', index);
                if (index === 0) {
                    indicatorButton.classList.add('active');
                    indicatorButton.setAttribute('aria-current', 'true');
                }
                indicatorButton.setAttribute('aria-label', `Slide ${index + 1}`);

                // Append to carousel indicators
                carouselIndicators.appendChild(indicatorButton);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});