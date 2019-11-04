const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/39c4ca7d0f7591ac5744d793772fd3ac/${lat},${long}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather services...', undefined);
    } else if (body.error) {
      callback('Unable to find location...', undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} Temperature: ${body.currently.temperature}. ${body.currently.precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
