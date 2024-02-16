# README

## Node.js Server (`server.js`)

Le fichier `server.js` contient un serveur API simple écrit en Node.js. Voici un aperçu du code et de son fonctionnement :

1. Le serveur utilise le framework Express.js pour simplifier la création de routes API.
2. Il utilise également le module `body-parser` pour analyser les données JSON des requêtes entrantes.
3. Deux endpoints sont définis :
   - `GET /api/data` : Pour récupérer les données à partir d'un fichier JSON.
   - `PUT /api/data` : Pour mettre à jour les données dans le fichier JSON.
4. Lorsqu'un client effectue une requête GET sur `/api/data`, le serveur lit les données à partir d'un fichier `data.json` et les renvoie sous forme de réponse JSON.
5. Lorsqu'un client effectue une requête PUT sur `/api/data` avec des données JSON, le serveur lit d'abord les données existantes à partir du fichier `data.json`, les met à jour avec les nouvelles données fournies par le client, puis écrit les données mises à jour dans le fichier `data.json`.

## C++ Code (`main.cpp`)

Le fichier `main.cpp` contient un exemple de code en C++ utilisant la bibliothèque cURL pour effectuer des requêtes HTTP GET et PUT vers le serveur Node.js. Voici un aperçu du code et de son fonctionnement :

1. Le code commence par initialiser cURL en appelant `curl_global_init()`.
2. Ensuite, il utilise cURL pour effectuer une requête GET vers l'endpoint `/api/data` du serveur Node.js en utilisant `curl_easy_init()` et `curl_easy_setopt()`.
3. Lorsque la réponse est reçue, elle est traitée dans la fonction de rappel `WriteCallback()`, qui enregistre la réponse dans une chaîne de caractères.
4. Ensuite, la réponse JSON est analysée à l'aide de la bibliothèque `nlohmann/json` pour extraire les données pertinentes et les afficher.
5. Ensuite, le code effectue une requête PUT vers le même endpoint avec des données JSON pré-définies pour simuler une mise à jour de données sur le serveur.
6. Enfin, le programme nettoie et libère les ressources cURL en appelant `curl_easy_cleanup()` et `curl_global_cleanup()`.

## Testing the GET Endpoint

Vous pouvez tester le GET endpoint de l'API de plusieurs manières :

1. **Navigateur web** : Entrez l'URL de votre API GET endpoint dans la barre d'adresse de votre navigateur.
2. **Postman** : Créez une nouvelle requête GET dans Postman et spécifiez l'URL de votre endpoint GET.
3. **cURL** : Utilisez la commande cURL en ligne de commande pour envoyer une requête GET à votre endpoint.
4. **Code JavaScript** : Utilisez axios ou fetch pour écrire un script JavaScript qui effectue une requête GET à votre endpoint.

Choisissez la méthode qui vous convient le mieux en fonction de vos préférences et de vos besoins.



1. N'oubliez pas la commande "npm init -y" (si vous n'avez pas de package.json) et "node app.js"

