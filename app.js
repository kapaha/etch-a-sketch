'use strict';

const gridContainer = document.getElementById('grid-container');
const gridSize = document.getElementById('grid-size');
const resetButton = document.getElementById('reset-btn');
const blackButton = document.getElementById('black-btn');
const rainbowButton = document.getElementById('rainbow-btn');

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
    blackButton.style.boxShadow = '0 0 0 4px mediumseagreen'
    rainbowButton.style.boxShadow = 'none'
    selectedColorMode = 'black';
    setBackgroundColor();
});

rainbowButton.addEventListener('click', () => {
    rainbowButton.style.boxShadow = '0 0 0 4px mediumseagreen'
    blackButton.style.boxShadow = 'none'
    selectedColorMode = 'rainbow';
    setBackgroundColor();
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