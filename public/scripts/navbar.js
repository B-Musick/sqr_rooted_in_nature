/************************ CREATE NEW DROPDOWN METHOD *************************
 * Items are styled from /stylesheets/dropdown.css
 * Navbar items are added to /views/partials/header.ejs
 * To create new dropdown and items, just call the newDropdown method
*/
let newDropdown = (name, link,...items) => {
    /************************* CREATE NEW NAVBAR LINK *************************/
    let newDropdown = createDropdown(); // Create the new dropdown

    // Add the dropdown anchor, makes it clickable, add the navbar name
    let dropdownAnchor = createDropdownLink(name,link);

    addToNavbar(newDropdown, dropdownAnchor); // Add dropdown to navbar

    /************************** CREATE DROPDOWN ITEMS *************************/
    // Create new div's for the dropdown items, they are hidden until clicked
    let dropdownItems = createDropdownItems(name, items);
    let itemName = dropdownItems[1];
    console.log(dropdownItems);

    // Add the dropdown items to the link its associated
    newDropdown.appendChild(dropdownItems[0]);

    /*********************** DROPDOWN CLICK LOGIC *****************************/
    let elementVariables = {
        button: document.getElementById('navbar-' + name.toLowerCase()),
        dropdown: document.getElementById(name.toLowerCase() + '-dropdown'),
        dropdownItems: document.querySelectorAll("." + itemName)
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

let createDropdownLink = (name,href) => {
    // Create link to the main clickable name that will always be shown
    let dropdownAnchor = document.createElement('a');
    if(href)
        dropdownAnchor.setAttribute('href',href);
    let navbarItem = document.createElement('div');
    navbarItem.setAttribute('class', 'navbar-item');
    navbarItem.setAttribute('id', 'navbar-' + name.toLowerCase());
    navbarItem.textContent = name.charAt(0).toUpperCase() + name.substring(1);
    dropdownAnchor.appendChild(navbarItem)
    return dropdownAnchor;
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
    dropdownItems.setAttribute('class', 'dropdown-hidden');
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
        itemNameDiv.setAttribute('class', itemName + ' dropdown-item-hidden');
        itemNameDiv.textContent = item.toUpperCase(); // Add the text to the div item

        itemAnchor.appendChild(itemNameDiv); // Append the name to the anchor
        dropdownItems.appendChild(itemAnchor); // Append the item to the dropdownList
    });
    return [dropdownItems, itemName];
}

/**************************** DROPDOWN ITEMS *******************************
 * newDropdown('main dropdown list name', 'If the main dropdown button is its own link', ...list items)
*/
let home = newDropdown('home','/');
let about = newDropdown('about', '#about');
let footer = newDropdown('contact', '#footer');


let plant = newDropdown('plants', null,'create', 'view', 'keys', 'groups', 'families');
let math = newDropdown('math', null,'linear algebra', 'calculus', 'statistics');
let science = newDropdown('science', null,'chemistry', 'genetics');




