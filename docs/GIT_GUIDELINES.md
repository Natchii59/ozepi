# Guidelines Git

Ce document décrit les conventions Git à suivre pour Ozepi.

## Nommage des Commits

Utilisez des messages de commit clairs et descriptifs. Format recommandé :

```
type(scope): Sujet du commit

Description détaillée si nécessaire.
```

Types de commit :

- **feat** : ajout d'une nouvelle fonctionnalité.
- **fix** : correction de bug.
- **docs** : modifications de la documentation.
- **style** : modifications de style (formatage, etc.).
- **refactor** : refactorisation de code.
- **test** : ajout ou modification de tests.
- **chore** : autres tâches (mises à jour des dépendances, etc.).

Le scope est optionnel et peut être utilisé pour préciser la portée du commit.
Vous pouvez mettre dans le scope l'id d'une issue, d'une PR par exemple, ou du workspace concerné.

Exemple :

```
feat(#1): Add authentication and authorization
```

## Nommage des Branches

Utilisez des noms de branches descriptifs et structurés :

- `feature/nom-fonctionnalité`
- `fix/nom-correctif`
- `hotfix/nom-correctif-urgent`

Les types de branches recommandés sont les mêmes que pour les commits.

## Configuration Git

Pour éviter des commits inutiles, ou des conflits, configurez votre git avec les options suivantes :

```bash
[push]
  default = simple
[merge]
  ff = true
  commit = false
[pull]
  ff = only
  commit = false
```

Le fichier de configuration se trouve dans `~/.gitconfig`.

Si vous ne souhaitez pas modifier votre configuration globale, libre à vous.
Cependant, vous pouvez quand même appliquer ces options à chaque commande git :

```bash
git pull --ff-only
git merge --ff-only
```

## Maintenance

Avant toutes actions de type merge ou Pull Request, assurez-vous d'être à jour avec la branche `dev` :

```bash
# Récupérez les dernières modifications de la branche dev
git checkout dev
git pull

# Puis retournez sur votre branche
git checkout votre-branche
git rebase dev
```

Sur votre branche, pour garder une arboréscence de commits propre, n'hésitez à faire des rebase interactifs pour fusionner des commits ou modifier des messages de commit.

```bash
# Rebase interactif sur les 3 derniers commits
git rebase -i HEAD~3
```

## Résolution de Conflits

En cas de conflits lors d'un rebase ou d'un merge, résolvez-les via un outil de résolution de conflits (ex: Visual Studio Code).

Documentez-vous sur le commit que vous êtes en train de résoudre, pour ne pas perdre des modifications importantes.

Si vous avez des difficultés, n'hésitez pas à demander de l'aide à un collègue.

## Contact

Pour toute question, n'hésitez pas à contacter Nathan.
