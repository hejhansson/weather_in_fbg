var request = require('request'),
    cheerio = require('cheerio'),
    chalk = require('chalk'),
    // falkenberg
    url = "http://www.wunderground.com/q/zmw:00000.5.02603";


(function() {
  request(url, function (error, response, body) {
    if (!error) {
		  var $ = cheerio.load(body),
			temperature = $("[data-variable='temperature'] .wx-value").html();
      feelslike = $("[data-variable='feelslike'] .wx-value").html(),
      condition = $("[data-variable='condition'] .wx-value").html().toLowerCase(),
      wind_speed = $("[data-variable='wind_gust_speed'] .wx-value").html().toLowerCase(),
      wind_speed_in_meters_per_second = wind_speed * 0.277777778;

      switch (condition) {
        case 'rain':
          condition = 'regnigt.';
        break;
        case 'clear':
          condition = 'solen framme';
        break;
        case 'partly cloudy':
          condition = 'växlande molnighet';
        break;
        case 'mostly cloudy':
          condition = 'ganska så molnigt ute';
        break;
        case 'overcast':
          condition = 'molnigt';
        break;

        default:
          condition = condition;
      }

      console.log(chalk.magenta.bold('\nVäder i Falkenberg'));
  		console.log("Det är " + temperature + "°C ute men det känns som " + feelslike + "°C.\nJust nu är " + condition + ' och blåser ' + Math.round(wind_speed_in_meters_per_second) + ' m/s\n');

  	} else {
  		console.log("Oops! Detta gick fel. Se till att du är uppkoplad till internet.");
  	}
  })
})();
