#Documentation d'installation

###Pour lancer le projet avec docker :
 

- Installer Docker et docker-compose grâce à la documentation Docker. 

- Cloner le projet 

- Copier /coller le fichier default.env et le renommer en ".env" 
Nous avons ainsi default.env et .env 

- Bien vérifier les adresses HOST dans le fichier .env 

- Dans le dossier alsace, lancer la commande `sudo docker-compose up` 

- Le projet devrait se build et se lancer sur les ports donner dans le docker-compose. 

- Si une erreur survient comme : docker ne trouve pas l'image "alsace_server", faites `sudo docker images` et trouver sous quel nom le serveur est donné. Il faut alors prendre ce nom et remplacer, dans le docker/client/Dockerfile, le "server" dans la ligne `FROM server:latest` 

 

###Pour lancer le projet sans docker : 


 - Dans le dossier à la base du projet, faire : `npm i –g npm@latest` 

 - et : `npm i node@11.14 -s `

- Faire un `npm i` dans le dossier principal et client  

- Enfin faire dans le dossier principal `npm start run` 

- Et dans client `ionic serve` 

La bdd et l'OSRM ne sont disponibles que dans le docker. 

Rajouter les sudo si besoin.