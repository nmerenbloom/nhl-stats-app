const { default: axios } = require('axios');
const express = require('express');
const playerStatsMapper = require('./data-mapper');
const { spawn } = require('child_process');
const fs = require('fs');

const server = express();

const port = 3000

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

server.get('/ahoy', async (req, res) => {
  console.log('ahoy enpoint on localhost server 3000 hit')

  // const r = await axios.get('https://www.rotowire.com/hockey/tables/stats.php?pos=skater&season=2023')
  // res.send(playerStatsMapper(r.data));

  const pythonProcess = spawn('python', ['src/server/test.py']);
  pythonProcess.stdout.on('data', (data) => {
    const jsonData = JSON.parse(data);
    // res.json(playerStatsMapper(jsonData));
    res.json((jsonData));

  });

  // const r = 

})


server.get('/py', (req, res) => {
  const pythonProcess = spawn('python', ['src/server/test.py']);

  // Optional: Listen for output from the Python script
  pythonProcess.stdout.on('data', (data) => {

    try {
      // Parse the accumulated output as JSON
      const jsonData = JSON.parse(data);
      // Send the JSON data as the response
      res.json(jsonData);
    } catch (parseError) {
      console.error(`Error parsing JSON: ${parseError}`);
      res.status(500).send('Internal Server Error');
    }

  });

  // Optional: Listen for errors from the Python script
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error from Python Script: ${data}`);
  });
});