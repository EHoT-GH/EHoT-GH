$(document).ready(createDiv());

function createDiv() {
	var $newElems, counter = 1;

	while (counter < 100) {
		$newElems = $('<div id="elem' + counter + '" class="newElem" data-title="' + counter + '" value="' + counter + '"></div>');
		$('#createElems').append($newElems);
		counter++;
	}
}

var userNumber = $("#userNumber");
userNumber.bind("keydown", function (e) {
	if (event.which === 13) {
		getUserNumber();
	}
});


$('.newElem').click(function () {
	userNum = $(this).attr("value");
	$('#userNumber').val(userNum);
	doVerifyNum(userNum);
});

function getUserNumber() {
	userNum = $('#userNumber').val();
	$('#userNumber').select();
	
	if (userNum < 1 || userNum > 99) {
		userNum = (userNum < 1 ? 1 : 99);
		$('#userNumber').val(userNum);
	} else {
		doVerifyNum(userNum);
	}
	//countInfoMsg();
}

// function countInfoMsg() {
// 	var infoMsgLen = $("#progress").children().length;
// 	var resDiv = $("#progress").find(".resultPara");

// 	var viewportHeight =  window.clientHeight;//$('html').innerHeight();
// 	var headerHeight = $("#header").outerHeight();
// 	var footerHeight = $("#version").outerHeight();
// 	var itemsHeight = 0;
// 	var consoleHeight =  /* viewportHeight - headerHeight - footerHeight;*/ $(".console").outerHeight(); //.get(0)
// 	console.log(consoleHeight);
// 	$("#progress").children().each(function(item){
// 		itemsHeight += $(item).outerHeight();
// 	});

// 	consoleHeight;

// 	if (consoleHeight >= (viewportHeight - (headerHeight + footerHeight))) {
// 		$.remove(resDiv.get(0));
// 	}
// }

function userWin() {
	tryCountCalc();
	expCount();
	totalExpPoints();

	if (tryCount <= 10) {
		createStars(true);
	} else { 
		createStars(false);
	}
	//$('#progress p:last-child').detach();
	var $textHis= 'Загаданное число ' + userNum + ' - угадано за ' + tryCount + ' ' + tryCountItem + ' Получено ' + expPoint + 'XP.';
	var $paraHis = $('<p>', {
		"class": 'resultPara',
		text: $textHis
	});

	$('#progress').append($textHis);
	$('#result').css('color', '#31d023');
	var totalExp = expTotalPoints + ' XP';
	$('#totalExp').html(totalExp);
	counter();
	pcNum = AiIsGenerating();
	doVerifyNum(0);
	tryCount = 1;
	tryCountItem = 0;

	var $resDiv = $("#progress").find(".resultPara");
	$resDiv.each(function(item){
		$(".resultPara").detach();
	});
}

function writeLog(costValue, color) {
	var text = "";
	if (costValue == '>') {
		text = ' больше ';
	} else {
		text = ' меньше ';
	}

	var $paraPro = 'Твое число: ' + userNum + ' Загаданное ' + text + ' ' + costValue;
	var $result  = $('<p>', {
		"class": 'resultPara',
		text: $paraPro
	});

	$('#progress').append($result);
	$("#progress p:last-child").css('color', color);
	tryCounter();
}

function paintLine(userNum, color) {
	var uC = '#elem' + userNum;
	$(uC).css('background-color', color);
}

function cleanLine(userNum) {
	var uGold = '#elem' + userNum;
	$(uGold).removeClass('newElem');
	$(uGold).css('animation', 'fadeIn 6s');
	$('.newElem').css('animation', 'fadeOut 6s');
	setTimeout(function() {
		$('.newElem').css('background-color', 'rgba(255,255,255, 0.7)');
	}, 6000);
	setTimeout(function() {
		$(uGold).addClass('newElem');
		$('.newElem').css('background-color', '');
		$('.newElem').css('animation', '');
	}, 6000);
}

function doVerifyNum(userNum) {

	if (userNum == 0) {
		document.getElementById('result').innerHTML = 'Новое число загаданно!';
	} else if (userNum == pcNum) {
		cleanLine(userNum);
		costValue = '=';
		userWin();
	} else if (pcNum < userNum) {
		writeLog('<', '#3e9dfd');
		paintLine(userNum, '#3e9dfd');
	} else if (pcNum > userNum) {
		writeLog('>', '#f24747');				
		paintLine(userNum, '#f24747');
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
	cleanLine();
	$('#userNumber').value = '';
	$('#progress').innerHTML = '';
	$('#history').innerHTML = '';
	$('#result').innerHTML = '';
	$('#wins').innerHTML = 'Число загадано!';
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

	winStar.setAttribute('width', '66');
	winStar.setAttribute('alt', 'Star of victory!');
	document.getElementById('stars').appendChild(winStar);
}

var pcNum = AiIsGenerating(), count = 0, userNum, costValue;
var tryCount = 1, tryCountItem, expPoint, expTotalPoints = 0;
var popupCondition = true;

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

function closeOpenPopup() {
	if (popupCondition == true) {
		popupCondition = false;
		document.getElementById('popup').style.display='none';
	} else {
		document.getElementById('popup').style.display='inline-block';
		popupCondition = true;
	}

}