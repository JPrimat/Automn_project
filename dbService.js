// dbService.js - Microservice pour la gestion de la base de données avec MongoDB

const mongoose = require('mongoose');

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/filesDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Définition du schéma pour les fichiers
const fileSchema = new mongoose.Schema({
    name: String,
    content: String
});

// Création du modèle basé sur le schéma
const File = mongoose.model('File', fileSchema);

// Fonction pour sauvegarder un fichier dans la base de données
const saveFile = async (fileName, fileContent) => {
    try {
        const newFile = new File({ name: fileName, content: fileContent });
        const savedFile = await newFile.save();
        return savedFile._id;
    } catch (error) {
        throw new Error('Erreur lors de la sauvegarde du fichier dans la base de données.');
    }
};

// Fonction pour récupérer un fichier de la base de données par son ID
const getFile = async (fileId) => {
    try {
        const file = await File.findById(fileId);
        return file;
    } catch (error) {
        throw new Error('Erreur lors de la récupération du fichier depuis la base de données.');
    }
};

// Fonction pour mettre à jour un fichier dans la base de données
const updateFile = async (fileId, newData) => {
    try {
        await File.findByIdAndUpdate(fileId, { $set: newData });
    } catch (error) {
        throw new Error('Erreur lors de la mise à jour du fichier dans la base de données.');
    }
};

// Fonction pour supprimer un fichier de la base de données
const deleteFile = async (fileId) => {
    try {
        await File.findByIdAndDelete(fileId);
    } catch (error) {
        throw new Error('Erreur lors de la suppression du fichier depuis la base de données.');
    }
};

module.exports = { saveFile, getFile, updateFile, deleteFile };
