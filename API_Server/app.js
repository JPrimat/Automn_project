// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

// Create Express app
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to get data from JSON
app.get('/api/data', async (req, res) => {
  try {
    // Read data from JSON file
    const rawData = await fs.readFile('data.json');
    const jsonData = JSON.parse(rawData);

    // Send data as response
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to put data to JSON
app.put('/api/data', async (req, res) => {
  try {
    // Read existing data from JSON file
    const rawData = await fs.readFile('data.json');
    let jsonData = JSON.parse(rawData);

    // Update data with incoming JSON
    jsonData = { ...jsonData, ...req.body };

    // Write updated data back to JSON file
    await fs.writeFile('data.json', JSON.stringify(jsonData, null, 2));

    // Send success response
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
