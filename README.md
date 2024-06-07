# Libratech
Libratech est une application SaaS de gestion de bibliothèque conçue pour offrir une solution complète et intuitive 
pour la gestion des livres et des prêts. La plateforme permet aux administrateurs et aux utilisateurs de gérer les 
ressources de la bibliothèque de manière efficace.

## Table des matières

Fonctionnalités

Technologies Utilisées

Installation

Utilisation

Structure du Projet

Contributeurs

Licence


## Technologies Utilisées

Node.js: Pour le backend et le serveur.

Express.js: Framework pour la création de l'API.

React: Bibliothèque JavaScript pour la création de l'interface utilisateur.

Tailwind CSS: Framework CSS pour la mise en forme.

MySQL: Base de données relationnelle.

bcrypt: Pour le hachage des mots de passe.

JWT (JSON Web Tokens): Pour l'authentification sécurisée des utilisateurs.

## Fonctionnalités

### Page de Connexion et d'Inscription

Login: Les utilisateurs peuvent se connecter en fournissant leur email et mot de passe.

![login](https://github.com/Emanejalal/Library-management/assets/155189345/ee1d5de4-58fc-461b-bf10-252c4bb640a5)

Signup: Les nouveaux utilisateurs peuvent créer un compte en fournissant leur nom, prénom,
email et mot de passe.

Choix du Rôle: Lors de l'inscription, les utilisateurs peuvent choisir leur rôle (Administrateur ou Utilisateur) pour personnaliser leur expérience sur la plateforme.

![signup](https://github.com/Emanejalal/Library-management/assets/155189345/36ca2ce1-ef8d-45fe-accb-6220afede93a)



### Interface Utilisateur

Tableau de Bord: Visualisation des livres disponibles et liste des prêts actuels.

![dash user](https://github.com/Emanejalal/Library-management/assets/155189345/d3d8370b-b3fb-4788-be66-ef90fd99366d)


Page Livres: Consultation des livres disponibles et ajout de livres à la liste des prêts.

![booklist user](https://github.com/Emanejalal/Library-management/assets/155189345/eba59f23-c21d-46cc-a434-481a17b7e013)

![add loan](https://github.com/Emanejalal/Library-management/assets/155189345/582d7c94-5e83-4a48-8bcc-dac126e284bc)

Page Prêts: Gestion des prêts de l'utilisateur avec options pour ajouter des prêts.

![loanlist user](https://github.com/Emanejalal/Library-management/assets/155189345/b71e5bd0-f797-4b27-b069-a617ba42669f)



Page de Profil: Modification des informations personnelles (nom, prénom, email).

![profile](https://github.com/Emanejalal/Library-management/assets/155189345/2a5aaf14-18cc-41f2-b1d6-ed56502788b7)


### Interface Administrateur

Tableau de Bord: Visualisation des livres disponibles, des prêts, des utilisateurs et des statistiques.

![dash admin](https://github.com/Emanejalal/Library-management/assets/155189345/127c40eb-f759-42eb-9141-ab959e535515)

![dash 2 admin](https://github.com/Emanejalal/Library-management/assets/155189345/a5b55c6b-b83a-4504-b4ed-fd89db7f05ae)



Page Livres: Gestion des livres avec options pour ajouter, éditer et supprimer des livres.

![book list admin](https://github.com/Emanejalal/Library-management/assets/155189345/6306b838-20c3-4507-866d-48f36f5159d9)

![edit book](https://github.com/Emanejalal/Library-management/assets/155189345/69127913-c99b-497b-8308-9c03c837fa9e)

![add book](https://github.com/Emanejalal/Library-management/assets/155189345/98592fe0-f014-46c0-9fd4-9f328ab32920)


Page Prêts: Gestion des prêts des utilisateurs avec options pour ajouter, éditer et supprimer des prêts.

![loanlistadmin](https://github.com/Emanejalal/Library-management/assets/155189345/bfce41b2-8e65-4dff-a675-c3873c4a7963)

![add loan](https://github.com/Emanejalal/Library-management/assets/155189345/160fe207-a52c-4d0b-880a-5b22c12c9571)


Page Utilisateurs: Gestion des utilisateurs inscrits.

![userlist](https://github.com/Emanejalal/Library-management/assets/155189345/edceb3b7-c0e9-4d3d-b402-1793899bd47b)



Page de Profil: Modification des informations personnelles (nom, prénom, email).

![profile](https://github.com/Emanejalal/Library-management/assets/155189345/b9547052-4a27-4e79-9b58-0bd0be9473d1)


### Page "À Propos"

Présentation de l'équipe de développement.

![aboutus](https://github.com/Emanejalal/Library-management/assets/155189345/0cb8e4ab-f36c-40f8-8fdb-537d187fe76d)



## Utilisation

### Pour les utilisateurs

Créez un compte ou connectez-vous.

Consultez les livres disponibles sur le tableau de bord.

Ajoutez des livres à votre liste de prêts depuis la page Livres.

Gérez vos prêts sur la page Prêts.

Modifiez vos informations personnelles sur la page de Profil.

### Pour les administrateurs

Créez un compte ou connectez-vous en tant qu'administrateur.

Visualisez les statistiques sur le tableau de bord.

Gérez les livres sur la page Livres.

Gérez les prêts des utilisateurs sur la page Prêts.

Gérez les utilisateurs sur la page Utilisateurs.

Modifiez vos informations personnelles sur la page de Profil.

## Routes Backend de Libratech

#### Routes d'Authentification (auth_routes)

![Screenshot 2024-06-07 065557](https://github.com/Emanejalal/Library-management/assets/155189345/08617a2d-7f29-498e-b297-a6b94593b745)


POST /signup : Inscription d'un nouvel utilisateur.

POST /login : Connexion d'un utilisateur existant.


### Routes de Gestion des Livres (book_routes)

![Screenshot 2024-06-07 065609](https://github.com/Emanejalal/Library-management/assets/155189345/9d5abc73-ad0a-4e10-a066-1b1168d0b38c)


POST / : Ajout d'un nouveau livre.

GET / : Récupération de la liste de tous les livres.

GET /
: Récupération des informations d'un livre par son ID.

PUT /
: Mise à jour des informations d'un livre par son ID.

DELETE /
: Suppression d'un livre par son ID.

GET /count : Récupération du nombre total de livres.


### Routes de Gestion des Prêts (loan_routes)

![Screenshot 2024-06-07 065618](https://github.com/Emanejalal/Library-management/assets/155189345/3627db27-4bb3-46d5-8f5b-e9a04f8c0c13)


POST / : Ajout d'un nouveau prêt.

GET / : Récupération de la liste de tous les prêts.

GET /
: Récupération des informations d'un prêt par son ID.

PUT /
: Mise à jour des informations d'un prêt par son ID.

DELETE /
: Suppression d'un prêt par son ID.

GET /count : Récupération du nombre total de prêts


### Routes de Gestion des Utilisateurs (user_routes)

![Screenshot 2024-06-07 065624](https://github.com/Emanejalal/Library-management/assets/155189345/fef079a6-bbdc-49ff-aa4c-1d6fb79c659c)


GET /
: Récupération des informations d'un utilisateur par son ID.

PUT /
: Mise à jour des informations d'un utilisateur par son ID.

GET / : Récupération de la liste de tous les utilisateurs.

DELETE /
: Suppression d'un utilisateur par son ID.

GET /count : Récupération du nombre total d'utilisateurs.



