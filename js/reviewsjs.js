//Начало кода на скролный хедер
TweenLite.defaultEase = Linear.easeNone;

var header = document.querySelector("#app-header");
var bgBack = document.querySelector("#background-back");
var bgFront = document.querySelector("#background-front");
var toolbar = document.querySelector(".container__navbar");
var largeTitle = document.querySelector("#large-title");
var smallTitle = document.querySelector("#small-title");

var deltaHeight = header.offsetHeight - toolbar.offsetHeight;

var rect1 = smallTitle.getBoundingClientRect();
var rect2 = largeTitle.getBoundingClientRect();

var scale = rect1.height / rect2.height;
var x = rect1.left - rect2.left;
var y = rect1.top  - rect2.top;

var headerAnimation = new TimelineLite({ paused: true })
  .to(largeTitle, 1, { scale: scale, x: x, y: deltaHeight + y }, 0)
  .to(header,  1, { y: -deltaHeight }, 0)
  .to(toolbar, 1, { y: deltaHeight }, 0)
  .to(bgBack,  1, { y: deltaHeight / 2 }, 0)
  .to(bgFront, 1, { y: deltaHeight / 2 }, 0)
  .to(bgBack,  1, { alpha: 1 }, 0)
  .to(bgFront, 1, { alpha: 0 }, 0)
  .set(smallTitle, { alpha: 1 }, 1)
  .set(largeTitle, { alpha: 0 }, 1);

var shadowAnimation = TweenLite.to(header, 0.4, { 
  boxShadow: "0 2px 5px rgba(0,0,0,0.6)",
  ease: Power1.easeOut
}).reverse();

var progress  = 0;
var requestId = null;
var reversed  = true;

update();
window.addEventListener("scroll", requestUpdate);

function requestUpdate() {
  if (!requestId) {
    requestId = requestAnimationFrame(update);
  }
}

function update() {
  
  var scroll = window.pageYOffset;
  
  if (scroll < deltaHeight) {   
    progress = scroll < 0 ? 0 : scroll / deltaHeight;
    reversed = true;
  } else {
    progress = 1;
    reversed = false;
  }
  
  headerAnimation.progress(progress);
  shadowAnimation.reversed(reversed);
  
  requestId = null;
}
//Конец кода на скролный хедер



//testimonial slider
$('.testimonials').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 300,
    dots:true,
    centerMode: true,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows:false
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows:false
        }
      }
    ]
  });


let block_like_dislike_1 = document.querySelectorAll(".block-like-dislike-1");

block_like_dislike_1.forEach(function(block_like_dislike) {
    //like
    var like_btn = block_like_dislike.querySelector(".like-1");
    var like_tag = block_like_dislike.querySelector(".like-1 i");
    like_tag.style.color = "black";
    var number_likes = block_like_dislike.querySelector(".like-1 p");
    var currentCountLike = parseInt(number_likes.textContent);
    var isClickedLike = false;
    //dislike
    var dislike_btn = block_like_dislike.querySelector(".dislike-1");
    var dislike_tag = block_like_dislike.querySelector(".dislike-1 i");
    dislike_tag.style.color = "black";
    var number_dislikes = block_like_dislike.querySelector(".dislike-1 p");
    var currentCountDislike = parseInt(number_dislikes.textContent);
    var isClickedDislike = false;

    like_btn.addEventListener("click", setRemoveLike);
    function setRemoveLike() {
        if (!isClickedLike) {
            isClickedLike = true;
            like_btn.style.backgroundColor = "rgba(17, 255, 0, 0.1)";
            like_tag.style.color = "green";
            
            let newCountLike = currentCountLike + 1;
            number_likes.textContent = newCountLike;
            currentCountLike = newCountLike;

            //Убрать дизлайк
            if (isClickedDislike) {
                isClickedDislike = false;
                dislike_btn.style.backgroundColor = "rgba(0,0,0, 0.05)";
                dislike_tag.style.color = "black";
                
                let newCountDislike = currentCountDislike - 1;
                number_dislikes.textContent = newCountDislike;
                currentCountDislike = newCountDislike;
            }
        }
        else {
            isClickedLike = false;
            like_btn.style.backgroundColor = "rgba(0,0,0, 0.05)";
            like_tag.style.color = "black";
            
            let newCountLike = currentCountLike - 1;
            number_likes.textContent = newCountLike;
            currentCountLike = newCountLike;
        }
    }

    dislike_btn.addEventListener("click", setRemoveDislike);
    function setRemoveDislike() {
        if (!isClickedDislike) {
            isClickedDislike = true;
            dislike_btn.style.backgroundColor = "rgba(251, 33, 33, 0.1)";
            dislike_tag.style.color = "red";
            
            let newCountDislike = currentCountDislike + 1;
            number_dislikes.textContent = newCountDislike;
            currentCountDislike = newCountDislike;

            //Убрать лайк
            if (isClickedLike) {
                isClickedLike = false;
                like_btn.style.backgroundColor = "rgba(0,0,0, 0.05)";
                like_tag.style.color = "black";
                
                let newCountLike = currentCountLike - 1;
                number_likes.textContent = newCountLike;
                currentCountLike = newCountLike;
            }
        }
        else {
            isClickedDislike = false;
            dislike_btn.style.backgroundColor = "rgba(0,0,0, 0.05)";
            dislike_tag.style.color = "black";
            
            let newCountDislike = currentCountDislike - 1;
            number_dislikes.textContent = newCountDislike;
            currentCountDislike = newCountDislike;
        }
    }
});



