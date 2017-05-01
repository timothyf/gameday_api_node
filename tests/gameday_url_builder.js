var expect = require('chai').expect;
var sinon = require('sinon');
var GamedayUrlBuilder = require('../gameday_url_builder.js');

describe('gameday_url_builder', function () {	
	
	describe('build_game_base_url', function() {
		
		it('should build the game base url', function() {	
			var result = GamedayUrlBuilder.build_game_base_url('2009_06_21_milmlb_detmlb_1');
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2009/month_06/day_21/gid_2009_06_21_milmlb_detmlb_1');
		});
		
	});
	
	describe('build_eventlog_url', function() {
		var year = 2016;
		var month = 7;
		var day = 22;
		
		it('should build the event log url', function() {	
			var result = GamedayUrlBuilder.build_eventlog_url(year, month, day, '2009_06_21_milmlb_detmlb_1');
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/gid_2009_06_21_milmlb_detmlb_1/eventLog.xml');
		});
		
	});
	
	describe('build_epg_url', function() {
		
		it('should build the epg url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var result = GamedayUrlBuilder.build_epg_url(year, month, day);
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/epg.xml');
		});
		
	});
	
	describe('build_scoreboard_url', function() {
		
		it('should build the scoreboard url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var result = GamedayUrlBuilder.build_scoreboard_url(year, month, day);
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/master_scoreboard.xml');
		});
		
	});
	
	describe('build_day_highlights_url', function() {
		
		it('should build the day highlights url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var result = GamedayUrlBuilder.build_day_highlights_url(year, month, day);
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/media/highlights.xml');
		});
		
	});
	
	describe('build_boxscore_url', function() {
		
		it('should build the boxscore url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var gid = '2009_06_21_milmlb_detmlb_1';
			var result = GamedayUrlBuilder.build_boxscore_url(year, month, day, gid);
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/gid_2009_06_21_milmlb_detmlb_1/boxscore.xml');
		});
		
	});
	
	
	describe('build_game_url', function() {
		
		it('should build the game url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var result = GamedayUrlBuilder.build_game_url(year, month, day, '2009_06_21_milmlb_detmlb_1');
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/gid_2009_06_21_milmlb_detmlb_1/game.xml');
		});
		
	});
	
	describe('build_game_events_url', function() {
		
		it('should build the game events url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var result = GamedayUrlBuilder.build_game_events_url(year, month, day, '2009_06_21_milmlb_detmlb_1');
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/gid_2009_06_21_milmlb_detmlb_1/game_events.xml');
		});
		
	});
	
	describe('build_gamecenter_url', function() {
		
		it('should build the gamecenter url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var result = GamedayUrlBuilder.build_gamecenter_url(year, month, day, '2009_06_21_milmlb_detmlb_1');
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/gid_2009_06_21_milmlb_detmlb_1/gamecenter.xml');
		});
		
	});
	
	describe('build_linescore_url', function() {
		
		it('should build the linescore url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var result = GamedayUrlBuilder.build_linescore_url(year, month, day, '2009_06_21_milmlb_detmlb_1');
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/gid_2009_06_21_milmlb_detmlb_1/linescore.xml');
		});
		
	});
	
	describe('build_players_url', function() {
		
		it('should build the players url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var result = GamedayUrlBuilder.build_players_url(year, month, day, '2009_06_21_milmlb_detmlb_1');
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/gid_2009_06_21_milmlb_detmlb_1/players.xml');
		});
		
	});
	
	describe('build_batter_url', function() {
		
		it('should build the batters url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var gid = '2009_06_21_milmlb_detmlb_1';
			var pid = '789';
			var result = GamedayUrlBuilder.build_batter_url(year, month, day, gid, pid);
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/gid_2009_06_21_milmlb_detmlb_1/batters/789.xml');
		});
		
	});
	
	describe('build_pitcher_url', function() {
		
		it('should build the pitcher url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var gid = '2009_06_21_milmlb_detmlb_1';
			var pid = '789';
			var result = GamedayUrlBuilder.build_pitcher_url(year, month, day, gid, pid);
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/gid_2009_06_21_milmlb_detmlb_1/pitchers/789.xml');
		});
		
	});
	
	describe('build_inningx_url', function() {
		
		it('should build the inning url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var gid = '2009_06_21_milmlb_detmlb_1';
			var inning_num = 7;
			var result = GamedayUrlBuilder.build_inningx_url(year, month, day, gid, inning_num);
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/gid_2009_06_21_milmlb_detmlb_1/inning/inning_7.xml');
		});
		
	});
	
	describe('build_inning_scores_url', function() {
		
		it('should build the inning scores url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var gid = '2009_06_21_milmlb_detmlb_1';
			var result = GamedayUrlBuilder.build_inning_scores_url(year, month, day, gid);
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/gid_2009_06_21_milmlb_detmlb_1/inning/inning_Scores.xml');
		});
		
	});
	
	describe('build_inning_hit_url', function() {
		
		it('should build the inning hit url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var gid = '2009_06_21_milmlb_detmlb_1';
			var result = GamedayUrlBuilder.build_inning_hit_url(year, month, day, gid);
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/gid_2009_06_21_milmlb_detmlb_1/inning/inning_hit.xml');
		});
		
	});
	
	describe('build_day_url', function() {
		
		it('should build the day url', function() {	
			var year = 2016;
			var month = 7;
			var day = 22;
			var result = GamedayUrlBuilder.build_day_url(year, month, day);
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/day_22/');
		});
		
	});
	
	describe('build_month_url', function() {
		
		it('should build the month url', function() {	
			var year = 2016;
			var month = 7;
			var result = GamedayUrlBuilder.build_month_url(year, month);
			expect(result).to.be.a('string');
			expect(result).to.equal('/components/game/mlb/year_2016/month_07/');
		});
		
	});

	
});