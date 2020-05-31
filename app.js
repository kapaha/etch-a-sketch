'use strict'

const gridContainer = document.getElementById('grid-container');
const gridSize = document.getElementById('grid-size');
const resetButton = document.getElementById('reset-btn');
let lastGridSize;

makeRows(16, 16);
addEventListenerToCells();

resetButton.addEventListener('click', () => {
    const cells = document.querySelectorAll('.grid-item');
    cells.forEach((cell) => {
        cell.classList.remove('hover-pink');
    });
    makeRowsFromUserInput();
});

function makeRows(rows, columns) {
    lastGridSize = rows;
    gridSize.textContent = `${rows}x${columns} Grid`;
    gridContainer.style.setProperty('--grid-rows', rows);
    gridContainer.style.setProperty('--grid-columns', columns);
    for (let i = 0; i < (rows * columns); i++) {
        let cell = document.createElement('div');
        gridContainer.appendChild(cell).className = 'grid-item';
    }
    
}

function addEventListenerToCells() {
    const cells = document.querySelectorAll('.grid-item');
    cells.forEach((cell) => {
        cell.addEventListener('mouseover', () => {
            cell.classList.add('hover-pink');
        });
    });
}

function removeRows() {
    const cells = document.querySelectorAll('.grid-item');
    cells.forEach((cell) => {
        cell.remove();
    });
}

function makeRowsFromUserInput() {
    const userInput = Number(prompt('Enter Grid Size:', lastGridSize))
    if (userInput === 0 || userInput === lastGridSize) {
        return;
    } else if (isNaN(userInput) || !Number.isInteger(userInput)) {
        alert('Please enter a whole number.');
        return makeRowsFromUserInput();
    } else {
        removeRows();
        makeRows(userInput, userInput);
        addEventListenerToCells();
    }
}