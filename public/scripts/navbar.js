// /*********************** PLANT DROPDOWN ********************************/
// let plantButton = document.getElementById('navbar-plants');
// let plantDropdown = document.getElementById('plant-dropdown');
// let plantDropdownItems = document.querySelectorAll('.p-item');

// plantButton.addEventListener('click', () => {
//     plantDropdown.classList.toggle('dropdown-hidden');
//     plantDropdownItems.forEach((item) => {
//         item.classList.toggle('dropdown-item-hidden');
//         item.classList.toggle('dropdown-item');
//     })
// });

// /**************************** MATH DROPDOWN *********************************/
// let mathButton = document.getElementById('navbar-math');
// let mathDropdown = document.getElementById('math-dropdown');
// let mathDropdownItems = document.querySelectorAll('.m-item');

// mathButton.addEventListener('click', () => {
//     mathDropdown.classList.toggle('dropdown-hidden');
//     mathDropdownItems.forEach((item) => {
//         item.classList.toggle('dropdown-item-hidden');
//         item.classList.toggle('dropdown-item');
//     })
// });



/************************ CREATE NEW DROPDOWN METHOD *************************
 * Items are styled from /stylesheets/dropdown.css
 * Navbar items are added to /views/partials/header.ejs
 * To create new dropdown and items, just call the newDropdown method
*/
let newDropdown = (name, ...items) => {
    /************************* CREATE NEW NAVBAR LINK *************************/
    let newDropdown = createDropdown(); // Create the new dropdown

    // Add the dropdown anchor, makes it clickable, add the navbar name
    let dropdownAnchor = createDropdownLink(name);

    addToNavbar(newDropdown, dropdownAnchor); // Add dropdown to navbar

    /************************** CREATE DROPDOWN ITEMS *************************/
    // Create new div's for the dropdown items, they are hidden until clicked
    let dropdownItems = createDropdownItems(name, items)[0];
    let itemName = dropdownItems[1];

    // Add the dropdown items to the link its associated
    newDropdown.appendChild(dropdownItems);

    /*********************** DROPDOWN CLICK LOGIC *****************************/
    let elementVariables = {
        button: document.getElementById('navbar-' + name.toLowerCase()),
        dropdown: document.getElementById(name.toLowerCase() + '-dropdown'),
        dropdownItems: document.querySelectorAll('.' + itemName)
    }

    elementVariables['button'].addEventListener('click', () => {
        elementVariables['dropdown'].classList.toggle('dropdown-hidden');
        elementVariables['dropdownItems'].forEach((item) => {
            item.classList.toggle('dropdown-item-hidden');
            item.classList.toggle('dropdown-item');
        })
    });
}

let createDropdown = () => {
    // Instantiate the dropdown container
    let newDropdown = document.createElement('div');
    newDropdown.setAttribute('class', 'navbar-item-container');
    return newDropdown;
}

let createDropdownLink = (name) => {
    // Create link to the main clickable name that will always be shown
    let dropdownAnchor = document.createElement('a');
    let navbarItem = document.createElement('div');
    navbarItem.setAttribute('class', 'navbar-item');
    navbarItem.setAttribute('id', 'navbar-' + name.toLowerCase());
    navbarItem.textContent = name.charAt(0).toUpperCase() + name.substring(1);
    return dropdownAnchor.appendChild(navbarItem);
}

let addToNavbar = (newDropdown, dropdownAnchor) => {
    // Add whole anchor and dropdown to new dropdown name
    newDropdown.appendChild(dropdownAnchor);

    // Add the dropdown to the navbar, element is in header.ejs
    let navbarLinkContainer = document.getElementById('navbar-links');
    navbarLinkContainer.appendChild(newDropdown);
}

let createDropdownItems = (name, items) => {
    let dropdownItems = document.createElement('div');
    dropdownItems.setAttribute('class', 'dropdown-hidden dropdown');
    dropdownItems.setAttribute('id', name.toLowerCase() + '-dropdown');

    let itemName = name.charAt(0).toLowerCase() + name.charAt(1) + '-item'; // Used to access the individual item names in click
    items.forEach(item => {
        // For each item, put it in an anchor, with a div and its name inside
        let itemAnchor = document.createElement('a');
        if (item.toLowerCase().trim() === 'view') {
            // So the route for plants is /plants and not /plants/view
            itemAnchor.setAttribute('href', '/' + name.toLowerCase().trim());
        } else {
            itemAnchor.setAttribute('href', '/' + name.toLowerCase().trim() + '/' + item.toLowerCase());
        }

        // Originally hidden
        let itemNameDiv = document.createElement('div');
        itemNameDiv.setAttribute('class', itemName + ' dropdown-item');
        itemNameDiv.textContent = item.toUpperCase(); // Add the text to the div item

        itemAnchor.appendChild(itemNameDiv); // Append the name to the anchor
        dropdownItems.appendChild(itemAnchor); // Append the item to the dropdownList
    });
    return [dropdownItems, itemName];
}

/**************************** DROPDOWN ITEMS *******************************
 * newDropdown('main dropdown list name', ...list items)
*/
let plant = newDropdown('plants', 'create', 'view', /*'keys', 'groups', 'families'*/);
let math = newDropdown('math', 'linear algebra', 'calculus', 'statistics');
let science = newDropdown('science', 'chemistry', 'genetics');




