import { countries, reset, search } from "./countriesService.js";
const cardsContainer = document.getElementById('cards');

document.getElementById('search-input').addEventListener('input', (event) => {
    console.log(event.target.value);
    reset();
    cardsContainer.innerHTML = '';

    if (!event.target.value || event.target.value === '') {
        createCards();
    } else {
        search(event.target.value);
        createCards();
    }
});

const generateCard = (country) => {
    // יצירת כרטיס וסטיילינג
    const card = document.createElement('div');
    card.className = "card m-2 col-sm-12 col-md-3";

    // יצירת תמונה וסטיילינג
    const cardImg = document.createElement('img');
    cardImg.src = country.flags.png;
    cardImg.className = "card-img-top img mt-2 border rounded shadow";

    // יצירת גוף כרטיס וסטיילינג
    const cardBody = document.createElement('div');
    cardBody.className = "card-body";

    // יצירת כותרת והגדרת טקסט
    const cardTitle = document.createElement('h5');
    cardTitle.className = "card-title";
    cardTitle.innerText = country.name.common;

    // יצירת פסקה לאוכלוסייה
    const population = document.createElement('p');
    population.className = "card-text";
    population.innerText = `Population: ${country.population}`;

    // יצירת פסקה לאזור
    const region = document.createElement('p');
    region.className = "card-text";
    region.innerText = `Region: ${country.region}`;

    // יצירת פוטר לכרטיס
    const cardFooter = document.createElement('div');
    cardFooter.className = "card-footer d-flex justify-content-center mb-2";

    // יצירת אייקון לב
    let heartIcon = document.createElement('i');
    heartIcon.className = "fa fa-heart";

    // Check and restore liked state
    if (localStorage.getItem(country.name.common) === 'liked') {
        heartIcon.classList.add('text-danger');
    } else {
        heartIcon.classList.add('text-dark');
    }

    heartIcon.addEventListener('click', () => {
        if (heartIcon.classList.contains('text-dark')) {
            // Like the flag
            heartIcon.classList.remove('text-dark');
            heartIcon.classList.add('text-danger');
            localStorage.setItem(country.name.common, 'liked');
        } else {
            // Unlike the flag
            heartIcon.classList.remove('text-danger');
            heartIcon.classList.add('text-dark');
            localStorage.removeItem(country.name.common);
        }
    });

    // הוספת אייקון הלב לפוטר
    cardFooter.appendChild(heartIcon);

    // הוספת כותרת, אוכלוסייה ואזור לגוף הכרטיס
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(population);
    cardBody.appendChild(region);

    // הוספת התמונה, גוף כרטיס ופוטר לכרטיס
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    // הוספת הכרטיס לאזור התצוגה
    cardsContainer.appendChild(card);
}

// יצירת כרטיסים לכל המדינות
const createCards = () => {
    // יצירת כרטיסים ומוודא שכל כרטיס ייבדק אם הלב נמצא במצב "לייק"
    cardsContainer.innerHTML = '';  // נקה את התצוגה לפני יצירת כרטיסים חדשים
    for (const country of countries) {
        generateCard(country);
    }
}

export { createCards };

