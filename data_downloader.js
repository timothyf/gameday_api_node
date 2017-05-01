var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var moment = require('moment');
var Promise = require('bluebird');
var Gameday = require('./gameday.js');
var GamedayRemoteFetcher = require('./gameday_remote_fetcher.js');
var GamedayUtil = require('./gameday_util.js');
var Batter = require("./batter.js");
var Pitcher = require("./pitcher.js");
var Game = require('./game.js');


function testPromise(year, month, date) {
	return new Promise((resolve, reject) => {
		console.log('test for: ' + year + "/" + month + "/" + date);
		resolve();
	});
}


/*	This class is used to download data files from the MLB Gameday site to
	local storage.  The data that is downloaded will be stored into a path that
	replicates the MLB Gameday paths, for example here is a sample path for
	a specified date:
	  /components/game/mlb/year_2008/month_04/day_07
*/
module.exports = { 
	
	download_xml_for_date : function(year, month, day) {
		var that = this;
		var day_path = this.get_day_path(year, month, day);

		GamedayRemoteFetcher.fetch_epg(year, month, day).then(function(data) {
			that.write_file(day_path + "/epg.xml", data);
		});
		GamedayRemoteFetcher.fetch_scoreboard(year, month, day).then(function(data) {
			that.write_file(day_path + "/master_scoreboard.xml", data);
		});
		GamedayRemoteFetcher.fetch_day_highlights(year, month, day).then(function(data) {
			that.write_file(day_path + "/highlights.xml", data);
		});
    },
	
	// Downloads all data files associated with the game specified by the game id passed in. 
    download_all_for_game : function(gid) {  
		return new Promise((resolve, reject) => {
			console.log("Downloading game - " + gid);
			var that = this;  
			var downloads = [];
			downloads.push(this.download_xml_for_game(gid));
			downloads.push(this.download_batters_for_game(gid));
			downloads.push(this.download_inning_for_game(gid));
			this.download_media_for_game(gid);
			this.download_onbase_for_game(gid);
			downloads.push(this.download_pitchers_for_game(gid));
			Promise.all(downloads).then(function() {
				//console.log("All promises resolved for game - " + gid);
				resolve();
			});
		});
	},
	
	download_all_for_date : function(year, month, day) {
		return new Promise((resolve, reject) => {
			var that = this;
			var day_path = this.get_day_path(year, month, day);
			GamedayRemoteFetcher.fetch_games_page(year, month, day).then(function(data) {
				that.write_file(day_path + "/games.html", data);
				that.download_xml_for_date(year, month, day);
				var games = Game.find_by_date(year, month, day, data);

				GamedayUtil.promiseFor(function(count) {
				    return count < games.length; // condition
				}, function(count) {
				    return that.download_all_for_game(games[count].gid)
				             .then(function(res) { 
				                 return ++count; // step function
				             });
				}, 0).then(function() {console.log("######### ALL DONE for date: " + year + "/" + month + "/" + day); resolve();});
			});
		});
	},
	
	download_all_for_month : function(year, month) { 
		return new Promise((resolve, reject) => {
			var that = this;
		
			var date = new Date(parseInt(year), parseInt(month-1));
			var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
			var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
			var firstDayMnt = moment(firstDay); // first day of month
			var lastDayMnt = moment(lastDay); // last day of month
		
			var currentDate = firstDayMnt;
			var endDate = lastDayMnt.add(1, 'days');

			GamedayUtil.promiseFor(function(count) {
			    return currentDate.format('M/D/YYYY') !== endDate.format('M/D/YYYY'); // condition
			}, function(count) {
				console.log('Downloading ' + year.toString() + '/' + month.toString() + '/' + currentDate.date());
			    return that.download_all_for_date(year, month, currentDate.date())
			             .then(function(res) { 
			                 return currentDate.add(1, 'days'); // step function
			             });
			}, 0).then(function() {console.log("ALL DONE for month: " + year + "/" + month); resolve();});
		});
    },
	
	download_all_for_range : function(year, start_month, start_day, end_month, end_day) {
		return new Promise((resolve, reject) => {
			var that = this;
			var startDay = new Date(parseInt(year), parseInt(start_month), parseInt(start_day));
			var lastDay = new Date(parseInt(year), parseInt(end_month), parseInt(end_day));
			var startDayMnt = moment(startDay); // first day of month
			var lastDayMnt = moment(lastDay); // last day of month
			
			var currentDate = startDayMnt;
			var endDate = lastDayMnt.add(1, 'days');
			
			GamedayUtil.promiseFor(function(count) {
			    return currentDate.format('M/D/YYYY') !== endDate.format('M/D/YYYY'); // condition
			}, function(count) {
				console.log('Downloading ' + currentDate.year().toString() + '/' + currentDate.month().toString() + '/' + currentDate.date());
			    return that.download_all_for_date(currentDate.year(), currentDate.month(), currentDate.date())
			             .then(function(res) { 
			                 return currentDate.add(1, 'days'); // step function
			             });
			}, 0).then(function() {
					console.log("ALL DONE for range: " + year + "/" + start_month + "/" + start_day + " TO " + year + "/" + end_month + "/" + end_day); 
					resolve();
				});
		});
    },
	
	// Downloads the top-level xml directories for the game specified by the passed in game id.
	// The files include:
    //    bench.xml
    //    benchO.xml
    //    boxscore.xml
    //    emailSource.xml
    //    eventLog.xml
    //    game.xml
    //    game_events.xml
    //    gamecenter.xml
    //    gameday_Syn.xml
    //    linescore.xml
    //    miniscoreboard.xml
    //    players.xml
    //    plays.xml
    download_xml_for_game : function(gid) {
		return new Promise((resolve, reject) => {
			var that = this;
			var files = [];
			var gid_path = this.get_gid_path(gid);
			GamedayRemoteFetcher.fetch_bench(gid).then(function(data) {
				files.push(that.write_file(gid_path + "/bench.xml", data));   
			});
			GamedayRemoteFetcher.fetch_bencho(gid).then(function(data) {
				files.push(that.write_file(gid_path + "/benchO.xml", data));
			});
			GamedayRemoteFetcher.fetch_boxscore(gid).then(function(data) {
				files.push(that.write_file(gid_path + "/boxscore.xml", data));
			});
			GamedayRemoteFetcher.fetch_emailsource(gid).then(function(data) {
				files.push(that.write_file(gid_path + "/emailSource.xml", data));
			});
			GamedayRemoteFetcher.fetch_eventlog(gid).then(function(data) {
				files.push(that.write_file(gid_path + "/eventLog.xml", data));
			});
			GamedayRemoteFetcher.fetch_game_xml(gid).then(function(data) {
				files.push(that.write_file(gid_path + "/game.xml", data));
			});
			GamedayRemoteFetcher.fetch_game_events(gid).then(function(data) {
				files.push(that.write_file(gid_path + "/game_events.xml", data));
			});
			GamedayRemoteFetcher.fetch_gamecenter_xml(gid).then(function(data) {
				files.push(that.write_file(gid_path + "/gamecenter.xml", data));
			});
			GamedayRemoteFetcher.fetch_gamedaysyn(gid).then(function(data) {
				files.push(that.write_file(gid_path + "/gameday_Syn.xml", data));
			});
			GamedayRemoteFetcher.fetch_linescore(gid).then(function(data) {
				files.push(that.write_file(gid_path + "/linescore.xml", data));
			});
			GamedayRemoteFetcher.fetch_miniscoreboard(gid).then(function(data) {
				files.push(that.write_file(gid_path + "/miniscoreboard.xml", data));
			});
			GamedayRemoteFetcher.fetch_players(gid).then(function(data) {
				files.push(that.write_file(gid_path + "/players.xml", data));
			});
			GamedayRemoteFetcher.fetch_plays(gid).then(function(data) {
				files.push(that.write_file(gid_path + "/plays.xml", data));
			});
			Promise.all(files).then(function() {
			    //console.log("all the files were created for " + gid);
				resolve();
			});
		});
    },
	
	download_batters_for_game : function(gid) {
		return new Promise((resolve, reject) => {
			var that = this;
			var gid_path = this.get_gid_path(gid);
			GamedayRemoteFetcher.fetch_batters_page(gid).then(function(data) {
				that.write_file(gid_path + "/batters.html", data);
				var batter_path = gid_path + "/batters";
				var ids = Batter.get_all_ids_for_game(data);				

				GamedayUtil.promiseFor(function(count) {
				    return count < ids.length; // condition
				}, function(count) {
				    return that.fetch_and_write_batter_data(batter_path, gid, ids[count])
				             .then(function(res) { 
				                 return ++count; // step function
				             });
				}, 0).then(function() {/*console.log("All Batters Downloaded for " + gid);*/ resolve();});
			});
		});
	},
	
	download_inning_for_game : function(gid) {
		return new Promise((resolve, reject) => {
			var that = this;
			var game = new Game.Game(gid);
			game.get_num_innings().then(function(inningsCount) {
				var inn_path = that.get_gid_path(gid) + "/inning"				
				GamedayUtil.promiseFor(function(count) {
				    return count <= inningsCount; // condition
				}, function(count) {
					var path = inn_path + "/inning_" + count.toString() + ".xml";
					    return that.fetch_and_write_inning_data(path, count, gid)
					             .then(function(res) { 
					                 return ++count; // step function
					             });
				}, 1).then(function() {
						that.download_inning_common_for_game(gid, inn_path);
						that.download_notification_for_game(gid, inningsCount);
						//console.log("All Innings Downloaded for " + gid); 
						resolve();
					});
				
				
				/*
				var files = [];
				for (var i=1; i<=inningsCount; i++) {
					var path = inn_path + "/inning_" + i.toString() + ".xml";
					if (!fs.existsSync(path)) {
						files.push(that.fetch_and_write_inning_data(path, i, gid));
					}
				}
				Promise.all(files).then(function() {
					that.download_inning_common_for_game(gid, inn_path);
					that.download_notification_for_game(gid, inningsCount);
					resolve();
				});*/
			});
		});
	},
	
	download_inning_common_for_game : function(gid, innPath) {
		var that = this;
		var innScoresPath = innPath + "/inning_Scores.xml";
		//console.log("about to download inning scores");
		if (!fs.existsSync(innScoresPath)) {
			GamedayRemoteFetcher.fetch_inning_scores(gid).then(function(data) {
				that.write_file(innScoresPath, data); 
			});
		}
		var innHitPath = innPath + "/inning_hit.xml";
		//console.log("about to download inning hit");
		if (!fs.existsSync(innHitPath)) {
			GamedayRemoteFetcher.fetch_inning_hit(gid).then(function(data) {
				that.write_file(innHitPath, data); 
			});
		}	
	},
	
	download_media_for_game : function(gid) {
		var that = this;
		var media_path = this.get_gid_path(gid) + "/media";
		if (!fs.existsSync(media_path + "/highlights.xml")) {
			GamedayRemoteFetcher.fetch_media_highlights(gid).then(function(data) {
				that.write_file(media_path + "/highlights.xml", data); 
			});
		}
		if (!fs.existsSync(media_path + "/mobile.xml")) {
			GamedayRemoteFetcher.fetch_media_mobile(gid).then(function(data) {
				that.write_file(media_path + "/mobile.xml", data); 
			});
		}
	},
	
	// pass the innings count into this function so that we dont have to rebuild the boxscore in get_num_innings
	download_notification_for_game : function(gid, inningsCount) {
		return new Promise((resolve, reject) => {
			var that = this;
			var notif_path = this.get_gid_path(gid) + "/notifications";
			var files = [];
			for (var i=1; i<=inningsCount; i++) {	
				if (!fs.existsSync(notif_path + "/notifications_" + i.toString() + ".xml")) {
					files.push(that.fetch_and_write_inning_notifcation(gid, i));
				}
			} 
			Promise.all(files).then(function() {
				if (!fs.existsSync(notif_path + "/notifications_full.xml")) {
					GamedayRemoteFetcher.fetch_notifications_full(gid).then(function(data) {
						that.write_file(notif_path + "/notifications_full.xml", data); 
					});
				}
				resolve();
			});
		});
	},
	
	download_onbase_for_game : function(gid) {
		var that = this;
		var onbase_path = this.get_gid_path(gid) + "/onbase";
		GamedayRemoteFetcher.fetch_onbase_linescore(gid).then(function(data) {
			that.write_file(onbase_path + "/linescore.xml", data); 
		});
		GamedayRemoteFetcher.fetch_onbase_plays(gid).then(function(data) {
			that.write_file(onbase_path + "/plays.xml", data); 
		});
	},
	
	download_pitchers_for_game : function(gid) {
		return new Promise((resolve, reject) => {
			var that = this;
			var gid_path = this.get_gid_path(gid);
			GamedayRemoteFetcher.fetch_pitchers_page(gid).then(function(data) {
				that.write_file(gid_path + "/pitchers.html", data);
				var pitcher_path = gid_path + "/pitchers";
				var ids = Pitcher.get_all_ids_for_game(data);
				
				GamedayUtil.promiseFor(function(count) {
				    return count < ids.length; // condition
				}, function(count) {
				    return that.fetch_and_write_pitcher_data(pitcher_path, gid, ids[count])
				             .then(function(res) { 
				                 return ++count; // step function
				             });
				}, 0).then(function() {/*console.log("All Pitchers Downloaded for " + gid);*/ resolve();});
			});
		});
	},
	
	fetch_and_write_inning_notifcation : function(gid, inn) {
		var that = this;
		var notif_path = this.get_gid_path(gid) + "/notifications";
		GamedayRemoteFetcher.fetch_notifications_inning(gid, inn).then(function(data) {
			that.write_file(notif_path + "/notifications_" + inn.toString() + ".xml", data); 
		});
	},
	
	fetch_and_write_inning_data : function(path, inningNumber, gid) {
		return new Promise((resolve, reject) => {
			var that = this;
			GamedayRemoteFetcher.fetch_inningx(gid, inningNumber).then(function(data) {
				that.write_file(path, data).then(function() {
					resolve();
				})
			});
		});
	},
	
	fetch_and_write_batter_data : function(batter_path, gid, id) {
		return new Promise((resolve, reject) => {
			var that = this;
			GamedayRemoteFetcher.fetch_batter(gid, id).then(function(data) {
				that.write_file(batter_path + "/" + id + ".xml", data).then(function() {
					resolve();
				});
			});
		});
	},
	
	fetch_and_write_pitcher_data : function(pitcher_path, gid, id) {
		return new Promise((resolve, reject) => {
			var that = this;
			GamedayRemoteFetcher.fetch_pitcher(gid, id).then(function(data) {
				that.write_file(pitcher_path + "/" + id + ".xml", data).then(function() {
					resolve();
				})
			});
		});
	},
	
	// Writes the gameday data to the file specified.  
	// Does not overwrite existing files.
	write_file : function(file_path, gd_data) {
		return new Promise((resolve, reject) => {
		    if (gd_data && !fs.existsSync(file_path)) {
				var dirPath = path.dirname(file_path);
			    mkdirp(dirPath, function (err) {
					if (err) return err;
	  				fs.writeFile(file_path, gd_data, 'binary', function() {
	  					resolve();
	  				});
			    });
			
		    }
			else {
				resolve();
			}
		});
	},
	
	get_gid_path : function(gid) {
		var gameday_info = GamedayUtil.parse_gameday_id('gid_' + gid);
		return Gameday.FILE_BASE_PATH + "/year_" + gameday_info['year'] + "/month_" + gameday_info['month'] + "/day_" + gameday_info['day'] + "/gid_"+gid; 
	},
	
	get_day_path : function(year, month, day) {
		var year = GamedayUtil.convert_digit_to_string(parseInt(year));
		var month = GamedayUtil.convert_digit_to_string(parseInt(month));
		var day = GamedayUtil.convert_digit_to_string(parseInt(day));
		return Gameday.FILE_BASE_PATH + "/year_" + year + "/month_" + month + "/day_" + day;  
    }
	
}


