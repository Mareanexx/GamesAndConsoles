

document.querySelectorAll('.menu-burger, .overlay').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelector('.menu-burger').classList.toggle('clicked');
        document.querySelector('.overlay').classList.toggle('show');
        document.querySelector('.nav_menu-burger').classList.toggle('show');
        document.querySelector('body').classList.toggle('overflow');
    });
});
