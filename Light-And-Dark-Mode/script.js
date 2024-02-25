let toggleSwitch = document.querySelector('input[type="checkbox"]');
let toggleIcon = document.querySelector('.mode');
let headerBackground = document.querySelector('.header');
let images = [document.getElementById('image1'), document.getElementById('image2'), document.getElementById('image3')];


// Function to fetch sunrise and sunset times from Sunrise-Sunset API based on user's location
async function fetchSunriseSunset(latitude, longitude) {
    const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`);
    const data = await response.json();
    return data.results;
}

// Function to determine if it's currently daytime or nighttime
function isDaytime(sunrise, sunset) {
    const now = new Date();
    return now >= new Date(sunrise) && now < new Date(sunset);
}

// Function to set theme based on daytime or nighttime
async function setThemeBasedOnSunriseSunset(latitude, longitude) {
    const { sunrise, sunset } = await fetchSunriseSunset(latitude, longitude);
    const theme = isDaytime(sunrise, sunset) ? 'light' : 'dark';
    setTheme(theme);
}

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
    toggleSwitch.checked = theme === 'dark';
};

toggleSwitch.addEventListener('change', () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme =  currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

setTheme(localStorage.getItem('theme') || 'light');

// Get user's location and set theme based on sunrise and sunset times
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setThemeBasedOnSunriseSunset(latitude, longitude);
        // Set interval to check sunrise and sunset times every hour
        let i = 0;
        const intervalId = setInterval(() => {
            setThemeBasedOnSunriseSunset(latitude, longitude);
            console.log('checked ', i, ' hour');
            i++;
        }, 3600000); // 3600000 milliseconds = 1 hour

        window.addEventListener('beforeunload', () => {
            clearInterval(intervalId);
        });
    }, (error) => {
        console.error('Error getting user location:', error);
    });
} else {
    console.error('Geolocation is not supported by this browser.');
}
