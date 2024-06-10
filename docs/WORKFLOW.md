# Worklow

Ce document décrit le workflow utilisé pour Ozepi.

## Sommaire

- [À savoir](#à-savoir)
  - [Langues](#langues)
  - [Issues](#issues)
  - [Projet](#projet)
- [Processus d'issue](#processus-dissue)
  - [Création d'une issue](#création-dune-issue)
  - [Blocage d'une issue](#blocage-dune-issue)
  - [Arrêt d'une issue](#arrêt-dune-issue)
  - [Issue prête](#issue-prête)
- [Processus de développement](#processus-de-développement)
  - [Mise à jour de l'issue](#mise-à-jour-de-lissue)
  - [Création d'une branche](#création-dune-branche)
  - [Commits](#commits)
  - [Mise en pause](#mise-en-pause)
- [Pull Requests](#pull-requests)
  - [Création d'une PR](#création-dune-pr)
  - [Revue de code](#revue-de-code)
  - [Merge d'une PR](#merge-dune-pr)
- [Règles des branches](#règles-des-branches)
- [Mise en production](#mise-en-production)

## À savoir

Avant de lire le reste du document, voici quelques informations importantes qui vous aideront à comprendre le workflow.

### Langues

Pour que tout le monde puisse comprendre, les documentations, les issues, les Pull Requests, etc seront en français.

Il y aura juste les commits et les branches qui seront en anglais.

### Issues

Les issues sont les tâches à réaliser. Elles sont créées par les membres de l'équipe et peuvent être assignées à une personne.

C'est ici que vous retrouverez toutes les informations concernant une tâche.

### Projet

Le projet est le tableau de bord de l'avancement du projet. Il est composé de colonnes qui représentent les étapes de développement.

Vous pouvez le retrouver dans l'onglet <kbd>Projects</kbd> de GitHub.

## Processus d'issue

Il est important de respecter le processus d'issue pour que tout le monde puisse travailler efficacement.

Grâce à celui-ci, toutes les tâches seront claires et bien définies.

### Création d'une issue

Lors de la création d'une issue, vous pouvez choisir un template pour vous aider à bien définir la tâche.

Une issue doit contenir un titre clair, et des détails pour chaque demandes du template. Essayez de donner le plus d'informations possible pour que la personne qui prendra la tâche puisse la réaliser sans problème.

> [!NOTE]
> Si la demande est vraiment particulière et ne répond à aucun template, vous pouvez créer une issue sans template.

Lorsque vous avez créé une issue, veuillez préciser une estimation de priorité via le projet. Vous n'avez pas besoin de préciser la date de fin, elle sera définie par la personne qui prendra la tâche.

### Blocage d'une issue

Si une issue a besoin de plus d'informations, ou si elle est bloquée par une autre tâche, vous pouvez la laisser dans le statut **En attente**.

Il est également important d'assigner l'issue au créateur de la tâche en attendant que des réponses soient apportées. Sauf si l'issue doit recevoir des informations de la part d'une autre personne, dans ce cas, assignez l'issue à cette personne.

### Arrêt d'une issue

Si une issue ne peut pas être réalisée, vous pouvez la fermer en précisant la raison.

Merci de fermer via le bouton <kbd>Close are not planned</kbd>. Cela fermerra l'issue en précisant que la tâche n'est pas prévue.

Vérifiez bien que l'issue a été deplacée dans la colonne **Terminée** du projet (ce qui est fait automatiquement). Si ce n'est pas le cas, déplacez-la manuellement.

### Issue prête

Lorsqu'une issue est prête à être réalisée, elle doit être déplacée dans la colonne **Prête** du projet.

Il faut également retirer l'assignation de l'issue pour que tout le monde puisse la prendre. Le créateur de l'issue peut également la prendre, ou conseiller une personne qui serait la plus apte à la réaliser.

## Processus de développement

Le processus de développement est important pour personne ne se trouve bloqué, ou que le code soit de mauvaise qualité.

### Mise à jour de l'issue

Lorsque vous prenez une issue, merci de la déplacer dans la colonne **En cours** du projet.

Vous devez également vous assigner l'issue pour que tout le monde sache que vous êtes en train de la réaliser.

Si possible, il serait bien d'attribuer une estimation de temps pour la réalisation de la tâche, avec la date du début et de fin.

### Création d'une branche

Lorsque vous prenez une issue, vous devez créer une branche pour réaliser la tâche. La branche doit être créée à partir de la branche **dev**.

Pour le nommage de la branche, je vous laisse vous renseigner [ici](./GIT_GUIDELINES.md#nommage-des-branches).

### Commits

Vos commits ne doivent pas mélangés plusieurs features ou corrections. Chaque commit doit être clair et précis.
Il est donc conseillé de faire des commits réguliers.

Pour le nommage des commits, je vous laisse vous renseigner [ici](./GIT_GUIDELINES.md#nommage-des-commits).

Si vous voulez garder une bonne arborescence de commits, vous pouvez vous renseigner [ici](./GIT_GUIDELINES.md#maintenance).

### Mise en pause

Si vous ne pouvez pas continuer une tâche, ou si vous avez besoin d'aide, vous pouvez mettre en "pause" l'issue.

Pour cela, mettez votre problématique en commentaire de l'issue, et assignez-la à la personne qui pourrait vous aider.

Lorsque vous avez eu votre réponse, vous pouvez reprendre la tâche, et vous re-assigner l'issue.

## Pull Requests

Les Pull Requests (PR) sont les demandes de fusion de votre branche avec la branche **dev**.

### Création d'une PR

Avant la création d'une PR, assurez-vous que votre branche est à jour avec la branche **dev**. Pour cela, vous pouvez vous renseigner [ici](./GIT_GUIDELINES.md#maintenance).

Lorsque vous créez une PR, veillez à bien la diriger vers la branche **dev**.

Une PR doit contenir un titre clair, et une description précise et bien détaillée de ce que vous avez réalisé. La description doit contenir le numéro de l'issue que vous avez réalisé (ex: `#1`).

Vous vous assignez à la PR et les personnes qui vous ont aidé à la réalisation de la tâche (si c'est le cas).

L'ajout d'un reviewer est obligatoire, cela lui permettra de voir votre code et de vous donner des conseils pour l'améliorer. Le créateur de l'issue doit choisir quelqu'un qui semble le plus apte à réaliser la revue de code.

Les labels sont optionnels.

> [!NOTE]
> Ne pas lier la PR au projet.

### Revue de code

Les revues de code sont importantes car elles permettent de discuter d'erreurs potentielles, de bonnes pratiques, etc. Chaque commentaire est une opportunité d'améliorer le code et de partager des connaissances.

Lorsque vous recevez une PR en tant que reviewer, vous devez la regarder et donner votre avis. Si vous avez des modifications à apporter, vous pouvez les ajouter en commentaire.

Il est fortement recommandé d'aller sur la branche de la PR pour tester le code. Cela permet de voir si le code fonctionne correctement, et si les modifications sont bien réalisées.

Lorsque vous avez terminé la revue, vous pouvez approuver la PR si tout est bon, ou demander des modifications si vous avez des remarques.

### Merge d'une PR

Lorsque la PR est approuvée, vous pouvez la merger. Assurez-vous que la branche est à jour avec la branche **dev**.

Vous avez comme choix pour merge la PR :

- **Squash and merge** : permet de fusionner tous les commits de la branche en un seul commit.

Il est généralement conseillé de faire un **Squash** pour garder un historique de commits propre, et garder la règle de 1 commit = 1 feature. Lors du **Squash**, il est important de bien nommer le commit, et de mettre le numéro de la PR dans le scope du commit. Si vous ne savez pas ce qu'est un scope, vous pouvez vous renseigner [ici](./GIT_GUIDELINES.md#nommage-des-commits).

> [!IMPORTANT]
> Une PR peut être merge uniquement par les personnes qui sont assignées, et non par les reviewers.

Lorsqu'une PR est mergée, assurez-vous que l'issue a été fermée, et qu'elle a été déplacée dans la colonne **Terminée** du projet (ce qui est fait automatiquement). Si ce n'est pas le cas, déplacez-la manuellement.

## Règles des branches

Voici les règles à propos des 3 types de branches :

- **master** : branche principale du projet, elle contient le code en production.
- **dev** : branche de staging, elle contient le code avant la mise en production.
- **feature/xxx** : branche à propos d'une issue, elle contient le code en cours de développement d'une feature.

Il est important de savoir que la branche **dev** est une branche de référence, donc elle doit être stable et propre. Il est interdit de merge une PR en disant "ça sera corrigé plus tard".

Il est également interdit de push directement sur les branches **master** et **dev**.

## Mise en production

La mise en production est une étape importante, il est donc important de bien la réaliser.

Pour mettre en production, il faut qu'il y ait assez de features pour que cela soit intéressant. Il est inutile de mettre en production une seule feature.

Pour cela il faut demander à quelqu'un de faire un merge de la branche **dev** sur la branche **master**, en local. Il faut ensuite tester le code en local pour voir si tout fonctionne correctement. Si c'est le cas, vous pouvez push sur la branche **master**.

Il est important de ne pas faire de PR vers la branche **master**, sinon cela va créer un mauvais historique de commits.

## Contact

Si vous avez des questions, n'hésitez pas à contacter Nathan.
