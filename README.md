# Divia API

Version 2 de l'API Divia.

Puisque [l'ancienne API de Keolis](http://timeo3.keolis.com/relais/217.php) n'est plus disponible, celle-ci utilise l'API du [site de Divia](https://www.divia.fr/bus-tram) qui renvoie un extrait de page HTML dans lequel se trouve les horaires des prochains passages.

## Utilisation

Exemple :
```js
const DiviaAPI = require('divia-api');
const api = new DiviaAPI();

(async () => {
    // Charge les données de Divia (https://bo-api.divia.fr/api/reseau/type/json) dans api.reseau :
    await api.init();

    // Récupère la ligne :
    const line = api.findLine('T1', 'A');
    // ou :
    const line = api.getLine('82');

    // Récupère l'arrêt :
    const stop = line.findStop('Grésilles');
    // ou :
    const stop = line.getStop('1555');
    // ou directement :
    const stop = api.findStop('T1', 'Grésilles', 'A');

    // Récupère les prochains passages :
    console.log(await stop.totem());
})();
```

Chaque ligne possède deux directions : `A` et `R`. `A` est utilisé par défaut dans l'API.

Pour chaque Line ou Stop, vous pouvez récupérer les données fournies par Divia via la propriété `data`.

## Fonctionnement

L'API récupère dans un premier temps les données du réseau Divia à cette adresse : https://bo-api.divia.fr/api/reseau/type/json (méthode `api#init`) afin de pouvoir récupérer les identifiants et informations des lignes et arrêts. Vous pouvez donc si vous le souhaitez mettre en cache la variable JSON `api.reseau` afin d'éviter de refaire la requête à chaque démarrage de votre application.

Pour récupérer les prochains passages Totem, il faut faire une requête HTTP POST à cette adresse : https://www.divia.fr/bus-tram?type=479, avec le contenu application/x-www-form-urlencoded suivant :
 - `requete=arret_prochainpassage`
 - `requete_val[id_ligne]=<id_ligne>`
 - `requete_val[id_arret]=<id_arrêt>`
Note : bien penser à encoder les crochets avec URL encode (par exemple : `requete_val%5Bid_ligne%5D`).

## Licence

Licence MIT

Copyright (c) 2021 gauthier-th (mail@gauthier-th.fr)