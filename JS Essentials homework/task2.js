//task#2: Find and show (using alert) distance between 2 points.

var x1 = 42, y1 = 24, x2, y2, result;//Create variables for x1, y1, x2, y2, result
x2 = prompt("Please enter coordinates for X2", "24");//Coordinates of second point (X2, Y2) should be entered using prompt
y2 = prompt("Please enter coordinates for Y2", "12");
//Other variables should be set as you wish
result = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));//Find distance, set it to result variable
alert("The distance between points A(" + x1 + "," + y1 + ") and B(" + x2 + ","+ y2 + ") is " + result + "."); //Alert the result with description
//example: The distance between points A(0,1) and B(0,11) is 10.