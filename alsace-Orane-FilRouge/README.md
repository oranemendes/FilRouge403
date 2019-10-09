#Projet Alsace

## Etape 1: Installer docker et docker-compose v.3

> Se référer au fichier `Docker.md`

### Etape 2: Installation de l'environement de travail

Vérifier l'adresse serveur ('HOST_ANGULAR et HOST_EXPRESS') dans le fichier `default.env` à la racine du projet. Puis, faite un copier/coller en renomant le fichier en `.env`.


### Etape 3: Lancement de docker

Tapez la commande suivant depuis la racine du projet:

    `sudo docker-compose up -d --build`

#### Divers info

    acces:
    - web: port 82
    - phpmyadmin: port 8081 (user: admin, pass: rowenta)
    
##A chaque mise à jour, reprendre à l'étape 3

en cas de soucis avec docker:

    `sudo docker-compose down`
    `sudo docker system prune`
