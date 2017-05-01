var Promise = require('bluebird');


module.exports = {  
	
	// Converts a digit into a 2 character string, prepended with '0' if necessary
    convert_digit_to_string : function(digit) {  
		var intDigit = parseInt(digit);    
	    if (intDigit < 10) {
			return '0' + intDigit.toString();
	    }
		else {
			return intDigit.toString();
	    }
    },
  	
	// Example gameday_gid = gid_2009_06_21_milmlb_detmlb_1
 	parse_gameday_id : function(gameday_gid) {
	    var gameday_info = {}
	    gameday_info["year"] = gameday_gid.substring(4,8);
	    gameday_info["month"] = gameday_gid.substring(9,11);
	    gameday_info["day"] = gameday_gid.substring(12, 14);
	    gameday_info["visiting_team_abbrev"] = gameday_gid.substring(15, 18);
	    gameday_info["home_team_abbrev"] = gameday_gid.substring(22,25);
	    gameday_info["game_number"] = gameday_gid.substring(29,30);
	    return gameday_info;
	},
	
	promiseFor : (function() {
		return promiseFor = Promise.method(function(condition, action, value) {
		    if (!condition(value)) return value;
		    return action(value).then(promiseFor.bind(null, condition, action));
		});
	})()
	
};

