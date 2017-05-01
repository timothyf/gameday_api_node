var http = require('http');
var GamedayUtil = require('./gameday_util.js');
var GamedayUrlBuilder = require('./gameday_url_builder.js');
var Errors = require('./errors.js');

var errors = new Errors();

module.exports = {  
    fetch : function(path) {      
	    var HEADERS = {
	  	    Accept: "application/xml",
	    };
		return new Promise((resolve, reject) => {
		    http.get({
		    	hostname: "gd2.mlb.com",
		    	//port: 443,
		    	path: path,
		    	//agent: false, // create a new agent just for this one request
		    	headers: HEADERS
			    },
			    function(res) {
					var body = '';
		  	        res.on("data", function(chunk) {
						body += chunk;
		  	  	  	});
					res.on("end", function() {
						resolve(body);
					});
				}).on('error', function(e) {
		  	  	  console.log("ERROR while attemping (" + path + "): " + e.message);
				  errors.addError("ERROR while attemping (" + path + "): " + e.message);
				  reject(e);
				}
			);   
		});	 
	},

    fetch_epg : function(year, month, day) {      
		return new Promise((resolve, reject) => {
	    	var path = GamedayUrlBuilder.build_epg_url(year, month, day)
	    	this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
	},

	// Fetch the master scoreboard file
	// Sample URL:  http://gd2.mlb.com/components/game/mlb/year_2008/month_04/day_07/master_scoreboard.xml
    fetch_scoreboard : function(year, month, day) {      
		return new Promise((resolve, reject) => {
	    	var path = GamedayUrlBuilder.build_scoreboard_url(year, month, day);
	    	this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
	},
	
	fetch_day_highlights : function(year, month, day) {
		return new Promise((resolve, reject) => {
	    	var path = GamedayUrlBuilder.build_day_highlights_url(year, month, day);
	    	this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
	},
	
    // Fetch the bench.xml file
	// Sample URL:  http://gd2.mlb.com/components/game/mlb/year_2008/month_04/day_07/gid_2008_04_07_atlmlb_colmlb_1/bench.xml
	fetch_bench : function(gid) {
		return new Promise((resolve, reject) => {
			var path = GamedayUrlBuilder.build_game_base_url(gid) + '/bench.xml';
	    	this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
    },
	
    // Fetch the benchO.xml file
    // Sample URL:  http://gd2.mlb.com/components/game/mlb/year_2008/month_04/day_07/gid_2008_04_07_atlmlb_colmlb_1/benchO.xml
    fetch_bencho : function(gid) {
		return new Promise((resolve, reject) => {
			var path = GamedayUrlBuilder.build_game_base_url(gid) + '/benchO.xml';
	    	this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
    },
	
    // Fetches the boxscore.xml file and returns its contents
    // Sample URL: http://gd2.mlb.com/components/game/mlb/year_2009/month_05/day_08/gid_2009_05_08_detmlb_clemlb_1/boxscore.xml
    fetch_boxscore : function(gid) {
		return new Promise((resolve, reject) => {
			var gameday_info = GamedayUtil.parse_gameday_id('gid_' + gid);
			var path = GamedayUrlBuilder.build_boxscore_url(gameday_info.year , gameday_info.month, gameday_info.day , gid);
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
    },
	
    // Fetch the emailSource.xml file
    // Sample URL:  http://gd2.mlb.com/components/game/mlb/year_2008/month_04/day_07/gid_2008_04_07_atlmlb_colmlb_1/emailSource.xml
    fetch_emailsource : function(gid) {
		return new Promise((resolve, reject) => {
			var path = GamedayUrlBuilder.build_game_base_url(gid) + '/emailSource.xml';
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
    },
	
    // Fetches the eventLog.xml file and returns its contents
    // Sample URL: http://gd2.mlb.com/components/game/mlb/year_2008/month_04/day_07/gid_2008_04_07_flomlb_wasmlb_1/eventLog.xml
    fetch_eventlog : function(gid) {
		return new Promise((resolve, reject) => {
			var gameday_info = GamedayUtil.parse_gameday_id('gid_' + gid)
			var path = GamedayUrlBuilder.build_eventlog_url(gameday_info.year , gameday_info.month, gameday_info.day , gid)
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
    },
	
  // Fetches the game.xml file and returns its contents
	fetch_game_xml : function(gid) {
		return new Promise((resolve, reject) => {
	    	var gameday_info = GamedayUtil.parse_gameday_id('gid_' + gid)
	    	var path = GamedayUrlBuilder.build_game_url(gameday_info['year'] , gameday_info['month'], gameday_info['day'] , gid)
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
	},
	
	fetch_game_events : function(gid) {
		return new Promise((resolve, reject) => {
			var gameday_info = GamedayUtil.parse_gameday_id('gid_' + gid);
			var path = GamedayUrlBuilder.build_game_events_url(gameday_info['year'] , gameday_info['month'], gameday_info['day'] , gid);
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
	},
	
	// Fetches the gamecenter.xml file and returns its contents
	fetch_gamecenter_xml : function(gid) {
		return new Promise((resolve, reject) => {
			var gameday_info = GamedayUtil.parse_gameday_id('gid_' + gid);
	    	var path = GamedayUrlBuilder.build_gamecenter_url(gameday_info['year'] , gameday_info['month'], gameday_info['day'] , gid);
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
	},
	
	// Fetch the gameday_Syn.xml file
	// Sample URL:  http://gd2.mlb.com/components/game/mlb/year_2008/month_04/day_07/gid_2008_04_07_atlmlb_colmlb_1/gameday_Syn.xml
	fetch_gamedaysyn : function(gid) {
		return new Promise((resolve, reject) => {
			var path = GamedayUrlBuilder.build_game_base_url(gid) + '/gameday_Syn.xml';
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
    },
	

    // Fetch the linescore.xml file
    // Sample URL:  http://gd2.mlb.com/components/game/mlb/year_2008/month_04/day_07/gid_2008_04_07_atlmlb_colmlb_1/linescore.xml
	fetch_linescore : function(gid) {
		return new Promise((resolve, reject) => {
			var gameday_info = GamedayUtil.parse_gameday_id('gid_' + gid);
			var path = GamedayUrlBuilder.build_linescore_url(gameday_info['year'] , gameday_info['month'], gameday_info['day'] , gid);
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
    },
	
	// Fetch the miniscoreboard.xml file
	// Sample URL:  http://gd2.mlb.com/components/game/mlb/year_2008/month_04/day_07/gid_2008_04_07_atlmlb_colmlb_1/miniscoreboard.xml
    fetch_miniscoreboard : function(gid) {
		return new Promise((resolve, reject) => {
			var path = GamedayUrlBuilder.build_game_base_url(gid) + '/miniscoreboard.xml'
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
    },
	
	/// Fetches the players.xml file and returns its contents
	fetch_players : function(gid) {
		return new Promise((resolve, reject) => {
			var gameday_info = GamedayUtil.parse_gameday_id('gid_' + gid);
			var path = GamedayUrlBuilder.build_players_url(gameday_info['year'] , gameday_info['month'], gameday_info['day'] , gid);
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
	},
	
	// Fetch the plays.xml file
	// Sample URL:  http://gd2.mlb.com/components/game/mlb/year_2008/month_04/day_07/gid_2008_04_07_atlmlb_colmlb_1/plays.xml
    fetch_plays : function(gid) {
		return new Promise((resolve, reject) => {
			var path = GamedayUrlBuilder.build_game_base_url(gid) + '/plays.xml';
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
    },
	
	// Fetches the batters/(pid).xml file
	fetch_batter : function(gid, pid) {
		return new Promise((resolve, reject) => {
	    	var gameday_info = GamedayUtil.parse_gameday_id('gid_' + gid);
	    	var path = GamedayUrlBuilder.build_batter_url(gameday_info['year'] , gameday_info['month'], gameday_info['day'] , gid, pid);
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	}).catch(reject);
		});
	},
	
	// Fetches the pitchers/(pid).xml file
	fetch_pitcher : function(gid, pid) {
		return new Promise((resolve, reject) => {
		    var gameday_info = GamedayUtil.parse_gameday_id('gid_' + gid);
		    var path = GamedayUrlBuilder.build_pitcher_url(gameday_info['year'] , gameday_info['month'], gameday_info['day'] , gid, pid);
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
	},
	
	// inning/inning_X.xml 
	fetch_inningx : function (gid, inning_num) {
		return new Promise((resolve, reject) => {
	    	var gameday_info = GamedayUtil.parse_gameday_id('gid_' + gid);
	    	var path = GamedayUrlBuilder.build_inningx_url(gameday_info['year'] , gameday_info['month'], gameday_info['day'] , gid, inning_num);
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
	},
	
	// inning/inning_Score.xml
	fetch_inning_scores : function(gid) {
		return new Promise((resolve, reject) => {
	    	var gameday_info = GamedayUtil.parse_gameday_id('gid_' + gid);
			var path = GamedayUrlBuilder.build_inning_scores_url(gameday_info['year'] , gameday_info['month'], gameday_info['day'] , gid);
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
	},
	
	// inning/inning_hit.xml
	fetch_inning_hit : function(gid) {
		return new Promise((resolve, reject) => {
	    	var gameday_info = GamedayUtil.parse_gameday_id('gid_' + gid);
			var path = GamedayUrlBuilder.build_inning_hit_url(gameday_info['year'] , gameday_info['month'], gameday_info['day'] , gid);
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
	},
	
	// Fetches the HTML page that lists all games for the specified date
	fetch_games_page : function(year, month, day) {
		return new Promise((resolve, reject) => {
	    	var path = GamedayUrlBuilder.build_day_url(year, month, day);
			this.fetch(path).then(function(result) {
	    		resolve(result);
	    	});
		});
	},
	
	// Fetches the HTML page that lists all games for the specified date
	fetch_batters_page : function(gid) {
		return new Promise((resolve, reject) => {
			var path = GamedayUrlBuilder.build_game_base_url(gid) + '/batters/';
			this.fetch(path).then(function(result) {
				resolve(result);
			});
		});
	},
	
// Fetches the HTML page that lists all games for the specified date
	fetch_pitchers_page : function(gid) {
		return new Promise((resolve, reject) => {
	  	  	var path = GamedayUrlBuilder.build_game_base_url(gid) + '/pitchers/';
			this.fetch(path).then(function(result) {
				resolve(result);
			});
		});
	},
	
    fetch_media_highlights : function(gid) {
		return new Promise((resolve, reject) => {
			var path = GamedayUrlBuilder.build_game_base_url(gid) + '/media/highlights.xml';
			this.fetch(path).then(function(result) {
				resolve(result);
			});
		});
    },
	
    fetch_media_mobile : function(gid) {
		return new Promise((resolve, reject) => {
			var path = GamedayUrlBuilder.build_game_base_url(gid) + '/media/mobile.xml';
			this.fetch(path).then(function(result) {
				resolve(result);
			});
		});
    },
	
    fetch_notifications_inning : function(gid, inning) {
		return new Promise((resolve, reject) => {
			var path = GamedayUrlBuilder.build_game_base_url(gid) + "/notifications/notifications_" + inning + ".xml";
			this.fetch(path).then(function(result) {
				resolve(result);
			});
		});
    },

    fetch_notifications_full : function(gid) {
		return new Promise((resolve, reject) => {
			var path = GamedayUrlBuilder.build_game_base_url(gid) + "/notifications/notifications_full.xml";
			this.fetch(path).then(function(result) {
				resolve(result);
			});
		});
    },
	
    fetch_onbase_linescore : function(gid) {
		return new Promise((resolve, reject) => {
			var path = GamedayUrlBuilder.build_game_base_url(gid) + '/onbase/linescore.xml';
			this.fetch(path).then(function(result) {
				resolve(result);
			});
		});
    },

    fetch_onbase_plays : function(gid) {
		return new Promise((resolve, reject) => {
			var path = GamedayUrlBuilder.build_game_base_url(gid) + '/onbase/plays.xml';
			this.fetch(path).then(function(result) {
				resolve(result);
			});
		});
    }
};



