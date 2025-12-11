# TP3 — Sécurisation d’une application E‑Learning avec Keycloak, React et Spring Boot

## 1. Objectif du TP

Mettre en place une authentification moderne basée sur OAuth2 / OpenID Connect pour une application E‑Learning composée de :
- un serveur d’identité : **Keycloak**
- un backend API : **Spring Boot**
- un frontend SPA : **React**

Rôles fonctionnels :
- **STUDENT** : consulter les cours
- **ADMIN** : gérer les cours

Ce fichier sert de **rapport de TP** : chaque section sera complétée au fur et à mesure de l’avancement.

---

## 2. Environnement utilisé

- Docker (Keycloak lancé dans un conteneur)
- Java / Spring Boot (pour la partie backend, à venir)
- Node.js / React (pour la partie frontend, à venir)

---

## 3. Partie 1 — Configuration du serveur d’identité Keycloak

### 3.1. Installation et lancement de Keycloak avec Docker

Nous utilisons l’image officielle Keycloak en mode développement, avec un utilisateur administrateur dédié à la console d’administration.

Commande exécutée :

```bash
docker run --name keycloak \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:latest \
  start-dev
```

- URL de la console d’administration : `http://localhost:8080/`
- Identifiants d’admin Keycloak :
  - **Username** : `admin`
  - **Password** : `admin`

### 3.2. Création du Realm `elearning-realm` (à faire)

Étapes prévues :
- Se connecter à la console d’administration Keycloak.
- Créer un nouveau realm nommé **`elearning-realm`**.

### 3.3. Création du client `react-client` (à faire)

Paramètres attendus :
- Type : **Public**
- Flow activé : **Standard Flow (OIDC)**
- Redirect URI : `http://localhost:3000/*`

### 3.4. Création des rôles et utilisateurs (à faire)

- Rôles :
  - `ROLE_ADMIN`
  - `ROLE_STUDENT`
- Utilisateurs :
  - `user1` → rôle `ROLE_STUDENT`
  - `admin1` → rôle `ROLE_ADMIN`

### 3.5. Vérification de l’endpoint `/userinfo` (à faire)

- Authentifier un utilisateur.
- Vérifier l’endpoint :
  - `.../protocol/openid-connect/userinfo`
- Confirmer que les informations de profil de l’utilisateur connecté sont bien retournées.

---

## 4. Partie 2 — Sécurisation du backend Spring Boot (à compléter)

Cette section décrira :
- le projet Spring Boot créé (dépendances, configuration du Resource Server),
- les endpoints `/courses` et `/me`,
- la gestion des rôles via `@PreAuthorize`,
- les tests avec Postman (tokens STUDENT / ADMIN).

---

## 5. Partie 3 — Intégration du frontend React avec Keycloak (à compléter)

Cette section décrira :
- la création du projet React,
- l’intégration de `keycloak-js`,
- la récupération des informations utilisateur (`/userinfo`) et des rôles (`/me`),
- la protection des pages (STUDENT vs ADMIN),
- la mise en place du logout.

---

## 6. Partie 4 — Communication sécurisée React → Spring Boot (à compléter)

Cette section détaillera :
- l’envoi du token dans le header `Authorization: Bearer <access_token>`,
- les appels aux endpoints `/courses` et `/courses` (POST),
- la gestion des erreurs 401 / 403 et de l’expiration de session.

---

## 7. Partie 5 — Synthèse et captures d’écran (à compléter)

Cette section contiendra :
- un schéma d’architecture (Keycloak ↔ React ↔ Spring Boot),
- des captures d’écran :
  - connexion réussie,
  - informations du profil,
  - rôles affichés dans React,
  - appels API autorisés / interdits.

