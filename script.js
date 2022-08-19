// Global variables
const gridContainer = document.querySelector(".grid-container");
const resizeButton = document.querySelector(".resize");
const clearButton = document.querySelector(".clear");
const rgbButton = document.querySelector(".rgb");
const INIT_CELL_NUM = 16; // number of square cells in sketch grid
const GRID_SIZE = 640; // size in pixels of width/height of grid
let currentCellNum = INIT_CELL_NUM;
let isRGBSelected = false; // used for seeing if RGB mode is turned on

/*
The rgbButton is used to turn on/off the rgb sketching mode.
Once selected, switch the value of isRGBSelected for the cell
event listener method.
*/
rgbButton.addEventListener('click', function (e) {
    isRGBSelected = !isRGBSelected;
});

/*
Display a new prompt for the user to enter the dimensions
of the new grid. Grid size is between 1 & 100
*/
resizeButton.addEventListener('click', function (e) {
    // loop until user gets correct input
    while (true) {
        let size = window.prompt("Please enter a new squares per side for the grid", "1-100");
        if (size !== null || size !== "") {
            size = Number(size);
        }

        if (size === NaN) {
            // input wasn't a valid number, show another prompt
            continue;
        }
        if (size <= 100 && size >= 1) {
            resize(size);
            currentCellNum = size;
            break;
        }
    }
});

/*
Clears all cells of drawings.
*/
clearButton.addEventListener('click', function (e) {
    // cells can be clear by simply resizing the board with the current given amount of cells
    resize(currentCellNum);
});

/*
resize is used to create new cells within the grid container,
and is also called when the user wants to clear the grid.
*/
function resize(cells) {
    // delete all divs already within grid
    deleteCells();
    // calculate width and height of new cells based upon desired num of cells
    let cellSize = Math.floor(GRID_SIZE / cells);
    gridContainer.style.cssText = `grid-template-columns: repeat(${cells}, ${cellSize}px [col-start]); grid-template-rows: repeat(${cells}, ${cellSize}px [col-start])`;

    // add new cells to fill in square
    for (i = 0; i < cells * cells; i++) {
        let node = document.createElement("div");
        node.style.cssText = `width: ${cellSize}px; height: ${cellSize}px`;
        node.classList.add("cell");
        // mouseover event triggers drawing for each node
        node.onmouseover = function (event) {
            let target = event.target;
            if (!isRGBSelected) {
                // RGB mode not selected, fill with black
                target.style.background = 'black';
            } else {
                // RGB mode selected, fill with random color
                target.style.background = `rgba(${randomRGB()}, ${randomRGB()}, ${randomRGB()}, 1)`;
            }

        };
        gridContainer.appendChild(node);
    }
}

/*
Generate a random number between 0 & 255 for rgb values
*/
function randomRGB() {
    return Math.floor(Math.random() * 256);
}

/*
Delete all cells within square grid
*/
function deleteCells() {
    gridContainer.replaceChildren();
}

// initialize the grid based upon the init cell num
resize(INIT_CELL_NUM);
