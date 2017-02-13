function SupermarketClass(name) {
	this.name = name;
	this.products = [];
	this.warehouse = [
	{name : 'milk', price : 10, weight : 1, place : 'department 1'},
	{name : 'pizza', price : 25, weight : 0.5, place : 'department 2'},
	{name : 'cake', price : 35, weight : 0.78, place : 'department 1'},
	{name : 'banana', price : 12, weight : 1, place : 'department 3'},
	{name : 'apple', price : 22, weight : 1, place : 'department 3'},
	{name : 'cherry', price : 56, weight : 1, place : 'department 3'},
	{name : 'pineaple', price : 42, weight : 1, place : 'department 3'},
	{name : 'corn', price : 41, weight : 0.1, place : 'department 4'},
	{name : 'cheese', price : 25, weight : 0.2, place : 'department 1'},
	{name : 'potato', price : 7, weight : 1, place : 'department 3'},
	{name : 'onion', price : 13, weight : 1, place : 'department 3'},
	{name : 'tomato', price : 27, weight : 1, place : 'department 3'},
	{name : 'fish', price : 42, weight : 1, place : 'department 2'},
	{name : 'egg', price : 26, weight : 10, place : 'department 1'},
	{name : 'bacon', price : 42, weight : 1, place : 'department 2'}
	];
}

SupermarketClass.prototype = {
	create: function(name, price, weight, place) {
		var product =  new ProductClass(name, price, weight, place);
		this.products.push(product);
		return product;
	},

	checkProduct: function(prod) {
		if (this.products.find(function(el, i) {
			return el.name === prod;
		})) {
			console.log('yes');
		} else {
			console.log('no');
		}
	},

	showAll: function() {
		console.log('All available products: ');
		this.products.forEach(function(el) {
			console.log('\"' + el.name + '\"', ' price: ' , el.price, ', weight: ', el.weight, ', place: ', el.place);
		})
	},

	generate: function(count) {
		for(var i = 0; i <100; i++) {
			var num = Math.floor((Math.random() * 15));

			this.products.push(new ProductClass(this.warehouse[num].name,
				this.warehouse[num].price,this.warehouse[num].weight,this.warehouse[num].place));
			this.products = _.sortBy(this.products,'name');
		}
	},

	showUniq: function() {
		var uniqueList = _.uniq(this.products, function(item) { 
			return item.name;
		});
		console.log('Menu: ')
		uniqueList.forEach(function(el){
			console.log('\"' + el.name + '\"', ', price: ', el.price, ', weight: ', el.weight, ', place: ', el.place);
		})
	}
}

function ProductClass(name, price, weight, place) {
	this.name = name;
	this.price = price || 0;
	this.weight = weight || 0;  
	this.place = place || 'none';
}

function BasketClass() {
	this.products = [];
	this.bill = 0;
	this.weight = 0;
}


BasketClass.prototype = {
	buy: function(name) {
		var index;
		var prod = silpo.products.find(function(el, i) {
			index = i;
			return el.name === name;
		});
		
		if (prod) {
			var p = silpo.products[index];
			silpo.products.splice( silpo.products.indexOf(prod), 1);
			this.products.push(p);
			this.bill += p.price;
			this.weight += p.weight;
			console.log(p);
		} else {
			console.log('no');
		}
	},

	showBill: function() {
		console.log(this.bill);
	},
	showWeight: function() {
		console.log(this.weight);
	},
	showProducts: function() {
		this.products.forEach(function(el) {
			console.log('\"' + el.name + '\"', ', price: ', el.price, ', weight: ', el.weight, ', place: ', el.place);
		})
	}
};

var silpo = new SupermarketClass('silpo');
silpo.generate();
silpo.showUniq();
var basket = new BasketClass();

// Список продуктов - silpo.showUniq();
// Проверить наличие - silpo.checkProduct('tomato');
// Новое поступление - silpo.create('bacon', 34, 23, 'department 2');
// Показать все - silpo.showAll();
// Купить - basket.buy('tomato');
// Показать купленное - basket.showProducts();
// Показать счёт - basket.showBill();
// Показать вес - basket.showWeight();