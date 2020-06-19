'use strict';

const gridContainer = document.getElementById('grid-container');
const gridSize = document.getElementById('grid-size');
const resetButton = document.getElementById('reset-btn');
const blackButton = document.getElementById('black-btn');
const rainbowButton = document.getElementById('rainbow-btn');
const christmasButton = document.getElementById('christmas-btn');
const title = document.getElementById('title');

let lastGridSize;
let selectedColorMode = 'black';

makeRows(16, 16);
setBackgroundColor();

resetButton.addEventListener('click', () => {
    getCells().forEach((cell) => {
        cell.style.backgroundColor = '#DADADA';
    });
    makeRowsFromUserInput();
});

blackButton.addEventListener('click', () => {
    rainbowButton.style.boxShadow = 'none';
    christmasButton.style.boxShadow = 'none';
    blackButton.style.boxShadow = '0 0 0 4px mediumseagreen';
    selectedColorMode = 'black';
    setBackgroundColor();
});

rainbowButton.addEventListener('click', () => {
    blackButton.style.boxShadow = 'none';
    christmasButton.style.boxShadow = 'none';
    rainbowButton.style.boxShadow = '0 0 0 4px mediumseagreen';
    selectedColorMode = 'rainbow';
    setBackgroundColor();
});

christmasButton.addEventListener('click', () => {
    blackButton.style.boxShadow = 'none';
    rainbowButton.style.boxShadow = 'none';
    christmasButton.style.boxShadow = '0 0 0 4px mediumseagreen';
    selectedColorMode = 'christmas';
    setBackgroundColor();
});

rainbowButton.addEventListener('keypress', (e) => {
    if (e.keyCode === 110) {
        title.textContent = 'HELLO NAN!';
        christmasButton.style.display = 'inline-block';
    }
});

function setBackgroundColor() {
    getCells().forEach((cell) => {
        cell.addEventListener('mouseenter', () => {
            switch (selectedColorMode) {
                case 'black':
                    cell.style.backgroundColor = 'transparent';
                    break;
                case 'rainbow':
                    cell.style.backgroundColor = randomRgb();
                    break;
                case 'christmas':
                    cell.style.backgroundColor = randomChristmasColor();
            }
        });
    });
}

function makeRows(rows, columns) {
    lastGridSize = rows;
    gridSize.textContent = `${rows} x ${columns}`;
    gridContainer.style.setProperty('--grid-rows', rows);
    gridContainer.style.setProperty('--grid-columns', columns);
    for (let i = 0; i < (rows * columns); i++) {
        let cell = document.createElement('div');
        gridContainer.appendChild(cell).className = 'grid-item';
    }
}

function getCells() {
    const cells = document.querySelectorAll('.grid-item');
    return cells;
}

function makeRowsFromUserInput() {
    const userInput = Number(prompt('Enter Grid Size:', lastGridSize))
    if (userInput === 0 || userInput === lastGridSize) {
        return;
    } else if (isNaN(userInput) || !Number.isInteger(userInput) || userInput < 0) {
        alert('Please enter a positive whole number.');
        return makeRowsFromUserInput();
    } else {
        removeRows();
        makeRows(userInput, userInput);
        setBackgroundColor();
    }
}

function removeRows() {
    getCells().forEach((cell) => {
        cell.remove();
    });
}

function randomRgb() {
    let o = Math.round;
    let r = Math.random;
    let s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1 + ')';
}

function randomChristmasColor() {
    const christmasColors = ['#B3000C', '#FF0012', '#FFFFFF', '#00FF3E', '#00B32C'];
    return christmasColors[randomNumber(christmasColors.length)];
}

function randomNumber(maxExclusiveNumber) {
    return Math.floor(Math.random() * maxExclusiveNumber)
}
