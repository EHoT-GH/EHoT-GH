function getUserNumber() {
	userNum = document.getElementById('userNumber').value;
	document.getElementById('userNumber').select();
	
	if (userNum < 1 || userNum > 99) {
		userNum = (userNum < 1 ? 1 : 99);
		document.getElementById('userNumber').value = userNum;
	} else {
		doVerifyNum(userNum);
	}
	countInfoMsg();
}

function countInfoMsg() {
	var infoMsgLen = document.getElementById("progress").childNodes.length;
	var resDiv = document.getElementById("progress").querySelectorAll(".resultPara");

	var viewportHeight = window.innerHeight;
	var headerHeight = document.getElementById("header").offsetHeight;
	var footerHeight = document.getElementById("version").offsetHeight;
	var itemsHeight = 0;
	var consoleHeight =  /* viewportHeight - headerHeight - footerHeight;*/ document.getElementsByClassName("console")[0].offsetHeight;
	console.log(consoleHeight);
	[].forEach.call(document.getElementById("progress").childNodes, function(item){
		itemsHeight += item.offsetHeight;
	});

	consoleHeight

	if (consoleHeight >= (viewportHeight - (headerHeight + footerHeight))) {
		resDiv[0].remove();
	}
}

function userWin() {
	tryCountCalc();
	expCount();
	totalExpPoints();

	if (tryCount <= 10) {
		createStars(true);
	} else { 
		createStars(false);
	}

	var paraHis = document.createElement("P");	
	var textHis = document.createTextNode('Загаданное число ' + userNum + ' - угадано за ' + tryCount + ' ' + tryCountItem + ' Получено ' + expPoint + 'XP.');
	paraHis.appendChild(textHis);
	document.getElementById('progress').appendChild(paraHis);
	document.getElementById('progress').lastChild.style.color = '#31d023';
	var totalExp= expTotalPoints + ' XP';
	document.getElementById('totalExp').innerHTML = totalExp;
	counter();
	pcNum = AiIsGenerating();
	doVerifyNum(0);
	tryCount = 1;
	tryCountItem = 0;

	var resDiv = document.getElementById("progress").querySelectorAll(".resultPara");
	[].forEach.call(resDiv, function(item){
		item.remove();
	});
}

function writeLog(costValue, color) {
	var text = "";
	if (costValue == '>') {
		text = ' больше ';
	} else {
		text = ' меньше ';
	}
	text += costValue;
	document.getElementById('result').innerHTML = 'Загаданное число' + text;
	document.getElementById('result').style.color = color;
	
	var paraPro = document.createElement("P");
	paraPro.className = "resultPara";
	var textPro = document.createTextNode('Твое число: ' + userNum + ' Загаданное: ' + costValue);
	paraPro.appendChild(textPro);
	document.getElementById("progress").appendChild(paraPro);
	document.getElementById('progress').lastChild.style.color = color;
	tryCounter();
}

function doVerifyNum(userNum) {

	if (userNum == 0) {
		document.getElementById('result').innerHTML = 'Новое число загаданно!';
	} else if (userNum == pcNum) {
		costValue = '=';
		userWin();
	} else if (pcNum < userNum) {
		writeLog('<', '#3e9dfd');
	} else if (pcNum > userNum) {
		writeLog('>', '#f24747');				
	}
}

function counter() {
	count += 1;
	
	switch (count) {
		case 2: 
		case 3: 
		case 4: document.getElementById('wins').innerHTML = 'Число угадано: ' + count + ' разa.'; break;
		case 10: {
			resetGame();
			document.getElementById('wins').innerHTML = 'Поздравляем, Вы угадали 10 раз. Общее число опыта: ' + expTotalPoints + '. Открыто достижение: Интуит\!';
		} break;
		default: document.getElementById('wins').innerHTML = 'Число угадано: ' + count + ' раз.';
	}
}

function tryCounter() {
	tryCount += 1;
	return tryCount;
}

function resetGame() {
	pcNum = AiIsGenerating();
	doVerifyNum();
	document.getElementById('userNumber').value = '';
	document.getElementById('progress').innerHTML = '';
	document.getElementById('history').innerHTML = '';
	document.getElementById('result').innerHTML = '';
	document.getElementById('wins').innerHTML = 'Число загадано!';
}

function expCount() {
	
	if (tryCount >= '11') {
		expPoint = '0';
	} else {
		expPoint = 11 - tryCount;
	}
	return expPoint;
}

function totalExpPoints() {
	expTotalPoints += Math.floor(expPoint);
	return expTotalPoints;
}

function createStars(value) {
	var winStar = document.createElement("IMG");

	if (value == true) {
		winStar.setAttribute('src', 'img/goldStar.ico');
	} else {
		winStar.setAttribute('src', 'img/star.png');
	}

	winStar.setAttribute('width', '80');
	winStar.setAttribute('alt', 'Star of victory!');
	document.getElementById('stars').appendChild(winStar);
}

var pcNum = AiIsGenerating(), count = 0, userNum, costValue;
var tryCount = 1, tryCountItem, expPoint, expTotalPoints = 0;

function tryCountCalc() {
	switch(tryCount) {
		case 1: tryCountItem = ' попытку.'; break;
		case 2:
		case 3:
		case 4: tryCountItem = ' попытки.'; break;
		default: tryCountItem = ' попыток.';
	}

	return tryCountItem;
}

function AiIsGenerating() {
	var num = 0;

	do {
		num = Math.ceil(Math.random() * 100)
	} while (num < 1 || num > 99);
	return num;
}

var userNumber = document.getElementById("userNumber");
userNumber.addEventListener("keydown", function (e) {
	if (e.keyCode === 13) {
		getUserNumber();
	}
});