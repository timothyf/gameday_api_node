


// Constructor
function Errors() {
	this.errors = [];
}

Errors.prototype.addError = function(error) {
	this.errors.push(error);
	console.log("Total Errors: " + this.count());
};

Errors.prototype.count = function() {
	return this.errors.length;
};


// export the class
module.exports = Errors

