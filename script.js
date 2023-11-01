// set up a nxn grid
function setupGrid(n) {
    let gridContainer = document.querySelector("div");
    gridContainer.innerHTML = "";
    for (let i = 0; i < n * n; i++) {
        let gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.style.flexBasis = `calc(100% / ${n})`
        gridContainer.appendChild(gridCell);
    }
}

// hover effect
function hoverEffect(paintColor) {
    let isDrawing = false;

    function startDrawing(event) {
        event.preventDefault();
        isDrawing = true;
        event.target.style.backgroundColor = paintColor;
    }
    function stopDrawing() {
        isDrawing = false;
    }

    let gridCells = document.querySelectorAll(".grid-cell");
    for (let i = 0; i < gridCells.length; i++) {
        gridCells[i].addEventListener("mousedown", startDrawing);
        gridCells[i].addEventListener("mouseover", function (event) {
            if (isDrawing) { startDrawing(event); }
        });
        gridCells[i].addEventListener("mouseup", stopDrawing);
    }
    // mouseup event for the entire document to fix a bug
    document.addEventListener("mouseup", stopDrawing);
}

// eraser button
function handleEraser(event) {
    hoverEffect("transparent");
}

// default values
setupGrid(16);
let sliderLabel = document.querySelector("#slider-label");
sliderLabel.textContent = "16x16";
hoverEffect("black");

// event listener for the slider
let slider = document.querySelector("#slider");
slider.addEventListener("input", function () {
    setupGrid(slider.value);
    hoverEffect("black");
    sliderLabel.textContent = `${slider.value} x ${slider.value}`;
});

// event listener for the painter
let painter = document.querySelector("#paint");
painter.addEventListener("click", function () {
    hoverEffect("black");
})

// event listener for the eraser
let eraser = document.querySelector("#eraser");
eraser.addEventListener("click", handleEraser);

// event listener for the rainbow
let rainbow = document.querySelector("#rainbow");
rainbow.addEventListener("click", function () {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    hoverEffect(randomColor);
})

// event listener for the clear
let clear = document.querySelector("#clear");
clear.addEventListener("click", function () {
    let gridContainer = document.querySelector("div");
    let gridCells = gridContainer.children;
    for (let i = 0; i < gridCells.length; i++) {
        gridCells[i].style.backgroundColor = "transparent";
    }
    hoverEffect();
});