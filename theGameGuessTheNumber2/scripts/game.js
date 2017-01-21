var edgeNum = 5, pcNum = AiIsGenerating(), count = 0, userNum, costValue, level = 1;
var tryCount = 3, totalScores = 0, multiValue = 1, score = 0;
var popupCondition = true;

var userNumber = document.getElementById("userNumber");
userNumber.addEventListener("keydown", function (e) {
	if (e.keyCode === 13) {
		getUserNumber();
	}
});

function getUserNumber() {
	userNum = document.getElementById('userNumber').value;
	document.getElementById('userNumber').select();
	
	if (userNum < 1 || userNum > edgeNum) {
		userNum = (userNum < 1 ? 1 : edgeNum);
		document.getElementById('userNumber').value = userNum;
	} else {
		doVerifyNum(userNum);
	}
	//countInfoMsg();
}

// function countInfoMsg() {
// 	var infoMsgLen = document.getElementById("progress").childNodes.length;
// 	var resDiv = document.getElementById("progress").querySelectorAll(".resultPara");

// 	var viewportHeight = window.innerHeight;
// 	var headerHeight = document.getElementById("header").offsetHeight;
// 	var footerHeight = document.getElementById("version").offsetHeight;
// 	var itemsHeight = 0;
// 	var consoleHeight =  document.getElementsByClassName("console")[0].offsetHeight;
// 	console.log(consoleHeight);
// 	[].forEach.call(document.getElementById("progress").childNodes, function(item){
// 		itemsHeight += item.offsetHeight;
// 	});

// 	if (consoleHeight >= (viewportHeight - (headerHeight + footerHeight))) {
// 		resDiv[0].remove();
// 	}
// }

function userWin() {
	tryCountCalc();
	roundScore();
	totalScore();

	if (tryCount <= 3) {
		createStars(true);
	} else { 
		createStars(false);
	}

	var tryCountItem = tryCountCalc();

	var paraHis = document.createElement("P");	
	var textHis = document.createTextNode('Загаданное число ' + userNum + ' - угадано за ' + (4 - tryCount) + ' ' + tryCountItem + '. Вы выиграли: ' + '$' + score + '.');
	paraHis.appendChild(textHis);
	document.getElementById('progress').appendChild(paraHis);
	document.getElementById('progress').lastChild.style.color = '#31d023';
	var total = '$' + totalScores;
	console.log(total);
	document.getElementById('totalExp').innerHTML = total;
	counter();
	levelIncrease();
	pcNum = AiIsGenerating();
	doVerifyNum(0);
	tryCount = 3;	

	var resDiv = document.getElementById("progress").querySelectorAll(".resultPara");
	[].forEach.call(resDiv, function(item){
		item.remove();
	});
}

function levelIncrease(level) {
	level += 1;
	edgeNum *= 2;
	multiValue *= 3;
}

function userLose() {
	tryCountCalc();
	endGame();

	var tryCountItem = tryCountCalc();

	var paraHis = document.createElement("P");	
	var textHis = document.createTextNode('Число ' + userNum + ' неверно! Осталось ' + tryCountItem);
	paraHis.appendChild(textHis);
	document.getElementById('progress').appendChild(paraHis);
	document.getElementById('progress').lastChild.style.color = '#31d023';
	var total= '$' + totalScores;
	document.getElementById('totalExp').innerHTML = total;
}

function writeLog(costValue, color) {
	var text = "";

	if (costValue == false) {
		text = ' еще не ';
	} else {
		text = ' ';
	}
	document.getElementById('result').innerHTML = 'Загаданное число' + text + 'отгадано!';
	document.getElementById('result').style.color = color;
	
	var paraPro = document.createElement("P");
	paraPro.className = "resultPara";
	var textPro = document.createTextNode('Твое число: ' + userNum);
	paraPro.appendChild(textPro);
	document.getElementById("progress").appendChild(paraPro);
	document.getElementById('progress').lastChild.style.color = color;
	if (!costValue) {
		tryCounter();
	}
	
}

function doVerifyNum(userNum) {

	if (userNum == pcNum) {
		writeLog(true, '#1dc942');
		userWin();
	} else if (pcNum != userNum) {
		writeLog(false, '#f24747');
	}
}

function counter() {
	count += 1;
	
	switch (count) {
		case 2: 
		case 3: 
		case 4: document.getElementById('wins').innerHTML = 'Число угадано: ' + count + ' разa.'; break;
		default: document.getElementById('wins').innerHTML = 'Число угадано: ' + count + ' раз.';
	}
}

function tryCounter() {

	if (tryCount == 0) {
		endGame();
	} else {
		tryCount -= 1;
	}
}

function endGame() {
	pcNum = AiIsGenerating();
	document.getElementById('userNumber').value = '';
	document.getElementById('progress').innerHTML = '';
	document.getElementById('history').innerHTML = '';
	document.getElementById('result').innerHTML = '';
	document.getElementById('wins').innerHTML = 'Новое число загадано!';
}

function resetGame() {
	pcNum = AiIsGenerating();
	document.getElementById('userNumber').value = '';
	document.getElementById('progress').innerHTML = '';
	document.getElementById('history').innerHTML = '';
	document.getElementById('result').innerHTML = '';
	document.getElementById('wins').innerHTML = 'Новое число загадано!';
}

function roundScore() {
	
	switch(tryCount) {
		case 1: score = 2 * multiValue; break;
		case 2: score = 5 * multiValue; break;
		case 3: score = 10 * multiValue; break;
		default: score = 0;
	}
	return score;
}

function totalScore() {
	totalScores += score;
	return totalScores;
}

function createStars(value) {
	var winStar = document.createElement("IMG");

	if (value == true) {
		winStar.setAttribute('src', 'img/goldStar.ico');
	} else {
		winStar.setAttribute('src', 'img/star.png');
	}

	winStar.setAttribute('width', '66');
	winStar.setAttribute('alt', 'Star of victory!');
	document.getElementById('stars').appendChild(winStar);
}

function tryCountCalc() {
	var tryCountItem = "";
	switch(4 - tryCount) {
		case 1: tryCountItem = 'попытку'; break;
		case 2:
		case 3: tryCountItem = 'попытки'; break;
	}
	return tryCountItem;
}

function AiIsGenerating() {
	var num = 0;

	do {
		num = Math.ceil(Math.random() * 100)
		console.log(num);
	} while (num > edgeNum);
	console.log(num);
	return num;
}

// function closeOpenPopup() {
// 	if (popupCondition == true) {
// 		popupCondition = false;
// 		document.getElementById('popup').style.display='none';
// 	} else {
// 		document.getElementById('popup').style.display='inline-block';
// 		popupCondition = true;
// 	}

// }