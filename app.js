const express = require('express');
const multer = require('multer');
const fs = require('fs');
const dbService = require('./dbService');
const conversionService = require('./conversionService');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware pour traiter les fichiers envoyés via POST
app.use('/upload', upload.single('file'), async (req, res) => {
    try {
        if(!req.file) {
            throw new Error('No file uploaded.');
        }
        if (req.file.originalname.endsWith('.json')) {
            const fileContent = fs.readFileSync(req.file.path, 'utf-8');
            // Stocke le fichier dans la base de données
            const fileId = await dbService.saveFile(req.file.originalname, fileContent);
            // Supprime le fichier temporaire
            fs.unlinkSync(req.file.path);
            res.json({ message: 'Fichier téléchargé avec succès.', fileId: fileId, fileName: file.originalname });
        } else if (req.file.originalname.endsWith('.xml') || req.file.originalname.endsWith('.xmi')) { 
            conversionService.convert(req.file, async (err, result) => {
                if (err) {
                    res.status(400).json({ error: err.message, errorCallback: result });
                } else {
                    const fileId = await dbService.saveFile(req.file.originalname, result);
                    res.json({message : 'Fichier téléchargé avec succès.', fileId: fileId, fileName: req.file.originalname});
                }
            });
        } else {
            // Si ce n'est ni un JSON ni un XML/XMI, retourne une erreur
            res.status(400).json({ error: 'Format de fichier non pris en charge.' });
        }
    } catch (error) {
        console.error('File processing error : ', error);
        res.status(500).json({error : error.message});
    }
});

// Endpoint GET pour récupérer les données d'un fichier
app.get('/files/:fileId', async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const fileData = await dbService.getFile(fileId);
        res.json(fileData);
    } catch (error) {
        console.error('Erreur lors de la récupération du fichier :', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint GET pour récupérer tous les fichiers
app.get('/files', async (req, res) => {
    try{
        const filesData = await dbService.getAllFiles();
        res.json(filesData);
    } catch (error) {
        console.error('Erreur lors de la récupération des fichiers :', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint PUT pour mettre à jour les données d'un fichier
app.put('/files/:fileId', async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const newData = req.body;

        await dbService.updateFile(fileId, newData);
        res.json({ message: 'Données mises à jour avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du fichier :', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint DELETE pour supprimer un fichier
app.delete('/files/:fileId', async (req, res) => {
    try {
        const fileId = req.params.fileId;
        await dbService.deleteFile(fileId);
        res.json({ message: 'Fichier supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du fichier :', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
