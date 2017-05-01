var expect = require('chai').expect;
var sinon = require('sinon');
var xml2js = require('xml2js');
var GamedayRemoteFetcher = require('../gameday_remote_fetcher.js');

describe('gameday_remote_fetch', function () {	
	
	
	describe('fetch', function() {
		
		it('should fetch data from a path', function() {	

		});
		
	});
	
	describe('fetch_epg', function() {
		
		it('should fetch epg data', function(done) {	
			var year = 2016;
			var month = 7;
			var day = 22;
			GamedayRemoteFetcher.fetch_epg(year, month, day).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.epg).to.not.be.undefined;
					expect(jsData.epg.$.date).to.equal("20160722");
					expect(jsData.epg.game).to.be.a('Array');
					//console.log(jsData);
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_scoreboard', function() {
		
		it('should fetch scoreboard data', function(done) {	
			var year = 2016;
			var month = 7;
			var day = 22;
			GamedayRemoteFetcher.fetch_scoreboard(year, month, day).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.games).to.not.be.undefined;
					expect(jsData.games.$.year).to.equal("2016");
					expect(jsData.games.$.month).to.equal("07");
					expect(jsData.games.$.day).to.equal("22");
					expect(jsData.games.game).to.not.be.undefined;
					expect(jsData.games.game).to.be.a('Array');
					//console.log(jsData);
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_day_highlights', function() {
		
		it('should fetch day highlights data', function(done) {	
			var year = 2016;
			var month = 7;
			var day = 22;
			GamedayRemoteFetcher.fetch_day_highlights(year, month, day).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.games).to.not.be.undefined;
					expect(jsData.games.$.date).to.equal("20160722");
					expect(jsData.games.highlights).to.not.be.undefined;
					expect(jsData.games.highlights).to.be.a('Array');
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_bench', function() {
		
		it('should fetch bench data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_bench(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.bench).to.not.be.undefined;
					expect(jsData.bench.home).to.not.be.undefined;
					expect(jsData.bench.away).to.not.be.undefined;
					expect(jsData.bench.home).to.a('Array');
					expect(jsData.bench.away).to.a('Array');
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_bencho', function() {
		
		it('should fetch bencho data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_bencho(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.bench).to.not.be.undefined;
					expect(jsData.bench.home).to.not.be.undefined;
					expect(jsData.bench.away).to.not.be.undefined;
					expect(jsData.bench.home).to.a('Array');
					expect(jsData.bench.away).to.a('Array');
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_boxscore', function() {
		
		it('should fetch boxscore data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_boxscore(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.boxscore).to.not.be.undefined;
					expect(jsData.boxscore.$.game_id).to.not.be.undefined;
					expect(jsData.boxscore.$.game_id).to.equal('2009/06/21/milmlb-detmlb-1');
					expect(jsData.boxscore.$.game_pk).to.equal('245232');
					expect(jsData.boxscore.$.venue_id).to.equal('2394');
					expect(jsData.boxscore.linescore).to.not.be.undefined;
					expect(jsData.boxscore.pitching).to.not.be.undefined;
					expect(jsData.boxscore.batting).to.not.be.undefined;
					expect(jsData.boxscore.game_info).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_emailsource', function() {
		
		it('should fetch email source data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_emailsource(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.game).to.not.be.undefined;
					expect(jsData.game.$.id).to.equal('2009/06/21/milmlb-detmlb-1');
					expect(jsData.game.$.home_name_abbrev).to.equal('DET');
					expect(jsData.game.$.away_name_abbrev).to.equal('MIL');
					expect(jsData.game.game_status).to.not.be.undefined;
					expect(jsData.game.linescore).to.not.be.undefined;
					expect(jsData.game.post_game).to.not.be.undefined;
					expect(jsData.game.home_runs).to.not.be.undefined;
					expect(jsData.game.teamInfo).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_eventlog', function() {
		
		it('should fetch email source data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_eventlog(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.game).to.not.be.undefined;
					expect(jsData.game.$.id).to.equal('2009/06/21/milmlb-detmlb-1');
					expect(jsData.game.$.pk).to.equal('245232');
					expect(jsData.game.team).to.be.a('Array');
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_game_xml', function() {
		
		it('should fetch game xml data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_game_xml(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.game).to.not.be.undefined;
					expect(jsData.game.$.type).to.equal('R');
					expect(jsData.game.$.local_game_time).to.equal('13:05');
					expect(jsData.game.team).to.not.be.undefined;
					expect(jsData.game.stadium).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_game_events', function() {
		
		it('should fetch game events data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_game_events(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.game).to.not.be.undefined;
					expect(jsData.game.inning).to.not.be.undefined;
					expect(jsData.game.inning).to.be.a('Array');
					expect(jsData.game.atBat).to.not.be.undefined;
					expect(jsData.game.deck).to.not.be.undefined;
					expect(jsData.game.hole).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_gamecenter_xml', function() {
		
		it('should fetch game events data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_gamecenter_xml(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.game).to.not.be.undefined;
					expect(jsData.game.$.status).to.equal('F');
					expect(jsData.game.ticketlink).to.not.be.undefined;
					expect(jsData.game.venueShort).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_gamedaysyn', function() {
		
		it('should fetch gamedaysyn data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_gamedaysyn(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData['mlb-gde']).to.not.be.undefined;
					expect(jsData['mlb-gde'].$.version).to.equal('1.0');
					expect(jsData['mlb-gde'].game).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_linescore', function() {
		
		it('should fetch linescore data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_linescore(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.game).to.not.be.undefined;
					expect(jsData.game.$.id).to.equal('2009/06/21/milmlb-detmlb-1');
					expect(jsData.game.$.venue).to.equal('Comerica Park');
					expect(jsData.game.linescore).to.not.be.undefined;
					expect(jsData.game.winning_pitcher).to.not.be.undefined;
					expect(jsData.game.losing_pitcher).to.not.be.undefined;
					expect(jsData.game.save_pitcher).to.not.be.undefined;
					expect(jsData.game.game_media).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_miniscoreboard', function() {
		
		it('should fetch miniscoreboard data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_miniscoreboard(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.game).to.not.be.undefined;
					expect(jsData.game.$.id).to.equal('2009/06/21/milmlb-detmlb-1');
					expect(jsData.game.$.home_name_abbrev).to.equal('DET');
					expect(jsData.game.$.away_name_abbrev).to.equal('MIL');
					expect(jsData.game.game_status).to.not.be.undefined;
					expect(jsData.game.linescore).to.not.be.undefined;
					expect(jsData.game.post_game).to.not.be.undefined;
					expect(jsData.game.home_runs).to.not.be.undefined;
					expect(jsData.game.review).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_players', function() {
		
		it('should fetch players data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_players(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.game).to.not.be.undefined;
					expect(jsData.game.$.venue).to.equal('Comerica Park');
					expect(jsData.game.$.date).to.equal('June 21, 2009');
					expect(jsData.game.team).to.not.be.undefined;
					expect(jsData.game.umpires).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_plays', function() {
		
		it('should fetch plays data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_plays(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.game).to.not.be.undefined;
					expect(jsData.game.$.id).to.equal('2009_06_21_milmlb_detmlb_1');
					expect(jsData.game.$.status_ind).to.equal('F');
					expect(jsData.game.score).to.not.be.undefined;
					expect(jsData.game.review).to.not.be.undefined;
					expect(jsData.game.players).to.not.be.undefined;
					expect(jsData.game.splits).to.not.be.undefined;
					expect(jsData.game.atbat).to.not.be.undefined;
					expect(jsData.game.field).to.not.be.undefined;
					expect(jsData.game.lineup).to.not.be.undefined;
					expect(jsData.game.weather).to.not.be.undefined;
					expect(jsData.game.control).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_batter', function() {
		
		it('should fetch batter data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			var pid = 116034;
			GamedayRemoteFetcher.fetch_batter(gid, pid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.Player).to.not.be.undefined;
					expect(jsData.Player.$.team).to.equal('mil');
					expect(jsData.Player.$.id).to.equal('116034');
					expect(jsData.Player.season).to.not.be.undefined;
					expect(jsData.Player.career).to.not.be.undefined;
					expect(jsData.Player.month).to.not.be.undefined;
					expect(jsData.Player.Team).to.not.be.undefined;
					expect(jsData.Player.Empty).to.not.be.undefined;
					expect(jsData.Player.Men_On).to.not.be.undefined;
					expect(jsData.Player.RISP).to.not.be.undefined;
					expect(jsData.Player.Loaded).to.not.be.undefined;
					expect(jsData.Player.vs_LHP).to.not.be.undefined;
					expect(jsData.Player.vs_RHP).to.not.be.undefined;
					expect(jsData.Player.vs_P).to.not.be.undefined;
					expect(jsData.Player.atbats).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_pitcher', function() {
		
		it('should fetch pitcher data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			var pid = 116034;
			GamedayRemoteFetcher.fetch_pitcher(gid, pid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.Player).to.not.be.undefined;
					expect(jsData.Player.$.team).to.equal('mil');
					expect(jsData.Player.$.id).to.equal('116034');
					expect(jsData.Player.season).to.not.be.undefined;
					expect(jsData.Player.career).to.not.be.undefined;
					expect(jsData.Player.Month).to.not.be.undefined;
					expect(jsData.Player.Team).to.not.be.undefined;
					expect(jsData.Player.Empty).to.not.be.undefined;
					expect(jsData.Player.Men_On).to.not.be.undefined;
					expect(jsData.Player.RISP).to.not.be.undefined;
					expect(jsData.Player.Loaded).to.not.be.undefined;
					expect(jsData.Player.vs_LHB).to.not.be.undefined;
					expect(jsData.Player.vs_RHB).to.not.be.undefined;
					expect(jsData.Player.vs_B).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_inningx', function() {
		
		it('should fetch inningx data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			var inningNumber = 3;
			GamedayRemoteFetcher.fetch_inningx(gid, inningNumber).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.inning).to.not.be.undefined;
					expect(jsData.inning.$.num).to.equal('3');
					expect(jsData.inning.top).to.not.be.undefined;
					expect(jsData.inning.bottom).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_inning_scores', function() {
		
		it('should fetch inningn scores data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_inning_scores(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.scores).to.not.be.undefined;
					expect(jsData.scores.$.away_team).to.equal('mil');
					expect(jsData.scores.$.home_team).to.equal('det');
					expect(jsData.scores.score).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_inning_hit', function() {
		
		it('should fetch inning hit data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_inning_hit(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.hitchart).to.not.be.undefined;
					expect(jsData.hitchart.hip).to.not.be.undefined;
					expect(jsData.hitchart.hip).to.be.a('Array');
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_games_page', function() {
		
		it('should fetch games page data', function(done) {	
			var year = 2016;
			var month = 7;
			var day = 22;
			GamedayRemoteFetcher.fetch_games_page(year, month, day).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.html).to.not.be.undefined;
					expect(jsData.html.head).to.not.be.undefined;
					expect(jsData.html.body).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_batters_page', function() {
		
		it('should fetch batters page data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_batters_page(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.html).to.not.be.undefined;
					expect(jsData.html.head).to.not.be.undefined;
					expect(jsData.html.body).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_pitchers_page', function() {
		
		it('should fetch pitchers page data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_pitchers_page(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.html).to.not.be.undefined;
					expect(jsData.html.head).to.not.be.undefined;
					expect(jsData.html.body).to.not.be.undefined;
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_media_highlights', function() {
		
		it('should fetch media highlights data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_media_highlights(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					expect(jsData.highlights).to.not.be.undefined;
					expect(jsData.highlights.media).to.not.be.undefined;
					expect(jsData.highlights.media).to.be.a('Array');
					done();
				}, 300);
			});
		});
		
	});
	
	describe('fetch_media_mobile', function() {
		
		it('should fetch media mobile data', function(done) {	
			var gid = '2009_06_21_milmlb_detmlb_1';
			GamedayRemoteFetcher.fetch_media_mobile(gid).then(function(xmlData) {
				expect(xmlData).to.not.be.null;
				expect(xmlData).to.be.a('string');
				var jsData = null;
				xml2js.parseString(xmlData, function (err, result) {
					jsData = result;
				});
				setTimeout(function() {
					console.log(jsData);
					expect(jsData.highlights).to.not.be.undefined;
					expect(jsData.highlights.media).to.not.be.undefined;
					expect(jsData.highlights.media).to.be.a('Array');
					done();
				}, 300);
			});
		});
		
	});
	
	
	
});
