const express = require('express');
const microservice = require('./microservice/convert_xmi.js');

const app = express();

// Endpoint to use the microservice
app.use('/convert', microservice);

// GET endpoint to retrieve data from the microservice
app.get('/data', async (req, res) => {
    try {
        // Call the microservice to retrieve data
        const data = await microservice.getData();
        res.json(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des données depuis le microservice :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des données.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
