// dbService.js - Microservice pour la gestion de la base de données avec MongoDB

const mongoose = require('mongoose');

// Connexion à la base de données MongoDB
const dbConnect = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/fileDobotStorage', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connection established with the database.')
    }catch(error) {
        console.error(`Connection error: ${error.stack}`);
    }
}

dbConnect().catch(error => console.error(error));

// Définition du schéma pour les fichiers
const fileSchema = new mongoose.Schema({
    name: String,
    content: String,
    extension: String,
    date: String
});

// Création du modèle basé sur le schéma
const File = mongoose.model('File', fileSchema);

// Fonction pour sauvegarder un fichier dans la base de données
const saveFile = async (fileName, fileContent, extension, datetime) => {
    try {
        const newFile = new File({ name: fileName, content: fileContent, extension: extension, date: datetime });
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

// Fonction pour récupérer tous les fichier de la base de données
const getAllFiles = async () => {
    try{
        const files = await File.find();
        return files;
    } catch (error) {
        throw new Error('Erreur lors de la récupération des fichiers depuis la base de données.');
    }
}

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

module.exports = { saveFile, getFile, getAllFiles, updateFile, deleteFile };
