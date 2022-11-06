let drawPolygons = (parentContainer, x, y, amount, start, scale, skip, title, icon) => {
    let base = 37;
    for (let i = start; i < amount; i++) {
        if (skip.length > 0 && skip.includes(i)) {
            // Remove polygons that want to exclude
        } else {
            let container = document.createElement('div');
            container.setAttribute('class', 'poly-container');

            let polygon = createHexagon(container, scale, base, i, x, y);

            parentContainer.appendChild(container);

            if (title) {
                addTextToPolygon(polygon, title);
            }
            if (icon) {
                addIconToPolygon(polygon, icon);
            }
        }
    }
}

/*
* DESCRIPTION: Creates the polygon and appends it to a parent container
* RETURN: The polygon that was created  
*/
let createHexagon = (container, scale, base, i, x, y) => {
    let leftMultiplier = 20;

    let polygon = document.createElement('div');
    polygon.setAttribute('class', scale + ' hexagon');
    polygon.style.top = y + ((base * i)) + "px";
    polygon.style.left = x + ((leftMultiplier * i)) + "px";
    container.appendChild(polygon);

    return polygon;
}

let addTextToPolygon = (polygon, title) => {
    let titlePoly = document.createElement('div');
    titlePoly.innerHTML = title;
    titlePoly.style.textAlign = 'center';
    if (title && title.length == 1) {
        // If title of page then dont want padding for letters
        titlePoly.style.paddingTop = '0px';
    } else {
        // Need padding for the topic titles
        titlePoly.style.paddingTop = '18px';
    }
    titlePoly.style.color = 'white';
    polygon.appendChild(titlePoly);
}

let addIconToPolygon = (polygon, icon) => {
    polygon.appendChild(icon);
}

/****************** CREATE ICONS ******************/
let createIcon = (parent, link, class1, class2, xCoord, yCoord) => {
    let icon = document.createElement('a');
    icon.setAttribute('href', link);
    icon.setAttribute('class', 'fa fa-3x ' + class1);
    drawPolygons(parent, xCoord, yCoord, 18, 17, 'scale ' + class2, [], '', icon);
}

let addSocialMediaIcons = (page, baseX, xMultiplier, baseY) => {
    let socialMediaIcons = ['instagram', 'twitter', 'youtube'];

    socialMediaIcons.forEach((social, idx) => {
        createIcon(page, '#', 'fa-' + social, social + '-button social-media', baseX + (xMultiplier * idx), baseY);
    });
}
/****************************** Create the title ******************************/
let drawTitle = (parent, tit, startX, startY) => {
    let letters = tit.split('');
    xStep = 42;
    for (i = 0; i < tit.length; i++) {
        drawPolygons(parent, startX + (i * xStep), startY, 1, 0, 'scale title-letter', [], letters[i]);
    }
    return startX + ((tit.length - 1) * (xStep))
}

/********************************* Quote Maker *********************************/
let quoteMaker = (parent) => {
    let quotes = [
        ["WEBSITE CURRENTLY UNDER CONSTRUCTION", "Brendan Musick"]
        // ["If I have seen further, it is by standing on the shoulders of giants", "Isaac Newton"],
        // ["God doesnt play dice with the universe", "Albert Einstein"]
    ]
    let quoteVal = Math.floor(Math.random() * (quotes.length));

    let quoteContainer = document.createElement('div');
    quoteContainer.innerHTML = quotes[quoteVal][0] + "\n\n<div style=\"text-align:right;\"><i>- " + quotes[quoteVal][1] + "</i></div>";
    quoteContainer.style.position = 'absolute';
    quoteContainer.style.right = '10vw';
    quoteContainer.style.bottom = '25vh';
    quoteContainer.style.width = '30vw';
    parent.appendChild(quoteContainer);
}

/********************************* DRAW PAGE *********************************/

let page = document.getElementById('landing-page-container');

let baseX = -336;
let baseY = 0;
let xMultiplier = 42; // Used to distance the polygon

// Add the social media icons
addSocialMediaIcons(page, baseX, xMultiplier, baseY);

// Draw all polygons on page
drawPolygons(page, baseX + xMultiplier * 1, baseY, 16, -4, 'scale', []); // Row -6
drawPolygons(page, baseX + xMultiplier * 2, baseY, 15, -3, 'scale', [13]); // Row -5
drawPolygons(page, baseX + xMultiplier * 3, baseY, 18, -2, 'scale', [12, 13]); // Row -4 - next to youtube button
drawPolygons(page, baseX + xMultiplier * 4, baseY, 15, -2, 'scale', [7, 11, 12, 13]); // Row -3
drawPolygons(page, baseX + xMultiplier * 5, baseY, 14, -2, 'scale', [7, 9]); // Row -2
drawPolygons(page, baseX + xMultiplier * 6, baseY, 12, 1, 'scale', [7, 2, 3, 4, 6, 9, 10]); // Row -1
drawPolygons(page, baseX + xMultiplier * 7, baseY, 12, -1, 'scale', [1, 2, 3, 5, 6, 9, 10]); // Row 0 - intersects red/green/yellow
drawPolygons(page, baseX + xMultiplier * 8, baseY, 10, 0, 'scale', [2, 4, 5, 6, 8]); // Row 1
drawPolygons(page, baseX + xMultiplier * 9, baseY, 9, -1, 'scale', []); // Row 2
drawPolygons(page, baseX + xMultiplier * 10, baseY, 6, -1, 'scale', []); // Row 3
drawPolygons(page, baseX + xMultiplier * 11, baseY, 5, -1, 'scale', [0, 1, 2]); // Row 4
drawPolygons(page, baseX + xMultiplier * 12, baseY, 5, -1, 'scale', [0, 1]); // Row 5

