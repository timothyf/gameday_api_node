var DataDownloader = require('./data_downloader.js');

var year;
if(process.argv.indexOf("-y") != -1){ //does our flag exist?
    year = process.argv[process.argv.indexOf("-y") + 1]; //grab the next item
}
else {
	console.log("You must enter a year -y parameter");
	console.log("Usage: node download_range -y 2017 -sm 4 -sd 10 -em 6 -ed 12");
	return;
}

var startMonth;
if(process.argv.indexOf("-sm") != -1){ //does our flag exist?
    startMonth = process.argv[process.argv.indexOf("-sm") + 1]; //grab the next item
}
else {
	console.log("You must enter a start month -sm parameter");
	console.log("Usage: node download_range -y 2017 -sm 4 -sd 10 -em 6 -ed 12");
	return;
}

var startDay;
if(process.argv.indexOf("-sd") != -1){ //does our flag exist?
    startDay = process.argv[process.argv.indexOf("-sd") + 1]; //grab the next item
}
else {
	console.log("You must enter a start date -sd parameter");
	console.log("Usage: node download_range -y 2017 -sm 4 -sd 10 -em 6 -ed 12");
	return;
}

var endMonth;
if(process.argv.indexOf("-em") != -1){ //does our flag exist?
    endMonth = process.argv[process.argv.indexOf("-em") + 1]; //grab the next item
}
else {
	console.log("You must enter an end month -em parameter");
	console.log("Usage: node download_range -y 2017 -sm 4 -sd 10 -em 6 -ed 12");
	return;
}

var endDay;
if(process.argv.indexOf("-ed") != -1){ //does our flag exist?
    endDay = process.argv[process.argv.indexOf("-ed") + 1]; //grab the next item
}
else {
	console.log("You must enter an end date -ed parameter");
	console.log("Usage: node download_range -y 2017 -sm 4 -sd 10 -em 6 -ed 12");
	return;
}

console.log("year = " + year);
console.log("Start month = " + startMonth);
console.log("Start Day = " + startDay);
console.log("End month = " + endMonth);
console.log("End Day = " + endDay);


DataDownloader.download_all_for_range(year, startMonth, startDay, endMonth, endDay) ;