document.addEventListener("DOMContentLoaded", function() {
  const testimonialBoxContainer = document.querySelector('.testimonial-box-container');

  testimonialBoxContainer.addEventListener("click", function(event) {
      if (event.target.classList.contains("show_more_btn")) {
          let span = event.target;
          let paragraph = span.parentElement.querySelector(".client-comment-p");
          let origText = paragraph.getAttribute("data-original-text");

          if (span.textContent === "... показать еще") {
              paragraph.textContent = origText;
              span.textContent = "… скрыть";
          } else {
              paragraph.textContent = truncate(origText, 288);
              span.textContent = "... показать еще";
          }
      }
  });



  // Вызываем сокращение текста при загрузке страницы
  TruncEverytime();
  updateLikeDislike();
});



  // Функция для сокращения текста при загрузке страницы
function TruncEverytime() {
    let client_comment_blocks = document.querySelectorAll(".client-comment");

    client_comment_blocks.forEach(function(client_comment_block) {
        let paragraph = client_comment_block.querySelector(".client-comment-p");
        let origText = paragraph.textContent.trim();
        paragraph.setAttribute("data-original-text", origText);
        let truncatedText = truncate(origText, 288);
        paragraph.textContent = truncatedText;
    });
}


  // Функция обрезки текста
function truncate(str, maxlength) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength - 1) + "...";
    } else {
        return str;
    }
}

//Начало кода на фильтрацию по выбору пользователя
var defaultArrayFilter = document.querySelectorAll('.testimonial-box');
var clonedArrayFilter;

function copyArraysFilter() {
  clonedArrayFilter = [];
  defaultArrayFilter.forEach(span => {
    clonedArrayFilter.push(span.cloneNode(true)); //true - значит все содержимое тоже копируется
  });
}

function filterBy(value) {
  let container = document.querySelector('.testimonial-box-container');
  container.innerHTML = '';

  if (value === 0) {
    clonedArrayFilter.forEach(span => {
      container.appendChild(span.cloneNode(true));
    });
    updateLikeDislike();
    TruncEverytime();
  } 
  else {
    defaultArrayFilter.forEach(span => {
      let spanValue = parseFloat(span.querySelector('.numberoffilter').innerText);
      if (spanValue === value) {
        container.appendChild(span.cloneNode(true));
      }
    });
    updateLikeDislike();
    TruncEverytime();
  }
}
//Конец кода на фильтрацию по выбору пользователя



//Начало кода на сортировку элементов

var defaultArraySort = document.querySelectorAll('.testimonial-box');
var clonedArraySort;

function copyArraysSort() {
  clonedArraySort = [];
  defaultArraySort.forEach(box => {
    clonedArraySort.push(box.cloneNode(true));
  });
}


function sortDefault() {
  let container = document.querySelector('.testimonial-box-container');
  container.innerHTML = '';

  clonedArraySort.forEach(box => {
    container.appendChild(box.cloneNode(true));
  });
  updateLikeDislike();
  TruncEverytime();
}

function sortByLikes() {
  let container = document.querySelector('.testimonial-box-container');
  container.innerHTML = '';

  let sortedArray = [...defaultArraySort].sort((a, b) => {
    let likesA = parseInt(a.querySelector('.count_of_likes').innerText);
    let likesB = parseInt(b.querySelector('.count_of_likes').innerText);
    return likesB - likesA;
  });

  sortedArray.forEach(box => {
    container.appendChild(box.cloneNode(true));
  });
  updateLikeDislike();
  TruncEverytime();
}

function sortByDislikes() {
  let container = document.querySelector('.testimonial-box-container');
  container.innerHTML = '';

  let sortedArray = [...defaultArraySort].sort((a, b) => {
    let dislikesA = parseInt(a.querySelector('.count_of_dislikes').innerText);
    let dislikesB = parseInt(b.querySelector('.count_of_dislikes').innerText);
    return dislikesB - dislikesA;
  });

  sortedArray.forEach(box => {
    container.appendChild(box.cloneNode(true));
  });
  updateLikeDislike();
  TruncEverytime();
}
//Конец кода на сортировку элементов




