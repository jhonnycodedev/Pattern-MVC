PROJETO NODE COM EXPRESS E SEQUELIZE
DESENVOLVEDOR:  JHONNY GUIMARÃES
GIT: @jguimaraesdev

ALGUNS COMANDO ULTILIZADOS:

OMO EXECUTAR O PROJETO BAIXADO
Instalar todas as dependencias indicada pelo package.json
### npm install

Criar a base de dados "celke" no banco de dados MySQL, necessário ter o MySQL instalado na máquina e rodando.
### CREATE DATABASE aplication_1

Alterar no projeto as credenciais do banco de dados no arquivo ".env" 

Executar as migrations
### npx sequelize-cli db:migrate

Executar o projeto
### node app.js


SEQUENCIA PARA CRIAR O PROJETO
Criar o arquivo package
### npm init

Criar a base de dados
### CREATE DATABASE celke CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

Sequelize é uma biblioteca Javascript que facilita o gerenciamento do banco de dados SQL
### npm install --save sequelize

Instalar o drive do banco de dados
### npm install --save mysql2

Sequelize-cli interface de linha de comando usada para criar modelos, configurações e arquivos de migração para bancos de dados
### npm install --save-dev sequelize-cli

Iniciar o Sequelize-cli e criar o arquivo config
### npx sequelize-cli init

Executar o projeto
### node app.js ou nodemon app.js

Manipular variáveis de ambiente
### npm install --save dotenv

Criar a migration e models automaticamente pelo CLI Sequelize
### npx sequelize-cli migration:generate --name create-users //PADRÃO DE USO

### npx sequelize-cli model:generate --name Users --attributes name:string,email:string,image:string

### npx sequelize-cli model:generate --name Product --attributes name:string,category:string,price:double

Executar as migrations
### npx sequelize-cli db:migrate

Executar down - rollback - Permite que seja desfeita a migration, permitindo a gestão das alterações do banco de dados, versionamento.
### npx sequelize-cli db:migrate:undo --name nome-da-migration


