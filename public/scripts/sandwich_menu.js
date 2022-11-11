/************************* SANDWICH MENU **************************************/
let foldableMenuButton = document.getElementById('fold-down-menu-icon-nav');
let navBarItems = document.getElementById('nav-bar-items');

let menuShown = false; // Menu starts off hidden behind sandwich icon 

foldableMenuButton.addEventListener('click', () => {
    if (!menuShown) {
        console.log("menu");
        // Display menu icons when it is shown
        navBarItems.style.display = 'inline-table';
        menuShown = true;
    } else {
        navBarItems.style.display = 'none';
        menuShown = false;
    }
});