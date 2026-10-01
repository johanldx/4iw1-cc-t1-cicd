# Projet CI/CD — Industrialisation du cycle de vie logiciel

Ce dépôt contient l'application Node.js et l'ensemble des pipelines d'intégration et de déploiement continus (CI/CD) sous GitHub Actions réalisés dans le cadre du module CI/CD.

---

## 📁 Structure du dépôt

```text
.
├── .github/
│   └── workflows/
│       ├── exercice-1-ci.yml          # Exo 1: Validation continue (push, tests, cache npm, summary)
│       ├── exercice-2-artifact.yml    # Exo 2: Build manuel, vérification dist/ et artefact
│       └── exercice-3-pipeline.yml    # Exo 3: Pipeline complet (build mutualisé, matrix test, deploy)
├── docs/
│   └── exercices/
│       ├── exercice_1.mdx             # Fiche détaillée de l'exercice 1
│       ├── exercice_2.mdx             # Fiche détaillée de l'exercice 2
│       └── exercice_3.mdx             # Fiche détaillée de l'exercice 3
├── src/
│   └── index.js                       # Code source de l'application
├── test/
│   └── index.test.js                  # Tests unitaires natifs Node.js (node:test)
├── build.js                           # Script de build générant dist/
├── package.json                       # Métadonnées et scripts npm
└── package-lock.json                  # Verrouillage déterministe pour npm ci
```

---

## 🛠️ Commandes Locales

```bash
# Installation propre des dépendances
npm ci

# Exécution des tests unitaires
npm test

# Compilation du projet (génère dist/)
npm run build
```

---

## 🚀 Workflows GitHub Actions

### 1. Exercice 1 — Validation du projet (`exercice-1-ci.yml`)
- **Déclencheur** : Automatique à chaque `push`.
- **Rôle** : Récupération du dépôt (`checkout@v7`), configuration de Node.js (`setup-node@v7`), gestion du cache npm (`cache@v5`), installation déterministe (`npm ci`), exécution des tests (`npm test`), et résumé d'exécution dans `$GITHUB_STEP_SUMMARY` (`if: always()`).

### 2. Exercice 2 — Production d'un artefact (`exercice-2-artifact.yml`)
- **Déclencheur** : Manuel via `workflow_dispatch`.
- **Rôle** : Compilation du projet (`npm run build`), contrôle de présence de `dist/` avec annotation GitHub `::error::` en cas d'absence, persistance du dossier `dist/` en artefact téléchargeable (`upload-artifact@v7`), et récapitulatif dans `$GITHUB_STEP_SUMMARY`.

### 3. Exercice 3 — Build, Test et Déploiement (`exercice-3-pipeline.yml`)
- **Déclencheur** : Manuel avec choix d'environnement (`staging` ou `production`).
- **Sécurité** : Application du principe du moindre privilège (`permissions: contents: read`).
- **Job `build`** : Compilation unique et publication du build sous l'artefact nommé `application`.
- **Job `test`** : Matrice sur Node 20 & 22 sous Linux et Windows (`max-parallel: 2`, `fail-fast: false`), récupération de l'artefact et exécution des tests.
- **Job `deploy`** : Déploiement conditionné à la réussite de tous les tests, ciblant l'environnement choisi (`environment: staging | production`), lecture de la variable `vars.API_URL` et reporting dans `$GITHUB_STEP_SUMMARY`.

---

## ⚙️ Configuration requise sur GitHub

Pour le fonctionnement de l'Exercice 3, configurer deux environnements dans **Settings > Environments** :

1. **`staging`** :
   - Variable : `API_URL = https://api-staging.example.com`
2. **`production`** :
   - Variable : `API_URL = https://api.example.com`
   - Protection : Activer **Required reviewers** (approbation manuelle requise).
