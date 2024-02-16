const parseString = require('xml2js').parseString;
const fs = require('fs');

const convert = async (file, callback) => {
    try{
        const fileContent = fs.readFileSync(file.path, 'utf-8');
        parseString(fileContent, (xmlErr, result) => {
            if (xmlErr) {
                callback(xmlErr, null); // Retourner une erreur si la conversion a échoué
            } else {
                // Filtrer et convertir seulement les balises "packagedElement"
                const packagedElements = result['xmi:XMI']['uml:Model'][0]?.packagedElement || result['uml:Model']?.packagedElement;
                const jsonFile = JSON.stringify({ packagedElement: packagedElements }, null, 2);
                callback(null, jsonFile); // Retourner le fichier JSON converti
            }
        });
    } catch (error){
        console.error('Error during the convertion', error);
        callback(null, error);
    }
};

module.exports = { convert };