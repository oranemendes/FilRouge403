#Avoir un apk signé et prêt à être déployé sur le Google Play 

- Build le projet dans le dossier client avec la commande: `ionic cordova build android --prod`. 

- Ouvrir android studio et faire une synchronisation du projet avec Gradle Files 

- Dans les menus, aller dans Build puis Generate Signed Bundle /APK 

- Crée une nouvelle clé et remplir tous les champs demandé. 

- Une fois la clé crée, faire suivant puis sélectionner "release" et cocher les deux cases sous "Signature Versions:" 

- Android Studio construit l'apk et l'enverra par défaut dans client/platforms/android/app/release/ 

- L'apk peut ensuite être disponible pour le téléchargement, ou la mise en ligne sur Google Play 

- Vérifier que l'option "Autoriser les installations venant de Sources inconnues" (ou titre similaire) est bien cochée 

- L'application devrait pouvoir être installé grâce à l'apk 

 

Point important : dans config.xml, faire bien attention à l'id de <widget>, qui est par défaut : "io.ionic.starter", il faut le changer car si le téléphone possède une autre application avec cette id, l'apk ne s'installera pas sur le téléphone, il crée un message d'erreur ou même redémarre le téléphone