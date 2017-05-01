var expect = require('chai').expect;
var sinon = require('sinon');
var DataDownloader = require('../data_downloader.js');

describe('data_downloader', function () {
	
/*	describe('download_xml_for_date', function() {
		var year = 2009;
		var month = 6;
		var day = 21;
		DataDownloader.download_xml_for_date(year, month, day);
	});	*/
	
/*	describe('download_all_for_game', function() {
		var gid = '2009_06_21_milmlb_detmlb_1';
		var gid2 = '';
		
		it('should download all data for a single game', function(done) {
			DataDownloader.download_all_for_game(gid).then(function() {
				done();
			})
		});
	});*/
	
	describe('download_all_for_date', function() {
		var year = 2009;
		var month = 6;
		var day = 2;
		DataDownloader.download_all_for_date(year, month, day);
	});
	
/*	describe('download_all_for_month', function() {
		var year = 2009;
		var month = 6;
		it('should download all data for a month', function(done) {
			DataDownloader.download_all_for_month(year, month).then(function() {
				done();
			})
		});
	});*/
	
	describe('write_file', function() {
		
		var filePath = "components/test/tim/test.txt";
		var fileData = "This is my test data";
		
		DataDownloader.write_file(filePath, fileData);
	});
	
});