// Light and Dark Mode Toggle for Wheel of Fortune
const toggleButton = document.querySelector('.visual-toggle');
const body = document.body;
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Light Mode';
    } else {
        toggleButton.textContent = 'Dark Mode';
    }
});