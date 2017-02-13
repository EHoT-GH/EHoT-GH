function Casino(slotmachines, money) {
	this.slots = slotmachines;
	this.money = money;
	this.machines = [];

	generate(this.slots, this.money, this.machines);

	this.high = function(machines){
		return _.max(machines, function(el){
			return el.money;
		});
	};

	this.highest = this.high(this.machines);

	function generate(machines, money, arr){
		var m = Math.floor(money / machines);
		for(var i = 0; i < machines; i++){
			arr.push(new SlotMachine(m, (i) ));
		}
		arr[0].money += money % machines;
		var numb = Math.floor((Math.random() * machines));
		arr[numb].name = 'lucky';
		console.log('lucky is : ', numb);
	};

}

Casino.prototype = {
	create : function() {
		this.machines.push(new SlotMachine(this.highest.money / 2, this.machines.length));
		this.highest = this.high(this.machines);
	},

	showCasinoMoney : function() {
		var sum = 0;
		this.machines.forEach(function(el) {
			sum += el.money;
		});
		return sum;
		console.log('Casino money: ', sum);
	},

	SlotMachines : function(){
		console.log('Right now in casino :',this.machines.length,'machines');
	},

	deleteMachine : function(machineNumb){
		var index, delBalance;
		var prod =  this.machines.find(function(el, i) {
			index = i;
			delBalance = el.money;
			return el.number === machineNumb;
		});
		
		if (prod) {
			this.machines.splice(this.machines.indexOf(prod), 1);
			console.log('balance on deleted slot:', delBalance);

			var m1 = Math.floor(delBalance / this.machines.length);
			this.machines.forEach(function(el) {
				el.money += m1;
			});
			this.machines[0].money += delBalance % this.machines.length;
		}

		else{
			console.log('invalid machine number');
		}
		console.log('machines:', this.machines.length);
		this.highest = this.high(this.machines);
	},

	cashOut : function(money) {
		var mN = this.showCasinoMoney();
		if(money > mN){
			alert('invalid');
			return;
		}

		var m2 = Math.floor(money / this.machines.length);
		var m3 = money % this.machines.length;

		this.machines = _.sortBy(this.machines, function(el) {
			return el.money;
		}).reverse();
		// debugger;

		this.machines.forEach(function(el) {
			el.money -= m2;
		});
		
		this.machines = _.sortBy(this.machines, function(el) {
			return el.number;
		});

		this.machines[0].money -= m3;
		// debugger;
		return money;

	},

	play : function(money){
		var casMoney = this.showCasinoMoney();

		if((money * 5) > casMoney) {
			var uplimit = Math.floor(casMoney / 5);
			alert('invalid. Enter from 0 - ' + uplimit);
		} else {
			var avalible = [];
			this.machines.forEach(function(el){
				avalible.push(el.number);
			});

			var machine = prompt('Enter slot. Availeble slots = ' + avalible, 0);
			var nm = this.machines.find(function(el){
				return el.number == parseInt(machine);
			});
			if (nm) {

				this.machines[machine].putMoney(money);
				var result = this.machines[machine].play(money, machine);
		} else {
			alert('invalid');
			return;
		};
		
		if(result[1] > 0){
			this.deleteMachine(parseInt(machine));
			var cashOut = this.cashOut(result[0]);
		}
		console.log('Casino bankroll', this.showCasinoMoney());
	}	
}
}

function SlotMachine(money, number, name){
	this.money = money;
	this.number = number || 0;
	this.name = name || 'regular';
}

SlotMachine.prototype = {

	showMoney : function(){
		console.log(this.money);
	},

	cashOut : function(money){
		if(money > this.money){
			alert('invalid');
		} else {
			this.money -= money;
			return money;
		}
	},

	putMoney : function(money){
		if(money <= 0){
			alert('invalid');
		} else {
			this.money += money;
		}
	},

	play : function(money){
		console.log('You played for: ', money,' on ', this.name,' machine number ', this.number);
		console.log('current machine balance: ', this.money);

		function getRandomArbitrary(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
		};

		var numb = getRandomArbitrary(100, 999);
		var a = Math.floor(numb / 100);
		var b = numb % 100;
		var c = numb % 10;

		b = Math.floor(b / 10);

		if(this.name === 'lucky'){
			console.log('your number is: ', 777);
		} else {
			console.log('your number is: ', numb);
		};

		var arr = [];
		arr.push(a,b,c);

		var check = _.uniq(arr);

		if (check.length == 2) {
			money = money * 2;
			console.log('You win 2X: ', money);
		} else if (check.length == 1 || this.name === 'lucky'){
			money = money * 5;
			console.log('You win 5X: ', money);
		} else {
			console.log('You lose: ', money);
			return 'lose';
		};

		if (money > this.money) {
			var toCashOut = money - this.money;
			this.money = 0;
			return [toCashOut, money];
		} else if (money <= this.money) {
			this.cashOut(money);
			return [-1, 'win'];
		}
	}
}
var casino = new Casino(11, 500);
console.log(casino.machines);
console.log(casino.showCasinoMoney());
console.log(casino.SlotMachines());
// console.log(casino.SlotMachines());
// console.log(casino.SlotMachines());
// console.log(casino.SlotMachines());
// console.log(casino.SlotMachines());
// console.log(casino.SlotMachines());