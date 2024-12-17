# <h1 align="center">👨‍💻 Ibexa DXP 4.6 👩‍💻</h1>   

Ce projet utilise Ibexa DXP, qui est sous la licence GPL-2.0. 

<details>
  <summary><h2>Exemples de code</h2></summary>

- configuration de l'affichage du contenu : [views.yaml](config/packages/views.yaml)
- contrôleur personnalisé : [RideController.php](src/Controller/RideController.php)
- vue - full : [home_page.html.twig](templates/full/home_page.html.twig)
- vue - line : [rides.html.twig](templates/line/rides.html.twig)
- query type : [RideQueryType.php](src/QueryType/RideQueryType.php)
</details>

<details>
  <summary><h2>Images du site</h2></summary>

### <ins>Accueil</ins>
![home](https://github.com/user-attachments/assets/86293c42-e604-4f91-85a9-c0bc35e650eb)    
### <ins>Vue d'une balade</ins>     
![ride](https://github.com/user-attachments/assets/69a2f9b2-09ac-4779-8610-f28f98db0724)      
### <ins>Vue d'un point d'intérêt</ins>     
![landmark](https://github.com/user-attachments/assets/6cc44d71-0b36-4d56-a47e-bbf9af7c4662)
</details>

<details>
  <summary><h2>Versions utilisées</h2></summary>

Env. requis : https://doc.ibexa.co/en/latest/getting_started/requirements/#operating-system     

- Ubuntu : 24.04.1 (`lsb_release -a`)
- PHP : 8.3.6 (`php --version`)
- Apache : 2.4.58 (`apache2 -v`)
- MySQL : 8.0.40 (`mysql --version`)
- Node : 20.18.1 (`node -v`)
- Npm : 10.8.2 (`npm -v`)
- Yarn : 1.22.22 (`yarn --version`)
- Git : 2.43.0 (`git --version`)
- Composer : 2.7.1 (`composer --version`)
- Ibexa DXP : 4.6.14 (voir ibexa/oss dans composer.json)
- Symfony 5.4.48 (voir vendor/symfony/http-kernel/Kernel.php)
</details>

<details>
  <summary><h2>Documentation</h2></summary>

<details>
    <summary><h3>1) Installation environnement Linux</h3></summary>

Doc installation LAMP : https://www.digitalocean.com/community/tutorials/how-to-install-lamp-stack-on-ubuntu          
<br>

**MAJ packages :** `sudo apt update && sudo apt upgrade && sudo do-release-upgrade`

**Pare-feu, Apache et extensions :**
- `sudo apt install ufw` : installer un pare-feu
- `sudo ufw enable` : activer le pare-feu
- `sudo apt install apache2` : installer Apache
- `sudo ufw allow in "Apache"` : autoriser le trafic 80 (conseillé qu'en local)
- `sudo ufw status` : vérifier la permission Apache 
- extensions :
    - `sudo a2enmod rewrite`
    - `sudo a2enmod env`
    - `sudo a2enmod setenvif`
    - `sudo a2enmod expires`
- `sudo service apache2 restart` : relancer Apache
- aller sur http://localhost:8000/ pour vérifier le fonctionnement du serveur Apache 


**MySQL :**   
- `sudo apt install mysql-server` : installer MySQL
- `sudo systemctl start mysql` : lancer MySQL si nécessaire (l'installation le fait déjà)
- `sudo mysql_secure_installation` : script de sécurité
    - option Y
    - option 1 (password >= 8, au moins : 1 chiffre, 1 lettre min, 1 lettre maj et 1 caractère spécial)
    - options : Y, Y, Y, Y
- `sudo mysql` : tester la connexion
- si besoin modifier le password root avec les règles de l'option 1 :
    - `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password'`; 
    - quitter et se reconnecter avec son password : `mysql -h localhost -u root -p`

**PHP :**    
- `sudo apt install php8.3 php8.3-cli php8.3-fpm php8.3-mysql php8.3-xml php8.3-mbstring php8.3-intl php8.3-curl php8.3-bcmath libapache2-mod-php8.3 php8.3-gd` : installer PHP et les extensions
- `php -m` : vérifier la présence d'extensions, certaines y sont déjà

**Node.js :**   
Doc : https://deb.nodesource.com/   
- installation :
    - `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -`
    - `sudo apt-get install -y nodejs`

**Yarn :**   
Doc : https://classic.yarnpkg.com/en/docs/install/#debian-stable   
- `sudo npm install --global yarn`

**Git :**   
- `sudo apt install git`

**Composer :**   
- `sudo apt-get install composer`

**Vscode (hors WSL) :**   
Doc : https://code.visualstudio.com/docs/setup/linux       
- `sudo snap install code --classic`

**Google Chrome (hors WSL) :**     
Depuis /opt :    
- `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb`
- `sudo dpkg -i google-chrome-stable_current_amd64.deb`
- `sudo apt-get install -f`
- lancer : `google-chrome`

**Solr :**   
Doc : https://doc.ibexa.co/en/latest/search/search_engines/solr_search_engine/install_solr/
- d'abord installer java si on ne l'a pas : `sudo apt install openjdk-11-jdk`
- télécharger depuis /opt : `sudo wget http://archive.apache.org/dist/lucene/solr/7.7.2/solr-7.7.2.tgz`
- extraire : `sudo tar xvf solr-7.7.2.tgz`
- `cd solr-7.7.2`
- `sudo mkdir -p server/ibexa/template`
- `sudo cp -R ../../home/devuser/projects/ibexa_website/vendor/ibexa/solr/src/lib/Resources/config/solr/* server/ibexa/template` : à adapter selon le chemin du projet
- `sudo cp server/solr/configsets/_default/conf/{solrconfig.xml,stopwords.txt,synonyms.txt} server/ibexa/template`
- `sudo cp server/solr/solr.xml server/ibexa`
- `sudo sed -i.bak '/<updateRequestProcessorChain name="add-unknown-fields-to-the-schema".*/,/<\/updateRequestProcessorChain>/d' server/ibexa/template/solrconfig.xml`
- si besoin augmenter la limite de fichiers ouverts à 65000 :
	- `sudo nano /etc/security/limits.conf`
	- ajouter à la fin :    
		- \*               soft    nofile          65000
		- \*               hard    nofile          65000
		- \*               soft    nproc           65000
		- \*               hard    nproc           65000
	- si WSL : `wsl --shutdown` et relancer sa console Ubuntu
	- vérifier la modification `ulimit -n`
- vérifier que Solr appartient bien à notre user avec les bons droits
- démarrer Solr : 
    - `bin/solr -s ibexa`
    - `bin/solr create_core -c collection1 -d server/ibexa/template`
- Solr est accessible : http://localhost:8983/solr/#/
</details>

<details>
    <summary><h3>2) Installation projet Ibexa DXP</h3></summary>

Doc : https://doc.ibexa.co/en/latest/getting_started/install_ibexa_dxp/    
- `composer create-project ibexa/oss-skeleton ibexa_website`
</details>

<details>
    <summary><h3>3) Configurer et lancer son projet</h3></summary>

<details>
    <summary><h4>Si on utilise WSL</h4></summary>

- installer l'extension WSL sous son vscode depuis Windows
- utiliser l'extension :
    - clique sur l'extension affichée en bas à gauche de vscode
    - clique sur "Connect to WSL"
    - dans le nouveau vscode sous Linux : ouvrir le dossier du projet (ex. : /home/username/path/to/project)
</details>

**Configurer son projet Ibexa :**    
- `composer install` => install et update déclenchent l'exécution d'autres scripts (ex. : `yarn install`).      
Voir la section scripts de composer.json
- configurer son .env :
    - DATABASE_URL
    - APP_SECRET
- installer Solr si on l'a choisit comme moteur de recherche : voir la partie "1) Installation environnement Linux"
- `php bin/console ibexa:install` : créer la base de données et les tables systèmes
- `php bin/console ibexa:graphql:generate-schema` : créer les fichiers de schéma GraphQL
- `composer require --dev symfony/debug-bundle` : utile pour le mode dev
- `yarn encore dev` : compiler les assets
- `composer run post-install-cmd` : nettoyer l'env. après l'installation de dépendances       
- dans ibexa.yaml modifier si besoin : locale_fallback, site->languages

**Lancer son projet :**    
- `bin/solr start` : lancer Solr depuis /opt/solr-7.7.2
- `php -S 127.0.0.1:8000 -t public` : site accessible sous http://127.0.0.1:8000
</details>

<details>
    <summary><h3>4) Concepts</h3></summary>

#### 1. Gestion du contenu      
Doc : https://doc.ibexa.co/en/latest/content_management/content_model/     

- content type : semblable à une classe PHP (champs, héritage, validation ...). Géré soit par une interface graphique soit par du code
    - fields : représente les champs du content type (propriétés d'une classe PHP)
- content item : c'est une instance d'un content type (objet)
    - content information (métadonnées) : ensembles d'informations pour décrire un content item => id, name, ownerId, publishedDate, version, status (brouillon, publié, archivé), ...
    - fields : contient les valeurs des champs

Note :      
- Content gère l'abstraction des données de contenu (modèles et objets)    
- Doctrine gère le stockage de ces objets dans la base de données relationnelle

#### 2. API
Ibexa DXP fournit des API pour récupérer et gérer le contenu.     
On peut choisir d'utiliser API PHP, API REST ou GraphQL.     

<details>
    <summary><h4>Explication GraphQL</h4></summary>

Permet de récupérer et gérer des données (sources possibles : bdd, api, fichier, ...) via un système de requêtes API s'appuyant sur un schéma.     

Scénario :
- le client fait une requête GraphQL
- le serveur GraphQL (ici Ibexa) reçoit, analyse la requête puis appelle le resolver correspondant
- le resolver récupére les données (ex. : avec Doctrine)
- GraphQL retourne au client les données demandées

Docs :     
- https://graphql.org/learn/  
- schéma - types : https://graphql.org/learn/schema/#scalar-types 
- queries - récupérer des données : https://graphql.org/learn/queries/
- mutations - modifier des données : https://graphql.org/learn/mutations/
- subscriptions - s'abonner aux mises à jour de données : https://graphql.org/learn/subscriptions/
</details>

#### 3. Solr    
L'utilisateur utilise un moteur de recherche comme Solr qui permet des recherches rapides et performantes sur les contenus (Content Items) du site.
</details>

<details>
    <summary><h3>5) Interface Admin</h3></summary>

#### 1. Connexion     
Aller sur l'url : http://127.0.0.1:8000/admin et rentrer les identifiants par défaut de la doc. : admin et publish.     

#### 2. Création d'un type de contenu
Doc : https://doc.ibexa.co/en/latest/administration/content_organization/content_types/     

- aller sur le menu "Content type", sélectionner "Content", cliquer sur "+ Create"
- remplir les informations générales du nouveau Content type : nom, description ...
- ajouter des fields au Content type (ex. : type, nom, ...)
- enregistrer

Note : Dans la bdd c'est stocké dans ezcontentclass_attribute.     

#### 3. Création de contenu
- menu "Content structure", cliquer sur "+ Create Content", sélectionner "Folder", le nommer "All contentName" puis le publier
- depuis le nouveau dossier, cliquer sur "+ Create content", sélectionner le Content type précedemment crée, remplir les fields, publier    

Note : Dans la bdd c'est stocké dans ezcontentobject_attribute. 

#### 4. Mettre en relation 2 content type
- éditer un content type
- ajouter un field de type "Content relation (single)" ou "Content relation (multiple)" selon le besoin
- cocher "Content location"
- ajouter dans "Allowed content types" le content type concerné

#### 5. Ajouter un formulaire d'inscription
- cliquer sur l'icône d'engrenage
- cliquer sur "Roles" puis "Anonymous"
- cliquer sur "+ Add" et choisir "User/Register"

Le chemin <yourdomain>/register affiche maintenant un formulaire d'inscription.      
Dans la config. on peut ajouter le template du formulaire ainsi que celui de la page de confirmation.     

Les utilisateurs inscrits sont visibles dans l'interface :    
- cliquer sur l'icône d'engrenage
- choisir le menu "Users", ouvrir l'icône affichant "Content tree"
- ouvrir Users -> Guest accounts

#### 6. Gérer les permissions utilisateurs
**Nouveau groupe utilisateur**     
- cliquer sur l'icône d'engrenage
- cliquer sur "Users" puis "+ Create user"
- choisir "User group", nommer le groupe et le publier    

**Nouveau rôle avec ses droits**    
- cliquer sur l'icône d'engrenage
- cliquer sur "Roles" puis "+ Create" de l'onglet Policies
- nommer le rôle et le sauvegarder
- définir pour le rôle un droit et ses limitations (si besoin) en cliquant sur "+ Add"

**Assignation d'un rôle à un groupe utilisateur**       
- icône d'engrenage -> Roles -> Rôle choisi -> Assignments
- cliquer sur "Assign to Users/Groups"
- cliquer sur "Select User groups", choisir le groupe et sauvegarder

#### 7. Complément
**Prévisualiser l'affichage d'un contenu sur le site**      
Aller dans le menu "Content Structure", choisir un contenu et cliquer sur "Preview".    

**Trouver l'url de son contenu**     
Aller dans le menu "Content Structure", choisir le contenu et cliquer sur URL.   

**Autoriser la lecture des medias**     
Cela permet d'afficher les images sur le site.      
- cliquer sur l'icône d'engrenage
- cliquer sur "Roles" puis "Anonymous"
- éditer la ligne Content Read
- dans Section ajouter "Media"    

**Afficher les textes de l'admin selon la langue utilisateur**     
Dans la config ibexa :       
```
ibexa:
    ui:
        translations:
            enabled: true
``` 
</details>

<details>
    <summary><h3>6) Côté Symfony</h3></summary>

