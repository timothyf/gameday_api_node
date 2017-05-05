# Gameday Data Downloader

The Gameday Data Downloader is a node.js application that can be used to download gameday data from the MLB gameday servers.
While this release currently includes only download capability exposed, look for future releases with additional functionality including the ability to store the data into a relational database, the ability to auto-generate boxscores, and additional analysis of the data.


## Install

Make sure you have a working node.js environment installed on your computer.

```
Download the code using the "Clone or Download" button or clone the repo using git:  git clone git@github.com:timotyf/gameday-api-node.git
cd gameday-api-node
npm install
```

## Downloading Data

Download data for a specified month:
```
node download_month.js -y 2017 -m 4
```

Download data for a specified date:
```
node download_day.js -y 2017 -m 4 -d 17
```

Download data for a specified date range:
```
node download_range.js -y 2016 -sm 4 -sd 17 -em 6 -ed 10
```





