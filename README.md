# Ozepi

Ce projet est une monorepo qui regroupe l'ensemble des projets Ozepi.

## Sommaire

1. [Installation](#installation)
2. [Structure](#structure)
3. [Formatter](#formatter)
4. [Hooks](#hooks)

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

Si vous souhaitez exécuter une commande dans un package ou une application spécifique, vous pouvez le faire en filtrant le nom du package ou de l'application.

```bash
# Exemple d'exécution d'une commande dans une application spécifique
$ pnpm --filter api exec prisma ...
```

Cela va donc exécuter la commande `prisma` dans l'application `api`.
Il va chercher le package ou l'application qui contient le mot `api` dans son nom.

Si vous souhaitez installer un package à la racine du projet, vous pouvez le faire en utilisant la commande `pnpm add <package> -w`.

```bash
# Exemple d'installation d'un package à la racine du projet
$ pnpm add typescript -w
```

## Formatter

Le formateur Prettier est configuré pour ce projet. Vous pouvez trouver la configuration dans le fichier à la racine du projet `.prettierrc.json`.

```bash
# Pour formater le code:
$ pnpm format

# Pour vérifier le format du code:
$ pnpm format:check
```

## Hooks

Les hooks git sont configurés avec Husky. Vous pouvez trouver la configuration dans le dossier `.husky`.

- `pre-commit` : Vérifie le format du code avec Prettier.
- `commit-msg` : Valide le message de commit avec Commitlint.