//Начало кода на ставку лайков/дизлайков

function updateLikeDislike() {
    
  let block_like_dislike = document.querySelectorAll(".block-like-dislike");

  block_like_dislike.forEach(function(block_like_dislike) {
      //like
      var like_btn = block_like_dislike.querySelector(".like"); //    background-color: rgba(0,0,0, 0.05);
      var like_tag = block_like_dislike.querySelector(".like i");
      like_btn.style.backgroundColor = "background-color: rgba(0,0,0, 0.05)";
      like_tag.style.color = "black";
      var number_likes = block_like_dislike.querySelector(".like p");
      var currentCountLike = parseInt(number_likes.textContent);
      var isClickedLike = false;
      //dislike
      var dislike_btn = block_like_dislike.querySelector(".dislike");
      var dislike_tag = block_like_dislike.querySelector(".dislike i");
      dislike_tag.style.color = "black";
      dislike_btn.style.backgroundColor = "background-color: rgba(0,0,0, 0.05)";
      var number_dislikes = block_like_dislike.querySelector(".dislike p");
      var currentCountDislike = parseInt(number_dislikes.textContent);
      var isClickedDislike = false;

      like_btn.addEventListener("click", setRemoveLike);
      function setRemoveLike() {
          if (!isClickedLike) {
              isClickedLike = true;
              like_btn.style.backgroundColor = "rgba(17, 255, 0, 0.1)";
              like_tag.style.color = "green";
              
              let newCountLike = currentCountLike + 1;
              number_likes.textContent = newCountLike;
              currentCountLike = newCountLike;

              //Убрать дизлайк
              if (isClickedDislike) {
                  isClickedDislike = false;
                  dislike_btn.style.backgroundColor = "rgba(0,0,0, 0.05)";
                  dislike_tag.style.color = "black";
                  
                  let newCountDislike = currentCountDislike - 1;
                  number_dislikes.textContent = newCountDislike;
                  currentCountDislike = newCountDislike;
              }
          }
          else {
              isClickedLike = false;
              like_btn.style.backgroundColor = "rgba(0,0,0, 0.05)";
              like_tag.style.color = "black";
              
              let newCountLike = currentCountLike - 1;
              number_likes.textContent = newCountLike;
              currentCountLike = newCountLike;
          }
      }

      dislike_btn.addEventListener("click", setRemoveDislike);
      function setRemoveDislike() {
          if (!isClickedDislike) {
              isClickedDislike = true;
              dislike_btn.style.backgroundColor = "rgba(251, 33, 33, 0.1)";
              dislike_tag.style.color = "red";
              
              let newCountDislike = currentCountDislike + 1;
              number_dislikes.textContent = newCountDislike;
              currentCountDislike = newCountDislike;

              //Убрать лайк
              if (isClickedLike) {
                  isClickedLike = false;
                  like_btn.style.backgroundColor = "rgba(0,0,0, 0.05)";
                  like_tag.style.color = "black";
                  
                  let newCountLike = currentCountLike - 1;
                  number_likes.textContent = newCountLike;
                  currentCountLike = newCountLike;
              }
          }
          else {
              isClickedDislike = false;
              dislike_btn.style.backgroundColor = "rgba(0,0,0, 0.05)";
              dislike_tag.style.color = "black";
              
              let newCountDislike = currentCountDislike - 1;
              number_dislikes.textContent = newCountDislike;
              currentCountDislike = newCountDislike;
          }
      }
  });
  //Конец кода на ставку лайков/дизлайков 
}





//Начало кода на открытие/закрытие панели "Фильтр" по нажатию на кнопку
var block_content = document.querySelector(".dropdown_content_container");
block_content.style.zIndex = "2";




var filter_btn = document.getElementById("filter-btn");
var block_filters = document.querySelector(".dropdown-filter__content");
block_filters.style.visibility = "hidden";
let isClicked = false;

filter_btn.addEventListener("click", OpenListofFilters);

function OpenListofFilters() {
  if (!isClicked) {
    isClicked = true;
    block_content.style.zIndex = "4";
    block_filters.style.visibility = "visible";
  }
  else {
    isClicked = false;
    if (!isClicked2) {
      block_content.style.zIndex = "2";
    }
    block_filters.style.visibility = "hidden";
  }
};
//Конец кода на открытие/закрытие панели "Фильтр" по нажатию на кнопку

