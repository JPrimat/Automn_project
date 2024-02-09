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