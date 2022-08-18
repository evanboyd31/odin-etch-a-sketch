const gridContainer = document.querySelector(".grid-container");
const resizeButton = document.querySelector(".resize");
const clearButton = document.querySelector(".clear");
const INIT_CELL_NUM = 16;
const GRID_SIZE = 640
let currentCellNum = INIT_CELL_NUM;

resizeButton.addEventListener('click', function (e) {
    while (true) {
        let size = window.prompt("Please enter a new squares per side for the grid", "64");
        if (size !== null || size !== "") {
            size = Number(size);
        }
        if (size <= 100 && size >= 1) {
            resize(size);
            currentCellNum = size;
            break;
        }
    }
});

clearButton.addEventListener('click', function (e) {
    // cells can be clear by simply resizing the board with the current given amount of cells
    resize(currentCellNum);
});


function resize(size) {
    deleteCells();
    let cellSize = Math.floor(GRID_SIZE / size);
    gridContainer.style.cssText = `grid-template-columns: repeat(${size}, ${cellSize}px [col-start]); grid-template-rows: repeat(${size}, ${cellSize}px [col-start])`;
    for (i = 0; i < size * size; i++) {
        let node = document.createElement("div");
        node.style.cssText = `width: ${cellSize}px; height: ${cellSize}px`;
        node.classList.add("cell");
        node.onmouseover = function (event) {
            let target = event.target;
            target.style.background = 'black';
        };
        gridContainer.appendChild(node);
    }
}

function deleteCells() {
    gridContainer.replaceChildren();
}


resize(INIT_CELL_NUM);
