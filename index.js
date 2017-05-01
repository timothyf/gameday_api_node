var DataDownloader = require('./data_downloader.js');

var year;
if(process.argv.indexOf("-y") != -1){ //does our flag exist?
    year = process.argv[process.argv.indexOf("-y") + 1]; //grab the next item
}
else {
	year = 2017;
}

var month;
if(process.argv.indexOf("-m") != -1){ //does our flag exist?
    month = process.argv[process.argv.indexOf("-m") + 1]; //grab the next item
}
else {
	month = 5;
}

var day;
if(process.argv.indexOf("-d") != -1){ //does our flag exist?
    day = process.argv[process.argv.indexOf("-d") + 1]; //grab the next item
}
else {
	day = 1;
}

console.log("year = " + year);

//DataDownloader.download_all_for_month(2009, 6);
//DataDownloader.download_all_for_date(2009, 5, 6);
/*DataDownloader.download_all_for_game('2009_05_06_detmlb_chamlb_1').then(function() {
	console.log("Completed Download");
});*/

//DataDownloader.download_all_for_range(2009, 5, 4, 5, 10) ;