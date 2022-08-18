const gridContainer = document.querySelector(".grid-container");
const resizeButton = document.querySelector(".resize");

resizeButton.addEventListener('click', function (e) {

    while (true) {
        let size = window.prompt("Please enter a new squares per side for the grid", "64");
        if (size !== null || size !== "") {
            size = Number(size);
        }

        if (size <= 100 && size >= 1) {
            resize(size);
            break;
        }
    }

});


function resize(size) {
    deleteCells();
    let gridSize = Math.floor(720 / size);
    gridContainer.style.cssText = `grid-template-columns: repeat(${size}, ${gridSize}px [col-start]); grid-template-rows: repeat(${size}, ${gridSize}px [col-start])`;
    for (i = 0; i < size * size; i++) {
        let node = document.createElement("div");
        node.style.cssText = `width: ${gridSize}px; height: ${gridSize}px`;
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

resize(16)
