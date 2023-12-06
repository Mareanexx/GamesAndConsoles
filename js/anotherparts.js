
//Animation for carousel of games-images
$(".custom-carousel").owlCarousel({
    autoWidth: true,
    loop: true
});

$(document).ready(function () {
    $(".custom-carousel .item").click(function () {
      $(".custom-carousel .item").not($(this)).removeClass("active");
      $(this).toggleClass("active");
    });
});
  


// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
  'Rent',
  'It',
  'Right Now!'
]

const el = document.querySelector('.text-new-console');
const el2 = document.querySelector('.text-new-console2');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800)
  })
  counter = (counter + 1) % phrases.length
}

next()

const fx2 = new TextScramble(el2);

let counter2 = 0;
const next2 = () => {
  fx2.setText(phrases[counter2]).then(() => {
    setTimeout(next2, 800)
  })
  counter2 = (counter2 + 1) % phrases.length
}

next2()




let btn_switcher_asus = document.querySelector("#asus-rog-ally");
let container_asus = document.querySelector(".container-asus-rogally");
container_asus.style.display = "block";
let container_steam = document.querySelector(".container-steam-deck");
container_steam.style.display = "none";
btn_switcher_asus.addEventListener("click", ShowAsus);
let btn_switcher_steam = document.querySelector("#steam-deck");
btn_switcher_steam.addEventListener("click", ShowSteam);

function ShowAsus() {
  btn_switcher_asus.classList.add("btn-switcher-active");
  container_asus.style.display = "block";
  container_steam.style.display = "none";
  if (btn_switcher_steam.classList.contains('btn-switcher-active')) {
    btn_switcher_steam.classList.remove("btn-switcher-active");
  }
}
function ShowSteam() {
  btn_switcher_steam.classList.add("btn-switcher-active");
  container_asus.style.display = "none";
  container_steam.style.display = "block";
  if (btn_switcher_asus.classList.contains('btn-switcher-active')) {
    btn_switcher_asus.classList.remove("btn-switcher-active");
  }
}


function redirectToCatalog() {
  window.location.href = 'catalog.html';
}
