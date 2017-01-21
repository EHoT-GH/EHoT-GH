//Task#5: Make code writes true.

function a() {
	return 5;
}// a() => 5, typeof a() => number

function b(valueX, valueY) {
	var result = valueX + valueY;
	return result;
}// b(1,15) => 16, b(55,3) => 58, b(-5, -5) => -10, typeof b() => number

function c(valueX, valueY) {
	var result = Math.pow(valueX, valueY);
	return result;
}// c(2,2) => 4, c(3,3) => 27, c(4,5) => 1024, typeof c() => number

function d(valueX) {
	var result = {
		a: valueX
	};
	return result;
}// d(1) => {a:1}, d(123) => {a:123}, typeof d() => object

function e(valueX) {
	return function() {
		return valueX;
	};
}// e(55)() => 55, e(123)() => 123, typeof e() => function

function f(valueX, valueY) {
	var result = [];
	for (var i = 0; i < valueY; i++) {
		result[i] = valueX;
	}
	return result;
}// f(1,3) => [1,1,1], f('x',5) => ['x','x','x','x','x'], f(-1,2) => [-1,-1], typeof f() => object (array)

function g(valueX) {
	var result = 99;
	if (valueX !== undefined) {
		result = valueX;
	}
	return result;
}// g() => 99, g(1) => 1, g(2) => 2, g(3) => 3, g(99) => 99, typeof g() => number

function h(valueX) {
	return valueX();
}// h(function(){return 5}) => 5, h(function(){return 123}) => 123, typeof h() => number

function j(arrayX) {
	var calcAmount = 0;
	arrayX.forEach(function sumOfNumbers(item) {
		calcAmount += item;
	});
	return calcAmount;
}// j([1,2,3]) => 6, j([12,34,56]) => 102, typeof j() => number

function k(valueX) {
	var result = 0;
	for (var key in valueX) {
		result += valueX[key];
	}
	return result;
}// k({a:1,b:2,c:3}) => 6, k({n:55,s:82}) => 137, typeof k() => number

function m(valueX, valueY) {
	var result = [];
	for (var i = 0; i < valueX.length; i++) {
		result[i] = valueX[i] + valueY[i];
	}
	return result;
}// m([1,2,3],[55,12,33]) => [56,14,36], m([2,3],[5,-1]) => [7,2], typeof m() => object (array)

function n(valueX) {
	return function(valueY) {
		return function(valueZ) {
			return valueX + valueY + valueZ;
		};
	};
}// n(1)(2)(3) => 6, n(5)(25)(8) => 38, n(3)(-5)(0) => -2, typeof n() => number
