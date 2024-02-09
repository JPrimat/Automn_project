const express = require('express');
const multer = require('multer');
const fs = require('fs');
const dbService = require('./dbService');
const conversionService = require('./xmlService');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware pour traiter les fichiers envoyés via POST
app.use('/upload', upload.single('file'), async (req, res, next) => {
    try {
        // Vérifie si un fichier a été envoyé
        if (!req.file) {
            throw new Error('Aucun fichier n\'a été téléchargé.');
        }

        // Lit le contenu du fichier
        const fileContent = fs.readFileSync(req.file.path, 'utf-8');

        // Stocke le fichier dans la base de données
        const fileId = await dbService.saveFile(req.file.originalname, fileContent);

        // Supprime le fichier temporaire
        fs.unlinkSync(req.file.path);

        res.json({ message: 'Fichier téléchargé avec succès.', fileId: fileId });
    } catch (error) {
        console.error('Erreur lors du traitement du fichier :', error);
        res.status(500).json({ error: error.message });
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

// Middleware pour la conversion des fichiers XMI/XML en JSON
app.use('/convert', conversionService);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
