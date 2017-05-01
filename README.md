# Autoscaler Service

The Autoscaler service is a node.js application that runs on the [AWS Lambda Service](http://aws.amazon.com/lambda/).
This service is responsible for scaling up and down the Heroku servers that the Quikly application runs on. The Autoscaler
service provides two forms of scaling:
	- Reactive Scaling - The Autoscaler will receive alerts from the Librato service when the response time of the Quikly 
	application becomes too slow and this will prompt the Autoscaler to scale up the Quikly servers.
	- Preemptive Scaling - The Autoscaler integrates with the Quikly schedule API so that it is aware of upcoming live releases and marketing events.   Based on these events, the Autoscaler will scale up the Quikly app approrpriately based on projected audience size.


## Install

Make sure you have a working node.js environment installed on your computer.

```
git clone git@github.com:timotyf/gameday-api-node.git
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





