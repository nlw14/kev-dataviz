# KEV Dataviz

Interface de visualisation du catalogue **Known Exploited Vulnerabilities (KEV)** de la CISA, la liste officielle des vulnérabilités dont l'exploitation active est avérée.

L'application fonctionne entièrement côté client, sans backend : les données sont embarquées dans le projet sous forme d'un fichier JSON.

## Fonctionnalités

- Top des éditeurs, avec la part de vulnérabilités utilisées par des ransomwares
- Évolution des ajouts au catalogue par mois, avec date de début réglable
- Taille cumulée du catalogue au fil du temps
- Part globale des vulnérabilités liées à des ransomwares, et son évolution annuelle
- Types de faiblesses (CWE) et produits les plus fréquents
- Répartition des délais de correction imposés
- Profil des éditeurs (volume / part de ransomware) en nuage de points
- Thème clair / sombre, mémorisé dans le navigateur

## Stack

- [React](https://react.dev) + [Vite](https://vite.dev)
- [Recharts](https://recharts.github.io) pour les graphiques

## Prérequis

- [Node.js](https://nodejs.org) 20 ou plus récent
- npm (installé avec Node.js)

Vérifier les versions installées :

```bash
node -v
npm -v
```

## Installation

```bash
git clone https://github.com/<pseudo>/kev-dataviz.git
cd kev-dataviz
npm install
```

## Lancement

```bash
npm run dev
```

Ouvrir ensuite l'adresse affichée dans le terminal (par défaut http://localhost:5173).

## Autres commandes

| Commande | Rôle |
|---|---|
| `npm run build` | Génère la version de production dans `dist/` |
| `npm run preview` | Sert localement la version de production pour la tester |
| `npm run lint` | Analyse le code avec ESLint |

## Mettre à jour les données

Le projet utilise une copie figée du catalogue. Pour la mettre à jour, télécharger la dernière version du fichier JSON publié par la CISA :

https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json

puis remplacer le fichier `src/data/kev.json` par celui-ci. La version et la date du catalogue utilisé sont affichées en haut de l'interface.

## Structure du projet

```
src/
├── components/   Composants d'affichage (un par graphique, plus ChartCard)
├── data/         Données du catalogue KEV (kev.json)
├── hooks/        Hooks personnalisés (useTheme)
├── utils/        Transformations des données (stats.js)
├── App.jsx       Assemblage de la page et gestion des filtres
└── main.jsx      Point d'entrée
```

Les transformations de données (`utils/stats.js`) sont séparées des composants d'affichage : chaque fonction prend la liste des vulnérabilités et renvoie un tableau directement exploitable par Recharts.

## Limites des données

- **Import initial** : les premiers mois du catalogue (fin 2021 – 2022) correspondent à l'intégration de vulnérabilités anciennes et ne reflètent pas le rythme normal des ajouts.
- **Biais de récence** : le lien avec une campagne de ransomware peut être établi longtemps après l'ajout d'une vulnérabilité. La part de ransomware des périodes récentes est donc probablement sous-estimée.
- **Année en cours** : elle est incomplète, ce qui réduit mécaniquement son volume d'ajouts.

## Source des données

[Catalogue Known Exploited Vulnerabilities](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) – Cybersecurity and Infrastructure Security Agency (CISA).