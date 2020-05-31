'use strict'

const gridContainer = document.getElementById('grid-container');
const gridSize = document.getElementById('grid-size');
const resetButton = document.getElementById('reset-btn');

makeRows(16, 16);

const cells = document.querySelectorAll('.grid-item');

cells.forEach((cell) => {
    cell.addEventListener('mouseover', () => {
        cell.classList.add('hover-pink');
    });
});

resetButton.addEventListener('click', () => {
    cells.forEach((cell) => {
        cell.classList.remove('hover-pink');
    });
});

function makeRows(rows, columns) {
    gridSize.textContent = `${rows}x${columns} Grid`;
    gridContainer.style.setProperty('--grid-rows', rows);
    gridContainer.style.setProperty('--grid-columns', columns);
    for (let i = 0; i < (rows * columns); i++) {
        let cell = document.createElement('div');
        gridContainer.appendChild(cell).className = 'grid-item';
    }
}