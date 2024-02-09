const express = require('express');
const multer = require('multer');
const xml2js = require('xml2js');

const router = express.Router();
const upload = multer();

let packagedElementData = null;

// POST endpoint to receive XML/XMI file
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Aucun fichier n\'a été téléchargé.');
    }

    const xmlString = req.file.buffer.toString('utf-8');
    
    // Function to extract "packagedElement" from XML/XMI file
    function extractPackagedElements(xmlString) {
        const parser = new xml2js.Parser();
        parser.parseString(xmlString, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'extraction des éléments :', err);
                return;
            }
            
            const packagedElements = result.packagedElement;
            if (packagedElements) {
                packagedElementData = packagedElements;
                console.log('Données "packagedElement" extraites avec succès.');
            } else {
                console.log('Aucun élément "packagedElement" trouvé dans le fichier XML/XMI.');
            }
        });
    }

    // Call the function to extract "packagedElement" from the XML/XMI file
    extractPackagedElements(xmlString);
    
    res.send('Le fichier a été traité avec succès.');
});

// Function to get data
router.getData = async function () {
    // Check if packagedElementData has been populated
    if (!packagedElementData) {
        throw new Error('Aucune donnée "packagedElement" n\'a été trouvée.');
    }
    
    // Constructing the response with the packagedElementData
    const data = {
        message: 'Données récupérées depuis le microservice !',
        packagedElementData: packagedElementData
    };
    
    return data;
}

module.exports = router;
