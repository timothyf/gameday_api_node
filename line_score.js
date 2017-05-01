var cheerio = require('cheerio');


// Constructor
function LineScore() {
	this.lineScoreData = null;
	this.away_team_runs = null;
	this.away_team_hits = null;
	this.away_team_errors = null;

	this.home_team_runs = null;
	this.home_team_hits = null;
	this.home_team_errors = null;
	this.innings = null;
}

// Initialize this instance from an XML element containing linescore data.
LineScore.prototype.init = function(linescoreData) {
	this.lineScoreData = linescoreData;
	this.away_team_runs = linescoreData.$.away_team_runs;
	this.away_team_hits = linescoreData.$.away_team_hits;
	this.away_team_errors = linescoreData.$.away_team_errors;

	this.home_team_runs = linescoreData.$.home_team_runs;
	this.home_team_hits = linescoreData.$.home_team_hits;
	this.home_team_errors = linescoreData.$.home_team_errors;

	// Set score by innings
	this.set_innings();
	//console.log("innings = " + JSON.stringify(this.innings));
};

LineScore.prototype.set_innings = function() {
	this.innings = [];
	for (var inning of this.lineScoreData.inning_line_score) {
		var score = [];
		score.push(inning.$.away);
		score.push(inning.$.home);
		this.innings.push(score);
	}
};


// export the class
module.exports = LineScore;

