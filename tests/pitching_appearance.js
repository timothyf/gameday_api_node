var expect = require('chai').expect;
var sinon = require('sinon');
var PitchingAppearance = require('../pitching_appearance.js');

describe('pitching_appearance', function () {	
	
	describe('convert_out_to_inn', function() {
		
		it('should convert outs to correct inning value with full inning', function() {
			pitching = new PitchingAppearance();
			var result = pitching.convert_out_to_inn('27');
			expect(result).to.equal('9.0');
			
			var result = pitching.convert_out_to_inn('15');
			expect(result).to.equal('5.0');
		});
		
		it('should convert outs to correct inning value with full inning', function() {
			pitching = new PitchingAppearance();
			var result = pitching.convert_out_to_inn('25');
			expect(result).to.equal('8.1');
			
			var result = pitching.convert_out_to_inn('17');
			expect(result).to.equal('5.2');
		});
		
	});
	
});