const request = require('request');

// Function to retrieve lat/long of a location passing through address and callback function
const geocode = (address, callback) => {
  //Mapbox API url, passing in address
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidG9oM3IiLCJhIjoiY2syZDd1ejkzMGh3djNpcW1vZ2h6N2gzNCJ9.VIlNpyd1dPW3Vv-wvAAihQ&limit=1`;

  // Call API
  request({ url, json: true }, (err, { body }) => {
    // Handle errors
    if (err) {
      callback('Unable to connect to location services...', undefined);
    } else if (body.features[0] === undefined) {
      callback('Unable to find location...', undefined);
    } else {
      const response = body.features[0];
      // Send back retreived data
      callback(undefined, {
        location: response.place_name,
        lat: response.center[1],
        long: response.center[0]
      });
    }
  });
};

module.exports = geocode;
