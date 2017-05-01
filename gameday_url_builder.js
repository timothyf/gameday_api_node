var GamedayUtil = require('./gameday_util.js');
var Gameday = require('./gameday.js');



module.exports = {  
    build_game_base_url : function(gid) {
    	var gameday_info = GamedayUtil.parse_gameday_id('gid_' + gid);
    	return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + gameday_info.year + "/month_" + gameday_info.month + "/day_" + gameday_info.day + "/gid_"+gid; 
    },
    build_eventlog_url : function(year, month, day, gid) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
		return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/gid_"+gid+"/eventLog.xml"; 
	},
    build_epg_url : function(year, month, day) {      
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
		return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/epg.xml";
    },
    build_scoreboard_url : function(year, month, day) {      
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
      	return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/master_scoreboard.xml";
    },
    build_day_highlights_url : function(year, month, day) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
		return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/media/highlights.xml";
    },
    build_boxscore_url : function(year, month, day, gid) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
		return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/gid_"+gid+"/boxscore.xml"; 
    },
    build_game_url : function(year, month, day, gid) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
		return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/gid_"+gid+"/game.xml"; 
    },
    build_game_events_url : function(year, month, day, gid) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
		return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/gid_"+gid+"/game_events.xml"; 
    },
    build_gamecenter_url : function(year, month, day, gid) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
		return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/gid_"+gid+"/gamecenter.xml"; 
    },
    build_linescore_url : function(year, month, day, gid) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
		return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/gid_"+gid+"/linescore.xml"; 
    },
    build_players_url : function(year, month, day, gid) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
      	return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/gid_"+gid+"/players.xml";
    },
    build_batter_url : function(year, month, day, gid, pid) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
      	return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/gid_"+gid+"/batters/" +  pid + '.xml';
    },
    build_pitcher_url : function(year, month, day, gid, pid) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
      	return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/gid_"+gid+"/pitchers/" +  pid + '.xml'; 
    },
    build_inningx_url : function(year, month, day, gid, inning_num) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
      	return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/gid_"+gid+"/inning/inning_"+inning_num+".xml";
    },
    build_inning_scores_url : function(year, month, day, gid) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
      	return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/gid_"+gid+"/inning/inning_Scores.xml";
    },
    build_inning_hit_url : function(year, month, day, gid) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
      	return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/gid_"+gid+"/inning/inning_hit.xml"
    },
	build_day_url : function(year, month, day) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
		var dayStr = GamedayUtil.convert_digit_to_string(day);
      	return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/day_" + dayStr + "/";
    },
	build_month_url : function(year, month) {
		var yearStr = GamedayUtil.convert_digit_to_string(year);
		var monthStr = GamedayUtil.convert_digit_to_string(month);
      	return Gameday.GAMEDAY_BASE_PATH + "mlb/year_" + yearStr + "/month_" + monthStr + "/";
	}
};