/*************************** SET UP MAIN BUTTONS AND ASSOCIATED SMALLER ***************************/
// NEED TO FIX THE topicButtonLogic, currently anchors not set

let topicButtonLogic = (page, topicName, info, mainButCoords) => {
    // Draw the large polygon topic
    // drawPolygons(page, mainButCoords[0], mainButCoords[1], mainButCoords[2],
    //     mainButCoords[3], 'scale-large ' + topicName + '-hex scale', [],
    //     '<a href="' + topicName + '">' + topicName + '</a>');
    drawPolygons(page, mainButCoords[0], mainButCoords[1], mainButCoords[2],
        mainButCoords[3], 'scale-large ' + topicName + '-hex scale', [],
        '<a href="">' + topicName + '</a>');

    // Draw each small polygon
    info.forEach(value => {
        // drawPolygons(page, baseX + xMultiplier * value["xMult"], value["y"],
        //     value["amount"], value["start"], 'scale ' + topicName + '-button-mini ' +
        //     topicName + '-view hide-button hover-hex', [], '<a href="' + ((topicName == 'about' || topicName == 'login') ? '' : topicName + '/')
        //     + value["name"] + '">' + value["name"] + '</a>');
        drawPolygons(page, baseX + xMultiplier * value["xMult"], value["y"],
            value["amount"], value["start"], 'scale ' + topicName + '-button-mini ' +
            topicName + '-view hide-button hover-hex', [], '<a href="">' + value["name"] + '</a>');
    })

    let newButton = document.querySelector('.' + topicName + '-hex');

    // Show associated buttons with larger button
    newButton.addEventListener('mouseover', () => {
        let smallButton = document.querySelectorAll('.' + topicName + '-button-mini');

        smallButton.forEach(button => {
            button.classList.remove('hide-button');
        })
    });

    // Remove the items when mouse out of the button
    newButton.addEventListener('mouseout', () => {
        let smallButton = document.querySelectorAll('.' + topicName + '-button-mini');

        smallButton.forEach(button => {
            button.classList.add('hide-button');
        })
    });
}

// About topic
let infoValues = [
    { "name": "blogs", "xMult": 12.96, "y": 74, "amount": 1, "start": 0, },
];
let infoButtonCoords = [166, 26, 1, 0];
topicButtonLogic(page, 'about', infoValues, infoButtonCoords)

// Plant topic
let plantValues = [
    { "name": "view", "xMult": 8.47, "y": 37, "amount": 1, "start": 0, },
    { "name": "create", "xMult": 7.47, "y": 37, "amount": 1, "start": 0 },
    { "name": "keys", "xMult": 9.47, "y": 37, "amount": 1, "start": 0 }
];
let plantButtonCoords = [-2, 98, 1, 0];
topicButtonLogic(page, 'plants', plantValues, plantButtonCoords);

// Math topic
let mathValues = [
    { "name": "lin alg", "xMult": 8.33, "y": 259, "amount": 1, "start": 0 },
    { "name": "discrete", "xMult": 7.33, "y": 259, "amount": 1, "start": 0 },
    { "name": "calc", "xMult": 9.33, "y": 259, "amount": 1, "start": 0 }
];
let mathButtonCoords = [79, 197, 1, 0];
topicButtonLogic(page, 'math', mathValues, mathButtonCoords);

// science topic
let scienceValues = [
    { "name": "chemistry", "xMult": 9.29, "y": 333, "amount": 1, "start": 0 },
    { "name": "biology", "xMult": 8.29, "y": 333, "amount": 1, "start": 0 },
    { "name": "genetics", "xMult": 10.29, "y": 333, "amount": 1, "start": 0 }
];
let scienceButtonCoords = [160, 344, 1, 0];
topicButtonLogic(page, 'science', scienceValues, scienceButtonCoords);

// login topic
let loginValues = [
    { "name": "register", "xMult": 10.24, "y": 407, "amount": 1, "start": 0 }
];
let loginButtonCoords = [51, 455, 1, 0];
topicButtonLogic(page, 'login', loginValues, loginButtonCoords);

/*************************** MAIN TITLE SETUP ***************************/

let titleContainer = document.createElement('div');
titleContainer.style.position = 'absolute';
titleContainer.style.right = '0px';
titleContainer.width = '20vw';
titleContainer.style.top = '223px';

if (window.innerWidth > 1004) {
    let startIn = drawTitle(titleContainer, 'ROOTED IN NATURE', -800, 0);
    page.appendChild(titleContainer);
    drawPolygons(titleContainer, -128, 0, 1, 0, 'scale', [], '<sup style="font-size: 23px; margin-bottom:10px;">2</sup>'); // Add the square
} else {
    let title1 = "ROOTED";
    let startIn = drawTitle(titleContainer, title1, -300, 0);
    drawTitle(titleContainer, "   ", -238, 37);
    drawTitle(titleContainer, "IN", -258, 74);
    drawTitle(titleContainer, "   ", -278, 110);
    drawTitle(titleContainer, "NATURE", -342, 147);
    page.appendChild(titleContainer);

    drawPolygons(titleContainer, -90, 147, 1, 0, 'scale', [], '<sup style="font-size: 23px; margin-bottom:10px;">2</sup>'); // Add the square
}

/*************************** QUOTE MAKER SETUP ***************************/
quoteMaker(page);






