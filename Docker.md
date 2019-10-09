#Installer et lancer Docker
> Décrit comment installer Docker sous Ubuntu grace au repository

Pour installer sous mac, voir le lien : https://docs.docker.com/docker-for-mac/install/ 

Pour installer sous d'autres distribution linux utiliser ce lien puis dans le menu voir les autres distributions: https://docs.docker.com/install/linux/docker-ce/debian/

##Installer Docker 

`sudo apt-get update`

`sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common`

Ajouter la clé GPG de Docker :

`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - `

Vérifier que les 8 derniers caractères de la clé sont bien :
 `9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88 ` 
 
grace à la commande :

`sudo apt-key fingerprint 0EBFCD88`

devrait donner :

    pub   4096R/0EBFCD88 2017-02-22
           Key fingerprint = 9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
     uid                  Docker Release (CE deb) <docker@docker.com>
     sub   4096R/F273FCD8 2017-02-22

Ajouter un repo stable 

 `sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`

#####Installer Docker Community Edition:

`sudo apt-get update`

`sudo apt-get install docker-ce docker-ce-cli containerd.io`

#####Vérifier que Docker est bien installé

`sudo docker run hello-world`

Cela devrait télécharger l'image et lancer un "Hello from Docker" dans la console ainsi que des explications supplémentaires sur le fonctionnement de Docker

####Installer Compose

Télécharger la dernière version stable de Docker Compose 

`sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`

Donner les permissions:

`sudo chmod +x /usr/local/bin/docker-compose`

Pour tester l'installation : 

`docker-compose --version`

Devrait donner : `docker-compose version 1.24.0, build a133471`

##Lancer le projet grace à Docker

#####Aller dans le dossier racine du projet
Il doit contenir le docker-compose.yml.

Lancer la commande :

`sudo docker-compose up`

Les containers devraient se build selon le docker-compose et les Dockerfile et on devrait voir le serveur se lancer sur le port 8080 et le client sur 80. 
