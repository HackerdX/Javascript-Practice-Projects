let toggleSwitch = document.querySelector('input[type="checkbox"]');
let toggleIcon = document.querySelector('.mode');
let headerBackground = document.querySelector('.header');
let images = [document.getElementById('image1'), document.getElementById('image2'), document.getElementById('image3')];

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    toggleIcon.children[0].textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    toggleIcon.children[1].classList.toggle('fa-moon', theme === 'dark');
    toggleIcon.children[1].classList.toggle('fa-sun', theme === 'light');
    headerBackground.style.backgroundColor = `rgb(${theme === 'dark' ? '0 0 0' : '255 255 255'} / 50%)`;
    images.forEach((image, index) => {
        const suffix = theme === 'dark' ? '_dark' : '_light';
        image.src = `img/undraw_${image.dataset.name}${suffix}.svg`;
    });
    localStorage.setItem('theme', theme);
    toggleSwitch.setAttribute('checked', theme === 'dark');
};

const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
};

toggleSwitch.addEventListener('change', toggleTheme);

setTheme(localStorage.getItem('theme') || 'light');
