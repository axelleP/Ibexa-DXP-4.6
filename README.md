# <h1 align="center">👨‍💻 Ibexa DXP 4.6 👩‍💻</h1>   

Ce projet utilise Ibexa DXP, qui est sous la licence GPL-2.0.     

<details>
    <summary><h2>1) Installation environnement Linux</h2></summary>

Doc installattion LAMP : https://www.digitalocean.com/community/tutorials/how-to-install-lamp-stack-on-ubuntu          
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
- aller sur http://localhost pour vérifier le fonctionnement du serveur Apache 


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
		- *               soft    nofile          65000
		- *               hard    nofile          65000
		- *               soft    nproc           65000
		- *               hard    nproc           65000
	- si WSL : `wsl --shutdown` et relancer sa console Ubuntu
	- vérifier la modification `ulimit -n`
- vérifier que solr appartient bien à notre user avec les bons droits
- démarrer Solr : 
    - `bin/solr -s ibexa`
    - `bin/solr create_core -c collection1 -d server/ibexa/template`
- Solr est accessible : http://localhost:8983/solr/#/
</details>

## 2) Installation projet Ibexa DXP
Doc : https://doc.ibexa.co/en/latest/getting_started/install_ibexa_dxp/    
- `composer create-project ibexa/oss-skeleton ibexa_website`


## 3) Versions utilisées
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


## 4) Configurer et lancer son projet
<details>
    <summary><h4>Si on utilise WSL</h4></summary>

- installer l'extension WSL sous son vscode depuis Windows
- utiliser l'extension :
    - clique sur l'extension affichée en bas à gauche de vscode
    - clique sur "Connect to WSL"
    - dans le nouveau vscode sous Linux : ouvrir le dossier du projet (ex. : /home/username/path/to/project)
</details>

**Configurer son projet Ibexa :**    
- `composer install` => install et update déclenchent l'exécution d'autres scripts (ex. : `yarn install`). Voir la section scripts de composer.json
- configurer son .env :
    - DATABASE_URL
    - APP_SECRET
- installer Solr si on l'a choisit comme moteur de recherche : voir la partie "Installation environnement Linux"
- `php bin/console ibexa:install` : créer la base de données et les tables systèmes
- `php bin/console ibexa:graphql:generate-schema` : créer les fichiers de schéma GraphQL
- `composer require --dev symfony/debug-bundle` : utile pour le mode dev
- `yarn encore dev` : compiler les assets
- `composer run post-install-cmd` : nettoyer l'env. après l'installation de dépendances

**Lancer son projet :**    
- `bin/solr start` : lancer Solr depuis /opt/solr-7.7.2
- `php -S 127.0.0.1:8000 -t public` : site accessible sous http://127.0.0.1:8000

## 5) Concepts
### 1. GraphQL
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

### 2. Gestion du contenu      
Doc : https://doc.ibexa.co/en/latest/content_management/content_model/     

- content type : permet de simuler une classe PHP (champs, héritage, validation ...) soit par une interface graphique soit par du code
- content item : c'est une instance d'un content type
    - content information (métadonnées) : ensembles d'informations pour décrire un content item => id, name, ownerId, publishedDate, version, status (brouillon, publié, archivé), ...
    - fields : contient les valeurs des champs

Note :      
- Content gère l'abstraction des données de contenu (modèles et objets)    
- Doctrine gère le stockage de ces objets dans la base de données relationnelle

### 3. Solr    
L'utilisateur utilise un moteur de recherche comme Solr qui permet des recherches rapides et performantes sur les contenus (Content Items) du site.