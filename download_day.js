var DataDownloader = require('./data_downloader.js');

var year;
if(process.argv.indexOf("-y") != -1){ //does our flag exist?
    year = process.argv[process.argv.indexOf("-y") + 1]; //grab the next item
}
else {
	console.log("You must enter a year -y parameter");
	console.log("Usage: node download_day -y 2017 -m 4 -d 17");
	return;
}

var month;
if(process.argv.indexOf("-m") != -1){ //does our flag exist?
    month = process.argv[process.argv.indexOf("-m") + 1]; //grab the next item
}
else {
	console.log("You must enter a month -m parameter");
	console.log("Usage: node download_day -y 2017 -m 4 -d 17");
	return;
}

var day;
if(process.argv.indexOf("-d") != -1){ //does our flag exist?
    day = process.argv[process.argv.indexOf("-d") + 1]; //grab the next item
}
else {
	console.log("You must enter a date -d parameter");
	console.log("Usage: node download_day -y 2017 -m 4 -d 17");
	return;
}

console.log("year = " + year);
console.log("month = " + month);
console.log("day = " + day);


DataDownloader.download_all_for_date(year, month, day);