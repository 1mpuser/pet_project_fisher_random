'use strict';
function createAnArrWithPiecePositions() {
	function randomNumFromTo(min, max) {
		max++;
		const r = Math.random() * (max - min) + min;
		return Math.floor(r);
	}

	let arrOfChessSquares = [];
	for (let i = 1; i <= 8; i++) {
		let tmpN = i - 1;
		arrOfChessSquares[tmpN] = Number(i);
	}
	//for (let i = 0; i <= 10; i++) console.log(randomNumFromTo(0, 3));
	let whiteSquaresIndexes = [1, 3, 5, 7];
	let blackSquaresIndexes = [0, 2, 4, 6];
	let arrOfrandomIndexesFromZeroToThreeForBishops = [];
	for (let i = 0; i < 2; i++) {
		arrOfrandomIndexesFromZeroToThreeForBishops[i] = randomNumFromTo(0, 3);
	}
	let lightBishopIndex =
		whiteSquaresIndexes[arrOfrandomIndexesFromZeroToThreeForBishops[0]];
	let darkBishopIndex =
		blackSquaresIndexes[arrOfrandomIndexesFromZeroToThreeForBishops[1]];
	arrOfChessSquares = arrOfChessSquares.map(function (elem, index) {
		if (lightBishopIndex == index) elem = 'bishop';
		else if (darkBishopIndex == index) elem = 'bishop';
		return elem;
	});
	function addSomeLetterInsteadRandomNumber(arr, letter) {
		let newArr = arr.filter((elem) => Number(elem) == elem);
		let length = newArr.length;
		length--;
		let randomIndex = randomNumFromTo(0, length);
		let elem = newArr[randomIndex];
		arr = arr.map(function (item) {
			if (item == elem) item = letter;
			return item;
		});
		return arr;
	}
	arrOfChessSquares = addSomeLetterInsteadRandomNumber(
		arrOfChessSquares,
		'knight'
	);
	arrOfChessSquares = addSomeLetterInsteadRandomNumber(
		arrOfChessSquares,
		'knight'
	);

	arrOfChessSquares = addSomeLetterInsteadRandomNumber(
		arrOfChessSquares,
		'queen'
	);

	function addSomethingInsteadFirstNumber(arr, something) {
		let firstNumber = arr.find((elem) => Number(elem) == elem);
		let index = arr.indexOf(firstNumber);
		arr[index] = something;
		return arr;
	}
	arrOfChessSquares = addSomethingInsteadFirstNumber(arrOfChessSquares, 'rook');
	arrOfChessSquares = addSomethingInsteadFirstNumber(arrOfChessSquares, 'king');
	arrOfChessSquares = addSomethingInsteadFirstNumber(arrOfChessSquares, 'rook');
	return arrOfChessSquares;
}

let chessArr = createAnArrWithPiecePositions();

function placeFirstLettersInBlocksFromSomeCellPosition(numOfCellPosition) {
	//а после и картинки с помощью другой функции
	for (let i = 0; i < chessArr.length; i++) {
		let firstLetter = chessArr[i].charAt(0);
		if (firstLetter == 'k') {
			if (chessArr[i] == 'king') firstLetter = 'kg';
			else firstLetter = 'kn';
		}
		cells[numOfCellPosition + i].innerText = firstLetter;
	}
}
function placePawnsInCells(numOfCellPosition) {
	for (let i = 0; i < 8; i++) {
		cells[numOfCellPosition + i].innerText = 'p';
	}
}
function firstSymbolOfString(str) {
	return str.charAt(0);
}
function testClick() {
	for (let i = 0; i < cells.length; i++) {
		if (cells[i] == this) alert(i);
	}
}

/*function paintTheCellsBlackANdWhite(row) {
	let children = row.children;
	let numberOfRow;
	let colorOfFirstCell;
	let previousColor = '';
	for (let i = 0; i < rows.length; i++) {
		if (row[i] === row) {
			numberOfRow = i;
			break;
		}
	}
	console.log(numberOfRow);
	if (numberOfRow % 2 == 0) colorOfFirstCell = 'azure';
	else colorOfFirstCell = 'dimgray';
	if (colorOfFirstCell == 'azure') {
		for (let child of children) {
			if (previousColor == '' || previousColor == 'dimgray') {
				child.style.backgroundColor = 'azure';
				previousColor = 'azure';
			}
			if (previousColor == 'azure') {
				child.style.backgroundColor = 'dimgray';
				previousColor = 'dimgray';
			}
		}
	} else
		for (let child of children) {
			if (previousColor == '' || previousColor == 'azure') {
				child.style.backgroundColor = 'dimgray';
				previousColor = 'dimgray';
			}
			if (previousColor == 'dimgray') {
				child.style.backgroundColor = 'azure';
				previousColor = 'azure';
			}
		}
}*/
let cells = document.getElementsByClassName('cell');
let rows = document.getElementsByClassName('row');
for (let elem of cells) elem.addEventListener('click', testClick);
placeFirstLettersInBlocksFromSomeCellPosition(0);
placeFirstLettersInBlocksFromSomeCellPosition(56);
placePawnsInCells(8);
placePawnsInCells(48);

//for (let r of rows) paintTheCellsBlackANdWhite(r);

let button = document.querySelector('button');
button.addEventListener('click', function () {
	chessArr = createAnArrWithPiecePositions();
	//console.log(chessArr);
	placeFirstLettersInBlocksFromSomeCellPosition(0);
	placeFirstLettersInBlocksFromSomeCellPosition(56);
});

// // to do list
// добавить картинки к фигурам в качестве функции и привязать
// к кллику на этом всё
