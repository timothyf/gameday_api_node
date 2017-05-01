var cheerio = require('cheerio');


// Constructor
function Batter() {

}

Batter.prototype.someFunction = function() {

};


// export the class
module.exports = { 
	Batter,
	
    // Returns an array of batter ids for the game specified
    // batters are found by looking in the gid/batters directory on gameday
    get_all_ids_for_game : function(batterPageData) {
		//console.log(batterPageData);
        var results = [];
        if (batterPageData) {
			$ = cheerio.load(batterPageData);
			var a = $('ul').html();
			if (a) {
				$ = cheerio.load(a);
				$('a').each(function(i, elem) {
					// look at each link inside of a ul tag					
					if ($(this).text().includes(".xml")) {
  	                	// if the link contains the text '.xml' then it is a batter
  	                	var str = $(this).text().trim();
  	                	var batter_id = str.substring(0, str.length - 4); 
  	                	results.push(batter_id);
					}
				});
			}
		}
        return results
    }
}
