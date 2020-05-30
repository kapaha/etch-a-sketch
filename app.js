// 'use strict'

const gridContainer = document.getElementById('grid-container');
const gridSize = document.getElementById('grid-size');

makeRows(50, 50);

const cells = document.querySelectorAll('.grid-item');

cells.forEach((cell) => {
    cell.addEventListener('mouseover', (event) => {
        event.target.classList.add('hover-pink');
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