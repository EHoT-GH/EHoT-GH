// nameSpacing

// var Global = Global || {};

// Global.supermarket = 'SuperMarker';

// var SuperMarket = SuperMarket || {};

function SuperMarketClass(name, area) {
    // Public properties
    this.shops = [];
    this.name = name;
    this.area = area;
  }

  SuperMarketClass.prototype.getShop = function(name) {
    return this.shops.find(function (shop) {
      return shop.name === name;
    });
  }

  SuperMarketClass.prototype.setShop = function(shopObj) {
    if ((this.area - shopObj.area) >= 0) {
      this.shops.push(shopObj);
      this.area -= shopObj.area;
    } else {
      console.log('Sorry there are no free space... ')
    }
    return this.shops;
  }

  var aushan = new SuperMarketClass('Aushan', 1000);

  var yogurteria = new Butique('Yogurteria', 50);
  yogurteria.greet();
  var moyo = new Shop('MoYo', 100, 2);
  moyo.greet();
  var newShop = extend(Butique.prototype);
  newShop.name = 'TestShop';
  newShop.greet();

//console.log(newShop);

// aushan.setShop(yogurteria);
// aushan.setShop(moyo);

// console.log(aushan.getShop('MoYo'));
// var aushan1 = new SuperMarketClass('Aushan', 100);
// var aushan2 = new SuperMarketClass('Aushan', 100);
// var aushan3 = new SuperMarketClass('Aushan', 100);
// var aushan4 = new SuperMarketClass('Aushan', 100);

// aushan.setShop('MoYo', 80);
// aushan.setShop('Croop', 25);
// aushan.setShop('Tabaco', 45);

// var moyo = aushan.getShop('MoYo');