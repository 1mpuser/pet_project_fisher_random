'use strict';
let arrOfValidPictureRegExpExtensions = [
	/.+\.png/,
	/.+\.jpeg/,
	/.+\.gif/,
	/.+\.bmp/,
];
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
	for (let i = 0; i < 2; i++)
		arrOfChessSquares = addSomeLetterInsteadRandomNumber(
			arrOfChessSquares,
			'knight'
		);

	arrOfChessSquares = addSomeLetterInsteadRandomNumber(
		arrOfChessSquares,
		'queen'
	);

	function addSomethingInsteadFirstNumberInArr(arr, something) {
		let firstNumber = arr.find((elem) => Number(elem) == elem);
		let index = arr.indexOf(firstNumber);
		arr[index] = something;
		return arr;
	}
	arrOfChessSquares = addSomethingInsteadFirstNumberInArr(
		arrOfChessSquares,
		'rook'
	);
	arrOfChessSquares = addSomethingInsteadFirstNumberInArr(
		arrOfChessSquares,
		'king'
	);
	arrOfChessSquares = addSomethingInsteadFirstNumberInArr(
		arrOfChessSquares,
		'rook'
	);
	return arrOfChessSquares;
}

let chessArr = createAnArrWithPiecePositions();

function placeFirstLettersInBlocksFromSomeCellPosition(numOfCellPosition) {
	for (let i = 0; i < chessArr.length; i++) {
		let firstLetter = chessArr[i].charAt(0);
		if (firstLetter == 'k') {
			if (chessArr[i] == 'king') firstLetter = 'kg';
			else firstLetter = 'kn';
		}
		cells[numOfCellPosition + i].innerText = firstLetter;
	}
}

function firstSymbolOfString(str) {
	return str.charAt(0);
}
function writeInCellWithIndexPngImage(cellIndex, wayToImage) {
	let cell = cells[cellIndex];
	let image = document.createElement('img');
	image.src = wayToImage;
	cell.append(image);
}
function addTheRightWayWithRegularExpression(strWithWayWithPng) {
	//that would be a dangerous code with exceptions (((oh yeah)))
	function isThisStringHasWantedFormatOfPicture(
		wayToImage,
		...wantedPictureFormats
	) {
		return wantedPictureFormats.some((elem) => elem.test(wayToImage));
	}
	let isThereAGoodExtension = isThisStringHasWantedFormatOfPicture(
		strWithWayWithPng,
		arrOfValidPictureRegExpExtensions
	);
	if (!isThereAGoodExtension)
		throw 'There is no valid Picture Extensions in arr or this is not good extension';
	let tmpImg = new Image();
	tmpImg.src = strWithWayWithPng;
	tmpImg.onload = function () {
		return true;
	};
	tmpImg.onerror = function () {
		throw 'Такого пути попросту нет';
	};
}

function createImgWithWayInCell(cell, imgLocation) {
	let imgElem = document.createElement('img');
	imgElem.src = imgLocation;
	cell.append(imgElem);
}

function drawPawns() {
	for (let i = 0; i < 8; i++) {
		let blackIndex = 8 + i;
		let whiteIndex = 48 + i;
		writeInCellWithIndexPngImage(blackIndex, 'blackPawn.png');
		writeInCellWithIndexPngImage(whiteIndex, 'whitePawn.png');
	}
}

function findAllCellsWithSameTextAndPutThemInArray(textInCells) {
	let arrayOfSimilarCells = [];
	for (let cell of cells) {
		if (cell.innerText == textInCells) arrayOfSimilarCells.push(cell);
	}
	return arrayOfSimilarCells;
}

function putPicturesInCellsWithSameText(text, wayToThePictureInString) {
	//that could be with black and white, which is added to
	//variable 'wayToThePictureInString'
	let arrOfCells = findAllCellsWithSameTextAndPutThemInArray(text);
	let lastIndexOfBlackFIgures = arrOfCells.length / 2; //it could be 1 or 2
	let tmpWayToThePictureInString = 'black' + wayToThePictureInString; //of course it wouldn't
	//work with long way to a picture, need to rework
	for (let i = 0; i < arrOfCells.length; i++) {
		if (i >= lastIndexOfBlackFIgures) {
			tmpWayToThePictureInString = 'white' + wayToThePictureInString;
		}
		arrOfCells[i].innerText = '';
		createImgWithWayInCell(arrOfCells[i], tmpWayToThePictureInString);
	}
}

function replaceLettersWithPictures() {
	putPicturesInCellsWithSameText('r', 'Rook.png');
	putPicturesInCellsWithSameText('kn', 'Knight.png');
	putPicturesInCellsWithSameText('b', 'Bishop.png');
	putPicturesInCellsWithSameText('q', 'Queen.png');
	putPicturesInCellsWithSameText('kg', 'King.png');
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
placeFirstLettersInBlocksFromSomeCellPosition(0);
placeFirstLettersInBlocksFromSomeCellPosition(56);
drawPawns();
replaceLettersWithPictures();

let button = document.querySelector('button');
button.addEventListener('click', function () {
	chessArr = createAnArrWithPiecePositions();
	//console.log(chessArr);
	placeFirstLettersInBlocksFromSomeCellPosition(0);
	placeFirstLettersInBlocksFromSomeCellPosition(56);
	replaceLettersWithPictures();
});
