$(document).ready(createDiv());

function createDiv() {
	var $newElems, counter = 1;

	while (counter < 100) {
		$newElems = $('<div id="elem' + counter + '" class="newElem" data-title="' + counter + '"></div>');
		$('#createElems').append($newElems);
		counter++;
	}
	setInterval(animDivs, 42, itemCounter);
}

function animDivs() {
	var itemIds = '#elem' + itemCounter;
	$(itemIds).addClass('animDiv');
	return itemCounter++;
}

var userNumber = $("#userNumber");
userNumber.bind("keydown", function (e) {
	if (event.which === 13) {
		getUserNumber();
	}
});


$('.newElem').click(function () {
	userNum = $(this).attr("data-title");
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
}

function countInfoMsg() {
	var //infoMsgLen = $("#progress").find().length,
	resDiv = $("#progress").find(".resultPara"),
	viewportHeight =  $(window).height(),
	headerHeight = $("#header").outerHeight(),
	footerHeight = $("#version").outerHeight(),
	itemsHeight = 0,
	menuHeight = 110,
		consoleHeight =  /*viewportHeight - headerHeight - footerHeight - menuHeight;*/ $(".console").innerHeight(); //.get(0)
		console.log(consoleHeight);
		$("#progress").find().each(function(item){
			itemsHeight += $(item).outerHeight();
		});

	//consoleHeight;

	if (consoleHeight >= (viewportHeight - (headerHeight + footerHeight + menuHeight))) {
		$("#progress").find(resDiv).eq(0).remove(); //resDiv.get(0)
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
	//$('#progress p:last-child').detach();
	var $textHis= 'Загаданное число ' + userNum + ' - угадано за ' + tryCount + ' ' + tryCountItem + ' Получено ' + expPoint + 'XP.';
	var $paraHis = $('<p>', {
		"class": 'winResultPara',
		text: $textHis
	});

	$('#progress').append($paraHis);
	$('#result').css('color', '#31d023');
	var totalExp = '<p>' + expTotalPoints + ' XP</p>';
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
	$(uGold).css('animation', 'fadeIn 3s');
	$('.newElem').css('animation', 'fadeOut 1s');
	setTimeout(function() {
		$('.newElem').css('background-color', 'rgba(255,255,255, 0.5)');
	}, 1000);
	setTimeout(function() {
		$(uGold).addClass('newElem');
		$('.newElem').css('background-color', '');
		$('.newElem').css('animation', '');
	}, 1000);
}

function doVerifyNum(userNum) {
	countInfoMsg();

	if (userNum == 0) {
		$('#result').html('Новое число загаданно!');
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
		case 4: $('#wins').html('Число угадано: ' + count + ' разa.'); break;
		case 10: {
			endGame();
			$('#wins').html('Поздравляем, Вы угадали 10 раз. Общее число опыта: ' + expTotalPoints + ' XP из 100 возможных\!');
		} break;
		default: $('#wins').html('Число угадано: ' + count + ' раз.');
	}
}

function tryCounter() {
	tryCount += 1;
	return tryCount;
}

function resetGame() {
	pcNum = AiIsGenerating();
	doVerifyNum(0);
	cleanLine();
	expTotalPoints = 0;
	$('#startButton').show();
	$('#userNumber').show();
	$('#stars img').remove();
	$('#userNumber').val('');
	$('#totalExp p').remove();
	$('#progress').html('');
	$('#history').html('');
	$('#result').html('');
	$('#wins').text('Число загадано!');
}

function endGame() {
	pcNum = AiIsGenerating();
	doVerifyNum(0);
	cleanLine();
	$('#userNumber').val('');
	$('#progress').html('');
	$('#history').html('');
	$('#result').html('');
	$('#startButton').hide();
	$('#userNumber').hide();
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
	var $winStar;
	if (value == true) {
		$winStar = '<div class="stars" data-title="' + userNum + '"><img id="goldStar" src="img/goldStar.ico" width="66px" /></div>';
	} else {
		$winStar = '<div class="stars" data-title="' + userNum + '"><img class="stars" id="star" src="img/star.png" width="66px" /></div>'; //alt="Star of victory!"
	}
	$('#stars').append($winStar);
}

var pcNum = AiIsGenerating(), count = 0, userNum, costValue, itemCounter = 1;
var tryCount = 1, tryCountItem, expPoint, expTotalPoints = 0;
var popupCondition = false;

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
		$('#popup').css('display', 'none');
		
		$('#close').addClass('hiddenButtons');
		$('#close').removeClass('dispButtons');

		$('#open').addClass('dispButtons');
		$('#open').removeClass('hiddenButtons');

	} else {
		popupCondition = true;
		$('#popup').css('display', 'inline-block');

		$('#open').addClass('hiddenButtons');
		$('#open').removeClass('dispButtons');

		$('#close').addClass('dispButtons');
		$('#close').removeClass('hiddenButtons');
		
	}

}