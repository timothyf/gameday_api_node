var cheerio = require('cheerio');
var GamedayRemoteFetcher = require("./gameday_remote_fetcher.js");
var LineScore = require('./line_score.js');
var Game = require('./game.js');
var xml2js = require('xml2js');
var PitchingAppearance = require('./pitching_appearance.js');
var BattingAppearance = require('./batting_appearance.js');


// Constructor
function BoxScore() {
	this.gid = null;
	this.boxscore_data = null;
	this.xml_doc = null;
	this.game = null;
	this.linescore = null;
	this.home_runs = null;
	this.away_runs = null;
	this.game_info = null;
	this.home_batting_text = null;
	this.away_batting_text = null;
	this.cities = null;
	this.pitchers = null;
	this.batters = null;
	this.temp = null;
	this.wind_speed = null;
	this.wind_dir = null;
}


// Loads the boxscore XML from the MLB gameday server and parses it using REXML
BoxScore.prototype.load_from_game = function(game) {
	var that = this;
	this.gid = game.gid;
	this.game = game;
	
	return new Promise((resolve, reject) => {
		GamedayRemoteFetcher.fetch_boxscore(this.gid).then(function(data) {
			xml2js.parseString(data, function (err, result) {
				var jsData = result;
				that.boxscore_data = jsData;	
				if (jsData && jsData.boxscore) {
					that.game.boxscore = that;
					that.set_basic_info();
					that.linescore = new LineScore();
					that.linescore.init(jsData.boxscore.linescore[0]);
					that.home_runs = that.linescore.home_team_runs
					that.away_runs = that.linescore.away_team_runs
					that.game_info = jsData.boxscore.game_info;
					that.set_batting_text();				
					that.set_cities();								
					that.set_pitchers();				
					that.set_batters();	
					that.set_weather();
					resolve();
				}
				else {
					console.log("No boxscore found for - " + that.gid);
					resolve();
				}
			});
		});
	});
};

BoxScore.prototype.set_basic_info = function() {
	this.game_id = this.boxscore_data.boxscore.$.game_id;
	this.game_pk = this.boxscore_data.boxscore.$.game_pk;
	this.home_sport_code = this.boxscore_data.boxscore.$.home_sport_code;
	this.away_team_code = this.boxscore_data.boxscore.$.away_team_code;
	this.home_team_code = this.boxscore_data.boxscore.$.home_team_code;
	this.away_id = this.boxscore_data.boxscore.$.away_id;
	this.home_id = this.boxscore_data.boxscore.$.home_id;
	this.away_fname = this.boxscore_data.boxscore.$.away_fname;
	this.home_fname = this.boxscore_data.boxscore.$.home_fname;
	this.away_sname = this.boxscore_data.boxscore.$.away_sname;
	this.home_sname = this.boxscore_data.boxscore.$.home_sname;
	this.date = this.boxscore_data.boxscore.$.date;
	this.away_wins = this.boxscore_data.boxscore.$.away_wins;
	this.away_loss = this.boxscore_data.boxscore.$.away_loss;
	this.home_wins = this.boxscore_data.boxscore.$.home_wins;
	this.home_loss = this.boxscore_data.boxscore.$.home_loss;
	this.status_ind = this.boxscore_data.boxscore.$.status_ind;
};

BoxScore.prototype.set_batting_text = function() {
	if (this.boxscore_data.boxscore.batting[0].$.team_flag == 'home') {
		if (this.boxscore_data.boxscore.batting[0].text_data) {
			this.home_batting_text = this.boxscore_data.boxscore.batting[0].text_data[0];
		}
		else {
			this.home_batting_text = "";
		}
	}
	if (this.boxscore_data.boxscore.batting[1].$.team_flag == 'away') {
		if (this.boxscore_data.boxscore.batting[1].text_data) {
			this.away_batting_text = this.boxscore_data.boxscore.batting[1].text_data[0];
		}
		else {
			this.away_batting_text = "";
		}
	}
};

// Sets an array of the city names for the teams playing the game
//	[0] = away
//	[1] = home
BoxScore.prototype.set_cities = function() {
	this.cities = [];
	if (this.boxscore_data.boxscore) {
		this.cities.push(this.boxscore_data.boxscore.$.away_sname);
		this.cities.push(this.boxscore_data.boxscore.$.home_sname);
	}
	else {
		this.cities.push('unknown');
		this.cities.push('unknown');
	}
};

// Sets an array of hashes where each hash holds data for a pitcher whom appeared
// in the game.  Specify either home or away team pitchers.
BoxScore.prototype.set_pitchers = function() {
    this.pitchers = [];
	var away_pitchers = []; 
	var home_pitchers = [];
    var count = 1
	
	//console.log("Pitcher: ");
	//console.log(JSON.stringify(this.boxscore_data.boxscore.pitching[0]));
	for (var pitcher of this.boxscore_data.boxscore.pitching[0].pitcher) {
		var appearance = new PitchingAppearance();
		appearance.init(this.gid, pitcher, count)
		count += 1
		away_pitchers.push(appearance);
	} 
    count = 1
	for (var pitcher of this.boxscore_data.boxscore.pitching[1].pitcher) {
		var appearance = new PitchingAppearance();
		appearance.init(this.gid, pitcher, count);
		count += 1
		home_pitchers.push(appearance);
	} 
    this.pitchers.push(away_pitchers);
    this.pitchers.push(home_pitchers);
};

// Sets an array of hashes where each hash holds data for a batter whom appeared
// in the game.  Specify either home or away team batters.
BoxScore.prototype.set_batters = function() {
    this.batters = [];
	var away_batters = [];
	var home_batters = [];
	
	for (var batter of this.boxscore_data.boxscore.batting[0].batter) {
		var appearance = new BattingAppearance();
		appearance.init(batter);
		away_batters.push(appearance);
    }
	for (var batter of this.boxscore_data.boxscore.batting[1].batter) {
		var appearance = new BattingAppearance();
		appearance.init(batter);
		home_batters.push(appearance)
    }
    this.batters.push(away_batters);
    this.batters.push(home_batters);
};

BoxScore.prototype.set_weather = function() {
	try {
		var matches = this.game_info.toString().match(/<br\/><b>Weather<\/b>: (\d+) degrees,.*<br\/><b>Wind<\/b>: (\d+) mph, ([\w\s]+).<br\/>/);
		this.temp = matches[1];
		this.wind_speed = matches[2];
		this.wind_dir = matches[3];
	}
	catch(err) {
		//console.log("ERROR setting weather");
	}
};


// export the class
module.exports = BoxScore;

