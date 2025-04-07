# Projet EDN - Gestion des Emprunts de Matériel Informatique

## 📝 Description  
Ce projet a pour but d'automatiser et de simplifier les emprunts de matériel informatique au sein de votre établissement.  

**Problématiques résolues** :  
✅ Libère l'administration des demandes constantes des étudiants  
✅ Suivi précis des emprunts et des retours  
✅ Alertes automatiques pour les retards  
✅ Historique complet des transactions  

## 🛠 Installation  

### Prérequis  
- [Node.js](https://nodejs.org/) (version 16 ou supérieure recommandée)  
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Laragon version 5.0.0 (PHP 8.2 min et node.js au cas ou)
- Base de données Mysql est déjà avec Laragon (locale ou cloud)

### 🚀 Mise en place  

1. **Cloner le dépôt**
Cloner le repos dans le fichier de Laragon (www/)  
```bash
git clone https://github.com/Mochiizo/projet-edn.git
cd EDN
```

2. **Root Path**
Dans laragon veillez bien à mettre le bon chemin Root et 
dans le dossier public le fichier index.php y est.
"www/nomp_projet_/public"

3. ** Installation des dépendances**
Être à la racine du projet "www/edn-projet"
```bash
npm install
# ou
yarn install
```

4. **Instalation des dépendances PHP**
```bash
composer install
```

5. **Copier le fichier .env**
```bash
copy .env.example .env
```
Et changer le nom de DB_DATABASE = projetedndb

6. **Créer la DB**
Ouvrir phpmyadmin, créer une nouvelle base et la nommer projetedndb

7. **Génération de clé d'application**
Dans le cmd du projet
```bash
php artisan key:generate
```

8. **Les migrations**
Migrer les données dans la BBD créer plus haut
```bash
php artisan migrate
```

### 🚀 Déploiement

1. **Développement**
Pour pouvoir développer l'application et voir les modifications en directe
```bash
composer run dev
```

2. **Lancer le serveur composer**
```bash
composer run serve
```