//Начало кода на открытие/закрытие панели "Сортировка" по нажатию на кнопку
var sorter_btn = document.getElementById("sorter-btn");
var block_sorters = document.querySelector(".dropdown-sorter__content");
block_sorters.style.visibility = "hidden";
let isClicked2 = false;

sorter_btn.addEventListener("click", OpenListofSorters);

function OpenListofSorters() {
  if (!isClicked2) {
    isClicked2 = true;
    block_content.style.zIndex = "4";
    block_sorters.style.visibility = "visible";
  }
  else {
    isClicked2 = false;
    if (!isClicked) {
      block_content.style.zIndex = "2";
    }
    block_sorters.style.visibility = "hidden";
  }
};
//Конец кода на открытие/закрытие панели "Сортировка" по нажатию на кнопку


//Начало кода на добавление нового отзыва
const generateNewReview = (name, text, date, numOfStars) => {
  return `            
  <div class="testimonial-box">
    <div class="box-top">
        <div class="profile">
            <div class="profile-img">
                <img src="img/user-icons/user-icon2.png" />
            </div>
            <div class="name-user">
                <strong>${name}</strong>
                <span>@${name}</span>
            </div>
        </div>
        <div class="reviews">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <span class="reviews-rate">
                <span class="numberoffilter">${numOfStars}</span>/5
            </span>
        </div>
    </div>
    <div class="client-comment">
        <p class="client-comment-p">
          ${text}
        </p>
        <span class="show_more_btn">... показать еще</span>
    </div>
    <div class="block-like-dislike" style="margin-top: 15px;">
        <div class="time">
            <p class="time-ofreview">
                ${date}
            </p>
        </div>
        <div class="like-dislike">
            <div class="like">
                <i id="like-tag" class="fa fa-thumbs-up" aria-hidden="true"></i>
                <p class="count_of_likes">0</p>
            </div>
            <div class="dislike">
                <i id="dislike-tag" class="fa fa-thumbs-down" aria-hidden="true"></i>
                <p class="count_of_dislikes">0</p>
            </div>
        </div>
    </div>
  </div>`;
};


const months = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

const currentDate = new Date();
const day = currentDate.getDate();
const monthIndex = currentDate.getMonth();
const year = currentDate.getFullYear();

const formattedDate = day + ' ' + months[monthIndex] + ', ' + year;
let fioValue;
let messageValue;

let testimonialBoxContainer = document.querySelector(".testimonial-box-container");


function AddNewReview() {
  // Получение значения из поля ввода type="text"
  let stars = document.querySelectorAll(".container_stars i");
  fioValue = document.querySelector('input[name="fio"]').value;
  // Получение значения из текстовой области textarea
  messageValue = document.querySelector('textarea[name="message"]').value;

  let counter = 0;
  for (let i = 0; i < stars.length; i++) {
    if (stars[i].style.color == "rgb(249, 215, 28)") {
      counter++;
    }
  }

  testimonialBoxContainer.insertAdjacentHTML('afterbegin', generateNewReview(fioValue, messageValue, formattedDate, counter));
  let starsToSet = testimonialBoxContainer.querySelector(".testimonial-box").querySelectorAll(".reviews i");
  for (let i = 0; i < counter; i++) {
    starsToSet[i].style.color = "#f9d71c";
  }
  for (let i = counter; i < 5; i++) {
    starsToSet[i].classList.remove("fa-star");
    starsToSet[i].classList.add("fa-star-o"); 
  }
  for (let i = 0; i < 5; i++) {
    stars[i].style.color = "black";
  }
}

// Находим форму по её ID
const form = document.getElementById('review_check_form');
const inputElements = form.getElementsByTagName('input');
const textareaElement = document.querySelector('textarea.inputbox__input');

// Функция для отправки данных формы
function submitForm(event) {
  event.preventDefault(); // Предотвращаем стандартное поведение отправки формы
  AddNewReview();
  
  for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].value = ''; // Устанавливаем значение в пустую строку
  }
  textareaElement.value = '';
  TruncEverytime();
  updateLikeDislike();
}


// Добавляем обработчик события отправки формы
form.addEventListener('submit', submitForm);

//Конец кода на добавление нового отзыва



//Начало кода на создание звезд

var stars = document.querySelectorAll(".container_stars i");
// Проходим по каждой звезде
stars.forEach(function(star, index) {
  // Добавляем слушатель события "click"
  star.addEventListener("click", function() {
    // Проходим по каждой звезде и перекрашиваем ее в черный цвет
    stars.forEach(function(star, starIndex) {
      star.style.color = "black";
    });

    // Перекрашиваем только выбранную звезду и все предыдущие в желтый цвет
    for (var i = 0; i <= index; i++) {
      stars[i].style.color = "#f9d71c";
    }
  });
});