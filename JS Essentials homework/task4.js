//Task#4 Show in console using WHILE

var displaySimbol = '#', lines = 0, lenght = 0, result = ' ';

while (lines < 6) {
	if (lines % 2 != 0) {
		while (lenght < 5) {
			result += displaySimbol + ' ';
			lenght++;
		}
		console.log(result);
	} else {
		while (lenght < 5) {
			result += displaySimbol + ' ';
			lenght++;
		}
		console.log(' ' + result);
	}
	lines++;
}