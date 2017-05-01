

// Constructor
function BattingAppearance() {
	this.pid = null;
	this.batter_name = null;
	this.pos = null;
	this.bo = null;
	this.ab = null;
	this.po = null;
	this.r = null;
	this.bb = null;
	this.a = null;
	this.t = null;
	this.sf = null;
	this.h = null;
	this.e = null;
	this.d = null;
	this.hbp = null;
	this.so = null;
	this.hr = null;
	this.rbi = null;
	this.lob = null;
	this.sb = null;
	this.avg = null; // season avg
	this.fldg = null;
	this.s_hr = null;
	this.s_rbi = null;
};


// Used to initialize from box score data
BattingAppearance.prototype.init = function(batter) {
	this.pid = batter.$.id;
	this.batter_name = batter.$.name;
	this.pos = batter.$.pos;
	this.bo = batter.$.bo;
	this.ab = batter.$.ab;
	this.po = batter.$.po;
	this.r = batter.$.r;
	this.bb = batter.$.bb;
	this.a = batter.$.a;
	this.t = batter.$.t;
	this.sf = batter.$.sf;
	this.h = batter.$.h;
	this.e = batter.$.e;
	this.d = batter.$.d;
	this.hbp = batter.$.hbp;
	this.so = batter.$.so;
	this.hr = batter.$.hr;
	this.rbi = batter.$.rbi;
	this.lob = batter.$.lob;
	this.sb = batter.$.sb;
	this.avg = batter.$.avg;  // season avg
	this.fldg = batter.$.fldg;
	this.s_hr = batter.$.s_hr;
	this.s_rbi = batter.$.s_rbi;
};




// export the class
module.exports = BattingAppearance;

