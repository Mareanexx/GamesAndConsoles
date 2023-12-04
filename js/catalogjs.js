// Получаем элементы select и контейнер с карточками товаров
const filterSelect = document.querySelector('select[name="filter"]');
const productCardsContainer = document.querySelector('.catalog_choose_gandc');
var productCards_default = productCardsContainer.querySelectorAll('.product_card');

// Функция для показа карточек товаров в зависимости от выбранного фильтра
function handleFilterChange() {
    const selectedValue = filterSelect.value;

    if (selectedValue === 'default') {
        productCardsContainer.innerHTML = '';
        productCards_default.forEach(card => {
            card.style.display = 'block';
            productCardsContainer.appendChild(card);
        });
        return;
    }

    const productCards = productCardsContainer.querySelectorAll('.product_card');


    productCards.forEach(card => {
        if (
            selectedValue === 'only-consoles' && card.getAttribute('data-tag') !== 'console' ||
            selectedValue === 'only-games' && card.getAttribute('data-tag') !== 'game'
        ) {
            card.style.display = 'none';
        } else {
            card.style.display = 'block';
        }
    });
}

// Слушаем изменения в select и вызываем функцию для обработки фильтра
filterSelect.addEventListener('change', handleFilterChange);


const sorterSelect = document.querySelector('select[name="sorter"]');

function sortProductCards() {
    const selectedValue = sorterSelect.value;
    const productCards = Array.from(productCardsContainer.querySelectorAll('.product_card'));

    if (selectedValue === 'default') {
        productCardsContainer.innerHTML = '';
        productCards_default.forEach(card => {
            productCardsContainer.appendChild(card);
        });
    }
    else if (selectedValue === 'price-up') {
        productCards.sort((a, b) => {
            const priceA = parseInt(a.getAttribute('data-price'));
            const priceB = parseInt(b.getAttribute('data-price'));
            return priceA - priceB;
        });

        productCards.forEach(card => {
            productCardsContainer.appendChild(card);
        });
    } 
    else if (selectedValue === 'price-down') {
        productCards.sort((a, b) => {
            const priceA = parseInt(a.getAttribute('data-price'));
            const priceB = parseInt(b.getAttribute('data-price'));
            return priceB - priceA;
        });

        productCards.forEach(card => {
            productCardsContainer.appendChild(card);
        });
    }

}

sorterSelect.addEventListener('change', sortProductCards);



// Переход на другую страницу с передачей параметра в URL
function redirectToProductPage(productId) {
    window.location.href = `product-card.html?product-id=${productId}`;
}