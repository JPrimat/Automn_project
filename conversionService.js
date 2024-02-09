// conversionService.js - Microservice pour la conversion des fichiers XMI/XML en JSON

const express = require('express');
const xml2js = require('xml2js');

const router = express.Router();

// Middleware pour la conversion des fichiers XMI/XML en JSON
router.use(async (req, res, next) => {
    try {
        // Vérifie si le fichier est un XMI/XML
        if (!req.file || !req.file.originalname.match(/\.(xmi|xml)$/i)) {
            throw new Error('Le fichier doit être un XMI ou un XML.');
        }

        // Convertit le contenu du fichier en JSON en ne récupérant que les balises "packagedElement"
        xml2js.parseString(req.file.buffer, { explicitArray: false }, (err, result) => {
            if (err) {
                throw new Error('Erreur lors de la conversion du fichier XMI/XML en JSON.');
            }
            const packagedElements = result.packagedElement;
            res.json(packagedElements);
        });
    } catch (error) {
        console.error('Erreur lors de la conversion du fichier XMI/XML en JSON :', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