## axios
```ruby
const axios = require('axios');

axios.get('http://localhost:3000/api/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

## fetch
```ruby
fetch('http://localhost:3000/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

node .\dbService.js

Service de Conversion
Le fichier conversionService.js fournit un service permettant de convertir des fichiers XML/XMI en format JSON. Il est principalement utilisé dans le contexte d'une API Node.js pour convertir les fichiers téléchargés avant de les stocker ou de les manipuler ultérieurement.

Fonctionnalités
Conversion de Fichiers : Le service utilise le module xml2js pour convertir les fichiers XML/XMI en objets JavaScript.
Filtrage : Seules les balises <packagedElement> sont extraites du fichier XML/XMI.
Gestion d'Erreurs : Le service gère les erreurs de conversion et retourne une erreur en cas de problème.
Utilisation Simple : Il expose une fonction convert qui prend en charge la conversion et le retour du résultat via un callback.

const conversionService = require('./conversionService');

conversionService.convert(file, (err, result) => {
    if (err) {
        console.error('Erreur lors de la conversion :', err);
    } else {
        console.log('Conversion réussie ! Résultat en JSON :\n', result);
    }
});

Ce service facilite grandement le processus de conversion des fichiers XML/XMI en format JSON, ce qui est particulièrement utile dans les applications nécessitant cette transformation pour le stockage ou le traitement des données.




Voici une partie du fichier README.md expliquant l'utilisation de l'API CRUD en relation avec dbService (mongoose) et conversionService.js :

API CRUD
L'API CRUD fournit des endpoints pour la création, la lecture, la mise à jour et la suppression de fichiers dans une base de données MongoDB. Elle prend également en charge la conversion des fichiers XML/XMI en format JSON avant de les stocker.

Endpoints
POST /upload : Endpoint pour télécharger un fichier. Si le fichier est au format JSON, il est directement sauvegardé dans la base de données. Si le fichier est au format XML/XMI, il est d'abord converti en JSON en ne gardant que les balises <packagedElement>, puis sauvegardé dans la base de données.

GET /files/:fileId : Endpoint pour récupérer les données d'un fichier spécifique à partir de son identifiant.

GET /files : Endpoint pour récupérer tous les fichiers stockés dans la base de données.

PUT /files/:fileId : Endpoint pour mettre à jour les données d'un fichier existant.

DELETE /files/:fileId : Endpoint pour supprimer un fichier de la base de données.

Utilisation
Téléchargement d'un fichier :

Pour télécharger un fichier, envoyez une requête POST à l'endpoint /upload avec le fichier en tant que payload. L'API détecte automatiquement le format du fichier et le traite en conséquence.

Récupération des données :

Pour récupérer les données d'un fichier spécifique, envoyez une requête GET à l'endpoint /files/:fileId en remplaçant :fileId par l'identifiant du fichier.

Mise à jour des données :

Pour mettre à jour les données d'un fichier existant, envoyez une requête PUT à l'endpoint /files/:fileId avec les nouvelles données en tant que payload.

Suppression d'un fichier :

Pour supprimer un fichier de la base de données, envoyez une requête DELETE à l'endpoint /files/:fileId en remplaçant :fileId par l'identifiant du fichier à supprimer.

Exemple d'utilisation


# Téléchargement d'un fichier JSON
curl -X POST -F "file=@example.json" http://localhost:3000/upload

# Téléchargement d'un fichier XML/XMI
curl -X POST -F "file=@example.xml" http://localhost:3000/upload

# Récupération des données d'un fichier spécifique
curl http://localhost:3000/files/123456789

# Mise à jour des données d'un fichier
curl -X PUT -H "Content-Type: application/json" -d '{"newData": "updated data"}' http://localhost:3000/files/123456789

# Suppression d'un fichier
curl -X DELETE http://localhost:3000/files/123456789


dbService.js - Microservice pour la gestion de la base de données avec MongoDB
Ce microservice fournit des fonctions pour interagir avec une base de données MongoDB, notamment pour sauvegarder, récupérer, mettre à jour et supprimer des fichiers.

Connexion à la base de données
La fonction dbConnect établit une connexion à la base de données MongoDB.

Schéma des fichiers
Le schéma des fichiers est défini avec deux champs : name pour le nom du fichier et content pour son contenu.

Fonctions disponibles
saveFile(fileName, fileContent) : Cette fonction permet de sauvegarder un fichier dans la base de données. Elle prend en paramètres le nom du fichier (fileName) et son contenu (fileContent). Elle retourne l'identifiant unique du fichier sauvegardé.

getFile(fileId) : Cette fonction permet de récupérer un fichier de la base de données à partir de son identifiant (fileId). Elle retourne les données du fichier correspondant.

getAllFiles() : Cette fonction permet de récupérer tous les fichiers stockés dans la base de données. Elle retourne un tableau contenant tous les fichiers.

updateFile(fileId, newData) : Cette fonction permet de mettre à jour les données d'un fichier dans la base de données. Elle prend en paramètres l'identifiant du fichier à mettre à jour (fileId) et les nouvelles données (newData) à remplacer. Elle effectue la mise à jour dans la base de données.

deleteFile(fileId) : Cette fonction permet de supprimer un fichier de la base de données à partir de son identifiant (fileId).

Ces fonctions fournissent un ensemble complet de fonctionnalités pour la gestion des fichiers dans la base de données MongoDB.
// Exemple d'utilisation de saveFile
const fileId = await saveFile('example.json', '{"key": "value"}');

// Exemple d'utilisation de getFile
const fileData = await getFile(fileId);

// Exemple d'utilisation de getAllFiles
const allFiles = await getAllFiles();

// Exemple d'utilisation de updateFile
await updateFile(fileId, { "key": "updated value" });

// Exemple d'utilisation de deleteFile
await deleteFile(fileId);
