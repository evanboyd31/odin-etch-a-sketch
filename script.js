const gridContainer = document.querySelector(".grid-container");
let squareGrids = [];

for (i = 0; i < 256; i++) {
    let node = document.createElement("div");
    node.classList.add("cell");
    squareGrids.push(node);
    gridContainer.appendChild(node);
}

