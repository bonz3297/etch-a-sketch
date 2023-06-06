function setGrid(number) {
	const drawBoard = document.querySelector('#drawBoard');
	drawBoard.textContent = '';
	const square = document.createElement('div');
	square.classList.add('square');
	square.style.width = drawBoard.clientWidth / number + 'px';
	square.style.height = drawBoard.clientHeight / number + 'px';
	for (let i = 0; i < number * number; i++) {
		drawBoard.append(square.cloneNode(true));
	}
	drawToGrid();
}

function drawToGrid() {
	const squares = document.querySelectorAll('div.square');
	let isHoldingMouse = false;

	squares.forEach((square) => {
		square.addEventListener('pointerenter', (e) => {
			e.preventDefault();
			if (isHoldingMouse) {
				square.style.backgroundColor = pickColor();
			}
		});
	});

	squares.forEach((square) => {
		square.addEventListener('pointerdown', (e) => {
			e.preventDefault();
			isHoldingMouse = true;
			square.style.backgroundColor = pickColor();
		});
	});

	squares.forEach((square) => {
		square.addEventListener('pointerup', (e) => {
			e.preventDefault();
			isHoldingMouse = false;
		});
	});
}

function pickColor() {
	const colorInput = document.querySelector('input#color-input');
	const eraser = document.querySelector('#eraser-btn');
	if (eraser.classList.contains('btn-on')) return 'white';
	return colorInput.value;
}

function adjustSlider() {
	const gridSizeLabel = document.querySelector('#grid-size-label');
	const gridSize = document.querySelector('#grid-size');
	setGrid(gridSize.value);
	const span1 = document.createElement('span');
	span1.id = 'grid-number-text';
	span1.textContent = `${gridSize.value} x ${gridSize.value}`;
	gridSizeLabel.append(span1);
	gridSize.addEventListener('input', (e) => {
		setGrid(gridSize.value);
		span1.textContent = `${gridSize.value} x ${gridSize.value}`;
	});
}

function addListenersToButtons() {
	const eraser = document.querySelector('#eraser-btn');
	eraser.addEventListener('click', (e) => {
		eraser.classList.toggle('btn-on');
	});
	const clear = document.querySelector('#clear-btn');
	clear.addEventListener('click', (e) => {
		clearBoard();
		eraser.classList.remove('btn-on');
	});
}

function clearBoard() {
	const drawBoard = document.querySelector('#drawBoard');
	drawBoard.textContent = '';
	const gridSize = document.querySelector('#grid-size');
	setGrid(gridSize.value);
	const gridNumber = document.querySelector('#grid-number-text');
	gridSize.addEventListener('input', (e) => {
		setGrid(gridSize.value);
		gridNumber.textContent = `${gridSize.value} x ${gridSize.value}`;
	});
}

addListenersToButtons();
adjustSlider();
