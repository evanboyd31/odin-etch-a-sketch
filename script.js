const gridContainer = document.querySelector(".grid-container");

for (i = 0; i < 256; i++) {
    let node = document.createElement("div");
    node.classList.add("cell");
    node.onmouseover = function (event) {
        let target = event.target;
        target.style.background = 'black';
    };
    gridContainer.appendChild(node);
}
