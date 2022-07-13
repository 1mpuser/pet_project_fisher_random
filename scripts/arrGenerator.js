export default function createAnArrWithPiecePositions() {
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
