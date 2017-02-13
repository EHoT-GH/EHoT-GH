function extend(proto) {
	function __temp() {};

	__temp.prototype = proto;
	var instance = new __temp;

	return instance;
}