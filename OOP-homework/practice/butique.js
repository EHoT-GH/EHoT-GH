// var Global = Global || {};
// Global.butique = 'Butique';
function Butique(name, area) {
  this.name = name;
  this.area = area;
}

Butique.prototype.greet = function() {
  console.log('Hello');
}