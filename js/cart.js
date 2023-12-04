const generateCartProduct = (id, imgURL, title, date_begin, date_end, price) => {
    return `
    <div class="order-list__i" product-id="${id}">
        <div class="order-list__i-imgbox">
            <div class="order-list__i-img">
                <img src="${imgURL}" alt="Изображение товара">
            </div>
        </div>

        <div class="order-list__i-content">

            <div class="order-list__i-namebox">
                <div class="order-list__i-type">
                    Аренда
                </div>
                <span class="order-list__i-name">${title}</span>
            </div>

            <div class="order-list__i-info">
                <div class="order-list__i-available">
                    <span class="order-list__i-available-text">
                        Начало аренды
                    </span>
                    <div class="order-list__i-date">
                        <div class="date-wrapper order-list__datepicker">
                            <div class="datepicker">
                                <input class="datepicker__data date_begin" type="date" id="date_begin_${id}" value="${date_begin}"/>
                            </div>
                        </div>
                    </div>
                    <span class="order-list__i-available-text">
                        Конец аренды
                    </span>
                    <div class="order-list__i-date">
                        <div class="date-wrapper order-list__datepicker">
                            <div class="datepicker">
                                <input class="datepicker__data date_end" type="date" id="date_end_${id}" value="${date_end}"/>
                            </div>
                        </div>
                    </div>

                </div>


                <div class="order-list__i-price"">
                    <div class="order-list__i-price-total products_sum_format">
                        <span class="product_sum">${price}</span>
                        <span class="rub"><i class="fa fa-rub" aria-hidden="true"></i></span>
                    </div>
                    <div class="order-list__i-price-day">
                        <strong class="first_price_format">
                            <span class="rent_price_in_days">0</span>
                            <i class="fa fa-rub" aria-hidden="true"></i>
                        </strong>
                            / сутки
                    </div>
                </div>
            </div>
            <button class="order-list__i-del">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
        </div>
    </div>`;
};

var finalPrice = 0;
var productsListContainer = document.querySelector(".order-list__row");
var final_sum_block = document.querySelector(".final_sum_torent");
var final_sum_block_2 = document.querySelector(".final_sum_torent_2");


const plusFullPrice = (currentPrice) => {
	return finalPrice += currentPrice;
};

const minusFullPrice = (currentPrice) => {
	return finalPrice -= currentPrice;
};

const normalizePrice = (price) => {
    return price.toFixed(1);
}

const printFullPrice = () => {
	final_sum_block.textContent = `${normalizePrice(finalPrice)}`;
	final_sum_block_2.textContent = `${normalizePrice(finalPrice)}`;
};

const printFullPriceOnlyFinal = () => {
	final_sum_block_2.textContent = `${normalizePrice(finalPrice)}`;
};

function AddToFinalPrice(product) {
    let priceofProd = parseFloat(product.querySelector(".product_sum").textContent);

    plusFullPrice(priceofProd);
    printFullPrice();
}




for (let i = 1; i <= 20; i++) {
    let productObject = JSON.parse(localStorage.getItem('product_id_' + i));
    if (productObject != null) {
        let prodId = productObject.id;
        let prodTitle = productObject.title;
        let prodImg = productObject.imgURL;
        let prodDatebegin = productObject.date_begin;
        let prodDateend = productObject.date_end;
        let prodSumOneDay = productObject.price;

        productsListContainer.insertAdjacentHTML('afterbegin', generateCartProduct(prodId, prodImg, prodTitle, prodDatebegin, prodDateend, prodSumOneDay));

        let addedProduct = productsListContainer.querySelector(`.order-list__i[product-id="${prodId}"]`);
        calculateDateDifference(addedProduct, prodSumOneDay);
        AddToFinalPrice(addedProduct);
    }
}


function calculateDateDifference(addedProduct, prodSumOneDay) {
    const startDateInput = addedProduct.querySelector(".date_begin");
    startDateInput.disabled = true;
    const endDateInput = addedProduct.querySelector(".date_end");
    endDateInput.disabled = true;
    const resultElement = addedProduct.querySelector(".product_sum");
    const default_sum = prodSumOneDay;
    const price_divide_in_days = addedProduct.querySelector(".rent_price_in_days");

    const startDateValue = new Date(startDateInput.value);
    const endDateValue = new Date(endDateInput.value);

    const differenceInMilliseconds = endDateValue - startDateValue;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    if (isNaN(differenceInDays)) {
        resultElement.textContent = '0';
    }
    else if (differenceInDays < 7) {
        resultElement.textContent = parseFloat(differenceInDays * default_sum);
        price_divide_in_days.textContent = parseFloat((differenceInDays * default_sum) / differenceInDays);
    }
    else if (differenceInDays >= 7 && differenceInDays < 30) {
        resultElement.textContent = parseFloat(differenceInDays * default_sum * 0.9).toFixed(1);
        price_divide_in_days.textContent = parseFloat(((differenceInDays * default_sum * 0.9)) / differenceInDays).toFixed(1);
    }
    else if (differenceInDays >= 30) {
        resultElement.textContent = parseFloat(differenceInDays * default_sum * 0.8).toFixed(1);
        price_divide_in_days.textContent = parseFloat(((differenceInDays * default_sum * 0.8)) / differenceInDays).toFixed(1);
    }
}

var productItems = productsListContainer.querySelectorAll(".order-list__i");
productItems.forEach(function(product) {
    let prodID = product.getAttribute('product-id');
    let deleteBtn = product.querySelector(".order-list__i-del");
    let elemPrice = parseFloat(product.querySelector(".product_sum").textContent);
    deleteBtn.addEventListener("click", DeleteElement);

    function DeleteElement() {
        minusFullPrice(elemPrice);
        printFullPrice();
        product.remove();
        localStorage.removeItem(`product_id_${prodID}`);
        setCounterProducts();
    }
});

//Изменяю число в круге - количество продуктов в контейнере
let cart_amount_prods = document.querySelector(".cart_amount");
function setCounterProducts() {
    let orderListItemsCount = productsListContainer.querySelectorAll(".order-list__i").length;
    cart_amount_prods.textContent = orderListItemsCount;
}
setCounterProducts();



//Доставка бесплатно или 349 рублей
let delivery_choice_myself = document.getElementById("delivery_choice_myself");
let delivery_choice_curier = document.getElementById("delivery_choice_curier");
let block_price = document.querySelector(".delivery_sum");
delivery_choice_myself.addEventListener("click", setDeliveryPriceToFree);
delivery_choice_curier.addEventListener("click", setDeliveryPriceTo349);
let isClicked = false;

function setDeliveryPriceToFree() {
    if (isClicked) {
        minusFullPrice(349);
        printFullPrice();
        isClicked = false;
    }
    block_price.textContent = "Бесплатно";
}

function setDeliveryPriceTo349() {
    if (isClicked) {
        block_price.textContent = "349 ₽";
    }
    else {
        block_price.textContent = "349 ₽";
        isClicked = true;
        plusFullPrice(349);
        printFullPriceOnlyFinal();
    }
}
