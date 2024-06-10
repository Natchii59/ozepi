# Ozepi

Ce projet est une monorepo qui regroupe l'ensemble des projets Ozepi.

## Sommaire

1. [Installation](#installation)
2. [Structure](#structure)

## Installation

Pour exécuter ce projet, vous devez avoir la version LTS de Node.js (20.14.0) installé. Nous vous recommandons d'utiliser [NVM](https://github.com/nvm-sh/nvm) pour gérer vos versions de Node.js.

Vous devez également avoir [PNPM](https://pnpm.io/) installé pour gérer les dépendances.

```bash
# Installer Node.js LTS avec NVM
$ nvm install 20.14.0 # ou lts

# Utiliser Node.js LTS avec NVM
$ nvm use 20.14.0 # ou lts

# Installer les dépendances
$ pnpm install
```

## Structure

Ce projet est une monorepo géré par [Turborepo](https://turbo.build/repo) et via les workspaces **pnpm**.

Les projets sont organisés de la manière suivante :

- `packages/`: contient l'ensemble des packages qui peuvent être utilisés dans les applications.
- `apps/`: contient l'ensemble des applications (API, Frontend, etc.).

Turbo met à disposition des scripts qui les exécutent dans les différents packages et applications.

Les commandes sont configurables dans le fichier `turbo.json`, et elles seront exécutable via les commandes **pnpm**.

```bash
# Exemple d'exécution d'une commande
$ pnpm lint
```

Cela va exécuter la commande `lint` dans l'ensemble des packages et applications.
