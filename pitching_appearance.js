

// Constructor
function PitchingAppearance() {
	this.pitches = null;
	this.gid = null;
	this.pid = null;
    this.pitcher_name = null;
    this.out = null;
    this.inn = null;
    this.bf = null;
    this.er = null;
    this.r = null;
    this.h = null;
    this.so = null;
    this.hr = null;
    this.bb = null;
    this.w = null;
    this.l = null;
    this.era = null;
    this.note = null;
    this.start = null;
};


// Used to initialize from box score data
PitchingAppearance.prototype.init = function(gid, pitcher, count) {
	this.pitches = [];
	this.gid = gid;
  	this.pid = pitcher.$.id;
  	this.pitcher_name = pitcher.$.name;
	
  	this.out = pitcher.$.out;
  	this.inn = this.convert_out_to_inn(pitcher.$.out);
  	this.bf = pitcher.$.bf;
  	this.er = pitcher.$.er;
	
  	this.r = pitcher.$.r;
  	this.h = pitcher.$.h;
  	this.so = pitcher.$.so;
  	this.hr = pitcher.$.hr;
  	this.bb = pitcher.$.bb;
  	this.w = pitcher.$.w;
  	this.l  = pitcher.$.l;
  	this.era = pitcher.$.era;
  	this.note = pitcher.$.note;
  	if (count == 1) {
    	this.start = true;
  	}
  	else {
    	this.start = false;
  	}
};

PitchingAppearance.prototype.convert_out_to_inn = function(outs) {
	var num_out = parseInt(outs);
	var part = num_out % 3;
	return (Math.floor(num_out/3)).toString() + '.' + part.toString();	
};




// export the class
module.exports = PitchingAppearance;

