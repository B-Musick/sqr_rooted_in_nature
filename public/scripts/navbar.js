/*********************** PLANT DROPDOWN ********************************/
let plantButton = document.getElementById('navbar-plants');
let plantDropdown = document.getElementById('plant-dropdown');
let plantDropdownItems = document.querySelectorAll('.p-item');

plantButton.addEventListener('click', () => {
    plantDropdown.classList.toggle('dropdown-hidden');
    plantDropdownItems.forEach((item) => {
        item.classList.toggle('dropdown-item-hidden');
        item.classList.toggle('dropdown-item');
    })
});

/**************************** MATH DROPDOWN *********************************/
let mathButton = document.getElementById('navbar-math');
let mathDropdown = document.getElementById('math-dropdown');
let mathDropdownItems = document.querySelectorAll('.m-item');

mathButton.addEventListener('click', () => {
    mathDropdown.classList.toggle('dropdown-hidden');
    mathDropdownItems.forEach((item) => {
        item.classList.toggle('dropdown-item-hidden');
        item.classList.toggle('dropdown-item');
    })
});





