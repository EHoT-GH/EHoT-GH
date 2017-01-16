function startGame() {
	var userChoise = getUserChoise();
	var pcChoise = getPcChoise();
	
	var winSituation = {
		rock: 'scissors',
		scissors: 'paper',
		paper: 'rock'
	}
	document.getElementById("userChoise").innerHTML = 'You: ' + userChoise; 
	document.getElementById("pcChoise").innerHTML = 'AI: ' + pcChoise;
	
	if (userChoise === pcChoise) {
		document.getElementById("result").style.color = "#FFD700";
		document.getElementById("result").innerHTML = "DRAW!";
	} else if (winSituation[userChoise] === pcChoise) {
		document.getElementById("result").style.color = "#1dc942";
		document.getElementById("result").innerHTML = "YOU WIN!";
		winsCounter();
	} else {
		document.getElementById("result").style.color = "#D20915";
		document.getElementById("result").innerHTML = "YOU LOSE!";
		losesCounter();
	}
}

function getPcChoise() {
	var number = Math.random() * 100;
	var pcChoise;
	
	if (number < 33) {
		pcChoise = 'rock';
	}	else if (number > 66) {
		pcChoise = 'paper';
	} else {
		pcChoise = 'scissors';
	}
	
	return pcChoise;
}

function getUserChoise() {
	var actualChoise;

	while (!actualChoise) {

		switch (imgChoise) {
			case '1':
			actualChoise = 'rock';
			break;
			case '2':
			actualChoise = 'scissors';
			break;
			case '3':
			actualChoise = 'paper';
			break;
			default:
			document.getElementById("result").innerHTML = 'Please make your choise!';
			break;
		}
	}
	return actualChoise;
}

function winsCounter() {
	var winsCounter = document.getElementById('winsCounter');
	var count = Number(winsCounter.innerHTML);

	winsCounter.innerHTML = count += 1;
	return winsCounter;
}

function losesCounter() {
	var losesCounter = document.getElementById('losesCounter');
	var count = Number(losesCounter.innerHTML);

	losesCounter.innerHTML = count += 1;
	return losesCounter;
}

function opacity() {
	if (imgChoise == 1) {
		document.getElementById("1").style.opacity = '1',
		document.getElementById("2").style.opacity = '0.66',
		document.getElementById("3").style.opacity = '0.66';
	} else if (imgChoise == 2) {
		document.getElementById("1").style.opacity = '0.66',
		document.getElementById("2").style.opacity = '1',
		document.getElementById("3").style.opacity = '0.66';
	} else {
		document.getElementById("1").style.opacity = '0.66',
		document.getElementById("2").style.opacity = '0.66',
		document.getElementById("3").style.opacity = '1';
	}
}