/*
require 'gameday_api/game'
require 'gameday_api/batter'
require 'gameday_api/pitcher'
require 'fileutils'
require 'gameday_api/gameday_fetcher'


module GamedayApi

  class DataDownloader
  
    FILE_BASE_PATH = 'components/game/mlb'
  
  
    def tmp_fetch_pages_for_month(year, month, end_day)
      start_date = Date.new(year.to_i, month.to_i) # first day of month
      if end_day
        end_date = Date.new(year.to_i, month.to_i, end_day.to_i)
      else
        end_date = (start_date >> 1)-1 # last day of month
      end
      ((start_date)..(end_date)).each do |dt| 
        day = dt.day.to_s
        puts day
        day_path = get_day_path(year, month, day)
        write_file("#{day_path}/games.html", GamedayFetcher.fetch_games_page(year, month, day))
        games = Game.find_by_date(year, month, day)
        games.each do |game|
          tmp_fetch_pages_for_game(game.gid)
        end
      end
    end
  
    def tmp_fetch_pages_for_game(gid)
      write_file(get_gid_path(gid) + "/batters.html", GamedayFetcher.fetch_batters_page(gid))
      write_file(get_gid_path(gid) + "/pitchers.html", GamedayFetcher.fetch_pitchers_page(gid))
    end
  
  end
end
*/