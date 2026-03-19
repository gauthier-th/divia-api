# Divia API v3

API JavaScript/TypeScript non officielle pour accéder aux données temps réel du réseau de transport Divia (Dijon Métropole) : lignes, arrêts et horaires.

## Installation

```bash
npm install divia-api
```

## Importation

- Avec ESM :
    ```js
    import { listLines, listStops, getSchedules } from 'divia-api';
    ```
- Avec CommonJS :
    ```js
    const { listLines, listStops, getSchedules } = require('divia-api');
    ```

## Utilisation

```js
import { listLines, listStops, getSchedules } from 'divia-api';

// Récupère toutes les lignes de tramway (ou "bus") :
const lines = await listLines('tramway');
console.log(lines);

// Récupère les arrêts d'une ligne :
const stops = await listStops(lines[0].id);
console.log(stops);

// Récupère les prochains horaires pour une ligne et un arrêt :
const schedules = await getSchedules(lines[0].id, stops[0].id);
console.log(schedules);
```

## API

### `listLines(mode: 'bus' | 'tramway'): Promise<LineObject[]>`

Récupère la liste des lignes pour un mode de transport donné.

### `listStops(lineId: string): Promise<StopAreaObject[]>`

Récupère la liste des arrêts pour une ligne donnée.

### `getSchedules(lineId: string, stopAreaId: string): Promise<ScheduleObject[]>`

Récupère les prochains horaires en temps réel pour une ligne et un arrêt donnés.

## Types

### `LineObject`

| Propriété      | Type            | Description               |
|----------------|-----------------|---------------------------|
| `id`           | `string`        | Identifiant de la ligne   |
| `name`         | `string`        | Nom de la ligne           |
| `code`         | `string`        | Code court de la ligne    |
| `color`        | `string`        | Couleur de la ligne (hex) |
| `text_color`   | `string`        | Couleur du texte (hex)    |
| `codes`        | `array`         | Codes associés            |
| `routes`       | `RouteObject[]` | Itinéraires de la ligne   |
| `opening_time` | `Date`          | Heure d'ouverture         |
| `closing_time` | `Date`          | Heure de fermeture        |

### `StopAreaObject`

| Propriété  | Type     | Description                    |
|------------|----------|--------------------------------|
| `id`       | `string` | Identifiant de la zone d'arrêt |
| `name`     | `string` | Nom de l'arrêt                 |
| `codes`    | `array`  | Codes associés                 |
| `timezone` | `string` | Fuseau horaire                 |
| `label`    | `string` | Libellé de l'arrêt             |
| `coord`    | `object` | Coordonnées (`lon`, `lat`)     |

### `ScheduleObject`

| Propriété              | Type               | Description                |
|------------------------|--------------------|----------------------------|
| `stop_point`           | `StopPointObject`  | Point d'arrêt associé      |
| `route`                | `RouteObject`      | Itinéraire associé         |
| `display_informations` | `object`           | Informations d'affichage   |
| `date_times`           | `DateTimeObject[]` | Horaires associés          |
| `links`                | `object[]`         | Liens associés             |
| `first_datetime`       | `DateTimeObject`   | Premier horaire disponible |
| `last_datetime`        | `DateTimeObject`   | Dernier horaire disponible |

## Fonctionnement

L'API utilise l'infrastructure Navitia via un proxy presigné (`nws-main.hove.io`). L'authentification est gérée automatiquement via un token chiffré AES-GCM dérivé par PBKDF2. Aucune clé API n'est nécessaire côté utilisateur.

Les données temps réel sont récupérées via les endpoints `terminus_schedules` de l'API Navitia pour la couverture `fr-ne-dijon`.

## Licence

Licence MIT

Copyright (c) 2026 gauthier-th (mail@gauthier-th.fr)