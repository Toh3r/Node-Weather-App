// DOM queries
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

// When form clicked
weatherForm.addEventListener('submit', e => {
  //Dont refresh page
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  // API url
  const url = `http://localhost:3000/weather?address=${location}`;

  // HTTP req in browser
  fetch(url).then(res => {
    // Parse json
    res.json().then(data => {
      // Change paragraphs depending on retrieved info
      if (data.error) {
        messageOne.textContent = `Error: ${data.error}`;
        messageTwo.textContent = '';
      } else {
        messageOne.textContent = `Location: ${data.location}`;
        messageTwo.textContent = `Forecast: ${data.forecast}`;
      }
    });
  });
});
