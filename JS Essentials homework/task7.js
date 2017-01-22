var edgeNum = 5, userNum, totalScore = 0, multiplier = 1;

function init() {
	tryCount = 3
	var firstQuestion = confirm('Do you want to play the game?');
	if (firstQuestion == true) {
		firstQuestion = false;
		startGame();
	} else {
		endGame();
		return;
	}
	return;
}

function startGame() {
	pcNum = AiIsGenerating();
	console.log('You have ' + tryCount + ' attemps to guess the number. Choose the number.');
	getUserChoise();
}

function AiIsGenerating() {
	var num = 0;
	do {
		num = Math.ceil(Math.random() * 100)
	} while (num > edgeNum);
	return num;
}

function getUserChoise() {
	do {
		userNum = prompt('Please enter the number from 0 to ' + edgeNum);
	} while (userNum > edgeNum || isNaN(parseInt(userNum)) || !userNum);
	doVerifyNum(userNum);
}

function doVerifyNum(value) {
	var choise = parseInt(value);
	console.log('Your choise = ' + choise);
	if (choise == pcNum) {
		userWin();
	} else if (choise != pcNum) {
		userLose();
	}
}

function userWin() {
	totalScores();
	console.log('You win = $' + totalScore);
	multiplier *= 3;
	edgeNum *= 2;
	init();
}

function totalScores() {

	switch (tryCount) {
		case 1: score = 2 * multiplier; break;
		case 2: score = 5 * multiplier; break;
		case 3: score = 10 * multiplier; break;
		default: score = 0;
	}
	totalScore += score;
}

function userLose() {
	tryCount -= 1;
	console.log('It\'s wrong number. ');

	if (tryCount == 0) {
		init();
	} else if (tryCount > 0){
		console.log('Try\'s left = ' + tryCount);
		getUserChoise();
	}

}

function endGame() {
	console.log('Thanks for the game! Your win is $' + totalScore);
}