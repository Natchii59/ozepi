# API (Backend)

Ce projet est une application backend qui utilise NestJS, GraphQL et Prisma.

## Sommaire

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Exécution de l'application](#exécution-de-lapplication)
4. [Compilation de l'application](#compilation-de-lapplication)
5. [Structure](#structure)
6. [Linter](#linter)
7. [Base de données](#base-de-données)
8. [Contact](#contact)

## Installation

Pour exécuter ce projet, vous devez avoir la version LTS de Node.js (20.14.0) installé.
Pour l'installation c'est la même qui est précisé dans le README du projet.

```bash
# Installer Node.js LTS avec NVM
$ nvm install 20.14.0 # ou lts

# Utiliser Node.js LTS avec NVM
$ nvm use 20.14.0 # ou lts

# Installer les dépendances
$ pnpm install # à exécuter à la racine du projet
```

## Configuration

Copier le fichier `.env.example` et le renommer en `.env`, et remplir les valeurs des variables d'environnement.

```bash
# Copier le fichier .env.example
$ cp .env.example .env
```

## Exécution de l'application

```bash
# Pour exécuter l'application en mode développement:
$ pnpm dev

# Pour exécuter l'application en mode debug:
$ pnpm --filter api run start:debug
```

## Compilation de l'application

```bash
# Pour compiler l'application:
$ pnpm build

# Pour exécuter l'application en mode production:
$ pnpm --filter api run start:prod
```

## Structure

Dans la structure du projet, vous trouverez les dossiers suivants :

- `src` : Contient le code source de l'application.
- `dist` : Contient le code compilé de l'application.
- `types` : Contient les types de l'application.
- `prisma` : Contient la configuration et les migrations de Prisma.

Dans le dossier src, vous trouverez les dossiers et fichiers suivants :

- `graphql` : Contient le schéma GraphQL.
- `common` : Contient les éléments communs à l'application.
- `app.module.ts` : Contient la configuration de l'application.
- `main.ts` : Contient le point d'entrée de l'application.
  et d'autres dossiers qui sont les modules de l'application.

Dans chaque module, vous trouverez les dossiers et fichiers suivants :

- `dto` : Contient les objets de transfert de données du module.
- `entities` : Contient les entités du module.
- `guards` : Contient les gardes du module.
- `strategies` : Contient les stratégies d'authentification du module.
- `fields` : Contient les resolve fields du module.
- `xxx.module.ts` : Contient la configuration du module.
- `xxx.resolver.ts` : Contient les résolveurs (GraphQL) du module.
- `xxx.service.ts` : Contient les services du module.

## Linter

Le linter ESLint est configuré pour ce projet. Vous pouvez trouver la configuration dans le fichier `.eslintrc.js`.
Elle est importé du package local `@repo/eslint-config`.

```bash
# Pour exécuter le linter:
$ pnpm lint
```

La vérification du format du code est également exécutée avant de valider les modifications avec les hooks git (`pre-commit`).

## Base de données

La base de données utilisée pour ce projet est PostgreSQL. Vous pouvez trouver la configuration dans le fichier `.env`.

```bash
# Exemple de configuration de la base de données:
DATABASE_URL="postgresql://username:password@localhost:5432/database"
```

Ce projet utilise Prisma pour la gestion de la base de données. Vous pouvez trouver la configuration dans le dossier `prisma`.

```bash
# Pour générer les migrations:
$ pnpm --filter api exec prisma migrate dev

# Pour générer les types Prisma:
$ pnpm --filter api exec prisma generate

# Pour réinitialiser la base de données:
$ pnpm --filter api exec prisma migrate reset

# Pour ouvrir le studio Prisma:
$ pnpm --filter api exec prisma studio
```

Vérifier que vos migrations sont à jour après avoir récupérer du code depuis la branche `master`.

```bash
# Pour vérifier que vos migrations sont à jour:
$ pnpm --filter api exec prisma migrate status
```

La commande pour réinitialiser la base de données est à utiliser avec précaution, car elle supprimera toutes les données de la base de données.

Elle est utile si vous avez besoin de réinitialiser votre base de données en local, mais jamais en production.

Si vous voulez rajouter un champ sur un model existant, veillez à bien le mettre en `nullable` pour éviter les erreurs lors de la migration. Sinon, cela va réinitialiser la base de données lors de la migration.

## Contact

Si vous avez des questions à propos du projet, n'hésitez pas à contacter Nathan.
