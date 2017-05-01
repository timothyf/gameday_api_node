var cheerio = require('cheerio');


// Constructor
function Pitcher() {

}

Pitcher.prototype.someFunction = function() {

};


// export the class
module.exports = { 
	Pitcher,
	
    // Returns an array of pitcher ids for the game specified
    // pitchers are found by looking in the gid/pitchers directory on gameday
    get_all_ids_for_game : function(pitcherPageData) {
        var results = [];
        if (pitcherPageData) {
			$ = cheerio.load(pitcherPageData);
			var a = $('ul').html();
			if (a) {
				$ = cheerio.load(a);
				$('a').each(function(i, elem) {
					// look at each link inside of a ul tag					
					if ($(this).text().includes(".xml")) {
  	                	// if the link contains the text '.xml' then it is a pitcher
  	                	var str = $(this).text().trim();
  	                	var pitcher_id = str.substring(0, str.length - 4); 
  	                	results.push(pitcher_id);
					}
				});
			}
		}
        return results
    }
}

/*
    # Returns an array of pitcher ids for the game specified
    # pitchers are found by looking in the gid/pitchers directory on gameday
    def self.get_all_ids_for_game(gid)
      pitchers_page = GamedayFetcher.fetch_pitchers_page(gid)
      results = []
      if pitchers_page
        doc = Hpricot(pitchers_page)
        a = doc.at('ul')  
        if a
          (a/"a").each do |link|
            # look at each link inside of a ul tag
            if link.inner_html.include?(".xml") == true
              # if the link contains the text '.xml' then it is a pitcher
              str = link.inner_html
              str.strip!
              pid = str[0..str.length-5]
              results << pid
            end
          end
        end
      end
      results
    end
*/