#### 1. Association template et content type
Doc : https://doc.ibexa.co/en/latest/templating/templates/template_configuration/#view-rules-and-matching     

- dans ibexa.yaml on définit une section content_view qui contient les vues du site
    - chaque vue est paramétrable : template, match (permet la correspondance avec le contenu), ...
- `php bin/console cache:clear` suite à la MAJ de la config

#### 2. Affichage du contenu dans un template
Doc : https://doc.ibexa.co/en/latest/templating/render_content/render_content/      

Dans Twig on peut appeler :
- les informations générales du content : `{{ content.name }}`
- un field du content : `{{ ibexa_render_field(content, 'starting_point', {'parameters': { 'width': '100%', height: '200px', 'showMap': true, 'showInfo': false }}) }}`

#### 3. Query type
Les objets QueryType sont utilisés pour limiter et trier les résultats des requêtes d'éléments de contenu.       
On crée une classe (ex. RideQueryType) dans /src/QueryType et on ajoute sa configuration dans ibexa.yaml.  

#### 4. Gérer les images
On utilise le fichier config/packages/image_variations.yaml pour ajouter une configuration d'images.      
Puis on applique la configuration dans un template Twig en l'appelant dans parameters.     
Ex. côté Twig : 
```
{{ ibexa_render_field(content, 'photo', {
    'parameters': {
        'alias': 'ride_list'
    }
}) }}
```
</details>   
</details>