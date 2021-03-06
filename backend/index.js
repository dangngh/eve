const express = require('express')
const app = express()
const port = 5001
const axios = require('axios')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log('request', req);
  axios.get('https://app.ticketmaster.com/discovery/v2/events.json?countryCode=CA&source=ticketmaster&apikey=gqt3xm5JcOR5QBigmIndcAkGGjQBPNGg')
    .then(events => {
      res.json(events.data._embedded.events);
    })
    .catch(error => {
      res.send('No available events');
    })
})

app.post('/local', (req, res) => {
  const {location } = req.body
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=${location}&stateCode=BC&source=ticketmaster&apikey=gqt3xm5JcOR5QBigmIndcAkGGjQBPNGg`)
    .then(events => {
      res.json(events.data._embedded.events);
    })
    .catch(error => {
      res.send('No available events');
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});