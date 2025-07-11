🚀 DigiBox Market - README

✅ Structure du site
.
├── index.html            -> Page d'accueil + produits
├── paiement.html         -> Page paiement dynamique
├── telechargement.html   -> Page après achat
├── connexion.html        -> Connexion (Google / classique)
├── style.css             -> Style global
├── script.js             -> Loader paiement
├── img/
│   └── logo.png
│   └── autres images produits
├── telechargements/
│   └── *.zip fichiers à livrer

✅ Déployer sur un hébergement
1. Connecte-toi à ton FTP (FileZilla, cPanel, etc).
2. Upload tout le dossier (avec les sous-dossiers img et telechargements).
3. Assure-toi que le fichier index.html est à la racine (public_html/ par exemple).

✅ Usage du site
- index.html : catalogue + boutons acheter
- paiement.html?produit=CV&prix=1000 : montre produit et simule paiement
- après paiement, redirige vers telechargement.html?token=xxx
- connexion.html : connexion via Google OAuth ou formulaire (simulé).

✅ Important
- Ce site est **100% statique**, il n’y a pas de vraie vérification back-end.
- Pour la sécurité réelle des paiements, il faudra un serveur et une API.

📝 Auteur : Toi (Kevin Baham)
