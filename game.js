var BoxScore = require('./box_score.js');
var cheerio = require('cheerio');


// Constructor
function Game(gid) {
	this.gid = gid;
	this.boxscore = null;
}

Game.prototype.get_num_innings = function() {
	return new Promise((resolve, reject) => {
	    this.set_boxscore().then(function() {
		    if (this.boxscore.linescore) {
				resolve(this.boxscore.linescore.innings.length);
			}
			else {
				resolve(0);
		    }
	    });
	});
};

// Returns a BoxScore object representing the boxscore for this game
Game.prototype.set_boxscore = function() {
	return new Promise((resolve, reject) => {
		if (!this.boxscore) {
	    	var box = new BoxScore();		
	    	box.load_from_game(this).then(function() {
	    		this.boxscore = box;
				resolve();
	    	});
		}
		else {
			resolve();
		}
	});
};


// export the class
module.exports = {
	Game,
	
	// Returns an array of Game objects for each game for the specified day
	find_by_date : function(year, month, day, gamesPageData) {
//	  begin 
		var games = [];
	    //games_page = GamedayFetcher.fetch_games_page(year, month, day)
	    if (gamesPageData) {
			$ = cheerio.load(gamesPageData);
			var a = $('ul').html();
			$ = cheerio.load(a);
			$('a').each(function(i, elem) {
			  	if ($(this).html().includes('gid')) {
					var str = $(this).html();
					var gid = str.substring(5, str.length-1);
            		game = new Game(gid);
					games.push(game);
			  	}
			});
	    }
		else {
			console.log("Could not read games page for " + year + ", " + month + ", " + day + ".");
	    }
	    return games;
/*	  rescue
	    puts "No games data found for #{year}, #{month}, #{day}."
	  end*/
	}
	
}

