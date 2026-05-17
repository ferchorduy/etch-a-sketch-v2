// Make function to set multiple attributes to existing elements
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key]);
  });
}

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

// .controls items
const gridWidth = document.createElement('input');
gridWidth.classList.add('controls__grid-width');
controls.appendChild(gridWidth);
setAttributes(gridWidth, {
  'type': 'number',
  'id': 'grid-width',
  'placeholder': 'width',
  'min': '1',
  'max': '64'
});

// Function to populate grid with inputed number
function populateGrid(width) {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  for (let i = 0; i < (width * width); i++) {
    const gridCell = document.createElement('div');
    gridCell.classList.add('grid__cell');
    gridCell.style.height = `${640/width}px`;
    gridCell.style.width = `${640/width}px`;
    grid.appendChild(gridCell);
  }
}

// Event listener to use inputed number in populateGrid()
gridWidth.addEventListener('keydown', e => {
  if (e.code === 'Enter') {
    if (gridWidth.value >= 1 && gridWidth.value <= 64) populateGrid(gridWidth.value);
  }
});

// Create and add .options elements
const color = document.createElement('button');
color.classList.add('options__color');
color.textContent = 'color';
const rainbow = document.createElement('button');
rainbow.classList.add('options__rainbow');
rainbow.textContent = 'rainbow';
const grayscale = document.createElement('button');
grayscale.classList.add('options__grayscale');
grayscale.textContent = 'grayscale';
const eraser = document.createElement('button');
eraser.classList.add('options__eraser');
eraser.textContent = 'eraser';
const clear = document.createElement('button');
clear.classList.add('options__clear');
clear.textContent = 'clear';
const gridlinesToggle = document.createElement('button');
gridlinesToggle.classList.add('options__gridlines-toggle');
gridlinesToggle.textContent = 'gridlines'
options.appendChild(grayscale);
options.appendChild(rainbow);
options.appendChild(color);
options.appendChild(eraser);
options.appendChild(clear);
options.appendChild(gridlinesToggle);

let colorMode = 'black'

// One listener handles everything
grid.addEventListener('mouseover', e => {
    if (!e.target.classList.contains('grid__cell')) return

    if (colorMode === 'black') {
        e.target.style.backgroundColor = 'black'

    } else if (colorMode === 'rainbow') {
        const r = () => Math.floor(Math.random() * 255)
        e.target.style.backgroundColor = `rgb(${r()}, ${r()}, ${r()})`

    } else if (colorMode === 'grayscale') {
        const current = parseFloat(e.target.dataset.shade || 0)
        const next = Math.min(1, current + 0.1)
        e.target.dataset.shade = next
        e.target.style.backgroundColor = `rgba(0, 0, 0, ${next})`

    } else if (colorMode === 'eraser') {
        e.target.style.backgroundColor = 'white'
        delete e.target.dataset.shade
    }
})

// Buttons just change the state variable
color.addEventListener('click', () => colorMode = 'black')
rainbow.addEventListener('click', () => colorMode = 'rainbow')
grayscale.addEventListener('click', () => colorMode = 'grayscale')
eraser.addEventListener('click', () => colorMode = 'eraser')
clear.addEventListener('click', () => {
    colorMode = 'black'
    populateGrid(gridWidth.value || 16)
})

gridlinesToggle.addEventListener('click', () => {
    grid.classList.toggle('grid--no-border')
})

populateGrid(16);

// Edit UI, specifically buttons on the bottom.
// Make it so the coloring turns on with a click, then turns off with click.
// Make it so clear keeps the current color and not black.
// Add the color selector to color.