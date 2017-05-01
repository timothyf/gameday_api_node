var expect = require('chai').expect;
var sinon = require('sinon');
var GamedayUtil = require('../gameday_util.js');

describe('gameday_util', function () {	
	
	
	describe('convert_digit_to_string', function() {
		
		it('should convert single digit to double digit string', function() {	
			var result = GamedayUtil.convert_digit_to_string(0);
			expect(result).to.be.a('string');
			expect(result).to.equal('00');		
			var result = GamedayUtil.convert_digit_to_string(1);
			expect(result).to.be.a('string');
			expect(result).to.equal('01');
			var result = GamedayUtil.convert_digit_to_string(9);
			expect(result).to.be.a('string');
			expect(result).to.equal('09');
		});
		
		it('should convert double digit to double digit string', function() {	
			var result = GamedayUtil.convert_digit_to_string(10);
			expect(result).to.be.a('string');
			expect(result).to.equal('10');		
			var result = GamedayUtil.convert_digit_to_string(11);
			expect(result).to.be.a('string');
			expect(result).to.equal('11');
			var result = GamedayUtil.convert_digit_to_string(19);
			expect(result).to.be.a('string');
			expect(result).to.equal('19');
		});
		
	});
	
	describe('parse_gameday_id', function() {
		
		it('should parse a gameday_id string', function() {	
			var result = GamedayUtil.parse_gameday_id('gid_2009_06_21_milmlb_detmlb_1');
			expect(result).to.be.a('Object');
			expect(result.year).to.equal('2009');
			expect(result.month).to.equal('06');
			expect(result.day).to.equal('21');
			expect(result.visiting_team_abbrev).to.equal('mil');
			expect(result.home_team_abbrev).to.equal('det');
			expect(result.game_number).to.equal('1');
		});	
		
		it('should parse a gameday_id string', function() {	
			var result = GamedayUtil.parse_gameday_id('gid_2009_06_21_milmlb_detmlb_2');
			expect(result).to.be.a('Object');
			expect(result.year).to.equal('2009');
			expect(result.month).to.equal('06');
			expect(result.day).to.equal('21');
			expect(result.visiting_team_abbrev).to.equal('mil');
			expect(result.home_team_abbrev).to.equal('det');
			expect(result.game_number).to.equal('2');
		});	
		
	});
	
});