# Divia API

Version 2 de l'API Divia.

Puisque [l'ancienne API de Keolis](http://timeo3.keolis.com/relais/217.php) n'est plus disponible, j'ai décompilé puis récupéré dans le code source de l'application Android les différentes méthodes pour accéder aux prochains passages Totem.

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
    console.log(await stop.totem('username', 'password'));
})();
```

Chaque ligne possède deux directions : `A` et `R`. `A` est utilisé par défaut dans l'API.

Pour chaque Line ou Stop, vous pouvez récupérer les données fournies par Divia via la propriété `data`.

## Fonctionnement

L'API récupère dans un premier temps les données du réseau Divia à cette adresse : https://bo-api.divia.fr/api/reseau/type/json (méthode `api#init`) afin de pouvoir récupérer les identifiants et informations des lignes et arrêts. Vous pouvez donc si vous le souhaitez mettre en cache la variable JSON `api.reseau` afin d'éviter de refaire la requête à chaque démarrage de votre application.

Pour récupérer les prochains passages Totem, il faut faire une requête HTTP GET à cette adresse : https://tim.divia.fr/api/get/totem, avec les [query params](https://en.wikipedia.org/wiki/Query_string) suivants :
 - `source_type=bo_divia_utilisateur`
 - `source_uuid=<uuid>`
 - `source_id=`
 - `ligne=<id_ligne>`
 - `arret=<id_arrêt>`
 - `token=<access_token>`
avec :
 - `uuid` : un UUID v4 généré aléatoirement
 - `id_ligne` : identifiant de la ligne
 - `id_arrêt` : identifiant de la l'arrêt
 - `access_token` : [jeton d'accès JWT](https://jwt.io/) généré comme ci-dessous

Pour générer le jeton d'accès JWT, il faut faire une requête HTTP POST à cette adresse : https://tim.divia.fr/api/login_check, avec les entêtes HTTP suivant :
 - `Accept: application/json`
 - `Content-Type: application/x-www-form-urlencoded`
Et avec le body suivant : `_username=<username>&_password=<password>`

## Licence

Licence MIT

Copyright (c) 2021 gauthier-th (mail@gauthier-th.fr)