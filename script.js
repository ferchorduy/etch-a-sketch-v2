// Create grid, input for grid width, and grid options

const controls = document.createElement('div');
controls.classList.add('controls');
const grid = document.createElement('div');
grid.classList.add('grid');
const options = document.createElement('div');
options.classList.add('options');

// Append new items to body

const body = document.querySelector('body');
body.appendChild(controls);
body.appendChild(grid);
body.appendChild(options);
