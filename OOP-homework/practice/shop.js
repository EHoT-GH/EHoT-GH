function Shop(name, area, gates) {
	Butique.apply(this, arguments);
	this.gates = gates;
}

// Shop.prototype = Butique.prototype;

Shop.prototype.constructor = Shop;


