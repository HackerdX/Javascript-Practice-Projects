let toggleSwitch = document.querySelector('input[type="checkbox"]');
let toggleIcon = document.querySelector('.mode');
let headerBackground = document.querySelector('.header');
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');

const darkMode = () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    // Header
    toggleIcon.children[0].textContent = "Dark Mode";
    toggleIcon.children[1].classList.add('fa-moon');
    toggleIcon.children[1].classList.remove('fa-sun');
    headerBackground.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    // Images
    image1.src = "img/undraw_proud_coder_dark.svg";
    image2.src = "img/undraw_feeling_proud_dark.svg";
    image3.src = "img/undraw_conceptual_idea_dark.svg";
    localStorage.setItem('theme', 'dark');
}

const lightMode = () => {
    document.documentElement.setAttribute('data-theme', 'light');
    // Header
    toggleIcon.children[0].textContent = "Light Mode";
    toggleIcon.children[1].classList.remove('fa-moon')
    toggleIcon.children[1].classList.add('fa-sun');
    headerBackground.style.backgroundColor = 'rgb(255 255 255 / 50%)'

    // Images
    image1.src = "img/undraw_proud_coder_light.svg";
    image2.src = "img/undraw_feeling_proud_light.svg";
    image3.src = "img/undraw_conceptual_idea_light.svg";
    localStorage.setItem('theme', 'light');
}

toggleSwitch.addEventListener('change', (event) => {
    if(event.target.checked) {
        darkMode();
    } else {
        lightMode();
    }
})

let currentTheme = localStorage.getItem('theme');
if(currentTheme) {
    localStorage.setItem('theme', currentTheme);
    if(currentTheme === "dark") {
        toggleSwitch.setAttribute('checked', true);
        darkMode();
    }
}
