const path = require('path'); // utils for working with paths
// Import express framework
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Assign var to express function
const app = express();

// Serve static files from public
const publicPath = path.join(__dirname, '../public');
const veiwsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup hbs engine and views location
app.set('view engine', 'hbs');
app.set('views', veiwsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Dan'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Dan'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Halp',
    message: 'Is there any bitta help around the place at all?',
    name: 'Dan'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please enter an address...'
    });
  } else {
    let address = req.query.address;
    // Call function to retrieve geocode data
    geocode(address, (err, { lat, long, location } = {}) => {
      if (err) {
        return res.send({
          error: err
        });
      }

      // Call function to retrieve weather data
      forecast(lat, long, (err, forecastData) => {
        if (err) {
          return res.send({
            error: err
          });
        }
        res.send({
          forecast: forecastData,
          location,
          adrress: req.query.address
        });
      });
    });
  }
});

app.get('/cars', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Enter a search term...'
    });
  }

  console.log(req.query);
  res.send({
    cars: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404page', {
    title: '404',
    name: 'Dan',
    errorMessage: 'There be no help page here...'
  });
});

// 404 pages
app.get('*', (req, res) => {
  res.render('404page', {
    title: '404',
    name: 'Dan',
    errorMessage: 'There be no page here...'
  });
});

// Start server on port 3000
app.listen(3000, () => {
  console.log('Server is up on port 3000...');
});
